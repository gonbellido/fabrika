# ADR-0003: PostgreSQL + Row-Level Security para multi-tenancy

El aislamiento entre tenants se implementa a nivel de base de datos con Row-Level Security (RLS) en PostgreSQL.

## Contexto

La plataforma es multi-tenant: cada organización/cliente tiene sus propios datos, usuarios, sites y configuraciones. Un fallo de aislamiento entre tenants es catastrófico: fuga de datos de clientes, pérdida de confianza, implicaciones legales.

La investigación de competidores muestra que WordPress no tiene multi-tenancy nativo (requiere plugins como WP Multisite, que no aíslan realmente los datos). Webflow y Wix son single-tenant por diseño.

El plan técnico (§6) especifica RLS como requisito no funcional.

## Decisión

Usar PostgreSQL con Row-Level Security:

- Cada tabla de negocio tiene columna `tenant_id`
- Políticas RLS: `USING (tenant_id = current_setting('app.current_tenant_id')::uuid)`
- La aplicación establece `app.current_tenant_id` al inicio de cada sesión/request
- RLS actúa como **última línea de defensa**: aunque la capa de capabilities falle, PostgreSQL no devuelve datos de otro tenant

## Alternativas consideradas

1. **Base de datos por tenant**: Descartado. Mayor complejidad operativa, backups, migraciones. Dificulta features cross-tenant (marketplace, templates compartidos).
2. **Schema por tenant**: Descartado. Similar complejidad que DB por tenant. PostgreSQL tiene límites prácticos de schemas.
3. **Aislamiento solo a nivel de aplicación**: Descartado. Un bug en la capa de aplicación expone datos de todos los tenants. Sin defensa en profundidad.

## Consecuencias

- **Positivo**: Aislamiento garantizado a nivel de BD. Defensa en profundidad. Operativamente simple (una BD que manejar). PostgreSQL RLS es maduro y battle-tested.
- **Negativo**: Cada query incluye `tenant_id`. No se puede hacer queries cross-tenant sin bypass explícito (admin panel requiere `tenant_id = ANY(...)`). Overhead mínimo de RLS (<1% en benchmarks).
- **Requiere**: Políticas RLS en todas las tablas de negocio. Middleware que establezca `app.current_tenant_id`. Tests que verifiquen que un tenant no puede leer datos de otro.
