# Fabrika API Reference

Base URL: `http://localhost:3000/api`

## Authentication

All endpoints accept **optional** Keycloak JWT tokens via `Authorization: Bearer <token>`. Without a token, endpoints work in dev mode with the demo tenant.

Tenant context is extracted from:
1. JWT `tenant_id` claim (production)
2. `X-Tenant-Id` header (dev mode)
3. Defaults to demo tenant `00000000-0000-0000-0000-000000000001`

---

## Tenants

### `GET /api/tenants`
List all tenants (or current tenant if token present).

```bash
curl http://localhost:3000/api/tenants
```

Response: `200`
```json
[{ "id": "uuid", "name": "Demo Tenant", "slug": "demo", "createdAt": "...", "updatedAt": "..." }]
```

### `GET /api/tenants/:id`
Get tenant by ID. UUID validation enforced.

```bash
curl http://localhost:3000/api/tenants/00000000-0000-0000-0000-000000000001
```

Response: `200` | `400` (invalid UUID) | `404` (not found)

### `POST /api/tenants`
Create a tenant.

```bash
curl -X POST http://localhost:3000/api/tenants \
  -H "Content-Type: application/json" \
  -d '{"name": "My Tenant", "slug": "my-tenant"}'
```

Response: `201` | `400` (missing slug)

---

## Sites

### `GET /api/tenants/:tenantId/sites`
List all sites in a tenant.

```bash
curl http://localhost:3000/api/tenants/00000000-0000-0000-0000-000000000001/sites
```

### `GET /api/tenants/:tenantId/sites/:id`
Get site by ID.

```bash
curl http://localhost:3000/api/tenants/00000000-0000-0000-0000-000000000001/sites/:id
```

### `POST /api/tenants/:tenantId/sites`
Create a site.

```bash
curl -X POST http://localhost:3000/api/tenants/00000000-0000-0000-0000-000000000001/sites \
  -H "Content-Type: application/json" \
  -d '{"name": "My Store", "domain": "store.fabrika.dev"}'
```

Response: `201`
```json
{ "id": "uuid", "tenantId": "...", "name": "My Store", "domain": "store.fabrika.dev" }
```

---

## Pages

### `GET /api/sites/:siteId/pages`
List pages in a site.

```bash
curl http://localhost:3000/api/sites/:siteId/pages
```

### `GET /api/sites/:siteId/pages/:id`
Get page by ID.

```bash
curl http://localhost:3000/api/sites/:siteId/pages/:id
```

### `POST /api/sites/:siteId/pages`
Create a page with DSL. DSL is validated against the JSON Schema.

```bash
curl -X POST http://localhost:3000/api/sites/:siteId/pages \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Product Page",
    "slug": "products",
    "dsl": {
      "type": "ProductCard",
      "version": "1.0.0",
      "schema": "https://fabrika.dev/schemas/component-v1",
      "label": "Product Card",
      "category": "ecommerce",
      "permissions": ["catalog.read", "cart.write"],
      "props": {"showRating": true, "buttonLabel": "Buy"},
      "bindings": {"title": "product.name", "price": "product.price"},
      "children": [],
      "meta": {"source": "ai", "author": "builder"}
    }
  }'
```

Response: `201` | `400` (invalid DSL) | `403` (unauthorized capability)

### `PUT /api/sites/:siteId/pages/:id`
Update page title, DSL, or state.

```bash
# Publish a page
curl -X PUT http://localhost:3000/api/sites/:siteId/pages/:id \
  -H "Content-Type: application/json" \
  -d '{"state": "published"}'

# Rename
curl -X PUT http://localhost:3000/api/sites/:siteId/pages/:id \
  -H "Content-Type: application/json" \
  -d '{"title": "New Title"}'
```

States: `draft` → `preview` → `published`

---

## AI Generation

### `POST /api/ai/generate`
Generate a DSL component from a natural language prompt using DeepSeek AI.

Requires: `DEEPSEEK_API_KEY` in `.env`

```bash
curl -X POST http://localhost:3000/api/ai/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "crea una tarjeta de producto con imagen, precio y botón de compra", "type": "ProductCard"}'
```

Response: `201` → `ComponentDSL` | `422` (invalid generated DSL) | `503` (AI not configured)

---

## Sandbox

### `POST /api/sandbox/execute`
Execute a WASM extension in a sandboxed environment.

Requires: Sandbox sidecar running on `http://localhost:3001`

```bash
curl -X POST http://localhost:3000/api/sandbox/execute \
  -H "Content-Type: application/json" \
  -d '{
    "wasmBase64": "<base64-encoded-wasm>",
    "manifest": {
      "name": "my-extension",
      "version": "1.0.0",
      "runtime": "wasm",
      "permissions": ["catalog.read"],
      "limits": {"cpuMs": 50, "memoryMb": 32, "walltimeMs": 200, "network": "none"}
    }
  }'
```

Response: `200` → `ExecuteResponse` | `503` (sidecar down)

---

## DSL Schema

All page DSL must conform to the component schema (`component-v1.schema.json`):

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | string | ✅ | Component type (ProductCard, Section, Heading...) |
| `version` | string | ✅ | Semver (1.0.0) |
| `schema` | string | ✅ | Must be `https://fabrika.dev/schemas/component-v1` |
| `label` | string | — | Human-readable name |
| `category` | string | — | layout, content, ecommerce, media, form, navigation |
| `props` | object | — | Visual configuration |
| `styles` | object | — | Responsive styles (desktop, tablet, mobile) |
| `bindings` | object | — | Provider field paths (product.name) |
| `actions` | object | — | Capability invocations |
| `permissions` | string[] | ✅ | Required capabilities (min 1) |
| `children` | array | ✅ | Child components (can be empty) |
| `slots` | object | — | Named content areas |
| `meta` | object | — | Author, source, timestamps |

## Capabilities

31 predefined capabilities across 9 categories:

| Category | Capabilities |
|----------|-------------|
| Core | media.read, media.write, user.read, user.write, site.read, site.write |
| Catalog | catalog.read, catalog.write, catalog.delete |
| Cart | cart.read, cart.write |
| Orders | orders.read, orders.create, orders.update |
| Content | content.read, content.write |
| Forms | forms.read, forms.submit, forms.submissions.read |
| Auth | auth.login, auth.register, tenant.users.read, tenant.users.write |
| Analytics | analytics.read |
| SEO | seo.read, seo.write |
| Payments | payment.initiate, payment.read, checkout.process |
| Customers | customers.read, customers.write |
