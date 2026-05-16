# CLAUDE.md

Guidance for Claude Code (claude.ai/code) when working in this repository.

## Repository Overview

**Highcharts** is a JavaScript charting framework (v12.3.0). The codebase produces multiple commercial products from a single TypeScript source tree:

- **Highcharts** — base charting library
- **Highcharts Stock** — financial / time-series charts
- **Highcharts Maps** — map visualisations
- **Highcharts Gantt** — project / scheduling charts
- **Highcharts Dashboards** — dashboard layout + components
- **Highcharts Grid** — datagrid component (Grid Lite + Grid Pro)

License is commercial / source-available (`license.txt`). Contributions must be MIT/BSD/Apache-2.0/MPL-2.0 compatible — no GPL/AGPL code.

## Top-Level Layout

| Path | Purpose |
| --- | --- |
| `ts/` | All TypeScript source (the source of truth) |
| `css/` | Stylesheets per product (highcharts, dashboards, datagrid, annotations, grid) |
| `samples/` | Interactive demos per product (`highcharts/`, `maps/`, `stock/`, `dashboards/`, `gantt/`, `grid-lite/`, `grid-pro/`) — used as both docs examples and visual regression fixtures |
| `test/` | All tests — Cypress E2E, Karma/QUnit unit tests, ts-node unit tests, `*.d.ts` declaration tests, reference screenshots |
| `docs/` | Markdown documentation (organised by topic) |
| `tools/` | Gulp task implementations, doc generators, CSpell config, `docs-preview` workspace |
| `changelog/` | Per-version release notes (auto-built from PR descriptions) |
| `errors/` | Numbered error definitions referenced by `error()` calls in source |
| `i18n/` | Localisation files |
| `studies/` | Experimental code — not shipped |
| `gfx/` | SVG icon assets (`stock-icons/`, `dashboards-icons/`) |
| `utils/`, `www/` | Build / hosting helpers |

## Source Tree (`ts/`)

| Subdir | Contents |
| --- | --- |
| `Core/` | Chart engine — `Chart/Chart.ts`, `Axis/`, `Renderer/`, `Series/`, `Animation/`, `Legend/`, `Pointer/`, `Tooltip/` |
| `Series/` | Per-series-type implementations (area, bar, bubble, candlestick, pie, …) |
| `Extensions/` | Optional modules (Annotations, Boost, DataGrouping, Drilldown, Exporting, MarkerClusters, …) |
| `Accessibility/` | WCAG features |
| `Stock/`, `Maps/`, `Gantt/`, `Dashboards/`, `Grid/` | Product-specific code |
| `Data/` | Data connectors, CSV parsing |
| `Shared/` | Shared helpers |
| `masters/`, `masters-dashboards/`, `masters-datagrid/`, `masters-grid/`, `masters-es5/` | Build entry points — each `.ts` master file declares which series/extensions a given output bundle includes |
| `DOCLETS.md` | JSDoc doclet conventions for API generation |
| `README.md` | Internal developer notes |

Key entry points: `ts/masters/highcharts.src.ts`, `ts/masters/highstock.src.ts`, `ts/masters/highmaps.src.ts`. Core class: `ts/Core/Chart/Chart.ts`.

## Build & Dev Workflow

**Build tool:** Gulp 5 with a TypeScript gulpfile (`gulpfile.ts`). Task implementations live in `tools/gulptasks/`.

**Node:** `>=14.14.0` (see `engines` in `package.json`). Lockfile is `package-lock.json` (npm).

Useful scripts from `package.json`:

```bash
npm run build           # gulp dist — full production build of all products
npm run gulp            # default gulp watch (JS/CSS compile)
npm run clean           # gulp clean update-vendor
npm test                # full test suite: gulp test-ts + gulp test --speak
npm run test:precommit  # reduced suite over modified files only (used by husky)
npm run test-node       # tsx ./test/ts-node-unit-tests/index.ts (fast)
npm run test-node:watch # node unit tests in watch mode
npm run testall         # multi-browser via BrowserStack (--browsers all)
npm run test-dts        # scripts + jsdoc-dts + lint-dts
npm run lint            # cd ts && npx eslint (root code)
npm run glint           # ESLint for Grid subtree
npm run dlint           # gulp dashboards/lint (Dashboards subtree)
npm run lint-docs       # cspell over docs/**/*.md
npm run ts-compile:test # tsc -p test && tsc -p samples (type-check fixtures)
npm run api             # gulp api — generate API docs
npm run jsdoc           # gulp jsdoc-watch
npm run benchmark       # tsx test/ts-node-unit-tests/bench.ts
```

A `postinstall` runs `gulp update-vendor` and `gulp patch-ink-docstrap`. `prepare` installs husky.

### Multi-product build

A single source tree assembles into multiple distributions via `ts/masters*`. CDN paths and product names live in `build-properties.json`. The `@highcharts/highcharts-assembler` dependency does the assembly.

## Testing

