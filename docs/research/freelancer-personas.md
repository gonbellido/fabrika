# Freelancer Personas — Fabrika

> Research document for product-market fit and positioning strategy.

---

## Persona 1: Diego, el constructor WordPress

### Name and role

**Diego Ramírez**, 34, freelance web developer. Builds sites for local businesses, professionals, and SMEs. Self-taught, learned WordPress 10 years ago and never looked back.

### Typical projects

- Corporate sites for SMEs (law firms, clinics, construction companies)
- Landing pages for product launches and events
- Restaurant and hospitality sites with menus and reservations
- Portfolio sites for photographers and architects
- 15–20 projects/year, average project: $1,200–$2,500

### Current tools and stack

- **WordPress** + **Elementor Pro** (primary builder)
- Astra o Hello Elementor como theme base
- Plugins: Yoast SEO, WP Rocket, Really Simple SSL, UpdraftPlus
- Hosting: SiteGround o Raiola Networks
- Google Analytics, Search Console
- Trello para gestión de proyectos con clientes
- Canva para gráficos rápidos

### Monthly revenue/budget

- Revenue: $3,000–$5,000/month
- Tool budget: $150–$250/month (hosting, Elementor Pro, plugin licenses, SaaS tools)
- No budget for in-house developers — Diego does everything himself

### Pain points

1. **Plugin hell is real.** Every site runs 15–25 plugins. A single update breaks a layout, a form stops working, or worse — the site goes blank. Diego has lost entire weekends debugging plugin conflicts.

2. **Security is a constant anxiety.** He's been hacked twice. Once through a vulnerable contact form plugin, once through a nulled premium plugin a client installed themselves. He now spends 2–3 hours per site per month on updates and security checks — unpaid maintenance time.

3. **Performance is a moving target.** Elementor is heavy. Getting a site to 90+ on PageSpeed means fighting against the builder itself: asset optimization, lazy loading hacks, cache warmup schedules. He's tired of explaining to clients why their "simple site" is slow.

4. **Client handoff is messy.** Clients always break something. They install a random plugin, change a global style, or delete a critical page. Diego has no way to give them a sandboxed editing experience. He ends up on WhatsApp at 10pm fixing things.

5. **Dynamic data requires heavy lifting.** When a client wants a product catalog or a team directory, Diego reaches for ACF + Custom Post Types + Elementor dynamic tags. It works, but every change is fragile and the data-entry UX for clients is terrible.

6. **No real preview workflow.** Clients see the site as Diego builds it, or they wait. There's no clean "share a preview link, get feedback, publish" flow. Revisions exist but are clunky.

### Decision criteria for adopting a new platform

| Criterion                                                              | Priority     |
| ---------------------------------------------------------------------- | ------------ |
| Can replicate what I do in Elementor without fighting the tool         | Deal-breaker |
| Built-in security, no plugin patching                                  | High         |
| Client can edit content safely without breaking design                 | High         |
| Performance out of the box (90+ PageSpeed without extra work)          | High         |
| One predictable monthly price, not death by a thousand plugin renewals | Medium       |
| Dynamic data (catalogs, directories, blogs) without custom code or ACF | Medium       |
| Migration path — can I bring existing WordPress content over?          | Medium       |
| Spanish-language admin and client interface                            | Medium       |

### Deal-breakers

- Cannot build a full corporate site (10+ pages, blog, contact form, basic SEO)
- Lock-in: no way to export content or hosting portability
- Can't use my own domain or hosting
- Learning curve exceeds 1–2 days for basic proficiency
- No blog/MDX capability — many clients need a blog
- Forced to use a specific hosting provider

### Ideal Fabrika workflow

1. Diego creates a new **Site** in Fabrika for "Clínica Dental Sonrisa".
2. He browses **Templates** from the marketplace and finds a dental clinic template with pre-wired sections: hero, services grid, team cards, testimonials carousel, contact form, and blog.
3. He instantiates it. The AI (**Builder Agent**) suggests content adaptations based on the client's Google My Business listing and existing social media.
4. Diego customizes colors, typography, and imagery in the **Panel** while watching changes live on the **Canvas**.
5. For the team section, he connects a **Provider** (`team-members`) to the card component. The client will manage team members from a simple admin form — no ACF, no CPTs.
6. He generates blog post templates and sets up SEO metadata per page.
7. He shares a **Preview** link with the client. The client leaves comments on specific sections.
8. Diego iterates, then hits **Publish**. The site is live, versioned, and Diego can **Rollback** if needed.
9. The client gets a restricted editor login where they can update team members, blog posts, and hours — but cannot touch layout or styles. No WhatsApp emergencies.
10. Diego's monthly maintenance drops from 3 hours to 30 minutes per site.

