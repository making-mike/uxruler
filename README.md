# UX RULER

UX RULER is an open source UX process for humans and agents. It turns a mission or product idea into a conversational discovery flow: context questions, agentic research, real usage signals when available, verified insights, product decisions, metrics, UX evaluation, and compact repo artifacts.

The installable skill lives in `uxruler/`.

## What It Helps With

- Start a new digital product from mission and market context before jumping into screens.
- Ask for the missing context before generating a product map.
- Research and verify market size, audience reachability, alternatives, and user-need assumptions when sources are available.
- Inspect repo-connected usage data, analytics, logs, issues, feedback, and support signals available to the agent before asking the user for missing evidence.
- Present insights and decision implications before artifacts.
- Audit an existing product or feature against real users, needs, infrastructure, rollout, and measurable value.
- Create compact agent-readable product artifacts inside a repository.
- Keep UX decisions connected to evidence, metrics, and feedback loops.
- Evaluate product quality through four UX dimensions: usefulness, ergonomics, attractiveness, and identity.

## Process

UX RULER uses this sequence:

```text
conversation -> mission -> audience/market -> user -> need -> research -> infrastructure -> product -> value -> evaluation
```

Decision and measurement are cross-cutting. At every stage, the skill asks:

- What do we assume?
- What usage data or evidence do we have?
- What decision are we making?
- How will we know we were right?

## Product Context In This Repo

This repository also uses UX RULER on itself. Start with:

- `AGENTS.md` for agent instructions and update expectations.
- `PRODUCT.md` for the compact product thesis, audience, user need, value, assumptions, risks, metrics, and UX test.

The full artifact blueprint lives in `uxruler/references/repo-artifact-blueprint.md`, but this repo intentionally keeps product memory in one file until a specific decision needs more structure.

## Install In Codex

Use Codex's skill installer with the public skill folder:

```text
Use $skill-installer to install this skill:
https://github.com/making-mike/uxruler/tree/main/uxruler

Then restart Codex to pick up new skills.
```

After installation, start with:

```text
Use $uxruler as an open source UX process for humans and agents. Ask me for missing context first, then inspect any real usage or repo-connected data available to the agent, research and verify the market, audience, alternatives, and user need, and present insights, recommendations, metrics, and any compact repo artifact.
```

## Install In Claude Code

Install as a personal Claude Code skill:

```sh
REPO="https://github.com/making-mike/uxruler.git"
TMP_DIR="$(mktemp -d)"
git clone --depth 1 "$REPO" "$TMP_DIR/uxruler"
mkdir -p ~/.claude/skills
rm -rf ~/.claude/skills/uxruler
cp -R "$TMP_DIR/uxruler/uxruler" ~/.claude/skills/
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
rm -rf .claude/skills/uxruler
cp -R "$TMP_DIR/uxruler/uxruler" .claude/skills/
rm -rf "$TMP_DIR"

git add .claude/skills/uxruler
```

## Repository Layout

```text
.
├── uxruler/
│   ├── SKILL.md
│   ├── agents/openai.yaml
│   └── references/
│       ├── artifact-templates.md
│       └── repo-artifact-blueprint.md
├── AGENTS.md
├── PRODUCT.md
├── index.html
├── .github/
├── README.md
├── LICENSE
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SUPPORT.md
└── SECURITY.md
```

## Contributing

Contributions are welcome. Start with `CONTRIBUTING.md` and keep changes focused: improve the skill workflow, clarify templates, fix installation docs, or add examples that make the product workflow easier to use.

## License

MIT. See `LICENSE`.
