# Análisis Competitivo — Fabrika

> Fecha: 2026-08-04
> Objetivo: Evaluar los 7 competidores principales de Fabrika (plataforma low-code de creación web y ecommerce) para identificar amenazas, oportunidades y gaps de mercado.

---

## Competidores Analizados

---

### 1. Webflow

**Producto/Compañía:** Webflow, Inc. (San Francisco, fundada 2013)

**Target audience:**
- Diseñadores visuales que quieren producir código limpio sin programar
- Agencias y freelancers profesionales (su segmento principal)
- Equipos de marketing en empresas mid-market
- Enterprise con Webflow Enterprise (NYT, Ideo, Monday.com)

**Pricing model:**
- SaaS con tiers por site (no por tenant/org)
- **Site Plans:** Starter (gratis, webflow.io, 2 páginas), Basic ($15/mes, dominio custom, 300 páginas), Premium ($25/mes, CMS, hasta 2.5TB bandwidth)
- **Platform Plans:** Team ($2,500/mes, contrato anual), Enterprise (custom)
- Add-ons: Optimize ($299/mes), Analyze ($9/mes), Localize ($9-$29/mes)
- Pricing por sitio = caro para portfolios grandes de clientes

**Key strengths:**
- Mejor diseño visual del mercado: el Designer es el benchmark de editor WYSIWYG
- Código HTML/CSS/JS exportable y limpio (sin basura de builders)
- CMS integrado con API REST — no es solo páginas estáticas
- Ahora incluye Webflow Cloud (SQLite/D1, KV store, object storage R2) — se mueve hacia apps
- SEO y AEO (Answer Engine Optimization) con agentes internos
- Webflow Localize para multilenguaje con IA
- Interacciones avanzadas con GSAP (timeline animation)
- MCP server integration para flujos de IA externos
- Comunidad grande y Universidad (Webflow University)
- Marketplace de templates + partners certificados

**Key weaknesses/limitations:**
- **Vendor lock-in severo:** No puedes migrar el CMS fácilmente. El código exportado es estático.
- **Curva de aprendizaje ALTA:** No es para no-diseñadores. La jerga es técnica (divs, clases, CSS grid/flexbox). Un freelancer sin background de diseño tarda meses.
- **Precios caros para agencias:** Cada site paga su plan. No hay modelo multi-tenant real. Un portfolio de 25 sitios de clientes sale carísimo.
- **CMS limitado:** 20,000 items máx (Team plan), 40 Collections. No escala para ecommerce grande.
- **Sin ecommerce nativo:** No tiene carrito, checkout, pagos. Requiere integraciones externas (Shopify, Ecwid, etc.) o montar Webflow Cloud apps.
- **Sin multi-tenancy real:** No hay tenant isolation, RLS, ni gestión de permisos por cliente
- **Webflow Cloud (apps) es incipiente:** SQLite/D1, KV y R2 están en early stage. No es un backend robusto para apps complejas.
- **Colaboración limitada:** Solo en planes Team/Enterprise. Sin branching en planes bajos.
- **Quejas comunes:** cambios de pricing repentinos, límites de bandwidth estrictos, soporte lento en planes bajos

**Data connectivity:**
- CMS nativo (REST API + Content Delivery API con cache)
- Webflow Cloud: SQLite (D1), Key-Value (KV), Object Storage (R2)
- Code components: componentes programables que pueden llamar APIs externas
- APIs REST para gestionar contenido programáticamente (60-600 RPM según plan)
- Sin adaptadores nativos para ecommerce, ERPs, o bases de datos externas
- MCP server para conectar con agentes de IA externos

**AI features:**
- AI site builder: prompt → site completo
- AI section designer: genera secciones usando el design system existente
- AI code components: genera componentes programables
- AI copy: genera textos y variantes de contenido
- AI SEO/AEO: auditorías y sugerencias automáticas
- AI CMS content: genera items de CMS individualmente o en bulk
- Agentes AEO: recomendaciones para visibilidad en búsquedas de IA
- Sistema de créditos AI compartidos por workspace

**Portability/lock-in:**
- **Export de código HTML/CSS/JS:** posible pero solo exporta páginas estáticas. Pierdes CMS, interacciones, lógica.
- **Sin migración de CMS:** No puedes exportar la estructura del CMS ni los datos fácilmente
- **Webflow Cloud apps** te atan aún más a la plataforma
- **Lock-in: ALTO (8/10)**

**Plugin/extension ecosystem:**
- Webflow Apps marketplace (Cloud apps)
- Code components (JS)
- REST APIs para extender
- MCP server para IA externa
- Sin plugin ecosystem estilo WordPress — todo es más controlado
- Marketplace de templates, components, y plugins

**Learning curve para freelancer:**
**ALTA.** Un freelancer sin experiencia en diseño web tarda 2-4 meses en ser productivo. Requiere entender CSS, diseño responsive, y el paradigma de Webflow (que es distinto a todo). Webflow University ayuda mucho, pero el gap inicial es grande.

---

### 2. Elementor (WordPress)

**Producto/Compañía:** Elementor Ltd. (Israel, fundada 2016)

**Target audience:**
- Freelancers y pequeños estudios WordPress (su core audience)
- Diseñadores sin conocimientos de código
- Agencias medianas que construyen sobre WordPress
- Empresas con sitios WordPress corporativos

**Pricing model:**
- Freemium: versión gratuita con 32 widgets + editor base
- **Editor Pro plans:** Essential ($49/año, 1 site), Advanced Solo ($99/año, 1 site), Advanced ($149/año, 3 sites), Expert ($199/año, 25 sites), Agency ($299/año, 1000 sites)
- **Elementor One (todo-en-uno):** One ($149/año, 1 site + 25K créditos AI), One Agency ($299/año, unlimited sites + 350K créditos AI)
- Modelo de créditos para funcionalidades AI, optimización imágenes, email, accesibilidad
- Sin revenue share — pago anual fijo

**Key strengths:**
- **Mejor editor drag-and-drop del mercado WordPress:** UX pulida, previsualización en tiempo real, responsive editing
- **85+ widgets Pro** cubren casi cualquier necesidad visual
- Theme Builder: headers, footers, archives, single posts — diseño completo del tema sin código
- **Dynamic Content:** connecta con WordPress CPTs, custom fields, ACF, Pods, Toolset
- **WooCommerce Builder:** personalización visual de páginas de producto, tienda, carrito, checkout
- Form Builder con integraciones a marketing tools
- Popup Builder avanzado con condiciones de display
- **Cloud Templates:** reutilización de diseños entre sitios
- Ecosistema masivo de addons third-party (Crocoblock, Dynamic.ooo, Essential Addons)
- Precio MUY accesible para freelancers latinos/europeos (~$12-25/mes plan Agency)
- Comunidad hispanohablante enorme — tutoriales, cursos, meetups
- 16M+ sitios activos — efectivamente el estándar de facto para WordPress builders

