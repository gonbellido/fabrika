# Mapa de Oportunidades — Fabrika

> Fecha: 2026-08-04
> Fuentes sintetizadas: plugins-wordpress.md, competidores.md, freelancer-personas.md

---

## 1. Resumen ejecutivo

El ecosistema WordPress genera $0 en revenue para sus usuarios pero les cuesta cientos de horas en mantenimiento, seguridad y compatibilidad. La investigación revela un mercado de freelancers y agencias (representado por Diego, Carmen, Lucía y Estudio Línea) que sufre cuatro dolores estructurales — fatiga de plugins, fragilidad de WooCommerce, ansiedad de seguridad y falta de multi-tenancy real — que ningún competidor resuelve de forma integrada. Webflow es caro y sin ecommerce, Shopify es solo tiendas, Elementor depende de WordPress, y Framer/Wix tienen lock-in total. Los 12 page builders con 38M+ instalaciones activas demuestran que la edición visual es el beachhead. La ausencia total de agentes de IA en el ecosistema WordPress (cero plugins entre los top 50) y la inexistencia de multi-tenancy nativo en cualquier competidor confirman dos océanos azules. Fabrika puede posicionarse como "la plataforma que WordPress querría ser si se reconstruyera hoy": seguridad arquitectónica, editor visual superior, ecommerce nativo sin comisiones, multi-tenancy para agencias, y fábrica multi-agente de IA como diferenciador estructural.

---

## 2. Matriz de oportunidades

