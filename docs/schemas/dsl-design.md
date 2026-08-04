# DSL Design — Decisiones de diseño

## ¿Por qué un DSL declarativo y no código libre?

El DSL es **la frontera de confianza** del sistema. Si la IA generase JavaScript, TypeScript, o cualquier lenguaje con lógica ejecutable arbitraria:

- No podríamos validar estáticamente qué hace un componente
- La seguridad dependería de revisión humana o de LLM (frágil)
- Sería imposible garantizar permisos, aislamiento o portabilidad

El DSL resuelve esto al ser **puramente declarativo**: describe **qué**, no **cómo**. Sin bucles, sin condicionales, sin acceso a red, sin filesystem. Solo estructura, estilos, bindings y acciones autorizadas.

## Principios

### 1. Declarativo, no imperativo

```
// PROHIBIDO (código libre)
const price = await db.query("SELECT price FROM products WHERE id = ?", [productId]);

// CORRECTO (DSL declarativo)
"bindings": { "price": "product.price" }
```

El runtime — no el componente — decide cómo resolver `product.price`. Puede ser PostgreSQL, WooCommerce, un mock, o un caché. El componente no lo sabe ni necesita saberlo.

### 2. Validable en build-time y runtime

Todo componente pasa por `JSON Schema` antes de:

- Guardarse en la base de datos
- Renderizarse en el canvas del editor
- Publicarse en un site

Si no valida, se rechaza. Sin excepciones.

### 3. Versionado

Cada componente tiene `version` semántica. Cada `schema` tiene URI canónica. Esto permite:

- Migraciones entre versiones del schema
- Coexistencia de componentes v1 y v2 en el mismo site
- Rollback a versiones anteriores del componente

### 4. Sin lógica ejecutable

El DSL no contiene:

- ❌ JavaScript / TypeScript
- ❌ SQL
- ❌ GraphQL queries
- ❌ Expresiones condicionales (`if`, `switch`)
- ❌ Bucles (`for`, `while`, `map`)
- ❌ Acceso a red (`fetch`, `axios`)
- ❌ Acceso a filesystem
- ❌ `eval`, `new Function`

Solo contiene:

- ✅ Estructura (árbol de componentes)
- ✅ Estilos (CSS declarativo por breakpoint)
- ✅ Bindings (paths a campos de contratos de Provider)
- ✅ Acciones (invocaciones de capabilities con parámetros)
- ✅ Permisos (lista de capabilities requeridas)

### 5. Composición sobre herencia

Los componentes se componen mediante `children` y `slots`. No hay herencia de estilos, mixins, ni extends. Esto mantiene el modelo simple, predecible, y fácil de validar.

### 6. IA solo genera DSL

La política global del sistema es: la IA **solo** puede generar DSL validado por JSON Schema. Nunca código arbitrario. Esto se fuerza a nivel de system prompt (para el agente) y a nivel de runtime (para la ejecución).

## Decisiones de diseño específicas

### Slots vs Children

- **`children`**: lista plana de componentes hijos. Útil para componentes simples.
- **`slots`**: áreas nombradas con arrays de componentes. Útil para layouts con zonas semánticas (`header`, `main`, `footer`, `sidebar`).

Ambos coexisten. Un componente puede usar uno, otro, o ambos. El renderer decide cómo ubicarlos.

### Actions con parámetros bindeados

Las actions no contienen lógica. Solo declaran:

- Qué capability invocar (`cart.write`)
- Con qué parámetros (`product.id`, `quantity: 1`)
- Confirmación opcional
- Eventos de success/error

El runtime resuelve los bindings en los params antes de invocar la capability. Ejemplo:

```json
"params": { "productId": "product.id" }
```

El runtime lee `product.id` del provider, lo inyecta en la llamada a `cart.write(productId)`.

### Permissions como array de strings

Los permisos son una lista plana de capabilities. No hay herencia, roles, ni lógica booleana. Esto es deliberado:

- Simple de validar: el runtime itera la lista y verifica cada capability contra el catálogo
- Simple de auditar: un grep en el DSL muestra todas las capabilities usadas
- Sin edge cases: si una capability no está en la lista, no se puede usar

### $ref como composición (futuro)

El schema actual no incluye `$ref` en el JSON Schema formal, pero los ejemplos muestran referencias conceptuales (`"$ref": "./examples/hero-section.json#"`). Esto será implementado como un preprocesador del runtime que resuelve referencias antes de validar el árbol completo.

## Lo que el DSL NO hace (por diseño)

- No resuelve datos. Delega al runtime + capa de capabilities.
- No maneja estado. El estado es externo (Zustand en editor, URL/runtime en sitio publicado).
- No define rutas. Las rutas son propiedad de la Page, no del componente.
- No maneja autenticación. La auth es externa (Keycloak), el DSL solo declara capabilities.
- No define layouts de base de datos. Eso es responsabilidad de los adapters.