**Key weaknesses/limitations:**
- **Dependencia total de WordPress:** Si WP cambia (Gutenberg, Full Site Editing), Elementor tiene que adaptarse o morir
- **Performance:** Sitios con Elementor tienden a ser más lentos (DOM pesado, CSS/JS inline, render blocking). LCP scores malos sin optimización adicional.
- **Código generado de baja calidad:** Divs anidados infinitos, markup no semántico, HTML/CSS no portable
- **Lock-in de diseño:** No puedes exportar el diseño a otro builder o plataforma. Todo es shortcode-based.
- **Problemas de compatibilidad:** Conflictos frecuentes con otros plugins, themes, y actualizaciones de WP
- **Seguridad heredada de WordPress:** Vulnerabilidades de plugins, temas, y core WP afectan al sitio
- **Sin multi-tenancy nativo:** WordPress no tiene tenant isolation real. Multisite existe pero es un parche.
- **AI features limitadas y caras (créditos):** Solo en plan One. AI no incluido en planes Pro. Modelo de créditos confuso.
- **Ecommerce vía WooCommerce hereda todas sus limitaciones:** rendimiento, seguridad, escalabilidad
- **Sin staging nativo:** Depende del hosting o plugins third-party
- **Quejas comunes:** bugs frecuentes tras updates, soporte lento, accesibilidad pobre, mobile editing limitado

**Data connectivity:**
- Dynamic Tags: conexión a WordPress CPTs, custom fields (ACF, Pods, Toolset, Meta Box)
- WooCommerce dynamic tags para ecommerce
- APIs REST de WordPress accesibles para desarrolladores
- Sin conexión nativa a bases de datos externas o APIs sin plugin third-party
- Form integrations: Mailchimp, ActiveCampaign, HubSpot, etc. vía webhook/native
- Toda la conectividad pasa por el ecosistema WordPress — recursos limitados si no es WP

**AI features:**
- **AI Website Builder:** prompt → wireframe → diseño con IA
- **AI Layout Builder:** genera secciones y páginas desde descripciones
- **AI Code:** genera CSS personalizado, snippets JS
- **AI Copy:** genera textos para cualquier elemento
- **AI Images:** genera imágenes para fondos, placeholders
- **Todo requiere créditos One** (no incluido en planes Pro, solo planes One)
- Accesibilidad: AI scanner + AI fixes automáticos con créditos

**Portability/lock-in:**
- **Lock-in ALTÍSIMO (9/10):** Todo el diseño está atado a Elementor shortcodes. Desactivar Elementor = perder todo el contenido formateado.
- Puedes exportar contenido vía WordPress XML, pero pierdes TODO el diseño visual
- Sin estándares abiertos — no es HTML/CSS portable
- Ventaja parcial: estás en WordPress, así que el contenido (posts, CPTs) sí se puede migrar con herramientas WP estándar

**Plugin/extension ecosystem:**
- **Masivo:** 55K+ plugins WordPress + cientos de addons específicos para Elementor
- Third-party builders (Crocoblock, Dynamic.ooo, Essential Addons, Ultimate Addons)
- Marketplace de templates dentro de Elementor
- Comunidad de developers que extienden con custom widgets
- Fácil de extender si sabes WordPress/PHP — pero no hay sandbox, cualquier plugin tiene acceso total

**Learning curve para freelancer:**
**BAJA.** Un freelancer sin experiencia puede construir un sitio funcional en su primera semana. La UI es intuitiva, los tutoriales abundan, y la comunidad hispana es enorme. La parte difícil viene después: optimización de performance, resolución de conflictos, y personalización avanzada.

---

### 3. WordPress + WooCommerce

**Producto/Compañía:** WordPress Foundation + Automattic (WooCommerce es de Automattic)

**Target audience:**
- TODO el espectro: desde bloggers hasta enterprise (WP.com VIP)
- Ecommerce con WooCommerce: SMBs, mid-market, y enterprise (vía agencias)
- Freelancers y agencias como implementadores principales
- El 43% de todos los sitios web usan WordPress — es la plataforma más usada del mundo

**Pricing model:**
- **WordPress core:** Gratis, open-source (GPLv2)
- **WooCommerce:** Gratis, open-source
- **Costos reales:** Hosting ($25-350/mes), dominio, SSL, temas/themes, extensions ($29-299/año c/u), mantenimiento, seguridad
- **WooPayments:** 2.5-2.9% + $0.30/transacción
- **Sin platform fees ni revenue share** — modelo radicalmente opuesto a Shopify
- TCO para tienda $2M/año: ~$89K/año (4.48% del revenue)
- TCO para tienda $300M/año: ~$5.2M/año (1.74% del revenue)

**Key strengths:**
- **Dueño de tus datos:** 100% portabilidad. Ni WordPress ni WooCommerce pueden desactivar tu tienda
- **Sin revenue share:** Pagas hosting + extensions, no un % de tus ventas
- **Personalización total:** PHP, JavaScript, APIs REST. Puedes customizar TODO — checkout, carrito, flujos de producto
- **Ecosistema masivo:** 55K+ plugins WordPress + 1,000+ extensions WooCommerce oficiales + miles de third-party
- **WooCommerce es el ecommerce más usado del mundo** — más instalaciones que Shopify
- **Escalabilidad comprobada:** Sitios con $300M+ de revenue anual funcionando
- **Flexibilidad de pagos:** Cualquier gateway, sin penalización por usar procesadores externos
- **Multi-mercado sin costo extra:** Vender en mercados ilimitados sin pagar fees adicionales (Shopify cobra $59/mes por mercado extra)
- **Comunidad global masiva** en todos los idiomas
- **Sin límites de variantes de producto** (Shopify: 2,048 variantes máx)
- Agencias especializadas abundan y son accesibles