---

## Persona 2: Carmen, la especialista ecommerce

### Name and role

**Carmen Vega**, 41, ecommerce freelancer. Builds and manages online stores for fashion brands, organic food producers, and niche DTC brands. Comes from a business background, not technical. Learned WooCommerce out of necessity.

### Typical projects

- WooCommerce stores (30–500 products)
- Multilingual stores (Spanish + English, occasionally Catalan or French)
- Marketplace integrations (Amazon, Google Shopping, Meta Shops)
- Seasonal campaign landing pages with countdowns and offers
- 8–12 projects/year, average project: $3,500–$8,000
- 3–4 retainer clients at $400–$800/month for maintenance and optimization

### Current tools and stack

- **WordPress** + **WooCommerce** + Elementor Pro
- Plugins: WPML (multilingual), WooCommerce Subscriptions, Stripe & Redsys gateways, Mailchimp for WooCommerce, Rank Math SEO, WP Rocket
- Hosting: SiteGround Cloud or Cloudways (VPS)
- Klaviyo for email marketing automation
- Google Merchant Center, Meta Commerce Manager
- Notion for client project tracking

### Monthly revenue/budget

- Revenue: $4,500–$8,000/month
- Tool budget: $300–$500/month (hosting VPS, WPML, premium plugins, email marketing, stock photos)
- Occasionally hires a freelance developer for custom WooCommerce hooks or API integrations ($200–$500/project)

### Pain points

1. **WooCommerce is a house of cards.** Every update risks breaking payment gateways, shipping calculators, or tax rules. Carmen has a staging environment for every store and spends hours testing updates before applying them. A failed update during a campaign is a revenue disaster.

2. **Plugin licensing is a nightmare to track.** Each store has 8–15 premium plugins. Different renewal dates, different license models (single site, 5-pack, unlimited). She maintains a spreadsheet just to track what expires when. Two clients' stores went down last year because of expired WPML licenses that broke the multilingual setup.

3. **Performance at scale is brutal.** A store with 200+ variable products and WPML creates enormous database queries. Even with Redis caching and a VPS, product listing pages crawl. Carmen has spent $2,000+ on speed optimization consultants.

4. **No real multi-tenant management.** She manages 14 stores across 10 clients. Each has its own WordPress instance, its own admin, its own updates, its own backups. There's no dashboard where she can see all stores at a glance. She logs into 14 different wp-admin panels daily.

5. **Client training is exhausting.** Every new client needs a 2-hour WooCommerce admin training session. And they still mess it up: they delete variations instead of editing them, upload 5MB product images, or change the currency setting because "it looked wrong."

6. **Multilingual ecommerce is painful and expensive.** WPML + WooCommerce costs $200+/year in licenses alone. Translating product variations, shipping classes, and emails is tedious. And the performance hit from WPML on a product catalog is significant — often 40–60% slower page loads.

7. **Security is high-stakes.** A compromised store means stolen customer data, PCI compliance nightmares, and destroyed client trust. Carmen has had clients' stores targeted by Magecart-style card skimmers injected through outdated plugins.

### Decision criteria for adopting a new platform

| Criterion                                                             | Priority     |
| --------------------------------------------------------------------- | ------------ |
| Native multilingual support, no plugin needed                         | Deal-breaker |
| Ecommerce core features: products, variants, cart, checkout, payments | Deal-breaker |
| Multi-store management dashboard (single login, all stores)           | High         |
| Payment gateway ecosystem (Stripe, Redsys, PayPal, Bizum)             | High         |
| Performance with 500+ products and multiple languages                 | High         |
| Built-in security, no plugin patching, PCI-compliant by default       | High         |
| Adapter ecosystem to connect external inventory/ERP systems           | Medium       |
| Client role that can manage products/orders but not break settings    | Medium       |
| Migration from WooCommerce (products, orders, customers)              | Medium       |
| Abandoned cart recovery, email automation built-in or via adapter     | Medium       |