| Oportunidad | Evidencia | Competidores que NO la cubren | Dificultad | Diferenciación | Prioridad |
|---|---|---|---|---|---|
| **Editor visual nativo superior a Elementor** + Canvas + Panel integrado en la plataforma (no como plugin) | 12 page builders con 38M+ installs; Diego dice "sin luchar contra la herramienta" es deal-breaker; Lucía necesita "pixel-level control"; Elementor genera código de baja calidad y DOM pesado | WordPress (Gutenberg es inferior), Shopify (editor limitado), Bubble (diseño mediocre), Wix (no pixel-perfect) | Media — requiere inversión fuerte en UX/rendimiento del Canvas | Muy Alta — es el beachhead. Ningún competidor tiene editor visual + seguridad + ecommerce en una sola plataforma | 1 |
| **Multi-tenancy real para agencias** — dashboard único, RBAC fino, white-label, gestión centralizada de todos los clientes | Estudio Línea gasta 80+ hrs/mes en mantenimiento multi-site; Carmen gestiona 14 tiendas con 14 logins distintos; Martín dice que es "deal-breaker"; NADIE lo tiene bien (Webflow lo cobra a $2,500/mes) | Webflow (solo en plan Team $2,500/mes), Elementor (sin multi-tenancy), Shopify (sin gestión multi-cliente real), Framer (una cuenta = un workspace) | Alta — requiere arquitectura multi-tenant desde el día 0 con RLS | Muy Alta — es el océano azul más grande. Diferencia estructural, no feature  | 2 |
| **Seguridad arquitectónica como fundamento** (WASM sandboxing, Capabilities, sin plugins ejecutables) | 5 plugins de seguridad con 17M+ installs; Diego fue hackeado 2 veces; Estudio Línea tuvo 2 incidentes de seguridad ($3-5K c/u); Carmen teme Magecart; "Security is the wedge" (personas) | WordPress (seguridad es responsabilidad del usuario), Elementor (hereda vulnerabilidades WP), Wix (cerrado pero sin sandboxing de extensiones), Shopify (depende de apps third-party) | Media — la arquitectura WASM + Capabilities es compleja de implementar pero el concepto ya está diseñado | Muy Alta — elimina 17M+ installs de plugins. Es el argumento de venta más fuerte para el migrante traumado por hacks | 3 |
| **Ecommerce nativo sin comisiones** — productos, variantes, carrito, checkout, pagos, shipping como Module oficial | WooCommerce tiene 7M+ installs y lock-in "muy alto"; Carmen paga $200+/año solo en WPML+WooCommerce; Shopify cobra 2.1-2.9% + $0.30 por transacción; Lucía dice que no hay "middle ground" entre Shopify caro y WooCommerce frágil | Webflow (sin ecommerce nativo), Framer (sin ecommerce), Elementor (depende de WooCommerce heredando sus problemas) | Muy Alta — replicar el ecosistema WooCommerce (1,800+ extensiones) es el mayor desafío técnico | Alta — es "el Everest". Sin ecommerce, el TAM se limita a sitios no-comerciales | 4 |
| **Migración WordPress → Fabrika** con adaptadores de contenido, productos, usuarios y diseño | Diego: "Migration path — can I bring existing WordPress content over?"; Carmen: "Migration from WooCommerce" es medium priority; Estudio Línea: lo pone como medium; WP lock-in tiers: ACF, WooCommerce, WPML son muy difíciles de migrar | Ningún competidor ofrece migración desde WordPress (Webflow no, Framer no, Wix no) | Alta — requiere parsers de shortcodes (Elementor, WPBakery), mapeo de WP post_meta, migración de WooCommerce (productos, órdenes, clientes) | Muy Alta — "Migration is the make-or-break". Sin herramienta de migración, la barrera psicológica es enorme | 5 |
| **Multilingual nativo sin penalización de rendimiento** | WPML+WooCommerce cuesta $200+/año; Carmen dice que el rendimiento cae 40-60% con WPML; Lucía necesita sitios multilingües; 2 plugins con 1.7M+ installs; Lock-in Tier 2 | Webflow Localize ($9-29/mes add-on), Shopify Markets ($59/mes por mercado extra), Framer (localization con IA pero sin ecommerce), Elementor (depende de WPML/Polylang) | Alta — el modelo de "language variants at Page level" + traduction provider es distinto a cómo WPML duplica contenido | Alta — para el mercado hispano (Carmen, Diego) y europeo (Estudio Línea) es imprescindible | 6 |
| **Capacidades dinámicas sin código ni ACF** — Providers + Adapters como capa de datos declarativa | Diego: "Dynamic data requires heavy lifting" (ACF + CPTs); ACF tiene 2M+ installs y lock-in "muy alto"; Lucía: "Dynamic content is limited" en Webflow; Estudio Línea: Providers y Adapters son clave | WordPress (ACF es el estándar pero acoplado a post_meta), Webflow (CMS plano, 20K items máx), Framer (10 colecciones, sin queries reales), Bubble (app builder, no web builder) | Media — el concepto de Provider contract + Adapter ya está diseñado, requiere implementar los contracts core | Alta — "Nadie tiene una abstracción tipada y declarativa para conectar fuentes de datos" | 7 |
| **Fábrica multi-agente de IA** como plataforma, no como feature de checklist | 0 plugins de IA entre los top 50 de WordPress; competidores tienen features IA sueltas (AI site builder, AI copy) pero ningún competidor tiene sistema multi-agente (Builder, Attacker, Defender, Auditor). "This is Fabrika's greenfield advantage" | Webflow (AI builder/copy/SEO — asistente, no fábrica), Shopify (Sidekick — asistente, no multi-agente), Framer (Agents — el más cercano pero solo diseño, sin seguridad/auditoría), Elementor (AI con créditos, básico) | Alta — construir agentes que colaboren entre sí es complejo | Muy Alta — es el diferenciador más novedoso y el que ningún competidor puede copiar rápido | 8 |
| **Preview + publicación con roles** (draft → preview → published, sin que el cliente rompa nada) | Diego: "No real preview workflow"; Lucía: "Client handoff is worse than WordPress"; Estudio Línea: necesita "white-label client experience"; todos los freelancers mencionan el dolor del cliente rompiendo el diseño | WordPress (revisiones son clunky, sin preview link fácil), Webflow (Editor access puede romper cosas), Elementor (sin staging nativo, depende del hosting) | Baja — es un feature de workflow, no un cambio arquitectónico | Media — mejora la experiencia pero no es diferenciación radical; todos los competidores pueden copiarlo | 9 |
| **Pricing predecible sin "muerte por mil plugins"** | Diego: "One predictable monthly price, not death by a thousand plugin renewals"; Carmen: "Plugin licensing is a nightmare to track" (spreadsheet para 15 plugins × 14 tiendas); Estudio Línea: tracking 35 sites × 15 plugins = 525 licencias; Plugin fatigue es trigger #2 de migración | WordPress (gratis pero el TCO real es alto), Shopify (comisiones ocultas + apps que suman), Webflow (caro por sitio, $2,500/mes Team), Wix (pricing por sitio escala rápido) | Baja — es una decisión de modelo de negocio | Alta — "Sin revenue share, sin comisiones. Suscripción plana con ecommerce ilimitado." Rompe el modelo mental del freelancer | 10 |
| **Componentes + Templates reutilizables** con DSL abierto y portable | Estudio Línea: quiere "reusable templates and modules across agency projects", consistencia entre proyectos; Diego: empieza proyectos desde templates; ACF flexible content es "custom snowflake" por sitio; "No consistency across projects" | Webflow (templates pero lock-in), Elementor (cloud templates pero formato propietario shortcode), Framer (componentes pero sin exportación) | Media — requiere diseñar el DSL JSON Schema y el marketplace de templates | Alta — el DSL declarativo abierto es único. "NADIE en el mercado ofrece esto" | 11 |