**Key weaknesses/limitations:**
- **Complejidad de mantenimiento:** Tú eres responsable de updates, seguridad, backups, rendimiento, compatibilidad
- **Performance requiere trabajo:** Un WooCommerce mal optimizado es lentísimo. Necesitas caching, CDN, optimización de queries.
- **Seguridad es TU responsabilidad:** Plugins vulnerables, ataques de fuerza bruta, inyección SQL — todo depende de tu configuración
- **Experiencia de edición pobre:** WordPress block editor (Gutenberg) es inferior a Elementor, Webflow, Wix Studio. Necesitas builders third-party.
- **Fragmentación:** Elegir hosting, theme, builder, plugins... cada decisión es un riesgo de compatibilidad
- **Sin IA integrada nativa:** Depende de plugins third-party que son mediocres comparados con Webflow AI o Shopify Sidekick
- **Sin multi-tenancy real:** WP Multisite es limitado. Sin tenant isolation verdadera.
- **Costo inicial alto para proyectos pequeños:** Hosting + theme + extensions + developer = $3-15K+ para una tienda profesional
- **WooCommerce actualizaciones:** Updates pueden romper extensions o customizaciones. Testing requerido.
- **Curva de aprendizaje fragmentada:** WordPress, PHP, WooCommerce, tu theme, tu builder, tus plugins... cada capa suma complejidad

**Data connectivity:**
- **REST API completa** para WordPress y WooCommerce
- **WooCommerce REST API:** productos, órdenes, clientes, cupones, reports — todo accesible programáticamente
- **Webhooks** para eventos de tienda
- **Conexión a cualquier BD externa vía PHP** — sin restricciones pero sin sandbox
- **Integraciones con ERPs, CRMs, POS** vía plugins o desarrollo custom (sin límites)
- **GraphQL vía WPGraphQL + WooGraphQL**
- **Mayor flexibilidad de conectividad del mercado** — pero requiere desarrollo

**AI features:**
- **Sin IA nativa significativa:** WordPress core no tiene AI. WooCommerce no tiene AI assistant.
- Plugins third-party existen (generadores de contenido, chatbots) pero son básicos comparados con la competencia
- **Jetpack AI** (de Automattic): generación de texto básica dentro del editor — muy limitado
- **No hay AI site builder, AI design, AI code generation nativos**
- Gran debilidad frente a Webflow, Wix, Shopify, Framer

**Portability/lock-in:**
- **Lock-in: BAJO (2/10):** Tus datos son tuyos. Exportación .XML de WordPress, .CSV de WooCommerce. Migrable a cualquier hosting o plataforma.
- El diseño visual depende del builder usado — si usas Elementor, estás atrapado en Elementor
- **La menor dependencia de vendor de todo el mercado**
- **Código abierto:** Puedes hacer fork, modificar, inspeccionar TODO

**Plugin/extension ecosystem:**
- **El más grande del mundo:** 55K+ plugins WordPress, 1,000+ extensions WooCommerce
- **WooCommerce Marketplace oficial** curado por Automattic
- **Posibilidad de desarrollar cualquier customización** en PHP/JS sin pedir permiso
- **Sin sandbox:** cualquier plugin tiene acceso total al sistema — riesgo de seguridad

**Learning curve para freelancer:**
**MEDIA-ALTA.** Instalar WordPress/WooCommerce es fácil (1-click). Pero construir una tienda profesional y segura requiere meses de experiencia: elegir hosting, theme, builders, optimizar performance, configurar seguridad, entender hooks de WooCommerce. La comunidad ayuda (tutoriales en español abundan), pero el gap entre "instalar" y "ser productivo" es de 3-6 meses.

---

### 4. Shopify

**Producto/Compañía:** Shopify Inc. (Canadá, fundada 2006)

**Target audience:**
- Emprendedores y SMBs que quieren vender online rápido
- Marcas DTC (direct-to-consumer) de todos los tamaños
- Mid-market con Shopify Advanced
- Enterprise con Shopify Plus ($2,100+/mes)
- Vendedores en AI chats (Shopify Agentic — nuevo)

**Pricing model:**
- SaaS con revenue share indirecto (via comisiones de pago)
- **Planes:** Basic ($22/mes fact. anual), Grow ($62/mes), Advanced ($289/mes), Plus ($2,100+/mes)
- **Comisiones por transacción** si no usas Shopify Payments: Basic 2%, Grow 1%, Advanced 0.6%, Plus 0.2%
- **Shopify Payments:** 2.1-2.9% + $0.30 por transacción (baja con planes superiores)
- **POS Pro:** +$79/mes por ubicación
- **Shopify Agentic:** $0/mes (solo pagas comisión por venta en canales AI)
- Add-ons: Markets ($59/mes por mercado extra), apps del App Store (precios variables)

