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

## Obsidian Sync

Do not sync this work to Obsidian unless the user explicitly says to sync.
