# Contributing To UXRuler

Thanks for helping improve UXRuler. The project is intentionally small: one static website and one installable agent skill. Keep contributions focused, readable, and useful for people building real digital products.

## Good Contributions

- Clearer product and UX workflow guidance.
- Better artifact templates for product teams and agents.
- Fixes to installation instructions for Codex, Claude Code, or project-local usage.
- Improvements to the responsive website in `index.html`.
- Source corrections in `product-ux-action-pack/references/`.
- Examples that show how UXRuler works in a real repository.

## Before You Open A Pull Request

1. Read `product-ux-action-pack/SKILL.md`.
2. Keep the technical skill name as `product-ux-action-pack` unless the maintainers explicitly decide to migrate it.
3. Keep the website static unless a build step becomes necessary.
4. Check that links, install commands, and examples still point to the public repo.
5. Prefer small pull requests with one clear purpose.

## Writing Style

- Be concrete. UXRuler should help people make decisions, not just describe product theory.
- Tie features to market, user need, infrastructure, product experience, value, metrics, and feedback.
- Use durable artifacts: assumptions, decision logs, research notes, metrics, rollout plans, and UX evaluation.
- Keep templates copyable and compact.
- Use Polish where the website speaks to the original audience, and English where docs are meant for the broader open source ecosystem.

## Local Checks

There is no build step. Before submitting, at minimum:

```sh
ruby -e 'require "yaml"; s=File.read("product-ux-action-pack/SKILL.md"); YAML.safe_load(s[/\A---\n(.*?)\n---/m,1]); YAML.safe_load(File.read("product-ux-action-pack/agents/openai.yaml")); puts "yaml ok"'
```

Open `index.html` in a browser and check that:

- the page loads without console errors;
- the process graph is readable on desktop;
- mobile layout does not overflow horizontally;
- install commands use the intended repo URL.

## Pull Request Checklist

- [ ] The change is scoped and easy to review.
- [ ] Installation instructions still work.
- [ ] Skill metadata remains valid YAML.
- [ ] The website still works as a standalone static file.
- [ ] New templates or references explain when to use them.
