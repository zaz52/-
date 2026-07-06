# Goal: Personal Portfolio Rebuild And Deployment

## Task

Rebuild the personal portfolio at `https://weiyi666.netlify.app/` into a real personal brand website instead of a single long design-system display board.

## Success Criteria

- Home page is a polished personal brand site with no more than six major sections:
  - Hero
  - About
  - Projects
  - Services
  - Motion Preview
  - Contact
- Design system content is moved to `/design-system`.
- Visual direction combines retro computer, nature, youth, light technology, cream paper texture, deep green branding, soft motion, large whitespace, and premium cards.
- Desktop, tablet, and mobile layouts use the viewport well and do not collapse into a narrow centered strip.
- Smooth interactions are implemented with React, TypeScript, Tailwind CSS, Framer Motion, and Lenis.
- Project cards, buttons, section reveals, floating visual elements, and contact CTA have real interactive behavior rather than decorative placeholders.
- The external divination site `https://yulesuangua.pages.dev` is included as a real portfolio/project link.
- The site builds successfully and is pushed to GitHub.
- The live production site reflects the latest GitHub `main` build.

## Architecture

- `src/components/layout`: shared site shell such as header and footer.
- `src/components/sections`: homepage narrative sections.
- `src/components/design-system`: isolated design-system modules for `/design-system`.
- `src/components/ui`: reusable primitives such as button, card, reveal, and motion helpers.
- `src/data`: site, project, and design-system content.
- `src/pages`: route-level page composition.
- `src/styles/globals.css`: global tokens, texture, responsive behavior, and motion support.

## Progress

- Completed homepage reconstruction into a six-section personal brand site.
- Completed `/design-system` split so homepage no longer dumps all UI-system content.
- Added Framer Motion and Lenis smooth scrolling.
- Added responsive visual system and interactions for hero, projects, services, motion preview, and contact CTA.
- Added `public/resume.pdf`.
- Added Netlify Node configuration with Node 22.
- Pushed implementation to GitHub:
  - `7eaf0ce Rebuild homepage and split design system route`
  - `9775c46 Trigger Netlify redeploy`
  - `b3a384b Set Netlify Node version`
- Added configurable Vite `base` so Netlify can keep root-path deployment while GitHub Pages can serve the same app from the repository path.

## Validation

- `npm run lint`: passed.
- `npm run build`: passed.
- Local browser checks: passed for `/` and `/design-system` on desktop and mobile.
- Checked for horizontal overflow: none found locally.
- Checked links: no fake `href="#"` links and no unsafe `_blank` links.
- Checked local `/resume.pdf`: returns 200.
- Revalidated on 2026-07-06:
  - `npm run lint`: passed.
  - `npm run build`: passed, output generated in `dist/`.
  - Netlify API confirmed latest production deploy attempts are skipped because account credit usage is exceeded.

## Current Blocker

Production at `https://weiyi666.netlify.app/` is still serving the old build even though GitHub `main` contains the new code.

Netlify deploys for latest commits were skipped with the error:

`Skipped due to account credit usage exceeded`

This means the live site cannot update until the Netlify account usage or billing issue is resolved, or until the site is deployed through another account/provider with available build/deploy capacity.

Manual Netlify deployment of the local `dist/` build was also attempted and failed with:

`JSONHTTPError: Forbidden`

This confirms the blocker is at the Netlify account/deploy permission level, not the application build.

## Next Steps

- Resolve Netlify account credit/build usage issue in the Netlify dashboard.
- Retry the latest Netlify deploy, or push an empty commit after credits are restored.
- Re-check production title and assets after deployment.
- Final review pass once production serves the new build.
- As a temporary working deployment, publish the latest build through GitHub Pages.

## Fallback Deployment

- Created `https://github.com/zaz52/zaz52.github.io` as a clean GitHub Pages user-site repository.
- Published the rebuilt portfolio to `https://zaz52.github.io/`.
- Switched GitHub Pages from legacy mode to workflow mode after legacy deploy returned `Deployment failed, try again later`.
- Verified `https://zaz52.github.io/` returns 200 with title:

