# Arquitectura General de Fabrika

> Documento vivo. Versión 1.0 — Agosto 2026

## 1. Visión arquitectónica

Fabrika es una plataforma que separa radicalmente **declaración** de **ejecución**. La IA genera DSL declarativo (qué), el runtime lo ejecuta con capabilities controladas (cómo). Esta separación es la frontera de confianza del sistema.

## 2. Capas del sistema

```
┌─────────────────────────────────────────────────────────┐
│                    EDITOR SPA                           │
│  React 18 + TypeScript + Vite                           │
│  Canvas WYSIWYG · Panel propiedades · Drag & Drop       │
│  @dnd-kit · Craft.js · Zustand · Yjs (CRDT)             │
├─────────────────────────────────────────────────────────┤
│                    DSL LAYER                            │
│  JSON validado por JSON Schema                          │
│  Sin lógica ejecutable · Solo estructura + bindings     │
│  Versión canónica: component-v1.schema.json             │
├─────────────────────────────────────────────────────────┤
│                  API GATEWAY                            │
│  Autenticación (Keycloak) · Rate limiting · WAF         │
│  Validación de entrada · Auditoría                      │
├──────────────┬──────────────────────┬───────────────────┤
│  CORE API    │   AI SERVICE         │  INTEGRATION HUB  │
│  NestJS      │   LLM Proxy          │  SDK adapters     │
│  (Node.js)   │   System prompts     │  WooCommerce      │
│  + Rust      │   DSL generation     │  Shopify          │
│  (partes     │   Agent orchestration│  Stripe           │
│   críticas)  │                      │  PostgreSQL       │
├──────────────┴──────────────────────┴───────────────────┤
│               CAPABILITIES LAYER                        │
│  Operaciones de negocio con permisos mínimos            │
│  catalog.read · cart.write · orders.read · media.read   │
│  Los componentes NUNCA acceden a BD ni servicios        │
├─────────────────────────────────────────────────────────┤
│               DATA LAYER                                │
│  PostgreSQL 15+ con Row-Level Security                  │
│  tenant_id en cada tabla · Aislamiento a nivel fila     │
│  Cifrado en reposo · Backups cifrados                   │
├─────────────────────────────────────────────────────────┤
│               PUBLISHING ENGINE                         │
│  Astro/Next.js SSG + ISR                                │
│  Sitios estáticos · CDN · Versionado · Rollback         │
│  Feature flags por componente                           │
└─────────────────────────────────────────────────────────┘
```

## 3. Flujo de datos

### 3.1 Flujo de edición (usuario en el editor)

```
Usuario edita en Canvas
  → Zustand actualiza estado local
  → El estado se serializa a DSL JSON
  → El DSL se valida contra JSON Schema
  → Panel muestra propiedades, bindings, acciones, permisos
  → Guardar: POST /api/components → Core API → PostgreSQL
```

### 3.2 Flujo de generación IA

```
Usuario escribe prompt
  → AI Service recibe prompt + schema DSL como system prompt
  → LLM genera DSL (SOLO JSON, nunca código)
  → DSL recibido se valida contra JSON Schema
  → Si válido: se carga en el editor
  → Si inválido: se rechaza, se notifica al usuario
  → El usuario NUNCA ve código — solo el resultado visual
```

### 3.3 Flujo de resolución de datos (bindings)

```
Componente declara binding: "title": "product.name"
  → Runtime verifica capability: catalog.read ✓
  → Runtime identifica Provider: CatalogProvider
  → Provider tiene contrato tipado con campo "product.name"
  → Adapter concreto (WooCommerceAdapter) traduce el contrato
  → Adapter obtiene datos de la fuente externa
  → Runtime inyecta el valor en el componente
  → Componente renderiza con datos reales
```

### 3.4 Flujo de acción (click en botón)