---

## 3. Top 10 capacidades a construir primero

Basado en qué funcionalidad es más esencial para que un freelancer WordPress migre a Fabrika, ordenado por impacto en la decisión de switch:

| # | Capacidad | Plugin(s) que reemplaza | Installs que cubre | Por qué es prioridad esta |
|---|---|---|---|---|
| 1 | **Canvas + Panel (editor visual drag-and-drop)** | Elementor, WPBakery, Divi, Beaver Builder, Gutenberg, Spectra, SeedProd, Essential Addons, ElementsKit, Slider Revolution | ~38M+ | Es el beachhead. Sin editor visual superior a Elementor, ningún freelancer considera migrar. Diego dice que es "deal-breaker". Es lo que el freelancer toca 90% del tiempo. |
| 2 | **Componentes + Templates (DSL declarativo)** | Advanced Custom Fields (2M+), layouts, themes | ~2M+ | Reemplaza ACF (lock-in tier 1) y elimina la necesidad de CPTs/post_meta. Permite a Lucía construir design systems y a Estudio Línea tener consistencia entre proyectos. |
| 3 | **Autenticación, RBAC y permisos multi-rol** | Wordfence (5M+), Limit Login Attempts (1M+), user role plugins | ~6M+ | Sin roles finos (cliente editor vs. admin), el cliente rompe el diseño y el freelancer sigue atado al soporte. Diego, Lucía y Estudio Línea lo mencionan como necesidad crítica. |
| 4 | **Formularios nativos con lógica condicional** | Contact Form 7 (10M+), WPForms (5M+), Gravity Forms (1M+), Forminator (500K) | ~16.5M+ | Es la funcionalidad más ubicua. Todo sitio tiene formularios de contacto. La lógica condicional + Actions + Capabilities reemplaza 4 plugins de una vez. |
| 5 | **SEO integrado (metadata, sitemaps, schema, redirects)** | Yoast SEO (10M+), Rank Math (4M+), AIOSEO (3M+), Redirection (2M+) | ~19M+ | SEO es imprescindible para todo sitio profesional. Sin SEO built-in, el freelancer buscará un plugin — y si necesita plugins, ¿para qué migrar de WordPress? |
| 6 | **Media library con optimización automática** | Smush (1M+), media management plugins | ~1M+ | Imágenes optimizadas (WebP/AVIF, lazy loading, responsive sizes) afectan el Core Web Vitals. Performance es prioridad alta para Diego y Carmen. |
| 7 | **Módulo Ecommerce (productos, variantes, carrito, checkout, pagos)** | WooCommerce (7M+), WooCommerce Subscriptions (500K+), WooCommerce Bookings (200K+), Product Add-Ons (100K+) | ~7.8M+ | Sin ecommerce, Carmen y cualquier freelancer que haga tiendas no pueden migrar. Es el lock-in más alto. Prioridad 7 porque requiere que 1-6 funcionen primero como base. |
| 8 | **Sistema de publicación (draft → preview → published) + rollback** | SeedProd (1M+, coming soon), backup plugins | ~1M+ | El workflow de publicación con preview link y rollback elimina la ansiedad del "cliente ve el sitio a medio hacer" (dolor de Diego y Lucía) y el miedo a romper algo en producción. |
| 9 | **Analytics dashboard integrado** | MonsterInsights (2M+), Site Kit by Google (5M+) | ~7M+ | Analytics es esperado en cualquier plataforma profesional. No es diferenciador pero su ausencia se nota. Baja complejidad, alto valor percibido. |
| 10 | **Gestión de cookies y consentimiento GDPR** | CookieYes (1M+) | ~1M+ | Requisito legal en Europa. Baja complejidad de implementación. Si no está, el freelancer europeo no puede usar la plataforma legalmente. |

**Lógica de ordenamiento:** Las capacidades 1-6 son el **núcleo mínimo viable** que hace que un freelancer WordPress considere Fabrika como alternativa real. Sin ellas, la plataforma es "WordPress pero peor". Las capacidades 7-10 amplían el TAM a ecommerce y mercados regulados, pero dependen de que el núcleo funcione.

