# Fabrika — Estado

> Última actualización: 2026-08-05

## Resumen

- **Commits**: 31 | **Paquetes**: 11 (8 core + 2 apps + Rust) | **Tests**: 68 (0 fallos)
- **Fase**: MVP técnico completo. Core platform funcional.
- **Repo**: https://github.com/gonbellido/fabrika

## Documentos fundacionales

- `docs/plan-tecnico.pdf` — plan técnico con stack, arquitectura, DSL, seguridad, planificación
- `docs/vision-producto.docx` — documento de visión, decisiones y plan de desarrollo
- `CONTEXT.md` — glosario del dominio (40+ términos)
- `docs/architecture/overview.md` — arquitectura general (capas, flujos, contratos, stack)
- `docs/adr/` — 7 Architecture Decision Records

## Decisiones clave de dominio

1. **Provider contracts + Capabilities > GraphQL**. Bindings = campos de contratos tipados de Provider, no queries.
2. **DSL JSON validado por JSON Schema**. Sin lógica ejecutable. Única salida permitida de la IA.
3. **Component = unidad atómica, Template = composición reutilizable**. IA genera, usuario modifica.
4. **Project = Site**. Sin concepto intermedio entre Tenant y Site.
5. **4 categorías de extensibilidad**: Núcleo, Módulo oficial, Adaptador, Extensión (sandboxed WASM).
6. **Agentes híbridos**: Research y Feedback autónomos; el resto requiere aprobación humana.
7. **Publicación**: Draft → Preview → Published versionado. Rollback por página. Feature flags por componente.
8. **Capability ≠ Action**: Capability = permiso (`cart.write`), Action = invocación (`cart.add(id, qty)`).
9. **Roles fijos**: Admin, Editor, Viewer. No configurables por tenant.
10. **Adapter como traductor puro**: Sin acceso a red, secrets, ni otros tenants.
11. **LLM**: DeepSeek como provider principal, arquitectura con abstracción para multi-provider.

## Decisiones de producto

- **Segmento inicial**: Freelancers
- **Herramientas de diseño**: Figma + Canva
- **Stack frontend**: React 18 + TypeScript + Vite
- **Stack backend**: NestJS (Node.js) + Rust (Axum) para partes críticas
- **Base de datos**: PostgreSQL 16 con Row-Level Security
- **Auth**: Keycloak (JWT + JWKS)
- **IA**: DeepSeek (con abstracción multi-provider)
- **Publishing**: Astro SSG

## Paquetes

| Paquete | Descripción | Tests |
|---------|-------------|-------|
| `@fabrika/dsl` | JSON Schema v1, tipos, validador AJV | 16 |
| `@fabrika/capabilities` | 31 capabilities, catálogo, helpers | 18 |
| `@fabrika/core-api` | NestJS backend, Prisma ORM, 7 endpoints | — |
| `@fabrika/agents` | 14 agentes, Orchestrator, message bus | 17 |
| `@fabrika/publishing` | DSL → HTML, feature flags, versioning | 17 |
| `@fabrika/sandbox` | Rust + wasmtime + axum sidecar | — |
| `@fabrika/adapters` | WooCommerce + Shopify (Provider pattern) | — |
| `@fabrika/editor` | React SPA, drag & drop, AI integration | — |
| `@fabrika/site` | Astro SSG, static site generation | — |

## ✅ Completado

| Fase | Entregable |
|------|-----------|
| Investigación | 5 docs (plugins, competidores, personas, oportunidades, benchmark plan) |
| Dominio | CONTEXT.md (40+ términos), 11 decisiones clave |
| Arquitectura | Overview + 7 ADRs |
| Infraestructura | Docker (PG + KC + Vault), Terraform (staging + prod), CI/CD |
| DSL | JSON Schema v1, validador AJV, ejemplos |
| Capabilities | 31 capabilities, catálogo canónico, helpers |
| Core API | CRUD (tenants, sites, pages), AI generation, sandbox proxy, health |
| Auth | Keycloak JWT strategy + guard, tenant middleware |
| Multi-agent | 14 agentes, Orchestrator, configs, message bus |
| Publishing | Engine (DSL → HTML), flags, versioning, edge middleware |
| Sandbox | Rust crate (wasmtime), HTTP sidecar (axum) |
| Editor SPA | Canvas + Panel + Toolbar + Palette + drag & drop + AI |
| Publishing site | Astro SSG (fetches pages from API) |
| Adapters | WooCommerce + Shopify (REST + GraphQL) |
| Tests | 68 unit tests (dsl, capabilities, agents, publishing) |
| Docs | API.md, QUICKSTART.md, architecture overview |
| Monitoring | Health endpoint, request logging middleware |

## ❌ Pendiente

| Tarea | Prioridad | Esfuerzo |
|-------|-----------|----------|
| Configurar Keycloak realm + client + user | Alta | 30 min |
| Configurar DEEPSEEK_API_KEY en .env | Alta | 1 min |
| Benchmark práctico (Elementor/Webflow/Wix/Framer) | Media | 4 horas |
| E2E tests (Playwright) | Media | 1 semana |
| Terraform apply (staging + production) | Media | 2 horas |
| Deploy real a AWS | Media | 1 día |
| Sandbox sidecar integration test | Baja | 1 hora |
| Documentación de extensiones WASM | Baja | 2 días |

## Arranque

```bash
# Todo en uno
bash scripts/bootstrap.sh

# O paso a paso
docker compose -f infra/docker/docker-compose.yml up -d
pnpm install
pnpm --filter @fabrika/core-api exec prisma migrate dev
pnpm dev                    # Core API + Editor + Site
```

## Servicios y acceso

| Servicio | URL |
|----------|-----|
| Core API | http://localhost:3000/api |
| Editor SPA | http://localhost:5173 |
| Publishing Site | http://localhost:4321 |
| Keycloak | http://localhost:8081 (admin/admin) |
| Vault | http://localhost:8201 (token: `fabrika-dev-token`) |
| PostgreSQL | localhost:5433 (fabrika/fabrika_dev) |
| Sandbox Sidecar | http://localhost:3001 |

## Claves y credenciales

- DeepSeek API: configurado ✅ (key en `packages/core-api/.env`)
- Keycloak: Docker ✅ — realm/client/user pendiente de configurar
- Vault: Docker ✅ (dev mode, token: `fabrika-dev-token`)
