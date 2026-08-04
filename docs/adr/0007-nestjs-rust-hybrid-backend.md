# ADR-0007: Backend híbrido NestJS (Node.js) + Rust (Axum)

El backend principal usa NestJS sobre Node.js para la mayoría de endpoints. Las partes críticas de rendimiento y seguridad (validador DSL, sandbox runtime, pipeline de publicación) usan Rust con Axum.

## Contexto

La plataforma tiene requisitos mixtos:

- **CRUD tradicional**: gestión de sites, pages, usuarios, tenants. Lógica de negocio estándar. NestJS es ideal para esto: maduro, tipado, ecosistema rico (ORM, auth, validation).
- **Partes críticas de seguridad**: validación DSL, ejecución de capabilities, sandbox WASM. Donde un bug tiene consecuencias graves. Rust ofrece memory safety sin garbage collector.
- **Rendimiento**: el pipeline de publicación (generar HTML estático desde DSL para cientos de páginas) se beneficia de la velocidad de Rust.

El plan técnico (§2) sugiere NestJS como API principal y Rust para partes críticas.

## Decisión

Backend híbrido:

- **NestJS (Node.js)** para:
  - CRUD de sites, pages, templates, media
  - Gestión de tenants y usuarios
  - API del editor (guardar, cargar, versionar)
  - Integración con Keycloak
  - Orquestación de agentes

- **Rust (Axum)** para:
  - Validador DSL (alta frecuencia, crítico para seguridad)
  - Runtime de capabilities (ejecución autorizada)
  - Sandbox WASM (wasmtime)
  - Pipeline de publicación (SSG/ISR)
  - API Gateway interno (rate limiting, validación de entrada)

Comunicación: NestJS → Rust vía gRPC o HTTP interno (localhost). El API Gateway externo (futuro) enruta según el path.

## Alternativas consideradas

1. **Solo NestJS**: Descartado. No ofrece el nivel de seguridad y rendimiento que Rust proporciona para el runtime de capabilities y sandbox.
2. **Solo Rust**: Descartado. El ecosistema para CRUD tradicional, ORM, auth, y velocidad de desarrollo es inferior a NestJS.
3. **Go en vez de Rust**: Descartado. Go no ofrece las mismas garantías de memory safety que Rust. WASM runtime (wasmtime) está escrito en Rust — interoperabilidad nativa.

## Consecuencias

- **Positivo**: Lo mejor de cada ecosistema. NestJS para velocidad de desarrollo, Rust para seguridad y rendimiento. Separación clara de responsabilidades.
- **Negativo**: Dos lenguajes en el backend. Mayor complejidad de CI/CD. El equipo necesita conocer ambos. Contratos entre servicios a mantener.
- **Requiere**: gRPC/protobuf contracts entre NestJS y Rust. CI/CD para ambos lenguajes. Tests de integración cross-service.
