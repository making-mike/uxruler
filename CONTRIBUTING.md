# Contributing To UXRuler

Thanks for helping improve UXRuler. The project is intentionally small: one installable agent skill with supporting references. Keep contributions focused, readable, and useful for people building real digital products.

## Good Contributions

- Clearer product and UX workflow guidance.
- Better artifact templates for product teams and agents.
- Fixes to installation instructions for Codex, Claude Code, or project-local usage.
- Source corrections in `uxruler/references/`.
- Examples that show how UXRuler works in a real repository.

## Before You Open A Pull Request

1. Read `uxruler/SKILL.md`.
2. Keep the technical skill name as `uxruler` unless the maintainers explicitly decide to migrate it.
3. Check that links, install commands, and examples still point to the public repo.
4. Prefer small pull requests with one clear purpose.

## Writing Style

- Be concrete. UXRuler should help people make decisions, not just describe product theory.
- Tie features to market, user need, infrastructure, product experience, value, metrics, and feedback.
- Use durable artifacts: assumptions, decision logs, research notes, metrics, rollout plans, and UX evaluation.
- Keep templates copyable and compact.
- Use Polish where examples address the original audience, and English where docs are meant for the broader open source ecosystem.

## Local Checks

There is no build step. Before submitting, at minimum:

```sh
ruby -e 'require "yaml"; s=File.read("uxruler/SKILL.md"); YAML.safe_load(s[/\A---\n(.*?)\n---/m,1]); YAML.safe_load(File.read("uxruler/agents/openai.yaml")); puts "yaml ok"'
```

Check that install commands use the intended repo URL.

## Pull Request Checklist

- [ ] The change is scoped and easy to review.
- [ ] Installation instructions still work.
- [ ] Skill metadata remains valid YAML.
- [ ] New templates or references explain when to use them.