### Deal-breakers

- No ecommerce or ecommerce is MVP-level (missing variants, tax rules, shipping zones)
- Cannot connect to Spanish payment gateways (Redsys is non-negotiable)
- Multilingual requires a separate plugin or adds per-language cost
- No way to migrate existing WooCommerce data
- Locked into a specific payment processor with no BYO gateway option
- No staging → production promotion workflow

### Ideal Fabrika workflow

1. Carmen creates a new **Tenant** for "VerdeOrgánico", an organic food brand launching DTC.
2. She installs the **Ecommerce Module** in the tenant. Fabrika provisions the product catalog, cart, checkout, and order management capabilities.
3. She browses the ecommerce **Template** section and picks a "clean food brand" template. The template includes: product grid, collection pages, cart drawer, checkout flow, and order confirmation.
4. Carmen configures the **Adapter** for Stripe and Redsys. Both gateways pass through the `payment.process` capability — Fabrika enforces security at the capability level, never exposing raw API keys to the frontend.
5. She imports 200 products from the client's old WooCommerce store via the WooCommerce **Adapter**. Products, categories, customer accounts, and order history migrate.
6. She enables **multilingual** at the Site level (ES, CA, EN). The product catalog and page content are translatable from a unified translation UI — no WPML, no string scanning, no per-language performance penalty.
7. She sets up a **Provider** for `inventory` that reads from the client's ERP via a custom adapter. Stock levels are always live.
8. She shares a **Preview** of the store. The client reviews on mobile and desktop. Carmen toggles **Feature Flags** to test a new product recommendation section only for internal users before launching publicly.
9. Store launches. Carmen's multi-tenant dashboard shows all her stores' health: orders today, performance scores, security status, plugin update needs. One login, 14 stores.
10. Monthly retainer work drops from 15 hours to 4 hours per client. Carmen can now take on 5 more stores without hiring.

---

## Persona 3: Lucía, la diseñadora que codea

### Name and role

**Lucía Mendes**, 29, UI/UX designer with frontend skills. Designs in Figma, then builds in Webflow or writes HTML/CSS/JS directly. Takes on projects that require custom design — templates feel "soul-less" to her and her clients. Has strong opinions about typography, spacing, and animation.

### Typical projects

- Brand identity + website packages for startups and creative studios
- Microsites and interactive landing pages with animations
- Portfolio sites for artists, architects, and creative agencies
- Small custom ecommerce (3–15 products, high-design)
- 8–10 projects/year, average project: $4,000–$10,000
- Also does pure design handoff (Figma files only) at $1,500–$3,000

### Current tools and stack

- **Figma** + **FigJam** (design, prototyping, client feedback)
- **Webflow** (primary build tool for production sites)
- **Framer** (experimenting, mostly for personal projects and microsites)
- HTML/CSS/JS for custom interactions Webflow can't handle
- Lottie/SVG animations, GSAP for scroll animations
- GitHub Pages o Vercel para hosting estático
- Notion para project management, Slack para clientes

### Monthly revenue/budget

- Revenue: $4,500–$9,000/month
- Tool budget: $150–$300/month (Figma Pro, Webflow Workspace, Adobe CC, domain registrar, Vercel Pro)
- Occasionally subcontracts a backend developer for custom integrations ($500–$1,500/project)

### Pain points

1. **Webflow's CMS is rigid and client-unfriendly.** The CMS structure has to be planned upfront. Changing a collection schema later is painful. And clients find the Webflow Editor confusing — they still call her to change a button color or swap an image that "should be editable."

2. **Design-to-code gap still exists.** Lucía designs rich interactions in Figma (parallax, scroll-triggered reveals, staggered animations). Replicating them in Webflow means fighting with the interactions panel for hours, or writing custom code that Webflow wraps in extra divs and breaks later.

3. **Client handoff is worse than WordPress.** In Webflow, if a client gets Editor access, they can still mess up spacing, delete sections accidentally, and there's no fine-grained permission model. Lucía has to lock down almost everything.

4. **No real ecommerce for design-forward stores.** Webflow Ecommerce is expensive ($42+/month for basic ecommerce, plus transaction fees) and feels bolted on. Shopify is powerful but ugly to customize without a dev. There's no middle ground for "I need a beautiful 10-product store without a backend developer."