---

## 4. Posicionamiento recomendado

### vs. WordPress + WooCommerce
**"El 43% de la web no puede estar equivocado. Pero 20 años de parches sí."** WordPress es la navaja suiza que se volvió un cajón de cubiertos oxidados. Fabrika ofrece lo mismo (web + ecommerce + blogging + SEO) pero reconstruido desde cero con seguridad arquitectónica, sin plugins que actualizar, sin noches de debugging por conflictos de compatibilidad, y con un editor visual que hace que Elementor parezca del 2016. Para el freelancer que ama lo que WordPress le da pero odia lo que le quita (tiempo, sueño, fines de semana), Fabrika es el upgrade natural.

### vs. Elementor
**"El mejor editor drag-and-drop del mercado WordPress. Imagínalo sin WordPress."** Elementor es brillante en lo que hace, pero está encadenado a un CMS que no fue diseñado para edición visual. El resultado: sitios lentos, código basura, y vulnerabilidades heredadas. Fabrika toma la experiencia de edición que los usuarios de Elementor aman y la ejecuta sobre una arquitectura moderna donde el rendimiento y la seguridad no son plugins — son el fundamento. No es "otro page builder". Es la plataforma que hace que los page builders sean innecesarios.

### vs. Webflow
**"El control de diseño de Webflow, sin su precio de agencia ni su curva de aprendizaje de 4 meses."** Webflow es aspiracional — el Ferrari de los builders. Pero cobra como Ferrari y requiere un mecánico especializado. Fabrika compite en el mismo segmento profesional pero con tres ventajas: (1) ecommerce nativo sin integraciones externas, (2) multi-tenancy real a precio de suscripción plana — no $2,500/mes, y (3) una curva de aprendizaje de días, no meses. Webflow es para diseñadores que quieren ser developers. Fabrika es para freelancers y agencias que quieren entregar resultados y cobrar.

### vs. Shopify
**"Shopify es el rey del ecommerce. Pero tu cliente también necesita una web, un blog, y un portfolio."** Shopify hace una cosa y la hace bien: vender. Pero el 80% de los clientes de un freelancer necesitan web + tienda, no solo tienda. Y cada venta en Shopify tiene un impuesto oculto (2.1-2.9% + apps + markets). Fabrika ofrece ecommerce nativo sin comisiones + la web corporativa que Shopify no sabe hacer + diseño visual que el Online Store editor de Shopify envidia. Para el freelancer que construye la presencia digital completa de un negocio, no solo su canal de ventas.

### vs. Framer
**"Framer hace las landing pages más bonitas del mundo. Fabrika hace el negocio entero."** Framer es un estudio de diseño convertido en builder. Sus sitios son visualmente impresionantes, pero ahí termina la historia: sin ecommerce, sin backend, sin multi-tenancy, y con un lock-in total. Fabrika compite en calidad de diseño pero añade todo lo que Framer no tiene: datos dinámicos, catálogo de productos, pagos, gestión de clientes, y portabilidad real. Para cuando el proyecto necesita más que una landing page.

### vs. Wix Studio
**"Wix te da todo... y te lo quita si quieres irte."** Wix tiene el lock-in más agresivo del mercado (10/10). Ni siquiera puedes exportar HTML. Fabrika se posiciona como el opuesto: DSL abierto, componentes portables, exportación real, y la capacidad de llevar tu sitio a tu propia infraestructura. Para agencias y clientes que valoran la independencia tanto como la funcionalidad, Fabrika es la opción ética frente al jardín amurallado de Wix.

### vs. Bubble
**"Bubble es para founders que construyen apps. Fabrika es para freelancers que construyen negocios digitales."** No competimos. Distintos mercados, distintos usuarios, distintos problemas. Bubble resuelve "cómo construir un SaaS sin programar". Fabrika resuelve "cómo construir y mantener sitios web profesionales sin volverte loco". Si un freelancer abre Bubble pensando que es un builder de webs, huye en 10 minutos.

---

## 5. Riesgos y contraargumentos

### Riesgos estratégicos

1. **Inercia de WordPress.** 43% de la web, 20 años de existencia, comunidad masiva, tutoriales en cada idioma. "Better is not enough — must be 10x better" para vencer la inercia. El freelancer que ya sabe WordPress no migra por curiosidad; migra por dolor extremo. Si Fabrika es solo "mejor", no es suficiente.

