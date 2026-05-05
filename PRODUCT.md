# Product Map

This is the compact UX RULER map for this repository. It keeps the product logic in one readable place. Use the full artifact blueprint in `uxruler/references/repo-artifact-blueprint.md` only when the project has enough usage, risk, or collaborators to justify more files.

## Product Thesis

We believe product builders and AI coding-agent users need an open source UX process for humans and agents, because AI-assisted software work makes it easy to generate features before the market, user need, evidence, value, and measurement logic are clear.

## Audience

Primary audience: people using AI coding agents to plan, audit, or improve digital products inside a repository.

Secondary audiences:

- founders starting a product;
- product managers, designers, and researchers translating discovery into build work;
- engineers who need product context before delegating implementation;
- open source maintainers who want clearer contribution decisions.

Audience validation should focus on whether this market is large and reachable enough: size of AI coding-agent usage, active communities, comparable skill/plugin ecosystems, search and GitHub interest, and channels where product builders discover agent workflows. This is separate from user validation, which tests whether individual users understand and benefit from UX RULER.

## User Need

The user wants agent-assisted product work to stay connected to real value, so they try to explain context, validate assumptions, use real app/repo evidence, and create product memory in the repo, but they run into one-shot frameworks, scattered templates, vague UX language, missing usage data, and no consistent way to turn research into decisions and metrics.

## Product

UX RULER is an open source UX process for humans and agents, delivered as an installable agent skill plus reference templates and a static website.

Core surfaces:

- `uxruler/SKILL.md`: the workflow and operating rules.
- `uxruler/references/`: optional artifact blueprint and templates.
- `index.html`: bilingual public explanation, process map, install commands, and starter prompts.
- `.github/`: issue and PR templates for contributions.

## Research Insights

| Insight | Evidence | Confidence | Decision Implication |
|---|---|---|---|
| UX RULER should be conversational before it becomes documentary. | User feedback: the previous skill application created too many files and was hard to comprehend; follow-up feedback asks for context questions and research. | High | Make conversation, clarification, and synthesis part of the skill contract. |
| Compact artifacts remain important, but they should come after insight. | Repo now uses `PRODUCT.md` instead of a generated `product/` tree. | High | Keep `PRODUCT.md` as the default artifact and expand only when needed. |
| Agentic research is a differentiator over static UX worksheets. | User explicitly asked the skill to verify context and present insights. | Medium | Add research planning, source verification, confidence labels, and insight synthesis to the workflow. |
| Broad repo requests need decision framing before audit output. | User tested `use SKILL.md on this repo`; the output was compact and evidence-backed, but it did not ask what decision the audit should support. | High | Add an explicit ambiguous-repo-request rule to the skill. |
| Audience validation should not be reduced to testing with a few users. | User feedback: the audience row suggested testing with target users, but audience should validate how many potential users exist. | High | Separate market sizing and reachability from user-need validation in the skill. |
| Real usage and repo-connected data should be checked before asking the user for evidence. | User asked the skill to gather real app usage or any other repo-connected data available to agents, and to ask for information when that is not possible. | High | Add a usage-data discovery rule and fallback question pattern to the skill workflow. |
| Standards-backed repo artifacts need executable templates, not only source names. | User feedback: UX RULER-created `design.md` was not compatible with Google Labs Code `design.md`; upstream expects YAML design tokens plus ordered markdown rationale. | High | Add a compliant `DESIGN.md` template and lint expectation before recommending or creating that artifact. |

## Value

UX RULER is useful when it helps a person and agent have a better product conversation, verify important assumptions with available usage/repo evidence, make a clearer product decision, narrow a feature, create durable repo context, or define a validation step before implementation.

North-star signal: validated UX RULER applications, meaning real uses where the conversation and research change or clarify a product decision, metric, assumption, risk, or next validation step.

## Current Assumptions

| Assumption | Confidence | Validation |
|---|---|---|
| AI-assisted product builders need repo-native product context. | Medium | Watch whether users apply UX RULER to real repos, not just read it. |
| There are enough potential AI coding-agent product builders to justify the skill. | Medium | Estimate audience size and reachability using public agent adoption signals, GitHub/search interest, communities, and comparable tool ecosystems. |
| Users want UX RULER to ask clarifying questions before producing artifacts. | High | Test whether conversational starts feel clearer than one-shot outputs. |
| Ambiguous repo requests should not default silently to a full audit. | High | In future tests, check whether UX RULER asks the decision-framing question or states an explicit assumed decision. |
| Agentic research makes UX RULER more useful than a static worksheet. | Medium | Compare outputs with and without repo/web/source verification. |
| Agents can often discover useful usage signals from repo-connected tools or artifacts before asking the user. | Medium | Test UX RULER on repos with analytics configs, issues, feedback exports, logs, and connected tools; check whether it asks only for missing evidence. |
| A compact artifact set is more useful than scaffolding many files. | High | Keep this repo to `PRODUCT.md` unless a specific decision needs a separate artifact. |
| The static website is enough for early adoption. | Medium | Ask early users whether the install path and process map are clear. |
| A bilingual website can improve reach while preserving Polish examples and English open source workflows. | Low | Ask Polish and non-Polish users whether the language switch, install paths, and prompts feel clear. |

## Risks

| Risk | Response |
|---|---|
| UX RULER feels like product theory instead of practical agent tooling. | Add examples that show real repo decisions. |
| UX RULER asks too many questions and slows the user down. | Ask only 1 to 3 high-leverage questions, then proceed with stated assumptions. |
| Research looks authoritative even when evidence is weak. | Separate user claims, verified evidence, inference, and unknowns. |
| UX RULER may imply access to private usage data the current agent cannot actually see. | Require agents to name what they can access and ask for the smallest missing export, summary, or tool access instead of inventing evidence. |
| UX RULER outputs can stop at a decision without helping the user move. | End each use by asking how the agent can help with the next step, offering concrete options. |
| The workflow creates document bloat. | Default to one compact product map; expand only for real decisions. |
| Referenced artifact standards drift or get applied loosely. | Keep source-pattern notes, compliant templates, and validation commands for standards-backed artifacts such as `DESIGN.md`. |
| Install instructions drift as tools change. | Verify install examples when changing repo URL or folder layout. |
| Website and skill wording drift apart. | Update `README.md`, `index.html`, and `uxruler/SKILL.md` together when the workflow changes. |

## UX Test

| Dimension | Current Read | Next Improvement |
|---|---|---|
| Usefulness | Strong promise, still needs external evidence. | Validate with 3 real applications. |
| Ergonomics | Compact skill and website, but examples would help. | Add one applied example. |
| Attractiveness | Distinct process map and clear visual system. | Keep visual clarity while avoiding extra decoration. |
| Identity | Positions users as thoughtful builders who use AI without skipping product judgment. | Keep artifacts lightweight so the identity does not feel bureaucratic. |

## Next Validation Step

First validate audience scale and reachability: estimate how many potential AI coding-agent product builders exist, where they gather, and what demand signals suggest interest in product/UX strategy workflows. Then run 5 to 8 user sessions to test whether UX RULER changes a decision, metric, risk, or next validation step.
