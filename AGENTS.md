# AGENTS.md

## 1. Purpose

This repository is for writing and maintaining the Netsody documentation: documentation text, navigation, local examples, screenshots and images, and the Docusaurus-based site structure. It does not own product truth, product behavior, APIs, release details, or public positioning.

Documentation must be technically correct, consistent with the public website, and aligned with actual software behavior. Use this file as a practical contract for AI agents and human contributors writing documentation in this repository.

## 2. Important rules

- Make the smallest correct change for the current task.
- Treat the normal unit of work as documentation text, examples, links, headings, navigation, screenshots, or MDX page structure.
- Preserve existing documentation flows unless the task requires a documentation change.
- Do not change product code, APIs, CLI behavior, package metadata, releases, or service behavior as part of documentation work.
- Do not invent features, claims, limitations, commands, options, configuration keys, supported platforms, API names, package names, or service behavior.
- Do not strengthen marketing claims beyond what the public website supports.
- Do not describe behavior as implemented unless it is verified in `./netsody`, `./homebrew-tap`, existing documentation, or explicit maintainer instructions.
- If authoritative sources conflict, stop and report the conflict instead of guessing.
- Write clear, direct English unless the user explicitly asks for another language.
- Avoid hype, vague claims, unsupported comparisons, and em dashes in prose.

## 3. Source-of-truth hierarchy

Use the most specific source for the documentation claim being written or edited:

1. Explicit maintainer instructions for the current task.
2. `./netsody` for technical facts that documentation mentions: CLI commands, configuration options, supported platforms, error messages, service behavior, API names, installation details, and implementation-backed feature claims.
3. `./homebrew-tap` for Homebrew facts that documentation mentions: formula names, install commands, service commands, caveats, supported package names, and release-related installation details.
4. `./netsody.io` for product positioning, public claims, terminology, use cases, tone, and marketing language.
5. Existing documentation in this repository for local structure, page organization, style, and cross-linking.

Existing docs define local style, but they are not product truth. Correct existing docs when they conflict with `./netsody`, `./homebrew-tap`, `./netsody.io`, or explicit maintainer instructions.

The public website may be used as a fallback source if needed, but local submodules are preferred because they are versioned and reproducible.

## 4. Submodule rules

The repository has three read-only reference submodules:

- `./netsody.io`: public website source.
- `./netsody`: main software repository.
- `./homebrew-tap`: Homebrew tap repository.

Do not modify `./netsody.io`, `./netsody`, or `./homebrew-tap` unless the user explicitly asks for that exact submodule to be changed. Do not apply formatting, refactoring, cleanup, generated changes, or dependency updates to submodules. Do not change submodule code or metadata to make documentation easier to write. Treat submodule content as reference material by default.

## 5. High-level product description

Describe Netsody only in terms supported by `./netsody.io` and implementation-backed sources. Product positioning, use cases, audience, tone, and public claims must come from `./netsody.io`.

Do not add a new high-level product description, tagline, category, comparison, or value proposition unless it is supported by `./netsody.io` or explicit maintainer instructions.

## 6. Naming and terminology

- Use "Netsody" for the product name in user-facing text.
- Use exact technical identifiers only where appropriate in documentation, such as command names, package names, binary names, file paths, crate names, API identifiers, environment variables, or configuration keys.
- Match terminology from `./netsody.io` for positioning and user-facing concepts.
- Match terminology from `./netsody` for technical behavior and implementation details.
- Keep capitalization, spelling, command names, options, and configuration keys exact.

## 7. Documentation writing rules

- Prefer concrete, verifiable wording.
- Keep pages focused. Avoid long, unfocused documents.
- Explain what users need to do and what outcome to expect.
- Avoid placeholders such as `TODO`, `FIXME`, `coming soon`, or `TBD` in published documentation unless explicitly requested.
- Do not make unsupported comparisons to other products.
- Do not imply guarantees, compatibility, performance, security properties, or operational behavior that are not verified.
- Preserve the existing tone and structure of nearby pages unless there is a clear reason to change them.

## 8. Docusaurus and MDX conventions

- Preserve existing Docusaurus and MDX conventions.
- Follow existing file organization, front matter patterns, sidebar structure, admonition style, code block formatting, and asset placement.
- Do not add Docusaurus plugins, npm dependencies, formatting tools, build tooling, or new site-wide conventions without explicit approval.
- Use the existing package manager and scripts found in the repository.
- Inspect `package.json` and the lockfile before running install, build, lint, or formatting commands. Do not assume npm, pnpm, yarn, or another tool.
- Keep MDX valid. Escape JSX-sensitive characters where needed.

## 9. Technical accuracy rules

These rules govern how to document technical facts. They are not permission to change technical behavior.

