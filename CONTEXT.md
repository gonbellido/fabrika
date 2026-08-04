# Fabrika

Plataforma low-code de creación web y ecommerce que combina edición visual tipo Elementor con un núcleo seguro basado en componentes declarativos, capacidades con permisos explícitos, y asistencia multiagente de IA. Alternativa moderna a WordPress.

## Language

### Core concepts

**Platform**:
El producto completo: editor visual + runtime + DSL + capa de capacidades + fábrica multiagente.
_Avoid_: CMS, framework, site builder

**Component**:
Unidad atómica de construcción. Estructura declarativa (DSL JSON) que define layout, estilos, bindings de datos, acciones y permisos. Generado inicialmente por IA, modificable visualmente por el usuario.
_Avoid_: Widget, bloque, módulo, elemento

**Template**:
Árbol pre-ensamblado de componentes con bindings resueltos y datos de ejemplo. Listo para instanciar en un proyecto. El usuario lo usa como punto de partida.
_Avoid_: Plantilla (aceptable como sinónimo en español), theme, layout predefinido

**Page**:
Instancia concreta de un template dentro de un Site. Tiene URL, metadata SEO, y estado de publicación.
_Avoid_: Página (sinónimo en español), ruta, view

**Site**:
Conjunto de páginas, media, configuración y datos que forman una presencia web publicable. Pertenece a un Tenant.
_Avoid_: Proyecto, website, instalación

### Data layer

**Provider**:
Contrato tipado que define qué datos expone una fuente (catálogo, carrito, pedidos...). Los componentes declaran qué provider necesitan mediante bindings a campos del contrato.
_Avoid_: Data source, API, endpoint

**Binding**:
Conexión declarativa entre una propiedad visual de un componente y un campo del contrato de un Provider. Ej: `"title": "product.name"`.
_Avoid_: Data connection, mapping, data link

**Adapter**:
Traductor entre un Provider y una fuente de datos concreta (WooCommerce, Shopify, PostgreSQL...). Implementa la interfaz del Provider. Solo traduce datos — no puede iniciar conexiones salientes, almacenar secrets ni acceder a otros tenants.
_Avoid_: Connector, plugin de datos, integración

### Security model

**Capability**:
Operación de negocio autorizada con permiso mínimo. Los componentes solo pueden invocar capabilities, nunca acceder directamente a base de datos ni servicios externos. Ej: `catalog.read`, `cart.write`, `orders.read`.
_Avoid_: Permiso, rol, scope

**Action**:
Invocación concreta de una Capability con parámetros específicos desde un componente. Ej: `cart.add(productId, quantity)` es una Action que usa la Capability `cart.write`.
_Avoid_: Evento, handler, comando

**DSL**:
Formato declarativo JSON validado por JSON Schema que describe componentes, bindings, estilos, acciones y permisos. Es lo único que la IA puede generar y lo único que el runtime acepta renderizar. Sin lógica ejecutable arbitraria.
_Avoid_: Lenguaje, formato intermedio, markup

**Sandbox**:
Entorno aislado WebAssembly (WASM) donde se ejecutan extensiones de terceros con límites de CPU, memoria, tiempo y red, y un manifiesto de permisos explícitos.
_Avoid_: Plugin sandbox, isolation layer

### Multi-tenancy

**Tenant**:
Organización o cliente con datos, usuarios, sitios y configuraciones completamente aislados mediante Row-Level Security a nivel de base de datos.
_Avoid_: Organización, workspace, cuenta, cliente

**Platform role**:
Rol fijo de plataforma que determina qué puede hacer un usuario dentro de un tenant. Tres niveles: Admin (gestiona tenant, billing, usuarios), Editor (crea, edita y publica sites), Viewer (solo preview y comentarios).
_Avoid_: User role, permission group, user type

### Multi-agent factory

**Builder Agent**:
Agente de IA que genera componentes e integraciones.
_Avoid_: Constructor, generator

**Attacker Agent**:
Agente de IA que intenta escapar del sandbox, saltar permisos o exfiltrar datos. Rol adversarial en pruebas.
_Avoid_: Pentester, red team

**Defender Agent**:
Agente de IA que propone restricciones, políticas y tests de seguridad.
_Avoid_: Security agent, guard

**Auditor Agent**:
Agente de IA que verifica el modelo de amenazas y puede bloquear un release.
_Avoid_: Reviewer, QA agent