`Weiyi | 复古科技青春自然个人网站`

- Browser smoke test using local Chrome passed:
  - title is `Weiyi | 复古科技青春自然个人网站`
  - Hero copy is present
  - Contact CTA copy is present
  - desktop viewport has no horizontal overflow

- Note: direct deep links such as `/design-system` on GitHub Pages are served through the SPA fallback and may return HTTP 404 while still rendering in the browser. This is a limitation of GitHub Pages static hosting. Netlify will support clean route fallback once the account deploy blocker is resolved.

## Cloudflare Pages Migration

- Netlify remains blocked because the account is unpaid/over quota.
- User approved moving deployment to another provider.
- Next target: Cloudflare Pages project for the rebuilt portfolio.
- Initial local check found no `CLOUDFLARE_API_TOKEN`, no `CLOUDFLARE_API_KEY`, no `CLOUDFLARE_ACCOUNT_ID`, and no installed `wrangler` command.
- Installed local project dev dependency `wrangler`.
- Revalidated `npm run lint` and `npm run build`: passed.
- `wrangler whoami` confirms Cloudflare account `504628394@qq.com` with Pages write permission.
- Target Cloudflare Pages project name: `weiyi666-portfolio`.
- Created Cloudflare Pages project `weiyi666-portfolio`.
- First production URL: `https://weiyi666-portfolio.pages.dev/`.
- Added `public/_redirects` with `/* /index.html 200` so SPA routes such as `/design-system` work as direct links.
- Revalidated:
  - `npm run lint`: passed.
  - `npm run build`: passed.
  - `https://weiyi666-portfolio.pages.dev/`: HTTP 200, title is `Weiyi | 复古科技青春自然个人网站`.
  - `https://weiyi666-portfolio.pages.dev/design-system`: HTTP 200 through Cloudflare redirect fallback.
  - Chrome browser smoke test on Cloudflare: title, Hero, Contact, and desktop width check passed.

## Project Cleanup

- Removed duplicated divination-related portfolio items:
  - `乾坤之道` / `https://yulesuangua.pages.dev/`
  - `算卦` / `https://suanguan.netlify.app/`
- The Projects section now promotes the first remaining item, `魔方简历`, as the main featured project.
- Revalidated cleanup:
  - `npm run lint`: passed.
  - `npm run build`: passed.
  - Cloudflare production deploy succeeded.
  - HTTP check confirms no `yulesuangua` or `suanguan` references in the deployed page.
  - Chrome browser check confirms `魔方简历` is visible and `乾坤之道` / `算卦` are not visible.

## Project Addition

- Re-added `https://yulesuangua.pages.dev/` as a single project entry named `乾坤之道`.
- This is distinct from the removed duplicate `算卦` entry and uses the existing Projects card pattern.
- Added `public/covers/yulesuangua.svg` as a styled project cover because live screenshot capture timed out.
- Revalidated:
  - `npm run lint`: passed.
  - `npm run build`: passed.
  - Cloudflare Pages fallback deployment succeeded.
  - Cloudflare Worker custom-domain deployment succeeded with version `346362c6-b9e0-436c-b45c-5dd1a8d7a20f`.
  - `https://weiyiai.top/covers/yulesuangua.svg`: HTTP 200.
  - Chrome browser check confirms `乾坤之道` is visible, links to `https://yulesuangua.pages.dev/`, cover loads, and old `算卦` card is not visible.

## Custom Domain

- User provided custom domain `weiyiai.top`, with DNS managed in Cloudflare.
- Added `wrangler.jsonc` for Cloudflare Workers Static Assets deployment:
  - Worker name: `weiyiai-portfolio`
  - Asset directory: `./dist`
  - SPA fallback: `not_found_handling: single-page-application`
  - Routes:
    - `weiyiai.top/*`
    - `www.weiyiai.top/*`
