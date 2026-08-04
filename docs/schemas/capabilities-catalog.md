# Catálogo de Capabilities v1

Cada capability es una operación de negocio autorizada con permiso mínimo. Los componentes solo pueden invocar capabilities — nunca acceder directamente a base de datos ni servicios externos.

## Formato

| Campo | Descripción |
|-------|-------------|
| ID | Identificador canónico (namespace.resource.action) |
| Permite | Qué operaciones autoriza |
| Prohíbe | Qué explícitamente NO permite (el runtime lo fuerza) |
| Scope | Ámbito de los datos accesibles |
| Default | Si está disponible por defecto para todos los tenants |

---

## Core (siempre disponible)

| ID | Permite | Prohíbe | Scope | Default |
|----|---------|---------|-------|---------|
| `media.read` | Leer archivos multimedia del tenant | Leer media de otro tenant. Escribir/modificar/borrar media | Tenant | Sí |
| `media.write` | Subir y reemplazar archivos multimedia | Borrar media. Acceder a media de otro tenant | Tenant | Sí |
| `user.read` | Leer perfil del usuario autenticado | Leer datos de otros usuarios. Leer credenciales/hashes | Usuario | Sí |
| `user.write` | Modificar perfil propio | Modificar otros usuarios. Cambiar roles | Usuario | Sí |
| `site.read` | Leer configuración del site | Leer sites de otro tenant | Tenant | Sí |
| `site.write` | Modificar configuración del site (nombre, dominio, SEO global) | Modificar sites de otro tenant | Tenant | Sí |

## Catalog (productos, categorías)

| ID | Permite | Prohíbe | Scope | Default |
|----|---------|---------|-------|---------|
| `catalog.read` | Leer productos y categorías publicados | Leer productos no publicados o de otro tenant. Modificar catálogo | Tenant | Sí |
| `catalog.write` | Crear y modificar productos y categorías | Borrar productos. Modificar catálogo de otro tenant | Tenant | No |
| `catalog.delete` | Borrar productos y categorías | Borrar productos con pedidos asociados. Borrar catálogo de otro tenant | Tenant | No |

## Cart (carrito de compra)

| ID | Permite | Prohíbe | Scope | Default |
|----|---------|---------|-------|---------|
| `cart.read` | Leer el carrito del usuario actual | Leer carritos de otros usuarios | Usuario | Sí |
| `cart.write` | Añadir, modificar cantidad, quitar items | Modificar carritos de otros usuarios. Aplicar descuentos manualmente | Usuario | Sí |

## Orders (pedidos)

| ID | Permite | Prohíbe | Scope | Default |
|----|---------|---------|-------|---------|
| `orders.read` | Leer pedidos del usuario actual | Leer pedidos de otros usuarios | Usuario | Sí |
| `orders.create` | Crear un pedido desde el carrito | Crear pedidos para otros usuarios. Modificar precios | Usuario | Sí |
| `orders.update` | Modificar estado del pedido (cancelar, etc.) | Modificar pedidos ya completados. Modificar pedidos de otros usuarios | Usuario | No |

## Content (páginas, entradas, contenido)

| ID | Permite | Prohíbe | Scope | Default |
|----|---------|---------|-------|---------|
| `content.read` | Leer páginas y entradas publicadas | Leer drafts no publicados. Leer contenido de otro tenant | Tenant | Sí |
| `content.write` | Crear y modificar páginas y entradas | Publicar sin pasar por el pipeline de publicación | Tenant | No |

## Forms (formularios y submissions)

| ID | Permite | Prohíbe | Scope | Default |
|----|---------|---------|-------|---------|
| `forms.read` | Leer configuraciones de formularios del site | Leer submissions con datos personales | Tenant | Sí |
| `forms.submit` | Enviar datos a un formulario | Leer submissions de otros usuarios. Modificar formularios | Usuario | Sí |
| `forms.submissions.read` | Leer submissions de formularios | Leer submissions de otro tenant. Leer datos de pago en submissions | Tenant | No |

## Users & Auth (gestión de usuarios del tenant)

| ID | Permite | Prohíbe | Scope | Default |
|----|---------|---------|-------|---------|
| `auth.login` | Autenticar usuario | Bypass MFA. Suplantar usuario | Usuario | Sí |
| `auth.register` | Registrar nuevo usuario en el tenant | Asignar roles. Crear admins | Usuario | Sí |
| `tenant.users.read` | Leer lista de usuarios del tenant | Leer credenciales. Leer usuarios de otro tenant | Tenant | No |
| `tenant.users.write` | Invitar, modificar roles, desactivar usuarios | Modificar admins sin ser admin. Modificar otro tenant | Tenant | No |

## Analytics & SEO

| ID | Permite | Prohíbe | Scope | Default |
|----|---------|---------|-------|---------|
| `analytics.read` | Leer métricas agregadas del site | Leer datos individuales de usuario. Leer analytics de otro tenant | Tenant | No |
| `seo.read` | Leer configuración SEO del site | Modificar SEO | Tenant | Sí |
| `seo.write` | Modificar metadata SEO, sitemap, robots | Modificar SEO de otro tenant | Tenant | No |

## Payments & Checkout

| ID | Permite | Prohíbe | Scope | Default |
|----|---------|---------|-------|---------|
| `payment.initiate` | Iniciar un pago | Acceder a datos de tarjeta completos. Modificar importe | Usuario | Sí |
| `payment.read` | Leer estado de pagos propios | Leer pagos de otros usuarios. Leer datos de tarjeta | Usuario | Sí |
| `checkout.process` | Ejecutar el flujo de checkout completo | Modificar precios. Saltar validación de stock | Usuario | Sí |

## Customers (clientes en ecommerce)

| ID | Permite | Prohíbe | Scope | Default |
|----|---------|---------|-------|---------|
| `customers.read` | Leer perfil del cliente actual | Leer clientes de otro tenant | Usuario | Sí |
| `customers.write` | Modificar datos del perfil propio | Modificar otros clientes. Modificar pedidos | Usuario | Sí |

---

## Reglas del catálogo

1. **Inmutabilidad de catálogo**: Las capabilities son definidas por la plataforma. Ni adapters ni extensions pueden crear nuevas capabilities. Solo pueden usar las existentes.
2. **Principio de mínimo privilegio**: Un componente declara solo las capabilities que necesita. El runtime rechaza cualquier invocación no declarada.
3. **Auditabilidad**: Toda invocación de capability genera un log con: timestamp, tenant, usuario, componente, capability, parámetros (sin datos sensibles), y resultado.
4. **Rate limiting por capability**: Cada capability tiene límites de frecuencia configurables por tenant.
5. **Scope enforcement**: El runtime fuerza el scope declarado. Si una capability tiene scope `Usuario`, el runtime inyecta el `user_id` del token — el componente no puede especificar otro usuario.