```
Usuario clickea "Añadir al carrito"
  → Componente declara acción: cart.write(productId, quantity)
  → Runtime verifica capability: cart.write ✓ (en permissions del componente)
  → Runtime resuelve bindings en params (product.id → "abc123")
  → Runtime invoca Capability layer: cart.write("abc123", 1)
  → Capability layer verifica scope (Usuario → solo su carrito)
  → Capability layer ejecuta operación en PostgreSQL (RLS activo)
  → Respuesta: éxito o error
  → Componente emite evento: cart.updated o cart.error
```

### 3.5 Flujo de publicación

```
Editor: usuario clickea "Publicar"
  → POST /api/pages/:id/publish
  → Core API verifica publicación state: draft → preview → published
  → DSL del page completo se resuelve (todos los bindings)
  → Publishing engine genera HTML estático con Astro/Next SSG
  → Assets se suben a CDN
  → Versión se registra en tabla page_versions
  → DNS apunta a nueva versión
  → Feature flags se evalúan en el edge (CDN worker)
```

## 4. Estructura del monorepo

```
fabrika/
├── packages/
│   ├── dsl/                        # @fabrika/dsl
│   │   ├── schemas/               # JSON Schemas (component-v1, page-v1)
│   │   ├── types/                 # TypeScript types generados
│   │   └── validator/             # AJV + Zod validators
│   │
│   ├── capabilities/              # @fabrika/capabilities
│   │   ├── catalog/              # Catálogo canónico de capabilities
│   │   └── types/                # TypeScript types para capabilities
│   │
│   ├── editor/                    # @fabrika/editor
│   │   ├── canvas/               # Canvas WYSIWYG
│   │   ├── panel/                # Panel de propiedades
│   │   ├── renderer/             # DSL → React renderer
│   │   └── store/                # Zustand stores
│   │
│   ├── core-api/                  # @fabrika/core-api
│   │   ├── src/                  # NestJS modules
│   │   └── prisma/               # Schema de BD
│   │
│   ├── gateway/                   # @fabrika/gateway
│   │   └── src/                  # API Gateway (rate limit, auth, WAF)
│   │
│   ├── publishing/                # @fabrika/publishing
│   │   └── src/                  # Astro/Next SSG engine
│   │
│   ├── sandbox/                   # @fabrika/sandbox
│   │   └── src/                  # WASM runtime (Rust)
│   │
│   ├── adapters/                  # @fabrika/adapters
│   │   ├── woocommerce/          # WooCommerce adapter
│   │   ├── shopify/              # Shopify adapter
│   │   └── postgres/             # PostgreSQL adapter
│   │
│   └── agents/                    # @fabrika/agents
│       ├── builder/              # Builder agent
│       ├── attacker/             # Attacker agent
│       └── orchestrator/         # Orchestrator agent
│
├── apps/
│   ├── web/                       # Editor SPA
│   └── docs/                      # Documentación
│
├── infra/
│   ├── terraform/                 # IaC
│   └── docker/                    # Docker compose para dev
│
├── docs/
│   ├── adr/                       # Architecture Decision Records
│   ├── architecture/              # Documentos de arquitectura
│   ├── research/                  # Investigación (ya completada)
│   └── schemas/                   # Schemas fuente (referencia)
│
├── prototypes/                    # Spikes y prototipos
│   └── dsl-editor-spike/         # Prototipo del editor + DSL
│
└── CONTEXT.md                     # Glosario del dominio
```

## 5. Stack tecnológico

### Frontend (Editor SPA)

| Tecnología            | Justificación                      | Referencia      |
| --------------------- | ---------------------------------- | --------------- |
| React 18 + TypeScript | Ecosistema maduro, tipado estricto | Plan técnico §2 |
| Vite                  | Build rápido, HMR instantáneo      | Plan técnico §2 |
| @dnd-kit + Craft.js   | Drag & drop tipo Elementor         | Plan técnico §2 |
| Zustand               | Estado ligero, sin boilerplate     | Plan técnico §2 |
| Yjs (CRDT)            | Colaboración en tiempo real futura | Plan técnico §2 |

### Backend (Core API)

