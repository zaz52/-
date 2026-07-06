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

## Obsidian Sync

Do not sync this work to Obsidian unless the user explicitly says to sync.