**Key strengths:**
- **Ecommerce más pulido del mercado:** Checkout optimizado (15% mejor conversión que competidores), gestión de inventario, órdenes, shipping
- **Ecosistema de Apps masivo:** 8,000+ apps en Shopify App Store
- **Sidekick (AI assistant):** Mejor AI assistant del sector commerce — responde preguntas, hace tareas, genera reportes
- **Agentic Storefronts:** Vender en ChatGPT, Perplexity, Copilot (pioneros en agentic commerce)
- **Shopify AI Toolkit para devs:** Herramientas para construir features de IA custom
- **Campañas Autopilot** (Spring '26 Edition): marketing automatizado con IA
- **Shopify Markets:** Venta global con precios locales, idiomas, impuestos
- **Shopify Collective:** Marketplace de productos entre merchants
- **Escalabilidad:** Infraestructura probada para Black Friday sin caídas
- **Posicionamiento de marca:** Shopify = ecommerce para el consumidor promedio
- **Shopify Flow:** Automatización de workflows sin código
- **Shopify Capital:** Financiación para merchants (basada en ventas)
- **Shopify.dev:** Documentación excelente para desarrolladores

**Key weaknesses/limitations:**
- **NO es un constructor visual de sitios web general:** Es una plataforma de ecommerce. No puedes hacer un sitio de portfolio, revista, o corporate de forma nativa.
- **Limitaciones de personalización visual:** El editor de temas es limitado comparado con Webflow o Elementor. Necesitas apps third-party para diseño avanzado.
- **Vendor lock-in significativo:** Shopify controla el checkout, los datos, la infraestructura. No puedes migrar fácilmente.
- **Comisiones ocultas:** Si no usas Shopify Payments, pagas un % extra por transacción. Las apps suman costo rápidamente.
- **Límites de variantes:** 2,048 variantes por producto, máx 3 opciones de producto — ridículo para moda, calzado, o productos con muchas variaciones
- **Límites de API:** Standard rate limits en planes bajos — limita integraciones y headless
- **Lenguaje de plantillas Liquid:** Propietario, no transferible, curva de aprendizaje extra
- **Headless limitado:** Solo 1 storefront headless en Basic, 25 en Plus
- **$59/mes por mercado extra** — caro para tiendas globales
- **Shopify Plus:** $2,100/mes mínimo — barrera de entrada alta para mid-market
- **No es open source** — no puedes inspeccionar, modificar, o forkar
- **Quejas comunes:** precios que suben frecuentemente, apps que encarecen el TCO, checkout custom limitado en planes bajos, soporte variable

**Data connectivity:**
- **REST + GraphQL Admin API** completa — acceso a productos, órdenes, clientes, inventario, analytics
- **Storefront API** para headless y mobile apps
- **Shopify Flow** para automatizaciones entre apps y datos
- **Webhooks** para eventos en tiempo real
- **App Store** con 8,000+ integraciones pre-construidas
- **Sin acceso directo a BD** — todo pasa por API. No puedes hacer queries SQL directas.
- **Sin soporte nativo para bases de datos externas** — requiere apps o desarrollo custom

**AI features:**
- **Sidekick:** AI assistant para comerciantes (preguntas, tareas, reportes, configuración de tienda)
- **AI website builder:** prompt → tienda online completa
- **Shopify Magic:** generación de descripciones de producto, imágenes, emails, textos
- **Agentic Storefronts:** venta directa en ChatGPT, Perplexity, Microsoft Copilot
- **Campaign Autopilot:** automatización de campañas de marketing con IA
- **Shopify AI Toolkit:** APIs y herramientas para que devs construyan sus propias features de IA
- **Líder indiscutible en AI para ecommerce** — ni Webflow, ni WooCommerce se acercan

**Portability/lock-in:**
- **Lock-in: ALTO (8/10):** Datos exportables vía CSV/API, pero pierdes TODA la lógica de negocio, diseño, flujos, automatizaciones. Migrar de Shopify es un proyecto de desarrollo costoso.
- Los temas son Liquid (propietario) — no transferibles a otra plataforma
- Checkout es propiedad de Shopify — no puedes llevártelo
- Las apps del App Store solo funcionan en Shopify

**Plugin/extension ecosystem:**
- **App Store con 8,000+ apps** — el más grande después de WordPress
- Apps para: marketing, shipping, accounting, loyalty, reviews, diseño, Dropshipping
- **Shopify Functions** para extender el backend (Plus solamente)
- **APIs públicas** para construir cualquier integración custom
- Calidad de apps variable — muchas son caras y de soporte mediocre

**Learning curve para freelancer:**
**BAJA-MEDIA.** Poner una tienda básica es fácil (1-2 semanas). Pero dominar Liquid, Shopify Flow, APIs, apps, y optimización de conversión toma 3-6 meses. Comunidad hispana creciendo pero menor que WordPress/WooCommerce.

---

### 5. Framer

**Producto/Compañía:** Framer B.V. (Países Bajos, fundada 2013 — pivotó de prototyping a web builder en 2022)

**Target audience:**
- Diseñadores UI/UX que quieren publicar directamente sin desarrolladores
- Startups y founders que necesitan landing pages de alta calidad visual
- Agencias de diseño/branding
- Freelancers de diseño (no necesariamente de desarrollo web)

**Pricing model:**
- **Free:** 500 créditos AI, dominio framer.com, 1GB bandwidth
- **Basic:** $10/mes (dominio custom, 2 CMS collections, 50GB bandwidth)
- **Pro:** $30/mes (10 CMS collections, 100GB bandwidth, staging, branching)
- **Enterprise:** Custom pricing (SSO, SCIM, uptime guarantee)
- **Editores adicionales:** $20/mes c/u (viewers gratis)
- Add-ons: Convert (A/B testing, $50/500K events), Advanced Hosting ($200/mes)
- **Pre-emptive sobre Webflow:** Basic de Framer = más barato que Basic de Webflow ($10 vs $15)

**Key strengths:**
- **Diseño visual más avanzado del mercado:** Proviene de una herramienta de prototyping (como Figma). Animaciones, micro-interacciones, tipografía avanzada.
- **Framer Agents:** El mejor sistema de agentes AI para diseño web — diseño, copy, assets, interacciones desde prompts
- **External Agents (PREVIEW):** Posibilidad de conectar tus propios agentes (Claude, ChatGPT) para flujos de IA customizados
- **Rendimiento excepcional:** Sitios rápidos, optimizados, con CDN global
- **SEO sólido:** metadata, sitemaps, redirects, alt text, schema markup
- **CMS integrado** con colecciones y items — ideal para blogs, portfolios, landing pages dinámicas
- **Localization con IA:** Traducción de sitios completos con AI
- **Convert (A/B testing):** Testing de variantes, funnels, personalización
- **Precio muy competitivo** vs Webflow en segmento entry-mid
- **Comunidad de diseño vibrante** — Marketplace con templates, componentes, plugins
- **Branching y staging** en plan Pro ($30/mes) — Webflow lo tiene solo en Team ($2,500/mes)
- **Framer Academy** y recursos educativos gratuitos

**Key weaknesses/limitations:**
- **NO es para ecommerce:** Sin carrito, checkout, pagos, gestión de inventario. Cero capacidades de tienda.
- **CMS pequeño:** 10 colecciones máx en Pro (40 con add-on). 40K items máx. Insuficiente para sitios de contenido grande.
- **Sin lógica de negocio:** No puedes construir apps con workflows, reglas de negocio, o estados complejos. Es para sitios web, no para aplicaciones.
- **Sin multi-tenancy:** Una cuenta = un workspace. No hay forma de gestionar sitios de clientes con permisos separados.
- **Lock-in severo:** Todo el diseño se hace en un canvas propietario. No hay exportación de código real. Estás casado con Framer.
- **Sin base de datos real:** CMS es un flat CMS, no relacional. KV/Object storage no existe como en Webflow Cloud.
- **Sin APIs para extender:** No hay REST API para gestionar contenido programáticamente. Muy cerrado.
- **Sin plugin ecosystem real:** Marketplace limitado a templates y componentes. Nada comparable a WP/Woo/Shopify.
- **Comunidad mucho más pequeña que Webflow o WordPress**
- **No es para clientes no-técnicos:** El editor es muy "de diseño" — confuso para alguien que no maneja conceptos de UI/UX
- **Sin soporte nativo para apps web dinámicas** (Webflow Cloud está intentando eso, Framer no)

**Data connectivity:**
- **CMS nativo** con colecciones — solo accesible desde el editor visual
- **Sin APIs REST públicas** para consumir o modificar contenido externamente
- **External Agents (PREVIEW):** MCP-like para conectar herramientas de IA
- **Integraciones limitadas:** formularios → webhooks, Google Analytics, etc. Nada comparable a Shopify Flow o WordPress hooks.
- **Sin conectividad con bases de datos externas, ERPs, CRMs** — aislado
- **Muy débil en data connectivity** — es un builder visual, no una plataforma

**AI features:**
- **Framer Agents:** El más avanzado de la lista en diseño AI. Generación de páginas completas, secciones, copy, assets visuales.
- **AI copy generation:** textos optimizados para diferentes tonos y audiencias
- **AI localization:** traducción automática completa
- **External Agents:** Conecta Claude, ChatGPT, etc. para flujos de IA personalizados (preview)
- **Sistema de créditos** para todo uso de AI
- **50% descuento en créditos para Pro Experts**
- **Enfoque diferente:** Framer usa AI para el diseño visual, no para business logic (porque no tiene)

**Portability/lock-in:**
- **Lock-in: MUY ALTO (9/10):** No puedes exportar a HTML/CSS/JS funcional. No hay APIs de exportación. Básicamente no hay forma real de migrar.
- Diseño en formato propietario — solo funciona en Framer
- Contenido del CMS no tiene exportación programática fácil
- Si Framer cierra, tu sitio desaparece

**Plugin/extension ecosystem:**
- **Marketplace:** Templates, componentes, plugins — pequeño pero creciendo
- **Sin apps de terceros** como Shopify App Store o WordPress Plugins
- **External Agents** es la apuesta para extensibilidad vía IA — no plugins tradicionales
- **Ecosistema muy limitado** comparado con cualquier otro competidor

**Learning curve para freelancer:**
**MEDIA.** Fácil si vienes de Figma/Sketch/diseño. Difícil si vienes de WordPress/Elementor (paradigma muy distinto). Curva de 2-4 semanas para diseñar algo funcional. El problema es que el cliente final NO puede mantener el sitio sin ti — necesitas conocimientos de diseño.

---

### 6. Wix Studio

**Producto/Compañía:** Wix.com Ltd. (Israel, fundada 2006)

**Target audience:**
- Agencias y freelancers que construyen sitios para clientes (su foco)
- Diseñadores que quieren un builder visual potente
- Desarrolladores que extienden con código (Velo dev platform)
- Empresas medianas y Enterprise (Wix Enterprise)

**Pricing model:**
- **Wix (producto principal):** Free, Light ($17/mes), Core ($29/mes), Business ($39/mes), Business Elite ($159/mes)
- **Wix Studio (agencias):** Incluido en ciertos planes o como add-on. Precios por sitio + gestión multi-cliente.
- **Modelo más SaaS-classic:** pago por site + storage + features
- **Enterprise:** precios custom según proyecto

**Key strengths:**
- **Multi-cloud hosting** — rendimiento y uptime superiores a WordPress promedio
- **Velo dev platform:** JavaScript backend + APIs para desarrolladores
- **Data platform + Compute platform** para sites con backend dinámico
- **Wix Studio para agencias:** gestión de clientes, colaboración en equipo, white-label
- **Wix App Market** con cientos de apps integradas
- **AI website builder** desde prompts (vía Wix ADI/editor AI)
- **200+ templates** por industria
- **Suite de negocio integrada:** ecommerce, bookings, restaurantes, hoteles, fitness, eventos, cursos online, monetización de contenido
- **Marketing suite** completo: email marketing, SEO tools, analytics, CRM
- **Soporte 24/7** en todos los planes premium
- **Mobile app para gestionar negocio** (Wix Owner)
- **Accesibilidad nativa** mejor que la mayoría
- **Pagos integrados** (Wix Payments) sin comisiones extra por usar otros procesadores

**Key weaknesses/limitations:**
- **Vendor lock-in total:** No puedes exportar tu sitio. Todo el diseño, lógica, datos — atrapado en Wix.
- **Personalización visual inferior a Webflow/Framer:** El editor Wix es bueno pero no da el control pixel-perfect de Webflow o las animaciones de Framer.
- **Marca "Wix" asociada a sitios amateur:** Problema de percepción en el segmento profesional. Wix Studio busca resolver esto pero el estigma persiste.
- **Ecosistema de plugins pequeño vs WordPress:** Cientos de apps vs 55K+ plugins WordPress
- **Sin open-source ni autohosting:** No puedes inspeccionar el código ni moverlo a tu propio servidor
- **Caro para portfolios grandes de clientes:** pricing por sitio escala rápido
- **Velo dev platform es nicho:** Pocos desarrolladores la usan comparado con WordPress, Shopify, o Webflow
- **Menos control sobre SEO técnico** que WordPress o Webflow
- **Historial de cambios de pricing y funcionalidades** que confunden a los usuarios
- **Quejas comunes:** editor lento con sitios grandes, limitaciones de personalización en mobile, soporte técnico inconsistente

**Data connectivity:**
- **Velo (Corvid) dev platform:** JavaScript backend con APIs, manejo de datos, integraciones HTTP
- **Data platform:** Base de datos integrada con Collections (similar a CMS pero más potente)
- **Compute platform:** Ejecutar código backend sin gestionar servidores
- **Wix APIs:** REST APIs para gestionar sitios programáticamente
- **App Market** con integraciones pre-construidas
- **Webhooks** para eventos
- **Wix Payments** integrado
- **Integraciones nativas con:** Google Analytics, Facebook Pixel, Mailchimp, HubSpot, Zapier
- **Sin adaptadores para fuentes externas (WooCommerce, Shopify, PostgreSQL):** Si quieres datos externos, necesitas código en Velo

**AI features:**
- **AI Website Builder:** Prompt → sitio completo con diseño y contenido
- **Wix ADI (Artificial Design Intelligence):** Generación de diseño asistida
- **AI tools para copy, imágenes, SEO**
- **AI en el editor:** sugerencias de diseño, layouts, paletas de colores
- **No tiene AI assistant tipo Sidekick (Shopify) o Sidebar AI (Webflow)**
- **AI más enfocado a generación inicial** que a asistencia continua

**Portability/lock-in:**
- **Lock-in: TOTAL (10/10):** No hay forma alguna de exportar tu sitio de Wix. HTML, CSS, JS, datos — todo es propietario.
- **Ni siquiera puedes migrar a WordPress** — tienes que reconstruir desde cero
- **El lock-in más agresivo del mercado**

**Plugin/extension ecosystem:**
- **Wix App Market:** cientos de apps — mucho más pequeño que WordPress, Shopify, o Webflow
- **Velo Packages:** npm packages para extender funcionalidad
- **Wix Studio Marketplace** para templates y componentes premium
- **Comunidad de developers pequeña pero activa**
- **Sin plugins third-party "de verdad":** Las apps del market son más integraciones SaaS que extensiones del core

**Learning curve para freelancer:**
**BAJA.** Similar a Wix clásico. Editor drag-and-drop intuitivo. Curva de 1-2 semanas para un sitio funcional. El problema es que cuando necesitas algo que el editor no soporta, necesitas Velo (JavaScript) — y ahí la curva se dispara.

---

### 7. Bubble

**Producto/Compañía:** Bubble Group, Inc. (Nueva York, fundada 2012)

**Target audience:**
- Founders no-técnicos que quieren construir MVPs y startups
- Product managers y diseñadores que necesitan prototipos funcionales
- "Citizen developers" en empresas (apps internas)
- No enfocado en agencias/freelancers de diseño web — enfocado en apps web

**Pricing model:**
- **Free:** desarrollo y testing, dominio bubbleapps.io
- **Starter:** ~$29/mes (dominio custom, funcionalidades básicas)
- **Growth:** ~$119/mes (más capacity, colaboración)
- **Team:** ~$349/mes (colaboración avanzada, más recursos)
- **Enterprise:** Custom, dedicado
- **Modelo basado en "workload units"** (capacidad de servidor) — se vuelve caro con apps complejas

**Key strengths:**
- **El mejor no-code app builder del mercado:** Lógica de negocio compleja, workflows, base de datos relacional, autenticación, roles — todo sin código.
- **Base de datos integrada:** PostgreSQL-like con relaciones, queries, y triggers visuales
- **Workflows visuales:** Lógica condicional, loops, API calls, estados — programación visual sin código
- **Plugin ecosystem:** Cientos de plugins para APIs externas, auth, pagos, etc.
- **API Connector:** Conecta con cualquier API REST/GraphQL
- **User management:** Autenticación, roles, permisos — nativo y robusto
- **Responsive engine:** Diseño responsive con reglas condicionales
- **Comunidad muy activa** de founders y makers
- **Bubble Academy** con tutoriales completos
- **Caso de éxito probado:** Startups de $1B+ construidas en Bubble
- **Export de código posible (limitado):** Bubble ha experimentado con exportación

**Key weaknesses/limitations:**
- **NO es un constructor visual de sitios web:** Es un app builder. El diseño visual es mediocre comparado con Webflow, Framer, o Elementor.
- **Curva de aprendizaje ALTÍSIMA para diseño web:** El paradigma de Bubble (workflows, estados, base de datos) es ajeno a un diseñador o freelancer web.
- **Rendimiento impredecible:** Apps complejas se vuelven lentas. El "Bubble lag" es una queja común.
- **Vendor lock-in severo:** Tu app solo existe en Bubble. No puedes migrar el backend, workflows, o lógica a otra plataforma.
- **No es para SEO/landing pages/marketing sites:** El enfoque en apps hace que el SEO, rendimiento de contenido, y CMS sean secundarios.
- **Capacidad limitada para diseño pixel-perfect:** El motor responsive es funcional pero no da control total como Webflow
- **Precio escala rápido** con apps complejas (workload units)
- **Sin ecommerce nativo:** Puedes construir un ecommerce, pero es un proyecto de app (semanas/meses), no un plugin o template
- **Sin multi-tenancy para agencias:** Diseñado para construir UNA app, no para gestionar portfolios de clientes
- **Comunidad enfocada en startups/tech:** Pocos recursos para el freelancer que hace webs para negocios locales
- **Sin staging/production workflow real** en planes bajos

**Data connectivity:**
- **Base de datos integrada** con relaciones, queries, y lógica visual
- **API Connector:** Conexión a cualquier API REST/GraphQL externa
- **SQL Database Connector plugin** para conectar PostgreSQL/MySQL externos
- **Webhooks** para eventos entrantes y salientes
- **Backend workflows** para lógica programada
- **La mejor data connectivity de los no-code app builders**
- **Pero todo está acoplado a Bubble** — no puedes separar backend de frontend

**AI features:**
- **Bubble AI (beta):** Generación de elementos de UI desde prompts
- **AI para generación de workflows básicos**
- **MUY por detrás** de Webflow, Shopify, Framer en AI features
- Más enfocado en "construir la lógica tú mismo" que en "la IA construye por ti"

**Portability/lock-in:**
- **Lock-in: TOTAL (10/10):** No puedes exportar tu app. Todo (DB, workflows, UI, lógica, usuarios) vive exclusivamente en servidores de Bubble.
- **No hay plan de exportación de código funcional** (experimentos abandonados)
- **Si Bubble cierra, pierdes TODO**

**Plugin/extension ecosystem:**
- **Bubble Plugin Marketplace:** Cientos de plugins para auth, pagos, APIs externas, UI components
- **API Connector** para cualquier servicio REST
- **Comunidad de developers que construyen plugins**
- **Ecosistema más pequeño que WordPress/Shopify pero más grande que Framer/Wix Studio**
- **Limitado por el paradigma de Bubble** — plugins solo pueden hacer lo que Bubble permite

**Learning curve para freelancer:**
**MUY ALTA para el target de Fabrika.** Un freelancer que hace webs para negocios locales encuentra Bubble completamente alien. El paradigma de app builder (DB relacional, workflows, estados) requiere 3-6 meses para ser competente. Si tu negocio es hacer sitios web, Bubble es la herramienta incorrecta.

---

## Ranking de Amenaza para Fabrika

### Criterios de evaluación

Para cada competidor evaluamos cuánto solapa con la propuesta de valor de Fabrika:

- **Editor visual low-code** para diseñar sitios web
- **Ecommerce integrado** de forma nativa (no como add-on)
- **Multi-tenancy** para agencias con gestión de clientes
- **Data connectivity** flexible (providers, adapters, APIs externas)
- **AI multi-agente** como diferenciador (no solo features AI sueltas)
- **Seguridad y sandbox** como fundamento (no como add-on)
- **Portabilidad/exportabilidad** de sitios y componentes
- **Freelancer-friendly** en precio y curva de aprendizaje
- **Plataforma, no herramienta** — evolución más allá de "builder + hosting"

---

### #1 — Mayor Amenaza

## WordPress + WooCommerce

**Solapamiento con Fabrika:** 85%
**Por qué es LA amenaza:**

WordPress + WooCommerce es el ecosistema que Fabrika busca reemplazar. Es el "incumbent" que todo freelancer conoce y usa. Su posición es tan masiva (43% de la web) que incluso siendo técnicamente inferior en muchos aspectos, su inercia es casi imbatible.

- **Fortalezas coincidentes con Fabrika:** ecommerce, extensibilidad, comunidad, precio accesible, portabilidad de datos
- **Debilidades que Fabrika ataca directamente:** experiencia de edición pobre, sin multi-tenancy nativo, sin IA integrada, seguridad débil, rendimiento variable, vendor lock-in del diseño (via builders)
- **Riesgo para Fabrika:** Los freelancers pueden no querer migrar de un ecosistema que "ya funciona" a una plataforma nueva. WordPress tiene inercia de 20 años.
- **Oportunidad para Fabrika:** El dolor EXISTE. Todo freelancer de WordPress sufre con mantenimiento, seguridad, rendimiento, y conflictos de plugins. Si Fabrika ofrece "lo mejor de WordPress sin lo peor", tiene un mercado enorme.

**Estrategia defensiva de Fabrika:**
- Construir **adaptadores de migración** (WordPress → Fabrika, WooCommerce → Fabrika)
- Enfatizar la **seguridad por defecto** y la **paz mental** (no más updates que rompen sitios)
- Ofrecer **mejor rendimiento out-of-the-box** (cache, CDN, optimización de assets)
- Posicionar el **editor visual como el mejor del mercado** (superior a Elementor + Gutenberg)

---

### #2 — Mayor Amenaza

## Webflow

**Solapamiento con Fabrika:** 70%
**Por qué es una amenaza seria:**

Webflow es el competidor más cercano en espíritu a Fabrika: plataforma visual profesional con CMS, APIs, y un ecosistema creciente. Su movimiento hacia Webflow Cloud (backend apps) lo acerca aún más al territorio de Fabrika.

- **Fortalezas coincidentes:** mejor editor visual, CMS integrado, APIs, AI features, comunidad, agencias como target
- **Debilidades que Fabrika ataca:** sin ecommerce nativo, sin multi-tenancy real, vendor lock-in, precios altos para agencias, curva de aprendizaje alta
- **Riesgo para Fabrika:** Webflow es aspiracional. Es lo que los freelancers de WordPress quieren usar cuando "suben de nivel". Fabrika compite directamente en ese espacio.
- **Oportunidad para Fabrika:** Webflow es demasiado caro y complejo para el freelancer típico. Fabrika puede ser "Webflow para el resto de nosotros" — más barato, más fácil, con ecommerce nativo.

**Estrategia defensiva de Fabrika:**
- **Ecommerce nativo como killer feature** vs Webflow (que requiere integraciones externas)
- **Multi-tenancy real** para agencias (Webflow lo cobra carísimo)
- **Precio por tenant, no por sitio** (modelo disruptivo vs Webflow)
- **Curva de aprendizaje más baja** — editor tan visual como Webflow pero más accesible
- **Exportabilidad real** de componentes y sitios (Webflow export es limitado)

---

### #3 — Mayor Amenaza

## Elementor

**Solapamiento con Fabrika:** 75%
**Por qué es amenaza:**

Elementor es el estándar de facto para freelancers WordPress hoy. Es la experiencia UX que Fabrika toma como inspiración. Su precio bajo y curva de aprendizaje plana lo hacen el principal competidor en el segmento de freelancers.

- **Fortalezas coincidentes:** editor drag-and-drop excelente, dynamic content, WooCommerce builder, precio bajo, comunidad masiva, freelancer-friendly
- **Debilidades que Fabrika ataca:** dependencia de WordPress, rendimiento pobre, código de baja calidad, sin multi-tenancy, sin IA integrada en planes Pro, lock-in de diseño, seguridad heredada de WP
- **Riesgo para Fabrika:** Muchos freelancers aman Elementor. Cambiar de plataforma entera (no solo de builder dentro de WP) es un salto grande.
- **Oportunidad para Fabrika:** El dolor de Elementor es real (performance, seguridad, bugs tras updates). Si Fabrika es "Elementor sin WordPress" con mejor rendimiento y seguridad, hay una propuesta clara.

**Estrategia defensiva de Fabrika:**
- **Migración de diseños:** Herramienta que convierta sitios Elementor → componentes Fabrika
- **Paridad de widgets** con Elementor (85+ componentes en el lanzamiento)
- **Mejor performance demostrable** (comparativas de Lighthouse vs Elementor)
- **Ecommerce nativo** sin depender de WooCommerce (que es lento y complejo)

---

### #4 — Mayor Amenaza

## Shopify

**Solapamiento con Fabrika:** 40%
**Por qué es amenaza parcial:**

Shopify compite con Fabrika SOLO en el segmento ecommerce. No compite en sitios web generales, portfolios, revistas, etc. Pero en ecommerce, Shopify es el rey indiscutible y Fabrika deberá ofrecer algo radicalmente distinto.

- **Fortalezas coincidentes:** ecommerce robusto, AI assistant (Sidekick), ecosistema de apps, escalabilidad
- **Debilidades que Fabrika ataca:** no es para sitios web generales, vendor lock-in, comisiones, límites de variantes, personalización visual limitada, costos ocultos
- **Riesgo para Fabrika:** Si un cliente solo quiere ecommerce, Shopify es la opción obvia y segura. Fabrika necesita demostrar que su ecommerce es comparable.
- **Oportunidad para Fabrika:** Combinar "web + ecommerce" en una sola plataforma con diseño visual superior al de Shopify. El cliente que necesita una web corporativa CON tienda — ese es el sweet spot de Fabrika.

**Estrategia defensiva de Fabrika:**
- **Ecommerce integrado pero no el foco único** — posicionar como "la plataforma que hace web Y ecommerce bien"
- **Sin comisiones por transacción** (modelo de suscripción, no revenue share)
- **Adaptadores a Shopify** para quienes ya tienen tienda allí (headless ecommerce con frontend en Fabrika)
- **Diseño visual superior** al Online Store editor de Shopify

---

### #5 — Amenaza Moderada

## Wix Studio

**Solapamiento con Fabrika:** 60%
**Por qué es amenaza moderada:**

Wix Studio apunta al mismo segmento que Fabrika (agencias y freelancers) pero lo hace desde una plataforma cerrada y con un estigma de "amateur". Tiene más funcionalidades de negocio integradas que Webflow, pero menos control de diseño.

- **Fortalezas coincidentes:** multi-cloud hosting, Velo dev platform, data + compute, suite de negocio completa, agencias como target
- **Debilidades que Fabrika ataca:** vendor lock-in total, diseño visual inferior, estigma de marca, sin exportación, ecosistema pequeño
- **Riesgo para Fabrika:** Wix tiene recursos casi ilimitados y está invirtiendo fuerte en Wix Studio. Pueden mejorar rápido.
- **Oportunidad para Fabrika:** El lock-in total de Wix es su mayor debilidad. Fabrika puede ofrecer portabilidad y estándares abiertos.

**Estrategia defensiva de Fabrika:**
- **Portabilidad como bandera** — "Tu sitio es tuyo, no nuestro"
- **DSL abierto** como estándar de componentes (vs el formato propietario de Wix)
- **Mejor editor visual** — competir en calidad de diseño, no en cantidad de features

---

### #6 — Amenaza Baja

## Framer

**Solapamiento con Fabrika:** 30%
**Por qué es amenaza baja:**

Framer es el mejor en diseño visual y AI, pero no tiene ecommerce, no tiene backend real, y no está pensado para agencias multi-cliente. Compite en el segmento de diseño, no en el de plataforma.

- **Fortalezas coincidentes:** diseño visual excepcional, AI agents avanzados, freelancer-friendly en precio (planes bajos)
- **Debilidades que Fabrika ataca:** no ecommerce, no multi-tenancy, no data connectivity seria, no backend, lock-in total, sin plugin ecosystem
- **Riesgo para Fabrika:** Si Framer pivota hacia ser una plataforma (añadiendo backend, ecommerce, multi-tenancy), se vuelve un competidor directo muy peligroso.
- **Oportunidad para Fabrika:** Los usuarios de Framer que necesitan ecommerce o funcionalidad más allá de landing pages son clientes potenciales para Fabrika.

**Estrategia defensiva de Fabrika:**
- **Monitorear a Framer de cerca** — si añaden backend/ecommerce, reaccionar rápido
- **Ofrecer calidad de diseño comparable** a Framer en el editor visual
- **Posicionar Fabrika como "Framer + Shopify + WordPress en uno"**

---

### #7 — Amenaza Mínima

## Bubble

**Solapamiento con Fabrika:** 15%
**Por qué es amenaza mínima:**

Bubble es un app builder, no un constructor de sitios web. Su target (founders, startups) y paradigma (DB + workflows + lógica) son completamente distintos a los de Fabrika (freelancers, diseño visual, ecommerce). No compiten en el mismo mercado.

- **Fortalezas coincidentes:** casi ninguna relevante. Quizás la idea de "plataforma con capacidades" y "API connector" se alinea conceptualmente con Providers/Adapters de Fabrika.
- **Debilidades de Bubble irrelevantes para Fabrika:** su diseño pobre, falta de SEO, y curva de aprendizaje no importan porque no comparten target.
- **Riesgo para Fabrika:** Ninguno directo. Solo riesgo indirecto: si Bubble algún día pivota hacia web/ecommerce.
- **Oportunidad para Fabrika:** Ninguna de colaboración directa. Distintos mercados.

---

## Resumen estratégico para Fabrika

### Océano rojo (competencia directa intensa)

| Competidor       | Dónde compite directamente con Fabrika                          |
|------------------|-----------------------------------------------------------------|
| WordPress + Woo  | TODO: web, ecommerce, plugins, comunidad, precio, freelancers   |
| Elementor        | Editor visual, freelancers, WordPress, dynamic content          |
| Webflow          | Plataforma visual profesional, CMS, APIs, agencias, AI          |

### Océano azul (oportunidades de diferenciación)

1. **Multi-tenancy nativo para agencias** — NADIE lo tiene bien. Webflow lo está intentando, pero es caro y rígido. WordPress Multisite es un parche. Wix recién empieza.

2. **Seguridad y sandbox por defecto** — Todos los competidores tratan la seguridad como add-on o responsabilidad del usuario. Fabrika la convierte en FUNDAMENTO arquitectónico.

3. **IA multi-agente como plataforma, no como feature** — Todos ponen features de IA. Fabrika propone una fábrica multi-agente (Builder, Attacker, Defender, Auditor, Product, Orchestrator, etc.) como diferenciador de arquitectura, no como checklist de marketing.

4. **Providers + Adapters como capa de datos** — Nadie tiene una abstracción tipada y declarativa para conectar fuentes de datos. WordPress usa plugins, Shopify usa apps, Webflow usa APIs externas. Ninguno tiene el concepto de "Provider contract + Adapter".

5. **DSL declarativo abierto** — Los componentes de Fabrika son JSON validado por schema, generable por IA, y portable entre instalaciones. NADIE en el mercado ofrece esto. Webflow tiene export HTML, pero no DSL de componentes.

6. **Sin revenue share, sin comisiones** — Shopify cobra % de cada venta. Fabrika puede ofrecer suscripción plana con ecommerce ilimitado.

7. **Portabilidad real** — Exportación de componentes, templates, y sitios completos como DSL + assets. No solo "HTML estático" (Webflow) ni "nada" (Wix, Framer, Bubble).

### Posicionamiento recomendado para Fabrika

```
"La plataforma que WordPress querría ser si se reconstruyera hoy:
editor visual superior a Elementor, ecommerce nativo sin comisiones,
multi-tenancy para agencias, seguridad por diseño, e IA como fábrica multi-agente,
no como checklist de features."
```

---

## Notas metodológicas

- Precios y features verificados desde las páginas oficiales durante agosto 2026
- Las debilidades reflejan quejas comunes en G2, Trustpilot, Reddit, y foros de comunidad
- Las evaluaciones de lock-in son subjetivas y reflejan el costo/viabilidad de migrar una instalación típica
- El ranking prioriza el solapamiento con la propuesta de valor de Fabrika según CONTEXT.md