- Initial Workers custom-domain mode conflicted with existing DNS/domain records, so deployment was switched to Workers route mode.
- Deployed Worker version `e127c7d8-b1a4-44af-b445-8b4fca6607d2`.
- Verified:
  - `https://weiyiai.top/`: HTTP 200.
  - `https://www.weiyiai.top/`: HTTP 200.
  - `https://weiyiai.top/design-system`: HTTP 200.
  - Chrome browser check confirms title, Hero, Contact, and Design System route render correctly.

## Visual Assets Update

- Added visible avatar card to the homepage Hero using `public/avatar.jpg`.
- Added project cover image assets under `public/covers/`:
  - `magic-resume.png`: live screenshot cover.
  - `elder-health.png`: live screenshot cover.
  - `ppt-master.svg`: generated visual cover because the target site failed to load reliably during capture.
  - `resource-vault.svg`: generated visual cover for the resource entry.
- Updated project data with `cover` fields and rendered covers in both featured and horizontal project cards.
- Revalidated:
  - `npm run lint`: passed.
  - `npm run build`: passed.
  - Cloudflare Pages fallback deployment succeeded.
  - Cloudflare Worker custom-domain deployment succeeded with version `252e6f25-41e5-4dca-be31-3e11a389fa14`.
  - `https://weiyiai.top/avatar.jpg` and all `/covers/*` assets return HTTP 200.
  - Chrome browser check confirms the Hero avatar loads and all 4 project covers load after scrolling to Projects.
- Replaced `public/avatar.jpg` with the new user-provided WeChat image.
- Revalidated replacement:
  - `npm run lint`: passed.
  - `npm run build`: passed.
  - Cloudflare Pages fallback deployment succeeded.
  - Cloudflare Worker custom-domain deployment succeeded with version `c26650ba-5633-41ee-81ea-3e2ce3388908`.
  - Remote `https://weiyiai.top/avatar.jpg` SHA256 matches local `public/avatar.jpg`.
  - Chrome browser check confirms the new 908x908 avatar loads in the Hero.

## Admin CMS

- Added `/admin` route for self-service project management.
- Added Cloudflare Worker API:
  - `GET /api/projects`: public project data read.
  - `GET /api/admin-check`: password verification.
  - `PUT /api/projects`: authenticated project save.
- Added Cloudflare KV namespace `PROJECTS_KV` with ID `fbf42b519d5b4baebe61c41b050bea02`.
- Added `ADMIN_PASSWORD` as a Cloudflare Worker secret. The password value is not committed to Git.
- Added `worker/default-projects.json` for UTF-8 safe seed data.
- Seeded KV with the current project list using Node fetch after PowerShell JSON encoding corrupted Chinese text during an initial seed attempt.
- Admin capabilities:
  - Add project.
  - Edit project title, type, URL, description, tags, icon, palette, and cover.
  - Upload cover image; browser compresses it to a JPEG data URL before saving.
  - Delete project.
  - Move project up/down.
  - Set featured project.
- Revalidated:
  - `npm run lint`: passed.
  - `npm run build`: passed.
  - Cloudflare Worker custom-domain deployment succeeded with version `b58ebe02-9525-4891-913e-aea9b586f9ac`.
  - Added explicit `ASSETS` binding and manual SPA fallback in the Worker so `/admin` and `/design-system` return HTTP 200.
  - `GET /api/projects`: returns 5 projects with correct Chinese text.
  - Wrong admin password returns HTTP 401.
  - Correct admin password returns `{ ok: true }`.
  - Browser check confirms `/admin` login works, project inputs contain Chinese text, front page reads dynamic projects without `????` corruption, and the merged `/skills` page still renders.
  - Integrated remote `main` changes that added Skills pages and fixed the imported `Github` lint issue in `src/pages/Skills.tsx`.
- Admin password was rotated via Cloudflare Worker secret update. The previous password now returns HTTP 401 and the new password passes `/api/admin-check`. The password value is not committed to Git.

## Project Content Enrichment

