# ADR-0004: WebAssembly (WASM) sandbox para extensiones

Las extensiones de terceros se ejecutan en un sandbox WebAssembly con un manifiesto de permisos explícitos y límites de recursos.

## Contexto

El ecosistema de plugins es la principal fortaleza y la principal debilidad de WordPress. La investigación de plugins muestra que el 62% de las vulnerabilidades vienen de plugins de terceros con acceso total al sistema. Un plugin malicioso o vulnerable puede leer la base de datos, modificar archivos, ejecutar código arbitrario.

Ningún competidor ofrece un modelo de extensiones verdaderamente aislado. WordPress tiene acceso total. Webflow no tiene extensiones de terceros. Shopify tiene un modelo de apps con permisos pero sin sandbox a nivel de ejecución.

El plan técnico (§7) especifica WASM como tecnología de sandbox.

## Decisión

Las extensiones de terceros se ejecutan en WebAssembly (WASM) con:

- **Manifiesto de permisos**: declara capabilities requeridas (ej: `["catalog.read"]`)
- **Límites de recursos**: CPU (ms), memoria (MB), walltime (ms)
- **Sin red por defecto**: `"network": "none"` a menos que se declare explícitamente
- **Sin acceso a filesystem**: solo memoria volátil dentro del sandbox
- **Firma criptográfica**: cada extensión está firmada, el runtime verifica la firma

El runtime WASM (wasmtime) expone solo las capabilities autorizadas en el manifiesto. Cualquier intento de acceder a recursos no declarados resulta en terminación del sandbox.

## Alternativas consideradas

1. **Plugins con acceso total (modelo WordPress)**: Descartado. Es exactamente el problema que queremos resolver.
2. **Serverless functions (AWS Lambda/Cloudflare Workers)**: Descartado. No ofrecen aislamiento de recursos a nivel de CPU/memoria. Más caras de operar. Vendor lock-in.
3. **Contenedores Docker por extensión**: Descartado. Demasiado pesados. Tiempo de arranque alto. No ofrecen límites de CPU/memoria tan finos como WASM.

## Consecuencias

- **Positivo**: Seguridad por diseño. Las extensiones no pueden escapar del sandbox. Límites de recursos predecibles. Portable (WASM corre en cualquier runtime).
- **Negativo**: Los desarrolladores de extensiones deben compilar a WASM (Rust, C, AssemblyScript...). No pueden usar JavaScript/TypeScript directamente. Curva de aprendizaje para el ecosistema de extensiones.
- **Requiere**: SDK para crear extensiones WASM. wasmtime runtime en el backend. Validador de firmas. Manifiesto de permisos bien documentado.
