# Versioning and releases (`@felix/ui`)

This document describes the **developer experience** for shipping new versions of `@felix/ui` using [Changesets](https://github.com/changesets/changesets). It complements the short summary in [CONTRIBUTING.md](../CONTRIBUTING.md#publishing-changes-changesets).

## Mental model: three separate steps

| Step                   | What runs                                           | What it does                                                                                                                                                                                      |
| ---------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. **Add a changeset** | `npm run changeset`                                 | Creates a small file under `.changeset/` describing _intent_: which package, semver bump (patch / minor / major), and a changelog line. **Does not** change `package.json` or `CHANGELOG.md` yet. |
| 2. **Version**         | `npm run version` (→ `changeset version`)           | Consumes all pending `.changeset/*.md` files, **bumps** `packages/ui/package.json` version, **updates** `packages/ui/CHANGELOG.md`, and **deletes** those changeset files.                        |
| 3. **Publish**         | `npm run release` (→ `build` + `changeset publish`) | Publishes the built package to the configured npm registry (private registry + `NPM_TOKEN` when set up).                                                                                          |

Until step 2 runs, consumers still see the **old** published version on npm. Step 1 only records _what should happen_ when the team is ready to cut a release.

**Default integration branch in this repo:** `develop` (see `.changeset/config.json` → `baseBranch`). Feature PRs usually target `develop`.

---

## Bump types (how to choose)

| Type      | When to use                                                          | Example                                                                                                  |
| --------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| **patch** | Bugfix or internal fix with **no** intended API change for consumers | Fix focus trap in Dialog; correct TypeScript type for an optional prop without changing runtime behavior |
| **minor** | **Backward-compatible** addition                                     | New component; new optional prop; new variant                                                            |
| **major** | **Breaking** change                                                  | Removed or renamed prop; changed default behavior; removed export                                        |

If you are unsure between patch and minor, ask: “Would an app that only ran `npm install` and used the public API break?” If no → patch or minor; if yes → major.

---

## When **not** to add a changeset

Skip `npm run changeset` when the work **should not** produce a new npm version:

- Documentation-only edits (this repo’s README, Storybook copy-only, comments)
- Internal refactors with no consumer-visible API change
- Test-only changes
- CI or tooling changes that do not ship with the package

Those changes can merge without a `.changeset/*.md` file.

---

## Real-world example: shipping a new `Tooltip` component

This walks through what one developer does end-to-end. Names and branch names are illustrative.

### 1. Start work

```bash
git checkout develop
git pull
git checkout -b feature/tooltip
```

Implement `Tooltip` in `packages/ui`, add tests and Storybook stories, run `npm run build` and `npm run test` locally.

### 2. Record a release intent (changeset)

Because this introduces a **new, backward-compatible** component, you use a **minor** bump.

From the **monorepo root**:

```bash
npm run changeset
```

- Select **`@felix/ui`**.
- Choose **`minor`**.
- Enter a short summary, e.g. `Add Tooltip component with arrow and delay props`.

Changesets writes something like `.changeset/gentle-foxes-jump.md` (name is random).

### 3. Commit everything together

Commit **both** your code **and** the new `.changeset/*.md` file:

```bash
git add packages/ui src ...   # your paths
git add .changeset/gentle-foxes-jump.md
git commit -m "feat(ui): add Tooltip component"
git push origin feature/tooltip
```

Open a **Pull Request into `develop`**. Reviewers see the feature **and** the changeset file, so they know a release will include this change.

### 4. After the PR is merged (what happens next)

**Intended team workflow (once CI/release automation is wired):**

1. `develop` contains your feature **and** the changeset file.
2. A **Release / Version** job (or bot) runs `changeset version` (or opens a **“Version” PR**) that:
   - bumps `@felix/ui` from e.g. `1.0.0` → `1.1.0`,
   - appends your summary to `packages/ui/CHANGELOG.md`,
   - removes the consumed `.changeset/*.md` files.
3. That commit (or merged Version PR) is followed by **`changeset publish`** (often in CI with `NPM_TOKEN`), so `1.1.0` appears on the private registry.

**Until that automation exists**, a maintainer may run **step 2 and 3 manually** on a clean branch that includes merged changesets (see [Manual release flow](#manual-release-flow-maintainers)).

### 5. How `payments-ui` (or any consumer) upgrades

After `1.1.0` is published:

```bash
cd ../payments-ui
npm install @felix/ui@latest
```

They read `packages/ui/CHANGELOG.md` (or the GitHub release notes, if you mirror them) for what changed.

---

## Manual release flow (maintainers)

Use this when you need to **apply** pending changesets and **publish** without waiting for a bot, or to verify locally.

**Prerequisites:** merged `develop` (or a release branch) that **includes** `.changeset/*.md` files and a clean working tree.

```bash
git checkout develop
git pull
npm install
npm run version
```

Inspect the diff: `packages/ui/package.json` version, `packages/ui/CHANGELOG.md`, and deleted `.changeset/*.md` files. Commit and push:

```bash
git add packages/ui .changeset
git commit -m "chore(ui): version packages"
git push
```

Then publish (registry and token must be configured):

```bash
npm run release
```

`release` runs a full `build` then `changeset publish`.

**Dry run locally without publishing:** you can stop after `npm run version` and open a PR with only the version/changelog commit to review before publishing.

---

## Trying the flow without publishing

### See `changeset version` in action

1. Add a changeset (`npm run changeset`) on a throwaway branch.
2. Run `npm run version` — observe `packages/ui` version and `CHANGELOG.md` update.
3. Reset if you do not want to keep the result: `git checkout -- packages/ui package.json .changeset` (and `CHANGELOG.md` if modified).

### Test `npm install` against a fake registry

Use [Verdaccio](https://verdaccio.org/) as described in [SETUP.md](../SETUP.md#local-publish-testing-verdaccio): publish `packages/ui` to `http://localhost:4873` and install from another folder with `--registry`.

---

## Command cheat sheet

| Command                | Purpose                                                                            |
| ---------------------- | ---------------------------------------------------------------------------------- |
| `npm run changeset`    | Interactive wizard; creates `.changeset/<name>.md`                                 |
| `npm run version`      | Applies all pending changesets → version bump + changelog + delete changeset files |
| `npm run release`      | `npm run build` then `changeset publish`                                           |
| `npx changeset status` | Shows which packages Changesets thinks changed vs `baseBranch` (useful in CI)      |

**Do not use** `npm version patch` / `npm version minor` for this library’s workflow — that is npm’s **built-in** version command and does not integrate with Changesets. Use **`npm run version`** instead.

---

## Configuration pointers

| Topic                                      | Where                                        |
| ------------------------------------------ | -------------------------------------------- |
| Changesets config (including `baseBranch`) | `.changeset/config.json`                     |
| Scoped registry + auth env var             | `.npmrc` (root)                              |
| Publish registry + access                  | `packages/ui/package.json` → `publishConfig` |

Replace placeholder registry URLs with your real private registry when available.

---

## Summary

- **You** add a **changeset file** with your feature PR so the team knows **what** will go into the next semver and **how** it should be summarized in the changelog.
- **Versioning** (`npm run version`) turns those files into a real version number and changelog — usually on a dedicated release step or Version PR.
- **Publishing** (`npm run release`) ships that version to npm for consumers to install.