| Framework | Where | When to use |
| --- | --- | --- |
| QUnit + Karma | `test/typescript-karma/` | Browser unit tests |
| Cypress | `test/cypress/{highcharts,dashboards,data-grid}/integration/**/*.cy.{js,jsx,ts,tsx}` | E2E + visual regression |
| ts-node | `test/ts-node-unit-tests/` | Fast Node-side unit tests (`index.ts`, `bench.ts`) |
| TypeScript dts | `test/typescript-dts/` | Generated declaration sanity |
| Reference screenshots | `test/reference/` | Visual diffing baselines |

Cypress base URL is `http://localhost:3030/samples/view?mobile=true&path=/` (see `cypress.config.mjs`). Tests run **without** isolation — state persists across specs.

## Code Style & Linting

- **ESLint** (`.eslintrc`) — single quotes, 4-space indent, 80-char lines, no `console.*`, camelCase props, no param reassignment, JSDoc enforcement via `eslint-plugin-jsdoc` + the custom `@highcharts/eslint-plugin-highcharts`.
- **Stylelint** (`.stylelintrc.json`) — extends `stylelint-config-standard`, 4-space indent, vendor prefixes allowed.
- **TypeScript** (`ts/tsconfig.json`) — target ES2020, ES6 modules, strict mode, composite/incremental, includes jQuery + trusted-types types.
- **CSpell** — runs over `docs/**/*.md` with `tools/cspell/cspell.json`.

### Husky hooks (`.husky/`)

- `pre-commit` → `lint-staged` (per `package.json` `lint-staged` block):
  - `*.js` → eslint
  - `ts/!(Dashboards|Grid)**/*.ts` → `npm run lint`
  - `ts/Dashboards/**/*.ts` → `cd ts/Dashboards && npx eslint .`
  - `ts/Grid/**/*.ts` → `npm run glint`
  - `*.css` → stylelint
  - `docs/**/*.md` → cspell
  - then `npm run test:precommit`
- `commit-msg` → validates message format

If a hook fails, fix the issue, re-stage, and create a new commit — do not amend.

## API Documentation (Doclets)

Two parallel systems: TypeScript types (for the compiler) and JSDoc doclets (for the public API docs and generated `.d.ts`). They are **not** auto-synced — public APIs must be documented in both places. See `ts/DOCLETS.md` for syntax. Key custom tags: `@apioption`, `@optionparent`, `@productdesc`, `@since`, `@deprecated`, `@private`. All non-primitive types prefixed with `Highcharts.`. Public `.d.ts` is generated from JSDoc via `@highcharts/highcharts-declarations-generator`, not from TypeScript.

## Contribution Conventions

From `CONTRIBUTING.md` and `repo-guidelines.md`:

**Branch naming:** `feature/<desc>`, `bugfix/<issue>-<desc>`, `docs/<desc>`.

**Commit messages:** past tense ("Fixed…", "Added…", "Changed…"), reference issues (`Fixed #1235, <description>`), ≤100 chars.

**Pull requests:**
- Title follows branch naming convention.
- PR body's **first paragraph** is auto-used as the changelog entry — write it carefully, in past tense, with `#xxxx` issue refs and API identifiers in backticks. Everything after the first line break is ignored by the changelog generator.
- Label with `Changelog: Feature` or `Changelog: Bugfix`, plus a `Product: …` label.
- Upgrade-impacting changes need a `#### Upgrade note` section.

**Checklist for new series/features** (from `repo-guidelines.md`): support inverted charts, animations, null points, styled mode, data labels, resizing, and (where relevant) the Boost module.

## Important Files

| File | Purpose |
| --- | --- |
| `gulpfile.ts` | Loads tasks from `tools/gulptasks/` |
| `build-properties.json` | Per-product version + CDN/dist paths |
| `palette.html` | Visual reference for the default theme colours |
| `cypress.config.mjs` | E2E config |
| `dangerfile.js` (root-level dangerlike checks live here if present) | PR rule enforcement |
| `cloud-downloader.js` | Helper for pulling cloud assets |
| `repo-guidelines.md` | Core dev checklist for new series types |
| `ts/DOCLETS.md` | JSDoc conventions |
| `ts/README.md` | Internals / coding recommendations |
| `tools/cspell/cspell.json` | Docs spellcheck dictionary |

## Working in This Repo — Practical Notes

- The source of truth is `ts/`. Do not edit generated files under `js/`, `dist/`, or `code/`.
- Samples in `samples/<product>/<category>/<demo>/` use `demo.html` + `demo.js` (+ optional `demo.css`, `demo.details`). They are browsed at `http://localhost:3030/samples/view?path=/<product>/<category>/<demo>` when running the Highcharts utils server.
- Errors are documented in `errors/<n>/readme.md`. Reference them in code with `error(<n>, …)`.
- When changing a public option, update the JSDoc doclet (for API docs/`.d.ts`) **and** the TS type, and add or update a sample under `samples/`.
- For fast feedback, run `npm run test-node`. Save the full Karma/Cypress suite for the end.
- `samples` and `test/` have their own `tsconfig` — run `npm run ts-compile:test` to type-check them.
- Multi-browser runs require BrowserStack credentials in the environment; locally prefer Karma + Chrome only.
- The `tools/docs-preview` npm workspace is the only declared workspace.

## Branch for This Session

All work for this session goes on `claude/add-claude-documentation-jxbfp`. Default branch is `master`.
