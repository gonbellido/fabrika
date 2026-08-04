# ADR-0002: Provider/Adapter pattern para capa de datos

Los componentes no acceden directamente a bases de datos ni APIs externas. Declaran qué Provider necesitan mediante bindings a contratos tipados. Un Adapter traduce ese contrato a una fuente concreta.

## Contexto

La investigación de competidores muestra que el principal factor de lock-in en WordPress es WooCommerce + ACF: los datos están acoplados al CMS. Migrar requiere reimplementar toda la lógica de negocio.

Webflow y Wix no permiten cambiar de backend sin reconstruir el sitio. Shopify te obliga a usar su backend.

Fabrika necesita que los componentes sean independientes de la fuente de datos. Si un usuario empieza con WooCommerce y luego migra a Shopify, el componente no debería cambiar.

## Decisión

Implementar el patrón Provider/Adapter:

- **Provider**: contrato tipado que define qué datos expone una fuente (CatalogProvider, CartProvider, OrdersProvider...)
- **Binding**: conexión declarativa entre una propiedad del componente y un campo del Provider (`"title": "product.name"`)
- **Adapter**: traductor entre un Provider y una fuente concreta (WooCommerceAdapter, ShopifyAdapter, PostgresAdapter...)

Los adapters **solo traducen datos**. No pueden iniciar conexiones salientes, almacenar secrets, ni acceder a otros tenants.

## Alternativas consideradas

1. **Data Hub centralizado con GraphQL**: Descartado. Introduce un punto único de fallo, dificulta el aislamiento multi-tenant, y añade complejidad de resolución de queries.
2. **Acceso directo a base de datos desde componentes**: Descartado. Viola el principio de mínimo privilegio. Los componentes no deben saber si los datos vienen de PostgreSQL, WooCommerce o un mock.
3. **ORM acoplado a componentes**: Descartado. Acopla el frontend al modelo de datos. Impide cambiar de backend.

## Consecuencias

- **Positivo**: Portabilidad de datos. Cambiar de WooCommerce a Shopify no requiere tocar componentes. Testabilidad (mock providers).
- **Negativo**: Cada nueva fuente de datos requiere un adapter nuevo. Los adapters deben mantenerse sincronizados con APIs externas.
- **Requiere**: Catálogo de Providers bien definido. SDK para crear adapters. Tests de contrato para cada adapter.