5. **Dynamic content is limited.** Webflow's CMS handles blogs and portfolios, but anything beyond that (user-generated content, custom queries, related content logic) requires third-party tools or custom code. Lucía wants more data flexibility without becoming a backend developer.

6. **Vendor lock-in anxiety.** If Webflow raises prices or changes its model (again), Lucía's entire portfolio is trapped. She can export HTML/CSS but loses all CMS functionality. No true export with data intact.

7. **Collaboration is solo by design.** Figma has multiplayer, but Webflow is single-player. She can't work on the same site simultaneously with a collaborator. Client feedback lives in Figma comments, but implementation is a black box until she publishes.

### Decision criteria for adopting a new platform

| Criterion                                                                                    | Priority     |
| -------------------------------------------------------------------------------------------- | ------------ |
| Design freedom — pixel-level control, custom animations, no grid/breakpoint limits           | Deal-breaker |
| CMS that clients can actually use without breaking things                                    | Deal-breaker |
| Figma-like collaboration: real-time multiplayer, comments on canvas                          | High         |
| Export and hosting portability — no lock-in                                                  | High         |
| Design-forward ecommerce: beautiful product pages, custom checkout styling                   | High         |
| Component variant system (like Figma components) for reusable design patterns                | High         |
| Easing/animation timeline editor (not just presets)                                          | Medium       |
| Code export for custom interactions when the GUI isn't enough                                | Medium       |
| Asset management (CDN, responsive images, WebP/AVIF automatically)                           | Medium       |
| AI as an assistant — not to replace design, but to generate variations and handle grunt work | Low          |

### Deal-breakers

- Limited design control: grid/layout constraints that block pixel-perfect work
- No animation timeline editor or custom CSS override
- CMS that can't handle relational content or custom content types
- Ecommerce that looks like a generic template
- No export option — must be able to take site and host elsewhere
- Forced to use pre-made templates/components only

### Ideal Fabrika workflow

1. Lucía designs the full site in Figma: 12 pages, component variants, responsive breakpoints, animation specs, and a design system with tokens.
2. She opens Fabrika and creates a new **Site**. Instead of starting from a template, she starts with a blank canvas and a design system configuration.
3. She configures her design tokens (colors, typography scale, spacing scale, shadows) in Fabrika. These become the primitives for all components.
4. Using the **Canvas** and **Panel**, she builds custom **Components** that match her Figma design system: a hero variant family, card grids with staggered animations, a mega menu, a custom gallery with lightbox. She writes custom CSS for micro-interactions using Fabrika's code override panel.
5. For client-editable content (team bios, project case studies, service descriptions), she creates **Providers** with structured fields. The content model mirrors her Figma data structure exactly — no mapping gymnastics.
6. She shares a **Preview** link. The client comments directly on the Canvas, Figma-style. Lucía sees comments in real time and resolves them as she iterates.
7. For the "Tienda" section (10 artisan products), she enables the **Ecommerce Module**. She styles the product grid, product detail page, cart, and checkout to match her design system — not a generic theme override.
8. Before launch, she uses the **Testing Agent** to run responsive regression tests across devices, accessibility checks, and visual diffs against her Figma reference frames.
9. Site publishes. The client has a clean Editor interface: they can add projects, update products, and write blog posts. They cannot touch layout, spacing, or typography. Lucía's phone stops buzzing.
10. Six months later, the client wants a redesign. Lucía opens the existing Site, duplicates it as a new draft, redesigns on top of the same content, and swaps when ready. Content and design are separate layers — she never touches the data.

---

## Persona 4: Martín y Asociados, la agencia boutique

### Name and role

**Martín Oliveira** and **Sofía Reyes**, co-founders of "Estudio Línea," a 6-person agency in Barcelona. They serve 20–25 active clients with a mix of corporate sites, ecommerce stores, and web apps. Martín handles business development and client relationships. Sofía oversees production and the dev team (2 mid-level devs, 1 junior, 1 designer).

### Typical projects

- Corporate websites for mid-market companies (15–40 pages, multilingual, complex content structures)
- Ecommerce stores (100–2,000 products, B2B and B2C)
- Custom web applications (booking systems, client portals, membership platforms)
- Digital transformation projects: moving offline businesses online
- 25–35 projects/year, average project: $8,000–$25,000
- Retainer revenue: $8,000–$15,000/month across maintenance contracts

