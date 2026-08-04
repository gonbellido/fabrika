# Fabrika — Quickstart

## Prerequisites

- Node.js >= 20
- pnpm >= 9
- Docker (for PostgreSQL, Keycloak, Vault)
- Rust (for sandbox sidecar)
- DeepSeek API key (for AI generation, optional)

## 1. Clone & Install

```bash
git clone https://github.com/gonbellido/fabrika.git
cd fabrika
pnpm install
```

## 2. Start Infrastructure

```bash
docker compose -f infra/docker/docker-compose.yml up -d
```

Services:
- PostgreSQL 16 → `localhost:5433`
- Keycloak 26 → `http://localhost:8081` (admin/admin)
- Vault 1.18 → `http://localhost:8201` (token: `fabrika-dev-token`)

## 3. Setup Database

```bash
pnpm --filter @fabrika/core-api exec prisma migrate dev
```

Tables created: `tenants`, `users`, `sites`, `pages`, `page_versions`, `media`

Seed tenant inserted automatically (ID: `00000000-0000-0000-0000-000000000001`)

## 4. Configure AI (optional)

Edit `packages/core-api/.env`:
```env
DEEPSEEK_API_KEY=sk-your-key-here
```

Get key at: https://platform.deepseek.com/api_keys

## 5. Start Services

### Core API
```bash
pnpm --filter @fabrika/core-api dev
# → http://localhost:3000/api
```

### Editor SPA
```bash
pnpm --filter @fabrika/editor dev
# → http://localhost:5173
```

### Publishing Site (Astro SSG)
```bash
pnpm --filter @fabrika/site dev
# → http://localhost:4321
```

### Sandbox Sidecar (Rust)
```bash
cd packages/sandbox
cargo run
# → http://localhost:3001
```

## 6. Create your first page

```bash
# Create a site
SITE=$(curl -s -X POST \
  http://localhost:3000/api/tenants/00000000-0000-0000-0000-000000000001/sites \
  -H "Content-Type: application/json" \
  -d '{"name":"My Site"}')
SITE_ID=$(echo $SITE | python3 -c "import sys,json; print(json.load(sys.stdin)['id'])")

# Create a page with DSL
curl -X POST "http://localhost:3000/api/sites/$SITE_ID/pages" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Hello World",
    "slug": "hello",
    "dsl": {
      "type": "ProductCard",
      "version": "1.0.0",
      "schema": "https://fabrika.dev/schemas/component-v1",
      "label": "My First Card",
      "category": "ecommerce",
      "permissions": ["catalog.read"],
      "props": {"showRating": true, "buttonLabel": "Buy Now"},
      "bindings": {"title": "product.name", "price": "product.price"},
      "children": [],
      "meta": {"source": "human", "author": "me"}
    }
  }'
```

## 7. Generate a component with AI

```bash
curl -X POST http://localhost:3000/api/ai/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "crea una landing page con hero, features y footer"}'
```

## Running Tests

```bash
pnpm test
# 68 tests across 4 packages
```

## Project Structure

```
fabrika/
├── apps/
│   ├── web/          # Editor SPA (React + drag & drop)
│   └── site/         # Publishing site (Astro SSG)
├── packages/
│   ├── dsl/          # JSON Schema + types + validator
│   ├── capabilities/ # 31 capabilities catalog
│   ├── core-api/     # NestJS backend
│   ├── agents/       # Multi-agent factory
│   ├── publishing/   # DSL → HTML engine
│   ├── sandbox/      # WASM runtime (Rust)
│   └── adapters/     # WooCommerce + Shopify
├── infra/
│   ├── docker/       # PostgreSQL + Keycloak + Vault
│   └── terraform/    # AWS infrastructure
├── docs/             # Architecture, ADRs, API reference
└── prototypes/       # Early spikes
```

## Package Dependencies

```
editor ──────┐
site ────────┼──→ dsl ────────────────┐
core-api ────┤                         │
agents ──────┤                         │
publishing ──┼──→ capabilities ────────┤
adapters ────┘                         │
                                       │
sandbox (Rust, standalone sidecar) ────┘
```
