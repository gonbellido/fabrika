# ADR-0006: Estructura monorepo con paquetes por responsabilidad

El código se organiza en un monorepo con paquetes independientes por capa arquitectónica, publicados como paquetes internos con contratos explícitos entre ellos.

## Contexto

La arquitectura de Fabrika tiene capas bien definidas (DSL, capabilities, editor, core API, gateway, publishing, sandbox, adapters, agents). Cada capa tiene:
- Una responsabilidad clara
- Un contrato de interfaz con las capas adyacentes
- Posiblemente un runtime diferente (TypeScript para editor, Rust para sandbox)
- Ciclos de release potencialmente independientes

Un monorepo permite compartir tipos entre capas (ej: tipos DSL usados por editor y core API), ejecutar tests end-to-end, y mantener la cohesión del equipo.

## Decisión

Monorepo gestionado con **pnpm workspaces** + **Turborepo**:

```
fabrika/
├── packages/          # Paquetes internos (@fabrika/*)
│   ├── dsl/           # Tipos, schemas, validadores
│   ├── capabilities/  # Catálogo y tipos
│   ├── editor/        # Componentes del editor
│   ├── core-api/      # Backend NestJS
│   ├── gateway/       # API Gateway
│   ├── publishing/    # Motor de publicación
│   ├── sandbox/       # WASM runtime (Rust)
│   ├── adapters/      # Adaptadores (WooCommerce, Shopify...)
│   └── agents/        # Agentes de la fábrica
├── apps/              # Aplicaciones desplegables
│   ├── web/           # Editor SPA
│   └── docs/          # Documentación
├── infra/             # Infraestructura como código
│   ├── terraform/
│   └── docker/
└── docs/              # Documentación de proyecto
```

Características:
- **pnpm workspaces** para gestión de dependencias
- **Turborepo** para build/test/lint paralelo con caché
- **Contratos como paquetes** (`@fabrika/dsl`, `@fabrika/capabilities`) que son dependencia de múltiples paquetes
- **TypeScript estricto** en todos los paquetes TS
- **Rust** para sandbox (wasmtime) y partes críticas

## Alternativas consideradas

1. **Polyrepo (repos independientes)**: Descartado. Dificulta compartir tipos, ejecutar tests cross-package, y mantener versiones sincronizadas.
2. **NX**: Descartado. Turborepo es más ligero y se integra mejor con pnpm. Menos configuración.
3. **Yarn workspaces**: Descartado. pnpm es más rápido, usa menos disco, y tiene mejor soporte para strict mode.

## Consecuencias

- **Positivo**: Tipos compartidos entre frontend y backend. Tests E2E naturales. CI/CD unificado. Un solo PR para cambios cross-package.
- **Negativo**: Acoplamiento de versiones (mitigado con cambiosets y versionado independiente). Build times pueden crecer (mitigado con Turborepo caching).
- **Requiere**: Configuración de pnpm workspaces. Turborepo pipeline. Convenciones de package.json (name: @fabrika/*, exports bien definidos).