| Tecnología       | Justificación                            | Referencia      |
| ---------------- | ---------------------------------------- | --------------- |
| NestJS (Node.js) | API REST principal, madurez, tipado      | Plan técnico §2 |
| Rust (Axum)      | Partes críticas de rendimiento/seguridad | Plan técnico §2 |
| PostgreSQL 15+   | Multi-tenant nativo con RLS              | Plan técnico §6 |
| Keycloak         | Auth OpenID Connect, MFA                 | Plan técnico §2 |
| Prisma           | ORM tipado, migraciones                  | Propuesto       |

### DSL y validación

| Tecnología          | Justificación                    | Referencia      |
| ------------------- | -------------------------------- | --------------- |
| JSON Schema 2020-12 | Estándar, portable, validable    | Plan técnico §4 |
| AJV                 | Validador más rápido             | Plan técnico §4 |
| Zod                 | Validación en runtime TypeScript | Plan técnico §4 |

### Publicación

| Tecnología              | Justificación                      | Referencia      |
| ----------------------- | ---------------------------------- | --------------- |
| Astro/Next.js SSG       | Sitios estáticos, ISR, rendimiento | Plan técnico §3 |
| CDN (Cloudflare/Fastly) | Edge computing, feature flags      | Propuesto       |

### Sandbox

| Tecnología         | Justificación                    | Referencia      |
| ------------------ | -------------------------------- | --------------- |
| WebAssembly (WASM) | Aislamiento, límites de recursos | Plan técnico §7 |
| wasmtime           | Runtime WASM standalone          | Plan técnico §7 |

### Infraestructura

| Tecnología     | Justificación      | Referencia       |
| -------------- | ------------------ | ---------------- |
| Terraform      | IaC, reproducible  | Plan técnico §10 |
| Docker Compose | Desarrollo local   | Propuesto        |
| GitHub Actions | CI/CD              | Propuesto        |
| Vault          | Gestión de secrets | Plan técnico §6  |

## 6. Contratos entre capas

### 6.1 Contrato Editor → DSL

El editor produce y consume exclusivamente JSON validado contra `component-v1.schema.json`. Cualquier dato que no cumpla el schema es rechazado antes de salir del editor.

### 6.2 Contrato DSL → Capabilities

Un componente declara sus capabilities requeridas en `permissions: string[]`. El runtime verifica cada capability contra el catálogo canónico. Si una capability no existe o no está autorizada para el tenant, se rechaza el componente.

### 6.3 Contrato Capabilities → Data

Las capabilities exponen una interfaz tipada. Ejemplo:

```typescript
interface CatalogReadCapability {
  capability: "catalog.read";
  input: { filters?: CatalogFilters; pagination?: Pagination };
  output: PaginatedResult<Product>;
}

interface CartWriteCapability {
  capability: "cart.write";
  input: { productId: string; quantity: number };
  output: Cart;
}
```

### 6.4 Contrato Provider → Adapter

Un Provider define un contrato tipado. Un Adapter implementa ese contrato para una fuente concreta:

```typescript
interface CatalogProvider {
  getProducts(filters?: CatalogFilters): Promise<Product[]>;
  getProduct(id: string): Promise<Product>;
  getCategories(): Promise<Category[]>;
}

class WooCommerceAdapter implements CatalogProvider {
  // Traduce llamadas del Provider a la API de WooCommerce
}
```

## 7. Decisiones de seguridad

1. **Zero trust entre componentes**: un componente no puede acceder a datos de otro componente ni del sistema
2. **RLS como última línea de defensa**: aunque falle la capa de capabilities, PostgreSQL no devuelve datos de otro tenant
3. **DSL sin lógica**: no hay path para inyectar SQL, JS, ni cualquier código ejecutable
4. **WASM sin red por defecto**: las extensiones no tienen acceso a red a menos que lo declaren explícitamente
5. **Secretos fuera del DSL**: tokens, claves API, y credenciales nunca aparecen en el DSL ni en el frontend
6. **Auditoría completa**: toda invocación de capability genera log inmutable
