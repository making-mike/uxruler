# UXRuler

UXRuler is an open source product and UX strategy skill for AI coding agents. It helps turn a mission or product idea into a clear chain of market, user, need, infrastructure, product, value, decisions, metrics, and UX evaluation artifacts.

The public website lives in `index.html`. The installable skill lives in `product-ux-action-pack/`.

## What It Helps With

- Start a new digital product from mission and market context before jumping into screens.
- Audit an existing product or feature against real users, needs, infrastructure, rollout, and measurable value.
- Create agent-readable product artifacts inside a repository.
- Keep UX decisions connected to evidence, metrics, and feedback loops.
- Evaluate product quality through four UX dimensions: usefulness, ergonomics, attractiveness, and identity.

## Process

UXRuler uses this sequence:

```text
mission -> audience/market -> user -> need -> infrastructure -> product -> value -> evaluation
```

Decision and measurement are cross-cutting. At every stage, the skill asks:

- What do we assume?
- What evidence do we have?
- What decision are we making?
- How will we know we were right?

## Install In Codex

Use Codex's skill installer with the public skill folder:

```text
Use $skill-installer to install this skill:
https://github.com/making-mike/uxruler/tree/main/product-ux-action-pack

Then restart Codex to pick up new skills.
```

After installation, start with:

```text
Use $product-ux-action-pack to turn this product idea into a mission, market, user, need, infrastructure, product, value, metrics, and repo artifact plan.
```

## Install In Claude Code

Install as a personal Claude Code skill:

```sh
REPO="https://github.com/making-mike/uxruler.git"
TMP_DIR="$(mktemp -d)"
git clone --depth 1 "$REPO" "$TMP_DIR/uxruler"
mkdir -p ~/.claude/skills
rm -rf ~/.claude/skills/product-ux-action-pack
cp -R "$TMP_DIR/uxruler/product-ux-action-pack" ~/.claude/skills/
rm -rf "$TMP_DIR"
```

Restart Claude Code after installing.

## Install Per Project

For a project-local skill that can be committed with a product repo:

```sh
REPO="https://github.com/making-mike/uxruler.git"
TMP_DIR="$(mktemp -d)"
git clone --depth 1 "$REPO" "$TMP_DIR/uxruler"
mkdir -p .claude/skills
rm -rf .claude/skills/product-ux-action-pack
cp -R "$TMP_DIR/uxruler/product-ux-action-pack" .claude/skills/
rm -rf "$TMP_DIR"

git add .claude/skills/product-ux-action-pack
```

## Repository Layout

```text
.
├── index.html
├── product-ux-action-pack/
│   ├── SKILL.md
│   ├── agents/openai.yaml
│   └── references/
│       ├── artifact-templates.md
│       └── repo-artifact-blueprint.md
├── README.md
├── LICENSE
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
└── SECURITY.md
```

## Website Publishing

The root `index.html` is a static page and can be served directly by GitHub Pages, Vercel, Netlify, or any static host.

For GitHub Pages with the custom domain, keep `CNAME` set to:

```text
uxruler.com
```

## Contributing

Contributions are welcome. Start with `CONTRIBUTING.md` and keep changes focused: improve the skill workflow, clarify templates, fix installation docs, or improve the static website without adding a build step unless it is clearly needed.

## License

MIT. See `LICENSE`.