- Verify documentation for CLI commands and configuration options against `./netsody`.
- Verify documented service behavior, API names, supported platforms, error messages, and implementation-backed claims against `./netsody`.
- Verify documented Homebrew installation and service instructions against `./homebrew-tap`.
- Verify documented positioning and use-case language against `./netsody.io`.
- When a detail cannot be verified, say less or ask for maintainer guidance.
- Do not extrapolate from code names, comments, test names, or old docs into user-facing behavior unless the behavior is clear.

## 10. Claims, security wording, and limitations

- Keep claims precise and supportable.
- Do not strengthen claims about security, privacy, reliability, performance, availability, compatibility, or production readiness beyond the source material.
- State limitations only when they are documented, implementation-backed, or explicitly provided by maintainers.
- Avoid absolute wording such as "always", "never", "guaranteed", or "secure" unless the source material supports it exactly.
- Prefer scoped wording that explains the verified condition, platform, command, or behavior.

## 11. Installation and package documentation

- Check `./homebrew-tap` before documenting or changing documentation for Homebrew formula names, tap names, install commands, upgrade commands, service commands, caveats, or package names.
- Check `./netsody` before documenting or changing documentation for binary names, CLI commands, flags, configuration paths, supported platforms, and runtime behavior.
- Do not add installation methods, package managers, scripts, or platforms unless they are verified in the relevant source.
- Keep install examples realistic, safe, and aligned with Netsody.

## 12. Link and navigation rules

- Add or update cross-links when creating, moving, renaming, or materially changing pages.
- Do not create broken links.
- Preserve sidebar organization unless the task requires navigation changes.
- Prefer relative links for local documentation pages when that matches existing convention.
- Verify anchors after changing headings.
- Do not leave orphaned pages when moving or replacing content.

## 13. Screenshots, examples, and generated assets

- Examples must be realistic, safe, and aligned with Netsody.
- Do not include secrets, real private infrastructure details, personal data, or unsafe commands.
- Screenshots and generated assets must match the documented product behavior and current UI or CLI output.
- Do not add decorative assets that do not help users complete documentation tasks.
- Keep generated files minimal and place them according to existing repository conventions.

## 14. Checks and validation

Before finishing, run the narrowest useful validation for the change when practical:

- Inspect `package.json` and the lockfile to determine the package manager and available scripts.
- For content-only edits, check affected Markdown or MDX for syntax, links, headings, and code fences.
- For navigation or MDX changes, run the existing build, typecheck, lint, or validation script if available and reasonably scoped.
- For command examples, compare against `./netsody` or `./homebrew-tap` as appropriate.
- Report any validation that could not be run.

## 15. Change management

- Keep diffs small, reviewable, and directly tied to the task.
- Documentation diffs should usually be limited to prose, examples, front matter, links, headings, screenshots, images, or sidebar entries.
- Do not introduce unrelated refactors, renames, dependency changes, formatting sweeps, or future-facing structure.
- Preserve existing documentation structure unless the task requires a change.
- Remove obsolete content only when the current change clearly makes it wrong or redundant.
- Update related links, sidebars, or references in the same change when needed for consistency.

## 16. Agent behavior and constraints

- Identify the minimal change first, then implement it cleanly.
- Start from the documentation text, examples, links, headings, or navigation that need to change, not from product implementation changes.
- Read nearby documentation before editing so the result matches local style.
- Search the relevant source-of-truth submodule before writing technical or positioning claims.
- Use submodules as references, not work targets.
- Avoid touching Docusaurus configuration, build scripts, dependencies, or package manager files unless the documentation task explicitly requires it.
- Do not leave mixed old and new wording that makes the page look transitional.
- Do not make broad cleanup changes while performing a targeted documentation update.
- Do not overwrite user changes.
- If the task requires a source decision and sources disagree, stop and report the conflict with file paths and the conflicting statements.

## 17. Forbidden changes

Do not do any of the following without explicit approval:

- Modify `./netsody.io`, `./netsody`, or `./homebrew-tap`.
- Modify product software, APIs, CLI behavior, package definitions, service behavior, or release metadata to support a documentation change.
- Add Docusaurus plugins, npm dependencies, formatting tools, or build tooling.
- Change package manager lockfiles as a side effect of documentation work.
- Add unverified features, commands, options, platforms, API names, or configuration keys.
- Add unsupported marketing, security, performance, or compatibility claims.
- Publish placeholders such as `TODO`, `FIXME`, `coming soon`, or `TBD`.
- Apply repository-wide formatting or cleanup.

## 18. When in doubt

Prefer verified, narrow wording over broad claims. Prefer local submodule evidence over memory or external sources. If a claim cannot be verified, do not include it.

When sources conflict, stop and report:

- The documentation change being attempted.
- The conflicting source files or instructions.
- The exact detail that conflicts.
- The smallest maintainer decision needed to proceed.
