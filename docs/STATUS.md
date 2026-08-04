# Fabrika — Estado

> Última actualización: 2026-08-04

## Resumen
- Commits: 8 | Tablas: 0 | Páginas: 0 | Endpoints: 0 | Tests: 0
- Fase: Arquitectura documentada. Siguiente: infraestructura base (monorepo, CI/CD, Terraform)
- Repo: https://github.com/gonbellido/fabrika

## Documentos fundacionales
- `plataforma_web_ia_segura_plan_tecnico (1).pdf` — plan técnico con stack, arquitectura, DSL, seguridad, planificación
- `proyecto_plataforma_web_ia_segura (1).docx` — documento de visión, decisiones y plan de desarrollo

## Decisiones clave de dominio (sesión grill-with-docs)

1. **Provider contracts + Capabilities > GraphQL**. Los bindings son referencias a campos de contratos tipados de Provider, no queries GraphQL. El DSL es puramente declarativo.
2. **DSL JSON validado por JSON Schema**. Sin lógica ejecutable arbitraria. Única salida permitida de la IA.
3. **Component = unidad atómica, Template = composición reutilizable**. IA genera, usuario modifica visualmente.
4. **Project = Site**. No hay concepto intermedio entre Tenant y Site.
5. **4 categorías de extensibilidad**: Núcleo, Módulo oficial, Adaptador, Extensión (sandboxed WASM).
6. **Agentes híbridos**: Research y Feedback autónomos; Product, Architecture, Implementation, Release requieren aprobación humana.
7. **Publicación**: Draft → Preview → Published versionado. Rollback por página. Feature flags por componente.
8. **Capability ≠ Action**: Capability es el permiso (cart.write), Action es la invocación concreta (cart.add(id, qty)).
9. **Roles fijos**: Admin, Editor, Viewer. No configurables por tenant.
10. **Ciclo de vida del componente**: Generar → validar (JSON Schema) → editar visualmente → guardar en librería → usar en pages/templates → publicar.
11. **Adapter como traductor puro**: Sin acceso a red, secrets, ni otros tenants. Solo transforma datos entre el Provider y la fuente externa.

## Decisiones de producto
- **Segmento inicial**: Freelancers
- **Herramientas de diseño a integrar primero**: Figma + Canva
- **Stack frontend**: React 18 + TypeScript + Vite (según PDF)

## ❌ Pendiente
| Tarea | Prioridad | Esfuerzo estimado |
|-------|-----------|-------------------|
| Investigación de usuarios freelancers y sus flujos reales | Alta | 2 semanas |
| Investigación de plugins WordPress más usados por freelancers | Alta | 1 semana |
| Benchmark competidores (Webflow, Elementor, etc.) | Alta | 1 semana |
| Prototipo de alto riesgo (editor + DSL + generación IA) | Alta | 1 semana |
| Definir JSON Schema v1 del DSL | Alta | 3 días |
| Definir catálogo inicial de capabilities | Alta | 2 días |
| Vertical slice (tarjeta de producto end-to-end) | Media | 2 semanas |
| Setup de infraestructura base (Terraform, CI/CD, RLS) | Media | 2 semanas |

## Arranque
```bash
# Proyecto en fase de definición. Sin código todavía.
```

## Servicios y acceso
| Servicio | URL |
|----------|-----|
| N/A | N/A |