### Current tools and stack

- **WordPress** + custom Gutenberg blocks for corporate sites
- **WooCommerce** + custom plugins for ecommerce
- **Laravel** + **Livewire** for custom web applications
- **Next.js** + headless WordPress for performance-critical projects
- Figma for design, GitHub for version control, Linear for project management
- WP Engine and Cloudways for hosting
- ManageWP for multi-site monitoring
- Slack, Loom, Notion for internal and client communication

### Monthly revenue/budget

- Revenue: $25,000–$45,000/month
- Tool budget: $1,200–$2,000/month (hosting, SaaS, plugin licenses, design tools, dev tools, client communication)
- Salary budget: $15,000–$22,000/month for 6 people

### Pain points

1. **Multi-site maintenance is a scaling bottleneck.** With 35+ WordPress instances to maintain, the team spends 80+ hours/month on updates, backups, security patches, uptime monitoring, and client requests. This is either unbilled overhead or eats into retainer profitability.

2. **No consistency across projects.** Every site is a custom snowflake: different theme frameworks, different plugin stacks, different build processes. Onboarding a new developer takes 3–4 weeks. Handing off a project between developers is painful. Institutional knowledge lives in people's heads, not in the stack.

3. **Security incidents are costly and reputation-damaging.** In the last 2 years: one client's site was defaced through a vulnerable contact form, another had customer data exfiltrated via a compromised backup plugin. Each incident cost $3,000–$5,000 in emergency response time and client goodwill. They now pay for a third-party security service ($200/month) but still worry.

4. **Plugin licensing and compliance is a part-time job.** Tracking 35 sites × ~15 plugins each × different vendors × different renewal dates × different license tiers = a spreadsheet from hell. They've been audited by a plugin vendor who found unlicensed instances on staging sites.

5. **Client expectations vs. WordPress reality gap is widening.** Clients see Wix and Squarespace ads and expect drag-and-drop simplicity. They see Shopify and expect integrated commerce. They see Webflow and expect design precision. WordPress requires a team of professionals to achieve any of these — and clients don't understand why.

6. **Headless architecture overhead.** For performance-critical projects, the headless WP + Next.js stack works, but it doubles development time and creates a bifurcated team (WordPress devs vs. React devs). They can't afford to go fully headless, but can't ignore the performance gap either.

7. **The "we're a WordPress agency" positioning trap.** Harder to differentiate, harder to command premium pricing. Clients compare them to freelancers who charge $1,500 for an Elementor site. "Why are you 10x more expensive for the same platform?"

8. **No white-label client experience.** Clients log into wp-admin, see WordPress branding, are confused by the sidebar, can break things. Estudio Línea has spent $15,000+ building custom admin UIs with ACF Options Pages and Admin Columns just to make the backend usable.

### Decision criteria for adopting a new platform

| Criterion                                                                         | Priority     |
| --------------------------------------------------------------------------------- | ------------ |
| Multi-tenant dashboard: all clients, all sites, one interface                     | Deal-breaker |
| Role-Based Access Control: client editor vs. agency admin vs. developer           | Deal-breaker |
| Consistent development framework across all projects — no more snowflakes         | Deal-breaker |
| Built-in security model, no plugin patching                                       | High         |
| Team collaboration: simultaneous editing, version history, review workflow        | High         |
| White-label client experience (branded admin, branded preview, no platform logos) | High         |
| Extensibility: can build custom providers, adapters, and sandboxed modules        | High         |
| Performance baseline: 90+ PageSpeed without custom optimization per project       | High         |
| Migration tooling: WordPress → Fabrika for content, products, users               | Medium       |
| Infrastructure flexibility: self-hosted option or bring-your-own-cloud            | Medium       |
| Marketplace for reusable templates and modules across agency projects             | Medium       |
| API-first: headless consumption of Fabrika content from custom frontends          | Medium       |

### Deal-breakers

- No multi-tenant management — must be able to manage all clients from a single interface
- No fine-grained RBAC (client, editor, developer, admin roles)
- Cannot build custom capabilities or extend the platform with custom modules
- No white-label option (client-facing side must not show Fabrika branding)
- Vendor lock-in on hosting — must be able to deploy to own infrastructure or private cloud
- No migration path from WordPress
- Per-site pricing that makes $1,500 projects unprofitable (needs agency pricing model)

