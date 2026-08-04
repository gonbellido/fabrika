# ADR-0005: Modelo de seguridad basado en Capabilities

Los componentes no acceden a recursos directamente. Declaran capabilities requeridas. El runtime autoriza cada invocación contra el catálogo canónico y el scope del tenant/usuario.

## Contexto

Los sistemas tradicionales usan RBAC (Role-Based Access Control): un usuario tiene un rol, el rol tiene permisos. Pero en Fabrika, quien ejecuta acciones no es un usuario — es un **componente generado por IA**. No podemos asignar roles a componentes.

Necesitamos un modelo donde cada componente declare exactamente qué puede hacer, y el runtime lo fuerce. La investigación de seguridad muestra que el principio de mínimo privilegio es la defensa más efectiva contra componentes maliciosos o mal generados.

El plan técnico (§5) describe el catálogo de capabilities como capa de seguridad.

## Decisión

Modelo de Capabilities:

1. **Catálogo canónico fijo**: la plataforma define ~30 capabilities (catalog.read, cart.write, orders.read...). Ni adapters ni extensions pueden crear nuevas.
2. **Declaración por componente**: cada componente lista sus capabilities en `permissions: string[]`.
3. **Validación en runtime**: antes de ejecutar una acción, el runtime verifica que la capability está en los permisos del componente Y en el catálogo canónico.
4. **Scope enforcement**: cada capability tiene scope (Tenant, Usuario). El runtime fuerza que un componente con scope Usuario solo pueda acceder a datos de ese usuario.
5. **Auditoría**: toda invocación genera log inmutable.

## Alternativas consideradas

1. **RBAC tradicional (roles)**: Descartado. Los componentes no son usuarios. Asignar roles a componentes generados por IA es frágil.
2. **OAuth scopes**: Descartado. Demasiado genérico. No captura la semántica de negocio (catalog.read vs orders.read).
3. **Permisos por recurso (ACL)**: Descartado. Demasiado granular. Inmanejable con componentes generados dinámicamente.
4. **Capabilities dinámicas (extensiones definen las suyas)**: Descartado. Abre la puerta a capabilities mal definidas o con permisos excesivos.

## Consecuencias

- **Positivo**: Seguridad predecible. Un componente solo puede hacer lo que declara. Fácil de auditar (grep en el DSL). Sin escalada de privilegios.
- **Negativo**: El catálogo debe ser lo suficientemente completo para cubrir todos los casos de uso. Añadir una capability requiere release de plataforma.
- **Requiere**: Catálogo de capabilities bien documentado. Tests adversariales que intenten invocar capabilities no declaradas. Logs de auditoría.
