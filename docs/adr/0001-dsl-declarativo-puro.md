# ADR-0001: DSL declarativo puro como única salida de IA

El DSL (Domain-Specific Language) de Fabrika es JSON validado por JSON Schema. No contiene lógica ejecutable: no JavaScript, no SQL, no GraphQL, no expresiones condicionales, no bucles.

## Contexto

La IA generativa puede producir código arbitrario. Si usamos un LLM para generar componentes y le permitimos generar JavaScript, TypeScript, SQL o cualquier lenguaje con lógica ejecutable, la seguridad depende exclusivamente de la revisión del LLM y del humano — ambos falibles.

La investigación de plugins de WordPress confirma que el 62% de las vulnerabilidades de WordPress vienen de plugins con acceso total al sistema. El modelo de seguridad de Fabrika debe prevenir esto por diseño, no por revisión.

## Decisión

La IA solo puede generar DSL JSON validado contra `component-v1.schema.json`. El DSL describe estructura, estilos, bindings a Providers, acciones sobre Capabilities, y permisos requeridos. No contiene lógica ejecutable.

El runtime — no el componente — decide cómo resolver bindings, ejecutar acciones, y renderizar.

## Alternativas consideradas

1. **Permitir JavaScript/TypeScript generado por IA**: Descartado. Imposible garantizar seguridad. Requiere revisión humana de cada línea. Rompe la frontera de confianza.
2. **GraphQL inline en el DSL**: Descartado. GraphQL es un lenguaje de query con lógica (filtros, joins, paginación). Introduce complejidad de validación y posibles ataques de inyección.
3. **Templates tipo Liquid/Handlebars**: Descartado. Son lenguajes de template con lógica limitada pero ejecutable (condicionales, bucles). No ofrecen la seguridad del DSL puramente declarativo.

## Consecuencias

- **Positivo**: Seguridad garantizada por diseño. El DSL es validable estáticamente. Portable entre runtimes. Versionable.
- **Negativo**: Menos flexibilidad que código libre. La IA debe aprender a generar DSL válido (mitigado con system prompts y JSON Schema en el contexto). Ciertos patrones de UI dinámica requieren componentes predefinidos.
- **Requiere**: System prompt estricto para el LLM. Validador JSON Schema en el editor y en el runtime. Catálogo de componentes predefinidos para patrones comunes.