### Ideal Fabrika workflow

1. **Onboarding a new client.** Martín closes a deal with "Hotel Marítimo," a 40-room boutique hotel needing a website, booking system, and multilingual content (ES, EN, DE). Estudio Línea creates a new **Tenant** for the client in Fabrika.

2. **Team kickoff.** Sofía assigns the project to Laura (designer) and Carlos (developer). Both can work on the same **Site** simultaneously — Laura on layout and styles, Carlos on data bindings and the booking adapter. They use **Comments** on the Canvas for async handoff.

3. **Design system setup.** Laura configures the design tokens and builds a component library from the Figma design: room cards, testimonial blocks, facility icons, a booking widget. Components are reusable across this project and saved to the agency's private **Marketplace** for future hotel clients.

4. **Data layer.** Carlos creates **Providers** for `rooms`, `availability`, `booking`, and `reviews`. The `booking` provider connects via an **Adapter** to the hotel's existing PMS (property management system). The adapter runs in a **Sandbox** with explicit capabilities: `bookings.read`, `bookings.write`. The auditor agent validates the security boundary.

5. **Client review.** Martín shares a **Preview** link. The hotel marketing manager reviews on their phone, leaves comments on specific sections, and requests changes. Sofía approves the feedback round and Carlos iterates.

6. **Testing gate.** Before launch, the pipeline runs through the **Quality Gates**: the Testing Agent runs responsive, accessibility, and visual regression tests; the Security Agent verifies the sandbox boundaries; the Auditor Agent signs off. No surprises on launch day.

7. **Launch and handoff.** Site publishes. The hotel staff gets a white-labeled Editor login (no Fabrika branding) where they can update room descriptions, photos, seasonal rates, and special offers. They cannot modify layout, break the booking adapter, or access other tenants.

8. **Ongoing management.** From the agency dashboard, Sofía sees all 25 client sites: which are on latest version, which have pending updates, performance scores, security status. One-click rollouts for patches. A plugin vulnerability? She sees exactly which sites are affected and patches them in one operation.

9. **Scaling.** The next time Estudio Línea pitches a hotel, they clone the existing templates, providers, and adapters. Project setup drops from 3 days to 3 hours. Institutional knowledge is baked into reusable modules, not scattered across Slack channels and Notion docs.

10. **Product differentiation.** Estudio Línea no longer sells "WordPress sites." They sell "digital platforms built on Fabrika" — a proprietary stack with built-in security, multi-language, and client self-service. Average project price increases 20–30% because the value proposition is clearer and the competitive comparison disappears.

---

## What Would Make a Freelancer Switch from WordPress to a New Platform?

### Top 5 Migration Triggers

#### 1. A security breach or near-miss

**The trigger:** The freelancer's site (or a colleague's site) gets hacked. Customer data leaks. Google blacklists the domain. The client is furious. The freelancer spends a weekend in crisis mode.
**The moment of decision:** They realize they're one plugin vulnerability away from losing their business. A platform that guarantees security at the architectural level — not via patches and hope — becomes non-negotiable.
**What Fabrika offers:** Sandbox isolation, capability-based permissions, no executable plugin code, security at the platform layer.

#### 2. Plugin fatigue reaching a breaking point

**The trigger:** A critical client site goes down because three plugins updated overnight and conflicted. Or the freelancer realizes they spend 30% of their workweek on maintenance, updates, and compatibility testing. Or a plugin they depend on gets abandoned by its developer.
**The moment of decision:** The "WordPress is free" illusion shatters. They do the math and realize their tool stack costs more than a SaaS platform would, and the hidden maintenance cost dwarfs everything else.
**What Fabrika offers:** Modules and adapters as first-party platform features, no plugin compatibility matrix, unified updates.

#### 3. Landing a project WordPress can't handle well

**The trigger:** A client wants something WordPress does poorly: real-time collaboration, complex relational data, fine-grained user permissions, a truly multilingual site without performance penalties, or a design that requires pixel-level control without fighting the CMS.
**The moment of decision:** The freelancer prototypes in Webflow or builds a custom app by stitching tools together. They enjoy the experience and start questioning why they tolerate WordPress for simpler projects too.
**What Fabrika offers:** Unified visual editing + data layer + fine-grained permissions. The "WordPress can't do this, so I need a different tool" gap closes.

