# React 19 playground

A collection of standalone React exercises exploring different rendering and concurrency patterns..

Each folder below is its own independent project with its own `package.json` and dependencies. Run `npm install` inside a project folder before using its scripts, or run the root convenience scripts below (they just delegate into the subfolder).

## Projects

| Folder | Topic | Run |
| --- | --- | --- |
| `01-ssg/` | Static site generation from scratch | `npm run build:ssg` |
| `02-ssr/` | Server-side rendering from scratch | `npm run build:ssr` then `npm run start:ssr` |
| `03-rsc-no-framework/` | React Server Components without a framework (custom Webpack + Fastify setup) | `npm run dev:rsc-no-framework:client` + `npm run dev:rsc-no-framework:server` (two terminals) |
| `04-rsc-with-next-js/` | Next.js app (App Router) | `npm run dev:next-js` |
| `05-react-performance/` | Rendering performance patterns | `npm run dev:react-performance` |
| `06-optimistic/` | Optimistic UI updates | `npm run dev:optimistic:client` + `npm run dev:optimistic:server` (two terminals) |
| `07-deferred/` | `useDeferredValue` | `npm run dev:deferred` |
| `08-transitions/` | `useTransition` / concurrent rendering | `npm run dev:transitions:client` + `npm run dev:transitions:server` (two terminals) |

Some projects (`06-optimistic`, `08-transitions`, `03-rsc-no-framework`) split client and server processes — start both in separate terminals.

## Setup

With npm, per project:

```bash
cd <project-folder>
npm install
```

With pnpm, this repo is a [pnpm workspace](pnpm-workspace.yaml) — install everything at once from the root:

```bash
pnpm install
```

Then run any project's script either through its filter name or by `cd`-ing in:

```bash
pnpm --filter deferred run dev
# or
cd 07-deferred && pnpm run dev
```
