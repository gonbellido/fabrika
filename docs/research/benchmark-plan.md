# Benchmark Práctico — Plan de ejecución

## Objetivo

Comparar objetivamente la experiencia de construir la misma página de producto en las herramientas competidoras para identificar gaps, fortalezas y oportunidades de diferenciación para Fabrika.

## Escenario de prueba

**Página a construir**: Landing de producto con:

1. Hero section (imagen de fondo, título, subtítulo, CTA)
2. Grid de 6 productos (imagen, nombre, precio, valoración, botón "añadir al carrito")
3. Sección de features (3 columnas con icono, título, texto)
4. Formulario de newsletter (email + botón)
5. Footer con links y redes sociales

**Datos**: Usar datos mock/demo. No conectar a backend real.

## Herramientas a evaluar

| Herramienta           | Plan     | Precio mensual |
| --------------------- | -------- | -------------- |
| Elementor (WordPress) | Pro      | $59/año        |
| Webflow               | CMS      | $29/mes        |
| Wix Studio            | Standard | $22/mes        |
| Framer                | Pro      | $25/mes        |

## Métricas

### Durante la construcción

| Métrica                               | Cómo medirla                                      | Herramienta |
| ------------------------------------- | ------------------------------------------------- | ----------- |
| Tiempo hasta primer resultado visible | Cronómetro desde login hasta ver algo en pantalla | Manual      |
| Tiempo total de construcción          | Cronómetro total de la tarea                      | Manual      |
| Número de pasos/clicks                | Contar interacciones necesarias                   | Manual      |
| Errores encontrados                   | Registrar cada bloqueo, confusión o error         | Manual      |
| Curva de aprendizaje                  | Notas cualitativas sobre fricción inicial         | Manual      |
| Uso de templates predefinidos         | ¿Ofrece templates? ¿Cuánto ayudan?                | Manual      |
| Calidad del responsive out-of-the-box | Verificar en 3 breakpoints sin ajustes manuales   | Manual      |

### Resultado final

| Métrica                                    | Cómo medirla                        | Escala        |
| ------------------------------------------ | ----------------------------------- | ------------- |
| Fidelidad visual al diseño objetivo        | Comparación side-by-side            | 1-5           |
| Calidad responsive (desktop/tablet/mobile) | Verificar en 3 breakpoints          | 1-5           |
| Performance (Lighthouse score)             | Lighthouse audit                    | 0-100         |
| Peso de página (KB)                        | Browser devtools                    | KB            |
| HTML semántico                             | Inspeccionar estructura DOM         | 1-5           |
| Accesibilidad básica (contraste, headings) | Lighthouse + manual                 | 0-100         |
| SEO metadata presente                      | Inspeccionar `<head>`               | Sí/No         |
| ¿El resultado es portable/exportable?      | Intentar exportar el sitio          | Sí/No/Formato |
| ¿Puedo editar después sin romper nada?     | Modificar un componente y verificar | 1-5           |

## Metodología

1. **Mismo operador**: Una persona ejecuta las 4 pruebas para controlar la variable "skill"
2. **Mismo diseño de referencia**: Usar un diseño Figma simple como spec
3. **Sin preparación previa**: No ver tutorials antes de empezar. Solo usar la UI.
4. **Grabar pantalla**: Para revisar después y contar pasos/clicks
5. **No usar IA si la herramienta la ofrece**: Primero sin IA, luego repetir con IA para medir el delta

## Tareas específicas (checklist)

- [ ] Crear cuenta en cada plataforma
- [ ] Crear nuevo proyecto/site
- [ ] Elegir template o empezar desde cero
- [ ] Construir Hero section
- [ ] Construir Grid de productos
- [ ] Construir Features section
- [ ] Construir Newsletter form
- [ ] Construir Footer
- [ ] Ajustar responsive (desktop → tablet → mobile)
- [ ] Revisar y corregir en los 3 breakpoints
- [ ] Publicar/preview

## Hipótesis a validar

1. **Elementor será el más rápido para un usuario WP experimentado, pero el más lento para un nuevo usuario**
2. **Webflow tendrá la mejor fidelidad visual pero peor curva de aprendizaje**
3. **Wix Studio será el más rápido para empezar pero el menos flexible**
4. **Framer tendrá el mejor resultado visual pero el peor rendimiento**
5. **Ninguno permitirá exportar el resultado de forma portable y estructurada**

## Qué buscamos aprender para Fabrika

1. ¿Cuánto tiempo ahorra un template predefinido vs empezar desde cero?
2. ¿Qué tareas son universalmente lentas en todas las herramientas?
3. ¿Dónde está el punto de fricción al editar datos dinámicos?
4. ¿Cómo manejan el responsive? ¿Automático o manual?
5. ¿Qué hace que una herramienta se sienta "fácil" vs "potente"?
6. ¿Qué features de IA ofrecen y cómo de útiles son realmente?

## Resultados esperados

Completar la matriz de comparación y publicar en `docs/research/benchmark-resultados.md`.

## Tiempo estimado

~4 horas (1 hora por herramienta, incluyendo setup y documentación).
