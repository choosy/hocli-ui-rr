---
name: hocli-ui-rr-conventions
description: Project conventions for the hocli-ui-rr React Router 7 app. Use whenever installing, removing, updating, or running scripts for dependencies in this repository, or when suggesting package-manager commands to the user.
---

# hocli-ui-rr Project Conventions

## Package manager: always use pnpm

This repository uses **pnpm**. A `pnpm-lock.yaml` is committed at the project root and `package-lock.json` / `yarn.lock` must never be introduced.

### Rules

- Never run `npm` or `yarn` commands in this repo. Always translate to the pnpm equivalent before running.
- Never suggest `npm install <pkg>` in chat responses; suggest the pnpm command instead.
- If you find a `package-lock.json` or `yarn.lock` in the repo, treat it as an error — flag it to the user rather than committing it.

### Command translation

| Intent                      | Use                               | Do NOT use                     |
| --------------------------- | --------------------------------- | ------------------------------ |
| Install all dependencies    | `pnpm install`                    | `npm install`                  |
| Add a runtime dependency    | `pnpm add <pkg>`                  | `npm install <pkg>`            |
| Add a dev dependency        | `pnpm add -D <pkg>`               | `npm install --save-dev <pkg>` |
| Remove a dependency         | `pnpm remove <pkg>`               | `npm uninstall <pkg>`          |
| Update a dependency         | `pnpm update <pkg>`               | `npm update <pkg>`             |
| Run a `package.json` script | `pnpm <script>` (e.g. `pnpm dev`) | `npm run <script>`             |
| Execute a one-off binary    | `pnpm dlx <pkg>`                  | `npx <pkg>`                    |

### Examples

Adding `lucide-react` and `@radix-ui/react-collapsible`:

```bash
pnpm add lucide-react @radix-ui/react-collapsible
```

Running the dev server:

```bash
pnpm dev
```

Type-checking:

```bash
pnpm typecheck
```