2. **WooCommerce es un agujero negro de complejidad.** Replicar el ecosistema WooCommerce (1,800+ extensiones, 7M+ installs, integraciones con ERPs, pasarelas de pago, impuestos, envíos) es un proyecto de años. Mientras tanto, Shopify avanza con Sidekick y Agentic Storefronts. El riesgo: empezar el módulo ecommerce y no terminarlo nunca a un nivel competitivo.

3. **Los competidores no están quietos.** Webflow está construyendo Webflow Cloud (backend apps, SQLite, KV, object storage). Framer está invirtiendo en External Agents. Shopify añade features de IA cada trimestre. Wix Studio tiene recursos ilimitados. Si Fabrika tarda 3 años en llegar a feature-parity, los competidores ya habrán cerrado los gaps.

4. **El modelo multi-agente de IA puede ser prematuro.** Es el diferenciador más novedoso, pero también el más difícil de explicar y vender. Un freelancer que quiere hacer webs para dentistas no entiende "fábrica multi-agente con Builder, Attacker, Defender y Auditor agents". Corre el riesgo de ser "too clever by half" — impresionante en whitepapers, irrelevante en demos de venta.

5. **Dependencia del mercado hispano.** Las personas (Diego, Carmen, Estudio Línea) están fuertemente ancladas en el mercado español/latino. Si Fabrika apuesta todo a la localización temprana (español, Redsys, Bizum), limita el TAM inicial y puede percibirse como "plataforma regional" en vez de "plataforma global".

### Contraargumentos que un escéptico haría

1. **"WordPress es suficientemente bueno."** El freelancer promedio ya resolvió sus dolores con workarounds (Managed hosting, ManageWP, plantillas de plugins probados). No sufre lo suficiente para arriesgar su negocio migrando 30 sitios a una plataforma nueva sin track record.

2. **"El mercado de page builders ya está saturado."** Webflow, Framer, Wix, Elementor, Beaver Builder, Divi, Squarespace... ¿otro más? La diferenciación en papel es fácil; en ejecución, todos acaban convergiendo en features similares.

3. **"Sin plugin ecosystem, los freelancers se quedan cortos."** WordPress tiene 59,000 plugins. Cada freelancer tiene su stack de plugins probados y de confianza. ¿Fabrika va a construir todos esos features ella misma? ¿O va a depender de un marketplace de módulos/adaptadores que tardará años en poblarse?

4. **"La seguridad arquitectónica es un feature que nadie pagaría."** Los freelancers no compran seguridad — compran "que no me hackeen". Y creen que un buen hosting + Wordfence + backups es suficiente. Vender "WASM sandboxing + Capability model" a alguien que instala plugins con un click es un problema de messaging enorme.

5. **"Migrar es demasiado arriesgado."** Si algo sale mal en la migración de 200 productos WooCommerce, 500 posts, datos de clientes, SEO history y URLs... el freelancer pierde al cliente. ¿Qué garantía hay de que la migración funciona? Sin un track record de cientos de migraciones exitosas, la respuesta racional es no migrar.

6. **"Si Fabrika desaparece, ¿qué pasa con mis sitios?"** Es la pregunta que todo freelancer se hará. Aunque Fabrika ofrezca portabilidad y DSL abierto, la desconfianza hacia una startup vs. WordPress (que no "desaparece" porque es open source) es una barrera racional.

---

## 6. Métricas de validación

Para demostrar que la oportunidad es real, no una hipótesis de investigación, se deben validar las siguientes métricas antes de construir:

### Métricas de problema (¿el dolor es real?)

| Métrica | Cómo medirla | Hipótesis a validar | Fuente en la investigación |
|---|---|---|---|
| **Horas/mes gastadas en mantenimiento de plugins** | Encuesta a 100+ freelancers WordPress | >10 horas/mes en updates, security patches, compatibilidad | Diego: "2-3 horas por sitio por mes"; Estudio Línea: "80+ horas/mes para 35 sitios" |
| **Incidentes de seguridad en últimos 2 años** | Encuesta: "¿Te han hackeado un sitio en los últimos 2 años?" | >40% respuesta positiva | Diego: hackeado 2 veces; Estudio Línea: 2 incidentes graves ($3-5K c/u) |
| **Número de plugins activos por sitio** | Muestra de sitios de freelancers objetivo | Media >15 plugins por sitio | Diego: "15-25 plugins"; Carmen: "8-15 premium plugins"; Estudio Línea: "35 sitios × ~15 plugins" |
| **Costo mensual real en herramientas (TCO)** | Encuesta con desglose: hosting, plugins, themes, SaaS, seguridad | >$200/mes para freelancer individual; >$1,000/mes para agencia | Diego: $150-250/mes; Carmen: $300-500/mes; Estudio Línea: $1,200-2,000/mes |
| **Tasa de sitios que fallan tras updates de plugins** | Encuesta: "En el último año, ¿cuántas veces un update de plugin rompió un sitio?" | >3 incidentes/año | Plugin fatigue es trigger #2 de migración; Diego: "A single update breaks a layout" |
| **Clientes que han roto el diseño editando contenido** | Encuesta: "¿Alguna vez un cliente rompió algo que tuviste que arreglar fuera de horario?" | >70% respuesta positiva | Diego: "WhatsApp at 10pm fixing things"; Lucía: "Client handoff is worse than WordPress"; Carmen: "2-hour training sessions" |

