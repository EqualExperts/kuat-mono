# Documentation audit summary

**Date:** Documentation review pass aligned with `kuat-docs/rules/components/documentation-template.md` and the consumer onboarding plan.

### Reviewed

- Published APIs: `packages/kuat-react` and `packages/kuat-vue` (`package.json` `exports`, main barrels)
- [consumer-setup.md](./consumer-setup.md), [choosing-components.md](./choosing-components.md), [public-api-inventory.md](./public-api-inventory.md)
- [README.md](../../README.md), [packages/kuat-react/README.md](../../packages/kuat-react/README.md), [packages/kuat-vue/README.md](../../packages/kuat-vue/README.md)
- [kuat-docs/README.md](../README.md), [kuat-docs/rules/components/patterns.md](../rules/components/patterns.md), [kuat-docs/rules/components/README.md](../rules/components/README.md)
- Storybook: `apps/storybook-react/stories/*`, `apps/storybook-vue/stories/*` (+ shared `docs/component-docs.ts` in each app)
- [.cursorrules](../../.cursorrules) (decision table + documentation index)

### Created

- [choosing-components.md](./choosing-components.md) — consumer decision guide (Kuat vs shadcn vs custom)
- [public-api-inventory.md](./public-api-inventory.md) — exports, Storybook mapping, narrative doc pointers
- [DOCUMENTATION-AUDIT-SUMMARY.md](./DOCUMENTATION-AUDIT-SUMMARY.md) — this file
- `apps/storybook-react/docs/component-docs.ts` — reusable “Overview / When to use / When not to use” strings
- `apps/storybook-vue/docs/component-docs.ts` — copy kept in sync with React

### Updated

- [consumer-setup.md](./consumer-setup.md) — install order, Kuat-first examples, migration section, related links
- [README.md](../../README.md) — version/coverage, user doc links
- [packages/kuat-react/README.md](../../packages/kuat-react/README.md), [packages/kuat-vue/README.md](../../packages/kuat-vue/README.md) — architecture, exports overview, migration guidance
- [kuat-docs/README.md](../README.md) — setup table, package reference, application developer section, component priority table
- [kuat-docs/setup/README.md](./README.md) — index of new setup docs
- [kuat-docs/rules/components/patterns.md](../rules/components/patterns.md) — consumer pointer; clarified decision table
- [kuat-docs/rules/components/README.md](../rules/components/README.md) — consumer links + Storybook note
- `.cursorrules` — architecture line, decision priority row 2, documentation table
- All component Storybook `meta` files listed in [public-api-inventory.md](./public-api-inventory.md) — `parameters.docs.description.component` wired to shared doc strings

### Unresolved

- **Strict `tsc --noEmit` in Storybook apps:** Many pre-existing React 19 / Storybook typing issues and some Vue story `argTypes` issues; not introduced by this documentation pass. Consider a separate cleanup or Storybook version alignment.
- **Automated link checks** for GitHub URLs in markdown were not run in CI; spot-check links if the default branch or repo path changes.

### Follow-up recommended

- When adding components, extend `apps/storybook-*/docs/component-docs.ts` and [public-api-inventory.md](./public-api-inventory.md) in the same PR.
- Consider a short script or check that `package.json` `exports` keys are reflected in the inventory table (manual drift risk).
