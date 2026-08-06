# masters.dev — React

A collection of standalone React exercises exploring different rendering and concurrency patterns, built while working through the [EpicReact.dev](https://www.epicreact.dev/) material.

Each folder below is its own independent project with its own `package.json` and dependencies. Run `npm install` inside a project folder before using its scripts, or run the root convenience scripts below (they just delegate into the subfolder).

## Projects

| Folder | Topic | Run |
| --- | --- | --- |
| `deferred/` | `useDeferredValue` | `npm run dev:deferred` |
| `optimistic/` | Optimistic UI updates | `npm run dev:optimistic:client` + `npm run dev:optimistic:server` (two terminals) |
| `transitions/` | `useTransition` / concurrent rendering | `npm run dev:transitions:client` + `npm run dev:transitions:server` (two terminals) |
| `react-performance/` | Rendering performance patterns | `npm run dev:react-performance` |
| `rsc-no-framework/` | React Server Components without a framework (custom Webpack + Fastify setup) | `npm run dev:rsc-no-framework:client` + `npm run dev:rsc-no-framework:server` (two terminals) |
| `ssg/` | Static site generation from scratch | `npm run build:ssg` |
| `ssr/` | Server-side rendering from scratch | `npm run build:ssr` then `npm run start:ssr` |
| `next-js/` | Next.js app (App Router) | `npm run dev:next-js` |

Some projects (`optimistic`, `transitions`, `rsc-no-framework`) split client and server processes — start both in separate terminals.

## Setup

```bash
cd <project-folder>
npm install
```

Run this in each project folder you want to try before using its script above.