#### 4. A competitor using a modern platform wins their client

**The trigger:** A prospective client says: "We're going with Agency X instead. They showed us a demo on [modern platform] and we could edit content ourselves. Their turnaround was 2 weeks faster. Their demo just felt more polished."
**The moment of decision:** The freelancer realizes WordPress is becoming a competitive liability. Clients don't care about platforms — they care about speed, control, and results. If a competitor delivers that better on a different stack, the freelancer must adapt or lose deals.
**What Fabrika offers:** Faster project delivery (templates + AI assistance), client self-service editing, performance out of the box, modern demo experience.

#### 5. A pricing or business model change in their stack

**The trigger:** Elementor raises prices. WP Engine changes its plan structure. A critical plugin moves to a per-domain SaaS model. The cumulative tool cost crosses a psychological threshold ($300/month? $500/month?).
**The moment of decision:** The freelancer reevaluates their entire tool stack. If a comparable or better platform costs less or offers more predictable pricing, the switching calculus flips. The "better the devil you know" argument weakens when the known devil gets expensive.
**What Fabrika offers:** Predictable pricing (single platform fee vs. plugin licensing chaos), no per-plugin costs, no hidden infrastructure costs.

### Honorable Mention Triggers

- **Client demands better editing UX:** A high-value client threatens to leave because they hate WordPress admin and want something "like Squarespace."
- **Performance ultimatum from Google:** Core Web Vitals become a ranking factor and the freelancer's portfolio sites all fail. The cost of fixing WordPress performance exceeds switching costs.
- **Burnout from context-switching:** Managing 15+ different plugin configurations, hosting environments, and client admin setups becomes mentally unsustainable. Simplicity becomes the killer feature.
- **AI FOMO:** The freelancer sees peers using AI-powered platforms to generate site drafts, suggest copy, and automate optimizations. WordPress feels stuck in 2015 by comparison.

---

## Summary Matrix

| Persona       | Projects/year | Avg. project  | Monthly revenue | Primary pain                              | Switch trigger                               |
| ------------- | ------------- | ------------- | --------------- | ----------------------------------------- | -------------------------------------------- |
| Diego         | 15–20         | $1,500–$2,500 | $3K–$5K         | Plugin hell + security anxiety            | Security breach + plugin fatigue             |
| Carmen        | 8–12          | $4K–$8K       | $4.5K–$8K       | WooCommerce fragility + multilingual cost | Store outage + licensing chaos               |
| Lucía         | 8–10          | $5K–$10K      | $4.5K–$9K       | Design-to-code gap + CMS rigidity         | Losing a premium client to Webflow agency    |
| Estudio Línea | 25–35         | $10K–$25K     | $25K–$45K       | Multi-site scaling + team consistency     | Competitor differentiation + margin pressure |

---

## Key Takeaways for Fabrika Positioning

1. **Security is the wedge.** Every persona has security pain. WordPress's plugin model is the root cause. Fabrika's architectural security (sandboxed extensions, capability-based permissions) is the single strongest differentiation. Lead with it.

2. **"Plugin-free" is a feature, not an absence.** Don't market "no plugins." Market "everything you need, built in, maintained by us, no compatibility matrix." The positive framing: "Unified platform" not "plugin-free platform."

3. **Client self-service is the conversion unlock.** Every persona struggles with client handoff and post-launch support. A platform that lets clients safely edit content without breaking design turns maintenance from a cost center into a retention tool.

4. **Agency needs are distinct and high-value.** Estudio Línea spends $3K+/month on tools and 80+ hours on maintenance. A platform that cuts that by 70% justifies a premium price. Multi-tenancy, RBAC, and white-label are table stakes for this segment.

5. **Migration cannot be ignored.** Every persona mentioned migration anxiety. A WordPress → Fabrika migration tool (even a partial one: content, users, basic pages) removes the biggest psychological barrier to trial.

6. **Spanish/localization matters for the target market.** Diego and Carmen need Spanish admin interfaces and Spanish payment gateways (Redsys). If Fabrika launches in the Spanish-speaking market, localization isn't optional — it's a growth lever.
