# Manthan Singh — Portfolio

Personal portfolio for Data Science, Data Analytics and ML roles. Built with Astro, TypeScript and Tailwind CSS.

Live: https://manthan27525.github.io

## Run locally

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # type-check (astro check) + static build to ./dist
npm run preview   # serve ./dist
```

## Where things live

| Path | What |
| :-- | :-- |
| `src/data/projects.ts` | All project content (cards + case-study pages) |
| `src/data/skills.ts` | Skill groups and the journey timeline |
| `src/data/site.ts` | Name, links, email, resume path, nav |
| `src/styles/global.css` | Theme tokens (warm white / black / burnt orange) and shared classes |
| `src/components/` | Page sections, `Logo.astro` (MS monogram) |
| `public/` | `resume.pdf`, `logo.svg`, favicons, `og.png`, `robots.txt` |

To add a project, append an entry to `projects` in `src/data/projects.ts`. A case-study page is generated at `/projects/<slug>/`.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds with `withastro/action` and publishes to GitHub Pages.
In the repo settings, set **Pages → Source** to **GitHub Actions**.
