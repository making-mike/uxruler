# Agent Instructions

## Product Context

UX RULER is an open source UX process for humans and agents. It moves people from mission to audience, user, need, infrastructure, product experience, value delivery, decisions, metrics, and UX evaluation.

Before changing product behavior, documentation, templates, examples, or the website, read:

1. `README.md`
2. `PRODUCT.md`
3. `uxruler/SKILL.md`
4. `uxruler/references/repo-artifact-blueprint.md` only if you need to add or change repo artifact structure
5. `uxruler/references/artifact-templates.md` only if you need template sections

Keep `PRODUCT.md` as the default product memory. Do not split it into many files unless a specific decision, metric, experiment, or rollout needs its own artifact.

## Current Product Stage

UX RULER is in an early open source release stage. The repo contains the installable skill, references, GitHub contribution templates, a static website, and one compact product map.

## Commands

There is no build step for the static site.

Run this check when editing skill metadata or agent config:

```sh
ruby -e 'require "yaml"; s=File.read("uxruler/SKILL.md"); YAML.safe_load(s[/\A---\n(.*?)\n---/m,1]); YAML.safe_load(File.read("uxruler/agents/openai.yaml")); puts "yaml ok"'
```

When editing `index.html`, open it locally in a browser and verify the page layout, graph, install-command rendering, and copy buttons.

## Product Rules

- Start UX RULER work as a conversation when context is missing: ask 1 to 3 focused questions, then proceed with stated assumptions.
- For broad repo requests such as "use this skill on this repo", ask what decision the repo pass should support or state the assumed decision before auditing.
- Verify important market, audience, competitor, user-need, or tool-behavior claims with available repo context, provided files, or public sources when relevant.
- Keep audience validation focused on market size, reachability, buyer/adopter context, and demand signals. Keep user validation focused on jobs, pains, gains, usability, and behavior.
- Present synthesized insights and confidence before creating artifacts.
- End UX RULER responses by asking how to help with the next step, offering concrete options based on the decision.
- Start from mission, audience, user, and need before proposing features or UI.
- Separate audience, buyer, and adopter from the concrete user performing tasks.
- Tie every new feature, template, or reference file to a user need and a measurement signal.
- Keep infrastructure as an enabler of product value.
- Prefer one clear artifact over many small files.
- Keep generated templates compact and copyable.
- Preserve English for broad open source documentation. Use Polish where examples address the original UX RULER audience or the website.

## Update Expectations

Update `PRODUCT.md` when the change affects mission, audience, user need, value, assumptions, risks, metrics, or UX evaluation.

## Do Not Overwrite Without Explicit Instruction

- Do not rename the technical skill id `uxruler` without an explicit migration plan.
- Do not replace the skill workflow with a UI-first or feature-first process.
- Do not remove install instructions for Codex, Claude Code, or project-local usage unless replacing them with verified alternatives.
- Do not expand the repo into a large artifact tree just because the blueprint exists.