### Métricas de solución (¿la propuesta de valor resuena?)

| Métrica | Cómo medirla | Hipótesis a validar |
|---|---|---|
| **Intención de cambio** | Encuesta post-demo: "En una escala 1-10, ¿qué probabilidad hay de que migrarías tus sitios a esta plataforma en los próximos 12 meses?" | >30% responden 7+ |
| **Disposición a pagar (WTP)** | Van Westendorp Price Sensitivity Meter con freelancers objetivo | Punto de precio óptimo >$29/mes (para competir con Webflow Basic $15-25 y Elementor Agency $299/año) |
| **Feature must-have vs. nice-to-have** | Conjoint analysis o MaxDiff con las 10 capacidades prioritarias | Editor visual, seguridad, multi-tenancy y ecommerce en el top 5 de must-have |
| **Tasa de conversión de waitlist a trial** | Landing page con waitlist + demo grabada | >15% de registrados en waitlist inician trial cuando se abre |
| **Net Promoter Score de early adopters** | NPS a los primeros 50 usuarios activos | NPS >30 (en un mercado donde la norma es resignación, no entusiasmo) |

### Métricas de migración (¿la barrera de salida de WordPress es superable?)

| Métrica | Cómo medirla | Hipótesis a validar |
|---|---|---|
| **Tasa de éxito de migración automatizada** | % de sitios WordPress migrados sin pérdida de contenido/diseño | >80% del contenido migra automáticamente; <20% requiere ajuste manual |
| **Tiempo de migración de un sitio típico** | Cronometrar migración de un sitio WordPress con 20 páginas + blog + formularios | <4 horas (vs. 40-80 horas de reconstrucción manual) |
| **Abandono durante el proceso de migración** | % de usuarios que inician migración y la completan | >60% de completion rate |
| **Sitios que el freelancer migra en los primeros 6 meses** | Número medio de sitios migrados por early adopter en 6 meses | >3 sitios por freelancer (indica confianza creciente) |

### Métricas de mercado (¿el segmento tiene tamaño suficiente?)

| Métrica | Cómo medirla | Hipótesis a validar | Fuente en la investigación |
|---|---|---|---|
| **TAM: freelancers WordPress activos** | Census de mercado (Upwork, Fiverr, agencias locales en España/LATAM) | >500,000 freelancers activos en mercados hispanohablantes | Diego, Carmen, Lucía y Estudio Línea representan 4 segmentos distintos dentro de este TAM |
| **Crecimiento del abandono de WordPress** | Google Trends "WordPress alternative" + encuestas de satisfacción | Tendencia creciente en últimos 3 años | "Plugin fatigue reaching a breaking point" (personas); conversaciones en Reddit, foros |
| **Disponibilidad a probar nuevas plataformas** | % de freelancers que han evaluado al menos 1 alternativa a WP en los últimos 12 meses | >25% | Lucía ya prueba Framer; Estudio Línea evalúa alternativas constantemente; Diego es más conservador |

### Criterio de Go/No-Go

**Go si:**
- >40% de freelancers encuestados reportan incidentes de seguridad en 2 años
- Media de plugins por sitio >12
- Intención de cambio >30% (score 7+)
- WTP confirma precio >$29/mes viable
- Early adopters migran >3 sitios en 6 meses con NPS >30

**No-Go si:**
- <25% reportan incidentes de seguridad (el dolor no es tan agudo como la investigación sugiere)
- Plugins por sitio <8 (el "plugin hell" está sobredimensionado)
- Intención de cambio <15% (la inercia de WordPress es demasiado fuerte)
- WTP <$15/mes (el segmento no soporta una plataforma SaaS premium)
- Completion rate de migración <40% (la barrera técnica es demasiado alta)