- Audited current project links and page metadata with browser automation.
- Rewrote project records into a fuller portfolio presentation:
  - `乾坤之道`: main featured project, positioned as an Eastern divination + AI inquiry platform.
  - `魔方简历`: restored full product name and clarified privacy-first AI resume editing features.
  - `PPT Master`: clarified native editable PPTX generation from documents and URLs.
  - `银龄守护`: renamed from `老年健康` and clarified mobile senior-health workflows.
  - `虚拟资源库`: renamed from `虚拟资料库` and clarified cloud resource/material collection use.
- Updated both `src/data/projects.ts` and `worker/default-projects.json`.
- Wrote the enriched records to Cloudflare KV using Node fetch to preserve UTF-8 Chinese text.
- Revalidated:
  - `npm run lint`: passed.
  - `npm run build`: passed.
  - Cloudflare Worker custom-domain deployment succeeded with version `06abd1bf-b493-4fd1-8e28-9b079c9e1c28`.
  - `GET /api/projects`: returns the enriched 5-project list with `乾坤之道` featured.
  - Chrome browser check confirms the front page and `/admin` both show the enriched content without `????` corruption.

## Obsidian Sync

Do not sync this work to Obsidian unless the user explicitly says to sync.

## Current Goal: Project Detail Pages

User approved the next step: improve the portfolio by adding real project detail pages.

### Success Criteria

- Project cards on the homepage open internal detail pages instead of immediately jumping away.
- Every project has a stable route at `/projects/:id`.
- Detail pages read the same dynamic `/api/projects` data used by the homepage/admin so future admin edits remain reflected.
- Each detail page includes cover, title, type, description, tags, project link, narrative sections, and clear back navigation.
- Unknown project IDs show a useful not-found state.
- Desktop and mobile layouts remain readable.
- `npm run lint`, `npm run build`, production deploy, route checks, and GitHub push complete.

### Architecture

- Add `src/pages/ProjectDetail.tsx`.
- Update the SPA router in `src/App.tsx` to handle `/projects/:id`.
- Update homepage project cards in `src/components/sections/Projects.tsx` to link to internal detail pages and keep external project launch as a clear button.
- Reuse `hydrateProjects` and `/api/projects` for consistent project data.

### Progress

- Started on 2026-07-07.
- Added `src/pages/ProjectDetail.tsx`.
- Added `/projects/:id` SPA routing in `src/App.tsx`.
- Updated homepage project cards to open internal detail pages.
- Local validation:
  - `npm run lint`: passed.
  - `npm run build`: passed.
- Deployed to Cloudflare Worker version `78ddc0dc-8c86-4faf-a6d8-12f795498dbb`.
- Final deploy after removing the public admin CTA from detail pages: `7105991a-82c0-4c7d-9208-80ab7d3636a9`.
- Production validation:
  - `/`: HTTP 200.
  - `/projects/yulesuangua`: HTTP 200.
  - `/projects/magic-resume`: HTTP 200.
  - `/projects/not-exist`: HTTP 200 with SPA fallback for the not-found state.
  - `/admin`: HTTP 200.
  - Production JS asset `/assets/index-BDZn5UFU.js` contains the `/projects/` route.
  - Public detail page bundle no longer contains the "后台管理作品" CTA.

### Review Notes

- Detail pages intentionally derive narrative sections from the current project record, so projects created in `/admin` get a useful detail page without adding a separate CMS schema.
- The external project URL remains available through the "打开线上项目" CTA inside each detail page.
- Future enhancement: add optional admin fields for richer case studies, such as problem, role, stack, screenshots, and process notes.

## Current Goal: Built-In Visit Analytics

User selected the third improvement: add visit analytics for the live personal website.

### Success Criteria

- The production site records page views without requiring the user to manually edit Cloudflare Dashboard settings.
- Analytics data is stored in the existing Cloudflare KV namespace and does not expose the admin password or other secrets in Git.
- Tracking is privacy-light: count visits by day, path, referrer host, device class, and browser class only; do not store raw IP addresses.
- `/admin` shows a usable analytics summary after login:
  - total views
  - today views
  - recent 14-day trend
  - top pages
  - top referrers
  - device/browser split
- Build, lint, Worker deploy, API checks, and browser checks pass before final handoff.

### Architecture

