# AGENTS.md

Guidance for agents working in this repository. Follow it when adding pages, maps, styles, or frontend behaviour.

This repo is a proof of concept for progressively enhanced maps on GOV.UK. Treat every change as if it could ship as a public-sector service: use GOV.UK Frontend, keep HTML working without JavaScript, and meet accessibility requirements.

## Project

PE-Maps serves GOV.UK-styled example map pages. The homepage lists examples. `/basic-map` shows the [Defra Interactive Map](https://defra.github.io/interactive-map/) centred on London.

Stack:

- Node.js 22+ (see `.nvmrc` / `.node-version`)
- TypeScript ESM
- Express
- Nunjucks and GOV.UK Frontend macros
- `@defra/interactive-map` with MapLibre

This POC uses Express. [Defra’s software development guidance](https://digital.defra.gov.uk/software-development) prefers Node.js with Hapi for live Defra services. Do not introduce Vue, React, or other client-side SPA frameworks.

## Commands

```bash
npm install          # exact pins; preinstall checks lockfile SHAs
npm start            # build + serve at http://localhost:3000
npm run dev          # rebuild on view/client changes
npm run build        # render pages, copy assets, Brotli-compress
npm run maps:static  # regenerate no-JS map PNGs from OpenStreetMap tiles
npm run typecheck
npm run check:deps
```

Do not use version ranges (`^`, `~`) in `package.json`. `.npmrc` sets `save-exact=true`. Upgrades must keep lockfile `integrity` hashes in sync with the npm registry.

## Layout

| Path | Purpose |
| --- | --- |
| `views/` | Nunjucks pages. `index.njk` is the homepage; add examples as sibling templates |
| `views/layouts/base.njk` | GOV.UK page template, phase banner, GOV.UK CSS/JS |
| `assets/stylesheets/govuk-override.css` | Custom CSS that overrides GOV.UK Frontend and page styles via the cascade |
| `assets/images/static-maps/` | Cached no-JS map PNGs. `npm run build` copies these; it does not fetch OpenStreetMap tiles unless a map is new or has changed |
| `src/build.ts` | Bundles client JS, copies assets, renders HTML, writes `.br` files |
| `src/server.ts` | Serves `public/` with Brotli when `Accept-Encoding: br` |
| `src/client/` | Browser TypeScript (ESM, bundled by esbuild) |
| `public/` | Generated. Do not edit. Gitignored |

To add an example map:

1. Add `views/<name>.njk` extending `layouts/base.njk`.
2. Register it in the `pages` list in `src/build.ts` and in `src/maps/static-map-definitions.ts`.
3. Link it from the homepage task list in `views/index.njk`.
4. Load map CSS/JS only on that page (`pageStyles`, `mapLoading`, `pageScripts`). Do not put `im-is-loading` on pages without a map.
5. After the first build (or `npm run maps:static`), commit the PNG and `.json` hash in `assets/images/static-maps/` so later builds do not fetch OpenStreetMap tiles.

Clean URLs: `/basic-map` serves `public/basic-map.html`.

## Frontend conventions

- Extend `govuk/template.njk` via `layouts/base.njk`.
- Use GOV.UK Frontend Nunjucks macros, not hand-rolled HTML that copies a component. Get markup from the [Design System](https://design-system.service.gov.uk/) Nunjucks tab.
- Sanitise any HTML passed into macros (`html` options).
- Use Design System CSS classes (`govuk-heading-*`, `govuk-body`, grid) for layout and typography. Do not invent a parallel visual language.
- Put all custom CSS in `assets/stylesheets/govuk-override.css`. Do not use inline `<style>` blocks or page-level stylesheets for overrides. Load it last in the `<head>` (after GOV.UK Frontend and page CSS) so the cascade wins. Do not use `!important`.
- Initialise GOV.UK Frontend with `initAll()` from `govuk-frontend.min.js`.
- Pin GOV.UK Frontend and Interactive Map to exact versions.
- Do not copy, compress, or serve JS/CSS source maps. Strip `sourceMappingURL` comments from copied CSS/JS.
- Serve precompressed `.br` for HTML, CSS, JS, SVG, and JSON. Leave WOFF2/PNG uncompressed. Send `Content-Encoding: br` and the original `Content-Type`.
- JavaScript in this repo is ESM.

## Building government services

Follow these standards in order. They apply to public-facing and internal services.

### Government Design Principles

From the [Government Design Principles](https://www.gov.uk/guidance/government-design-principles):

1. Start with user needs.
2. Do less — reuse platforms and components; do not reinvent solved problems.
3. Design with data.
4. Do the hard work to make it simple.
5. Iterate, then iterate again.
6. This is for everyone — accessible design is good design.
7. Understand context (device, place, digital skill).
8. Build digital services, not websites — cover the whole user journey, including offline.
9. Be consistent, not uniform — use GOV.UK patterns; share improvements.
10. Make things open.
11. Minimise environmental impact.

### Service Standard

The [Service Standard](https://www.gov.uk/service-manual/service-standard) is how services are assessed. For work in this repo, the points that constrain code and content are:

| Point | What it means here |
| --- | --- |
| 4. Simple to use | GOV.UK layout, style, and language. Users should succeed first time. |
| 5. Everyone can use it | WCAG 2.2 AA, assistive tech, no exclusion. Assisted digital is separate from accessibility. |
| 9. Secure, private | No secrets in git. HTTPS in production. Minimise personal data. |
| 11. Right tools | Prefer common government components. Understand total cost of ownership. Avoid lock-in. |
| 12. Open source | Write in the open. Do not commit credentials. |
| 13. Common components | GOV.UK Design System + Defra Interactive Map before custom UI. |
| 14. Reliable | Progressive enhancement so the service still works when JS/CSS fail. |

Read the full 14 points before designing a new journey. The [Service Manual](https://www.gov.uk/service-manual) is the how-to for the Standard (design, technology, accessibility, agile, research, the team).

### GOV.UK Design System

Use the [GOV.UK Design System](https://design-system.service.gov.uk/) for styles, components, and patterns.

- Install GOV.UK Frontend from npm and use the page template plus macros ([production setup](https://design-system.service.gov.uk/get-started/production/)).
- Do not use GOV.UK Template, Frontend Toolkit, or Elements.
- Components are accessible and responsive when used as documented. Changing them can break that.
- Prefer existing patterns (start pages, question pages, there is a problem with the service, page not found) over new page types.
- Follow the [GOV.UK style guide](https://www.gov.uk/guidance/style-guide) for content: plain English, sentence case, no “click here”.

### Progressive enhancement (mandatory)

All government services must follow [progressive enhancement](https://www.gov.uk/service-manual/technology/using-progressive-enhancement), even if a parent service uses JavaScript.

1. **HTML first.** A user must be able to complete the core task with HTML only. Semantic markup, logical source order, working links and forms.
2. **Then CSS.** GOV.UK styles. Avoid CSS-in-JS so the page still looks correct if JavaScript fails.
3. **Then JavaScript.** Enhance existing HTML. If JS errors or is blocked, the rest of the page must still work.

Do not build single-page applications. SPAs break assistive technology, focus, and back/forward.

Do not require a client-side framework for GOV.UK pages. The Design System does not need one.

Maps: the map canvas needs JavaScript. The page around it must not. Provide a non-visual alternative for essential information (address, list, table). Never hide the whole document behind `im-is-loading` unless that page actually initialises the map.

### Accessibility (legal)

Public sector websites and apps must meet the [Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018](https://www.gov.uk/guidance/accessibility-requirements-for-public-sector-websites-and-apps). That means:

- Meet [WCAG 2.2 level AA](https://www.gov.uk/service-manual/helping-people-to-use-your-service/understanding-wcag) (perceivable, operable, understandable, robust).
- Publish and keep an accessibility statement (from public beta).
- The Equality Act 2010 (DDA 1995 in Northern Ireland) still requires reasonable adjustments even where a WCAG exception applies.

[Making your service accessible](https://www.gov.uk/service-manual/helping-people-to-use-your-service/making-your-service-accessible-an-introduction):

- Include disabled people in research.
- Test with assistive technologies (screen readers, magnifiers, speech recognition).
- Run automated and manual checks as you build ([testing for accessibility](https://www.gov.uk/service-manual/helping-people-to-use-your-service/testing-for-accessibility)). Automated tools are not enough.
- Get an accessibility audit before public beta.

Practical checks for this frontend:

- Keyboard only, visible focus, skip link.
- Colour is not the only indicator; sufficient contrast.
- Descriptive page titles, headings, and link text.
- Form fields have associated labels; errors are clear.
- Images have meaningful alt text, or empty alt if decorative.
- Do not flash content. Honour reduced motion where the map allows it.
- Interactive targets are large enough.

**Maps:** the regulations list maps among content you might not need to “fix” as images, but you must still provide essential information in an accessible format (for example an address or list). Defra is explicit: [“Maps are exempt” is a misunderstanding](https://digital.defra.gov.uk/accessibility). Use the Interactive Map and a non-visual alternative. Internal tools are not exempt.

### Assisted digital

[Assisted digital support](https://www.gov.uk/service-manual/helping-people-to-use-your-service/assisted-digital-support-introduction) is help to use the *online* service (phone, in person, sometimes webchat). It is not a substitute for an accessible interface.

Anyone may need it if they lack trust, confidence, access, skills, or motivation. Design the UI so most people can succeed without that help. Do not assume a map-only journey is enough.

### Technology Code of Practice

The [Technology Code of Practice](https://www.gov.uk/guidance/the-technology-code-of-practice) applies to government technology work:

1. Define user needs.
2. Make things accessible and inclusive.
3. Be open and use open source.
4. Use open standards.
5. Cloud first.
6. Make things secure.
7. Make privacy integral.
8. Share, reuse and collaborate.
9. Integrate and adapt.
10. Make better use of data.
11. Define purchasing strategy.
12. Make technology sustainable.
13. Meet the Service Standard.

For this repo that means: reuse GOV.UK Frontend and Defra Interactive Map, keep code open, avoid new proprietary map stacks, and do not add heavy client JS without a user-need case.

### Digital assurance

From 1 April 2026, line-by-line digital spend controls are replaced by organisation-owned assurance and a central pipeline ([Digital Assurance Playbook](https://www.gov.uk/government/publications/digital-assurance-playbook/digital-assurance-playbook)).

Agents will not operate the pipeline, but code should still stand up to what assurers test:

- Clear outcomes; no duplicate government components.
- Alignment with the Service Manual, TCoP, and accessibility law.
- Cloud-first, Secure by Design, no new legacy.
- Accessibility regulations met; suppliers’ UI included.

Pipeline reporting threshold is £5m whole-life cost (and £0 for cryptographic products). Assurance itself is proportionate to risk and should start before discovery or procurement.

### Defra

From the [Defra digital service manual](https://digital.defra.gov.uk/):

- Meet the Service Standard and TCoP.
- Use GOV.UK Frontend Nunjucks templates and vanilla JavaScript.
- Do not use Vue or React for Defra frontends.
- Prefer Defra common tools: Interactive Map for mapping, Defra Forms for forms, Customer Identity for external auth.
- Code in the open; keep a README and architecture decisions for real services.
- Live Defra services typically sit on the Core Delivery Platform (Hapi, not Express).

The [Defra Interactive Map](https://defra.github.io/interactive-map/) is beta. Pin a specific version (for example `0.0.48-alpha`). Use `mapLabel`. Initialise only when the map container exists. Use a MapLibre provider unless there is a reason not to.

### Browsers

Test public services in the [current GDS browser list](https://www.gov.uk/service-manual/technology/designing-for-different-browsers-and-devices) (Chrome, Safari, Edge, Firefox, Samsung Internet on the listed OS). Small visual differences are fine; users must still complete the task. Use analytics before dropping a browser.

## Security and privacy

- Never commit API keys, `.env` files, or credentials.
- Do not log personal data.
- Prefer server-rendered HTML over shipping PII to the client.
- If cookies or analytics are added, follow GOV.UK cookie guidance and Defra cookie-banner patterns.

## When you are unsure

1. GOV.UK Design System component or pattern.
2. Service Manual (especially technology and accessibility).
3. Defra digital manual for departmental constraints.
4. Ask rather than invent a custom control.

## Sources

- [Service Manual](https://www.gov.uk/service-manual)
- [Service Standard](https://www.gov.uk/service-manual/service-standard)
- [GOV.UK Design System](https://design-system.service.gov.uk/)
- [Government Design Principles](https://www.gov.uk/guidance/government-design-principles)
- [Technology Code of Practice](https://www.gov.uk/guidance/the-technology-code-of-practice)
- [Digital Assurance Playbook](https://www.gov.uk/government/publications/digital-assurance-playbook/digital-assurance-playbook)
- [Accessibility regulations](https://www.gov.uk/guidance/accessibility-requirements-for-public-sector-websites-and-apps)
- [Making your service accessible](https://www.gov.uk/service-manual/helping-people-to-use-your-service/making-your-service-accessible-an-introduction)
- [Assisted digital](https://www.gov.uk/service-manual/helping-people-to-use-your-service/assisted-digital-support-introduction)
- [Progressive enhancement](https://www.gov.uk/service-manual/technology/using-progressive-enhancement)
- [Defra digital](https://digital.defra.gov.uk/)
- [Defra Interactive Map](https://defra.github.io/interactive-map/)