**Quality Gate**:
Puerta de validación que un cambio debe atravesar antes de avanzar: Producto, Técnica, Seguridad, Calidad y Humana.
_Avoid_: Checkpoint, stage gate, approval step

### Editor UI

**Canvas**:
Área central de preview WYSIWYG donde el usuario ve y manipula el resultado visual en tiempo real.
_Avoid_: Preview, viewport, stage

**Panel**:
Panel lateral que muestra propiedades editables, bindings de datos, acciones y permisos del componente seleccionado en el canvas.
_Avoid_: Sidebar, inspector, properties pane

**Section**:
Tipo especial de componente contenedor de layout (row, column, grid, flex) sin bindings de datos propios. Agrupa otros componentes y define su disposición espacial.
_Avoid_: Container, wrapper, layout block

### Publishing

**Publication state**:
Una página atraviesa tres estados: Draft (editable, no visible), Preview (compartible para revisión), Published (público, versión inmutable). Cada publicación crea una versión nueva.
_Avoid_: Publish status, workflow state

**Rollback**:
Reversión de una página a una versión anterior publicada. Opera a nivel de página individual.
_Avoid_: Revert, restore, undo deploy

**Feature flag**:
Toggle que activa/desactiva un componente o sección específica dentro de una página publicada, permitiendo despliegues graduales o A/B testing.
_Avoid_: Toggle, experiment, branch

### Extensibility

**Module**:
Funcionalidad empaquetada como parte oficial de la plataforma pero no cargada por defecto (ecommerce, membresías, multilenguaje). Instalable por tenant.
_Avoid_: Plugin oficial, addon, feature pack

**Extension**:
Código de terceros ejecutado en sandbox WebAssembly con un manifiesto de permisos explícitos y límites de recursos. La plataforma solo garantiza las capabilities declaradas en el manifiesto.
_Avoid_: Plugin, complemento, widget de terceros

**Adapter**:
Tipo específico de Module que traduce la interfaz de un Provider a una fuente externa concreta (WooCommerce, Shopify, Stripe).
_Avoid_: Connector, integración, bridge

**Marketplace**:
Catálogo global de extensiones sandboxed y modules oficiales disponibles para instalar por cualquier tenant.
_Avoid_: App store, plugin directory, registry

### Multi-agent factory (continued)

**Product Agent**:
Agente que convierte ideas, feedback de usuarios y métricas en historias de producto, criterios de aceptación y prioridades. No genera código ni componentes directamente.
_Avoid_: Spec agent, requirement agent

**Orchestrator Agent**:
Agente planificador que divide objetivos en tareas, las asigna a otros agentes, verifica dependencias y resuelve conflictos. Coordina la fábrica multiagente.
_Avoid_: Planner, dispatcher, coordinator

**Research Agent**:
Agente que analiza documentación, competidores, plugins y código existente. Produce hallazgos con fuentes y nivel de confianza.
_Avoid_: Investigator, analyst

**Architecture Agent**:
Agente que propone modelo de datos, APIs, contratos de componentes y decisiones técnicas. Emite ADRs para revisión humana.
_Avoid_: Tech lead agent, design agent

**Implementation Agent**:
Agente que desarrolla tareas aprobadas sobre contratos definidos, en ramas aisladas. Solo genera DSL y código que cumple los contratos.
_Avoid_: Coder agent, developer agent

**Testing Agent**:
Agente que crea y ejecuta tests unitarios, de integración, E2E, visuales, responsive y de accesibilidad.
_Avoid_: QA agent (conflicto con Auditor Agent), test runner

**Release Agent**:
Agente que prepara changelogs, migraciones, feature flags, rollback plans y checklists de release. No publica sin aprobación humana.
_Avoid_: Deploy agent, publish agent

**Feedback Agent**:
Agente que clasifica, agrupa y prioriza señales de usuarios (reviews, errores, tickets, telemetría) y las convierte en propuestas para el Product Agent.
_Avoid_: Support agent, triage agent

### Development flow

**Vertical Slice**:
Primer flujo funcional completo de la plataforma que atraviesa todas las capas (descripción → IA genera componente → edición visual → conexión a datos → preview responsive → publicación). Un demo end-to-end mínimo pero real.
_Avoid_: MVP, prototype, proof of concept
