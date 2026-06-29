## Description

<!-- What changed and why -->

## Type of change

- [ ] Feature / new component
- [ ] Bugfix
- [ ] Refactor
- [ ] Documentation
- [ ] Build / CI
- [ ] Chore

## Checklist

### Code

- [ ] Follows system patterns (`forwardRef`, `data-slot`, `cn()`, CVA where variants apply)
- [ ] No hardcoded raw colors or spacing — design tokens only
- [ ] `className` is merged, not replaced
- [ ] Native props pass through to the underlying element (`...rest`)

### Testing

- [ ] Unit tests cover new or changed behavior
- [ ] `npm test` passes
- [ ] New components: includes a jest-axe accessibility check where applicable
- [ ] Coverage thresholds still satisfied (`packages/ui/vitest.config.ts`)

### Storybook

- [ ] Stories added or updated for new or changed UI
- [ ] Stories use `tags: ['autodocs']` and meaningful ArgTypes
- [ ] Stories cover main variants and important states (disabled, error, loading as applicable)
- [ ] Dark mode covered when the component is theme-sensitive

### Release

- [ ] If this change should trigger a package release: a changeset was added (`npm run changeset` at repo root)
- [ ] Changeset bump level matches the change (patch / minor / major)
- [ ] Breaking changes include migration notes in the PR description

## Screenshots / recordings (if visual)

<!-- Before / after for UI changes -->