- Frontend sends a single best-effort page view event on page load through `/api/analytics/pageview`.
- Cloudflare Worker validates and aggregates events into KV key `analytics:v1`.
- Admin-only endpoint `/api/analytics/summary` returns the aggregated dashboard payload.
- Admin UI reads the summary only after password verification.

### Progress

- Started implementation on 2026-07-07.
- Cloudflare Web Analytics API access was checked first, but the current Wrangler OAuth token returned 403 for RUM/Web Analytics endpoints. Decision: implement first-party KV analytics so the user can proceed without manual Cloudflare token setup.
- Added first-party analytics aggregation to the Cloudflare Worker:
  - `POST /api/analytics/pageview`
  - `GET /api/analytics/summary`
- Added frontend page-view tracking through `src/lib/analytics.ts`.
- Added the logged-in `/admin` analytics dashboard.
- Local validation:
  - `npm run lint`: passed.
  - `npm run build`: passed.
- Deployed to Cloudflare Worker:
  - First analytics deploy: `57bb45c5-1590-42b8-9898-c1cb47a24d56`.
  - Final timezone/body parsing fix deploy: `0a4c518a-bfcd-4e28-8952-4571bb939358`.
- Production validation:
  - `POST /api/analytics/pageview`: returns `{ ok: true }`.
  - Wrong admin password on `/api/analytics/summary`: returns HTTP 401.
  - Correct admin password on `/api/analytics/summary`: returns totals, recent days, top pages, referrers, devices, and browsers.
  - Main routes `/`, `/admin`, `/design-system`, and `/skills`: all return HTTP 200.
  - Production JS contains `/api/analytics/pageview` and `/api/analytics/summary`.
  - Verified Beijing-date aggregation: recent last date is `2026-07-07`, and `/design-system` is tracked as a separate top page.

### Review Notes

- The analytics implementation is intentionally first-party and privacy-light; it does not store raw IP addresses or individual visitor IDs.
- Data aggregation uses KV read-modify-write, which is appropriate for a low-traffic personal website. If traffic becomes high, this should move to Durable Objects or Analytics Engine to avoid write contention.
- The Playwright skill installed in this environment only contains documentation and no `run.js` executor, and the project does not include Playwright. Browser validation was therefore replaced with production HTTP/API checks rather than adding a test dependency to the production project.

### Follow-Up Fix

- User reported that the analytics panel was not visible in `/admin`.
- Root cause: the password field could be restored from `sessionStorage`, but the admin `unlocked` state was not restored after refresh. In that state, the saved password was visible as dots but the analytics panel stayed hidden until the user clicked login again.
- Fix:
  - `/admin` now automatically validates the saved session password on load.
  - If valid, it restores the unlocked admin state and loads analytics immediately.
  - Login and refresh-stat handlers no longer receive mouse events as implicit password arguments.
- Validation:
  - `npm run lint`: passed.
  - `npm run build`: passed.
  - Deployed Worker version `077ccef6-bd7e-4906-8617-189a73926136`.
  - Production `/admin` JS contains `adminPassword`, `/api/admin-check`, `/api/analytics/summary`, and `Analytics`.
  - Main routes `/`, `/admin`, `/design-system`, and `/skills`: all return HTTP 200.

### Second Follow-Up Fix

- User still did not see the analytics panel.
- Root cause: browser password autofill can display dots inside the input without updating React state, and the analytics block was still hidden behind `unlocked`.
- Fix:
  - Added a password input ref so login reads the real DOM input value, including browser autofill.
  - Removed the conditional wrapper around the analytics section so the panel is always visible above the project list.
  - Kept refresh-stat disabled until admin login succeeds.
- Validation:
  - `npm run lint`: passed.
  - `npm run build`: passed.
  - Deployed Worker version `937b992e-0760-4603-940c-379eff21fb94`.
  - Production `/admin` JS asset is `/assets/index-Bi27NAJ_.js` and contains `useRef`, `adminPassword`, and `Analytics`.
  - Main routes `/`, `/admin`, `/design-system`, and `/skills`: all return HTTP 200.
