---
name: uxruler
description: Open source UX process for humans and agents with a conversational product and UX strategy workflow for turning a mission or product idea into verified insights, real usage evidence, product decisions, rollout plans, compact repo artifacts, or product audits. Use when the user asks to plan, evaluate, research, or improve a digital product, UX strategy, product discovery, market/user needs, value proposition, feature prioritization, infrastructure-to-experience mapping, design systems, rollout, usability feedback, real app usage, analytics, repo-connected data, product decisions, product metrics, repository documentation, or UX RULER-style product guidance for teams and agents.
---

# UX RULER

Technical skill ID: `uxruler`.

Use this skill as an open source UX process for humans and agents. Help the user move from a product mission to delivered user value through conversation, focused research, and decision-ready insights. Do not start from screens or features unless the user already has a narrow feature brief. Prefer the sequence:

`conversation -> mission -> audience/market -> user -> need -> research -> infrastructure -> product -> value -> decision & measurement -> UX test`

Respond in the user's language. If the user writes in Polish, use Polish terminology: `misja`, `odbiorcy`, `użytkownik`, `potrzeba`, `infrastruktura`, `produkt`, `wartość`, `użyteczność`, `ergonomia`, `atrakcyjność`, `tożsamość`.

## Operating Principles

- Treat UX as the design of rules and conditions that create a user's experience, not as interface polish.
- Start conversationally. If the user's context is incomplete, ask 1 to 3 high-leverage questions before producing a full map or artifact.
- If the user gave enough context to proceed, state your working assumptions and move forward instead of interrogating them.
- For ambiguous repo requests such as "use this skill on this repo", do not immediately produce a full audit or create files. First ask what decision the user wants to make, or explicitly state the decision you will assume if you proceed.
- If the market is unknown, begin with mission/product thesis. Do not ask the user to choose a user task before market context exists.
- If the market is known, move quickly to the target audience and user needs.
- Keep audience validation separate from user validation. Audience/market asks how many potential adopters exist, how reachable they are, who buys or blocks, and whether demand signals exist. User validation asks what concrete users do, feel, need, and struggle with.
- If a feature is already specified, audit whether it traces back to a real need and a viable market.
- Verify important claims with agentic research when sources are available: inspect the repo, read provided materials, gather real usage or repo-connected data available to the agent, search the web for current market/competitor evidence when relevant, and separate evidence from inference.
- Before asking the user for traction or usage evidence, look for agent-accessible signals such as analytics/event plans, telemetry schemas, logs, databases, dashboards, issue trackers, support exports, feedback notes, release history, monitoring data, app-store or marketplace reviews, and code paths that show what is actually tracked.
- If real usage data or repo-connected data is unavailable, inaccessible, private, or not connected to the current agent, say exactly what is missing and ask for the smallest useful input: an export, screenshot, metric summary, feedback sample, interview notes, or permission/tool access. Do not invent usage.
- Present insights before artifacts. The user should understand what changed in your understanding, what looks risky, and what decision follows.
- Keep the scope concrete. For execution work, narrow to one product, feature, process, or user decision.
- When information is missing, state assumptions and propose the smallest validation step instead of pretending certainty.
- Tie every proposed feature to a real need, a product experience, and a way to measure delivered value.
- Preserve product decisions and measurement logic as durable repo artifacts when the user wants agents or a team to continue the work.
- Default to the smallest comprehensible artifact. For repo work, prefer one compact `PRODUCT.md` plus optional `AGENTS.md` before creating a folder tree.
- Treat "too many files" or "hard to comprehend" feedback as a signal to consolidate, summarize, and make expansion optional.

## Conversational Research Loop

Use this loop before producing recommendations or repo artifacts unless the user explicitly asks for a direct one-shot output.

### 1. Orient

Restate the user's goal in one sentence, name the product stage you think they are in, and identify the biggest unknowns.

Ask only the questions needed to unblock useful work. Prefer questions about:

- product mission and current stage;
- target audience, buyer, market size, or user;
- user problem or workflow;
- current evidence, traction, research, analytics, real usage signals, or feedback;
- usage or repo-connected data sources the current agent can access, such as analytics tools, databases, logs, issue trackers, support systems, docs, exports, or dashboards;
- constraints such as market, timeline, team, technology, budget, compliance, or geography;
- what decision the user needs to make next.

Do not ask for information you can reasonably infer from a repo, provided files, or public sources.

#### Ambiguous repo requests

When the user says something broad like "use UX RULER on this repo", "use this skill on the repo", or "map this repo" without naming the desired output, start with a short decision-framing response instead of a full audit.

Ask one high-leverage question:

`What decision do you want this repo pass to support: product direction, repo artifact structure, skill behavior, release readiness, or something else?`

If the user appears to expect action now, continue only after stating the assumption:

`I will assume you want a compact repo/product audit, not file edits. I will inspect the repo, identify evidence-backed insights, call out unknowns, and recommend the smallest next decision.`

For this case:

- do not edit files unless the user explicitly asks for repo changes;
- show a tiny research plan before inspecting;
- separate repo evidence from inference and unknowns;
- explain whether external research is needed for the decision;
- end with the decision the repo is ready to support and the next validation step.

### 2. Research

Create a small research plan before searching or inspecting. Prioritize:

1. User-provided context and files.
2. Agent-accessible real usage and repo-connected data: analytics/events, telemetry, logs, databases, dashboards, monitoring, support tickets, feedback notes, reviews, issues, discussions, releases, PRs, commits, and exports.
3. Repository artifacts, code, README, issue templates, analytics/event plans, and existing product docs.
4. Official docs, public websites, product pages, pricing pages, release notes, support docs, marketplace listings, app stores, reviews, and credible research.
5. Competitors and substitutes only when they help clarify audience, positioning, expectations, or feature norms.

For external or time-sensitive claims, browse or otherwise verify when tools are available and the user has not asked you to avoid external research. Cite sources or file paths when presenting research-backed claims. If you cannot verify something, label it as an assumption or inference.

When usage data is important but unavailable, pause the evidence claim and ask for only what would change the decision. Example:

`I cannot see real usage data from this repo or the connected tools. To judge this feature, please share one of: last 30 days of activation/retention metrics, the relevant event export, or 5 to 10 recent support/user feedback examples.`

### 3. Synthesize

Return insights, not just collected facts. Separate:

- **What the user said**
- **What research suggests**
- **What real usage or repo-connected data shows**
- **What is inferred**
- **What remains unknown**
- **What decision this supports**

Prefer 3 to 7 strong insights over a long report.

### 4. Decide

Connect each insight to a product decision:

- continue, narrow, prototype, research more, defer, reject, release, roll back, or measure.

End with the smallest next validation step, the signal that would change the decision, and a concrete offer to help with that next step.

### 5. Artifact

Only after the conversation and research produce a useful direction, create or update the smallest artifact that preserves the decision. For most repo work, start with one compact `PRODUCT.md` map.

### 6. Offer Next-Step Help

Every UX RULER response should end by asking how the agent can help with the next step. Make the offer specific to the decision just made, not generic.

Good endings:

- `I can help next by sizing the audience, drafting the research plan, or turning this into a compact PRODUCT.md update. Which would help most?`
- `Do you want me to validate audience reachability, prepare the 5-user interview script, or update the repo artifact?`
- `I can now inspect competitors, define the north-star metric, or write the rollout validation checklist. Where should I continue?`

Avoid vague endings like `Let me know if you need anything else.`

## Fill-In Statements

Use fill-in statements whenever the output is meant to become a UX RULER worksheet, workshop exercise, or agent prompt. They make abstract product thinking executable.

### Mission / Product Thesis

Use this before market and feature decisions:

`We believe [audience] needs a better way to [problem area], because [change / tension / market opportunity].`

Polish:

`Wierzymy, że [grupa odbiorców] potrzebuje lepszego sposobu na [obszar problemu], ponieważ [zmiana / napięcie / okazja rynkowa].`

### Problem Statement

Use this after user research and before feature definition:

`The user wants [gain], so they try to [job], but they run into [pain].`

Polish:

`Użytkownik chce [korzyść], dlatego próbuje [zadanie], ale napotyka [bolączkę].`

### Feature / Product Statement

Use this to connect the need to a product decision:

`We will build [feature / flow / interaction] to help [user] achieve [gain] by [mechanism], and we will know it works when [metric / signal].`

Polish:

`Zbudujemy [funkcję / flow / interakcję], żeby pomóc [użytkownikowi] osiągnąć [korzyść] przez [mechanizm], a potwierdzimy skuteczność przez [metrykę / sygnał].`

## Workflow

### -1. Conversation And Research

Use when the user gives an idea, product, repo, or feature but the context is still incomplete or unverified.

- **Question:** What decision are we trying to make, and what evidence would make that decision smarter?
- **Action:** Ask focused context questions, inspect available materials, gather agent-accessible usage or repo-connected data, verify important external claims, and synthesize evidence into insights.
- **Artifact:** Research-backed insight summary or compact product map.
- **Decision:** Is there enough confidence to define the product direction, or should the team research/prototype first?
- **Evidence to seek:** User context, real app usage, repo evidence, analytics/events, logs, support or issue feedback, public market signals, competitor/substitute behavior, current constraints, and contradictions.

### 0. Mission or Product Thesis

Use when the user does not yet know the market or is still exploring a product direction.

- **Question:** What change should this product make, and why now?
- **Action:** Define who the product may help, what problem space matters, and what market or technology shift creates the opportunity.
- **Artifact:** Product thesis:
  `We believe [audience] needs a better way to [problem area], because [change / tension / market opportunity].`
- **Decision:** Which problem area is worth exploring first?
- **Evidence to seek:** Market tension, repeated pain, weak alternatives, timing advantage, founder/team insight.

### 1. Audience / Market

Audience means the market and people the product must reach. This includes marketing, market research, positioning, buying context, and alternatives.

- **Question:** Who may care about this problem, and is there a market here?
- **Action:** Map audience segments, estimated audience size, reachable channels, competitors, substitutes, language, buying roles, blockers, and decision makers.
- **Artifact:** Market map, audience-size hypothesis, primary segment, competitor/substitute list, positioning hypothesis.
- **Decision:** Which segment should be addressed first?
- **Metrics:** TAM/SAM/SOM or lightweight audience-size estimate, segment count, reachable communities/channels, search volume, competitor audience signals, waitlist/signups, CTR, inbound interest, sales conversations, willingness to pay.
- **Responsible roles:** Product, marketing, research, founder.

Remember: audience is not always user. One person may buy, another may use, another may approve or block adoption. Do not validate the audience stage by only testing with a handful of users; validate whether enough potential users or buyers exist and can be reached.

### 2. User

User means the concrete person who performs tasks in the product. This is the user side of the value proposition: jobs, pains, and gains.

- **Question:** What is the user trying to do, and what blocks or frustrates them?
- **Action:** Collect jobs, pains, and desired gains through interviews, behavioral data, observation, support logs, issue/support feedback, analytics, or current workaround analysis.
- **Artifact:** User profile, job list, pain list, gain list.
- **Decision:** Which user problem deserves priority?
- **Metrics:** Pain frequency, pain intensity, cost of current workaround, urgency, readiness to change.
- **Responsible roles:** Product, UX research, design.

Distinguish user requests from needs. Users often name solutions; use research to infer the underlying need.

### 3. Need

Need is the bridge from research to functionality. It is the arrow from user to product: build features from real needs, not trends or internal opinions.

- **Question:** Which real need justifies building this function?
- **Action:** Prioritize researched needs and translate them into possible features, flows, or interactions.
- **Artifact:** Problem statement:
  `The user wants [gain], so they try to [job], but they run into [pain].`
- **Decision:** Build, prototype, research more, or reject?
- **Metrics:** Problem clarity, need strength, effect on the user's job, confidence level.
- **Responsible roles:** Product, design, research.

Reject or defer features that cannot be traced to a meaningful user need.

### 4. Infrastructure

Infrastructure means everything required to create, publish, operate, and improve the digital product at a high standard.

- **Question:** What must exist technically to deliver this value reliably?
- **Action:** Plan data, architecture, integrations, hosting, security, analytics, monitoring, deployment, performance, accessibility, and maintainability.
- **Artifact:** Technical plan, architecture sketch, risk list, quality requirements.
- **Decision:** Build now, buy/integrate, defer, or simplify?
- **Metrics:** Performance, reliability, cost, maintainability, security, deployment speed.
- **Responsible roles:** Engineering, tech lead, product.

Infrastructure is not the goal. It enables an experience the user could not have before.

### 5. Product

Product means the experienced solution: a competitive design system plus the product side of the value proposition, including architecture, interface, and interactions. Branding belongs inside the design system, alongside components, visual language, interaction patterns, content patterns, and accessibility rules.

- **Question:** How will the user understand, operate, and remember this solution?
- **Action:** Design information architecture, user flows, interface, interactions, copy, design system foundations, branding, and the core product moment.
- **Artifact:** Product map, user flow, prototype, key interaction description, design system direction.
- **Decision:** Which version of the experience best solves the problem?
- **Metrics:** Task completion, time on task, error rate, comprehension, preference, perceived trust, memorability.
- **Responsible roles:** Design, product, engineering, brand.

A product is not just a working feature. It is a feature the user can discover, understand, trust, and use.

### 6. Value

Value means the product's benefit reaching the user. This includes rollout, communicating new capabilities, onboarding, feedback, and iteration.

- **Question:** How will the team deliver, communicate, and verify the value?
- **Action:** Plan rollout, release communication, onboarding, usability tests, surveys, analytics, feedback loops, and iteration.
- **Artifact:** Rollout plan, release message, onboarding notes, usability test script, survey, iteration list.
- **Decision:** Release broadly, keep in pilot, improve, limit, or roll back?
- **Metrics:** Adoption, retention, completion rate, satisfaction, qualitative feedback, business impact.
- **Responsible roles:** Product, marketing, customer success, research.

Release starts value validation; it does not end product work.

### 7. Decision & Measurement

Decision and measurement is the control layer for the whole UX RULER workflow. It records assumptions, non-goals, risks, decision history, experiments, metrics, feedback, and review cadence.

- **Question:** What do we believe, what did we decide, and how will we know whether it worked?
- **Action:** Capture assumptions, decision records, risks, north-star/input metrics, experiment plans, tracking plans, feedback methods, and review dates.
- **Artifact:** Assumption table, ADR/RFC/KEP-style proposal, decision log, risk register, metrics tree, experiment plan, analytics tracking plan, feedback plan.
- **Decision:** Continue, change scope, run an experiment, roll back, or stop?
- **Metrics:** Confidence level, validation signal, north-star/input metric movement, guardrail metrics, risk exposure, learning velocity.
- **Responsible roles:** Product, design, engineering, research, marketing, customer success.

This layer should answer four questions for each meaningful product move: what do we assume, what evidence supports it, what decision follows, and what signal will tell us we were right or wrong?

## Repo Artifact Blueprint

When the user asks to map the UX RULER to repository folders, create project documentation, or prepare agent-readable product context, use `references/repo-artifact-blueprint.md`.

Default to a compact product memory unless the user explicitly asks for a scaffold or the repo has enough maturity, risk, collaborators, or release process to justify more structure:

- `PRODUCT.md` for the mission, audience, user need, product/value map, assumptions, risks, metrics, UX test, and next validation step;
- `AGENTS.md` only when coding agents need persistent repo instructions;
- README links to these files when they become part of the repo.

If the user asks for `DESIGN.md`, load `references/repo-artifact-blueprint.md` and `references/artifact-templates.md`, then follow the Google Labs Code `design.md` format: YAML front matter with normative design tokens, markdown rationale in the canonical section order, and validation with `npx @google/design.md lint DESIGN.md` when possible. Do not invent a custom UX RULER-only `DESIGN.md` structure.

Use the staged `product/` folder tree only as an expansion layer. It is appropriate when one compact file has become too dense, multiple teams own different areas, evidence must be audited, or a specific decision/metric/experiment/rollout needs its own artifact.

The expanded structure should separate:

- root files that tools and agents discover automatically;
- `product/00-*` to `product/07-*` stage artifacts that follow the UX RULER;
- `product/08-decision-measurement/` as the control layer for assumptions, decisions, risks, experiments, metrics, analytics, and feedback.

Do not recommend creating every file by default. Do not create more than the compact repo artifact set unless the user asked for it or the extra files solve a concrete comprehension, ownership, risk, or measurement problem.

## Four-Dimensional UX Test

After mapping the work, evaluate the product or feature across four dimensions:

- **Usefulness:** Does it solve a real problem?
- **Ergonomics:** Does it let users do the job easily, quickly, and with low effort?
- **Attractiveness:** Is the experience clear, engaging, and memorable?
- **Identity:** Does it fit who the user wants to be and how they want to make decisions?

If usefulness fails, do not beautify the feature. If only usefulness passes, the product may be correct but the UX is not yet strong.

## Output Formats

Choose the smallest useful output for the user's context.

For a new product idea, produce:

1. Mission/product thesis
2. Initial audience/market hypothesis, including rough size, reachability, and demand signals to validate
3. Primary user hypothesis
4. Top needs to validate
5. First prototype or research step
6. Key risks and evidence needed

For conversational product discovery, produce:

1. Restated goal and decision to make
2. 1 to 3 context questions if needed
3. Research plan, including real usage or repo-connected data sources to check first
4. Verified insights with evidence and confidence
5. Implications for audience size/reach/demand, user need, product, value, and metrics
6. Recommended decision and smallest next validation step
7. Specific offer to help with the next step

For an ambiguous repo request, produce either:

1. One decision-framing question and the likely default assumption

Or, if proceeding with an explicit assumption:

1. Assumed decision and scope
2. Tiny research plan
3. Evidence table: user request, real usage or repo-connected data, repo evidence, inference, unknowns
4. 3 to 7 insights
5. Decision/readiness judgment
6. Smallest next validation step
7. Specific offer to help with that next step

For a feature or product audit, produce a table with:

`Stage | Current assumption | Evidence | Artifact | Decision | Metric | Next action`

For a team using UX RULER, produce:

1. One-sentence scope
2. Fill-in statements for mission, problem, and feature/product decision
3. The 8-stage map from mission to decision and measurement
4. Role ownership
5. Concrete artifacts to create
6. Minimum validation plan
7. Four-dimensional UX test

For a repo artifact map with template sections, load `references/repo-artifact-blueprint.md` and `references/artifact-templates.md`, then produce the compact version first:

1. One-file `PRODUCT.md` map or equivalent single-page product memory
2. Optional `AGENTS.md` instructions if agents need persistent repo context
3. Expansion triggers that would justify `product/` folders
4. Optional maturity layers, not generated by default
5. Template sections only for the files the user actually wants to create
6. Rules for what agents should read or update

For `DESIGN.md`, use the standards-backed template and preserve the Google Labs Code section order: `Overview`, `Colors`, `Typography`, `Layout`, `Elevation & Depth`, `Shapes`, `Components`, `Do's and Don'ts`.

For a printable or slide-based UX RULER worksheet, use a repeatable one-page pattern for each stage:

1. Stage number and name
2. Short subtitle
3. Guiding question
4. One concise explanatory paragraph
5. Artifact list
6. Decision question

Keep these pages compact. The goal is to make each stage easy to complete, not to explain product theory exhaustively.

## Prompts To Offer

When useful, offer the user concise prompts they can reuse:

```text
Analyze this product idea through mission, market, user, need, infrastructure, product, value, decision & measurement, and UX test. Identify assumptions, missing evidence, decision points, metrics, and the smallest next validation step.
```

```text
Use $uxruler as an open source UX process for humans and agents. Ask me for the missing context first, then research and verify the market, audience, alternatives, and user need before presenting insights and recommendations.
```

```text
Use $uxruler to audit this product with real usage evidence. First inspect any repo-connected analytics, logs, issues, feedback, or support data available to the agent. If you cannot access real usage data, ask me for the smallest export or summary needed before making claims.
```

```text
Audit this feature. Show whether it traces back to a real audience, user need, infrastructure capability, product experience, measurable delivered value, and a decision/measurement artifact.
```

```text
Turn these user research notes into prioritized needs, feature hypotheses, success metrics, decision rules, and a rollout/feedback plan.
```

```text
Map this existing repo with UX RULER, but keep it compact: create one PRODUCT.md-style product map first, and only suggest extra files when a specific decision or risk needs them.
```

```text
Use $uxruler on this repo. First ask what decision I want the repo pass to support, then inspect the repo and present evidence-backed insights before recommending any artifact changes.
```

## Quality Bar

Before finishing, ensure the output:

- Starts conversationally when context is missing and asks only the few questions needed to proceed.
- For broad repo requests, asks the decision-framing question or states the assumed decision before auditing.
- Starts from mission if market is unknown.
- Verifies important claims with available research and labels unverified assumptions clearly.
- Checks agent-accessible real usage and repo-connected data before asking the user for usage evidence.
- If usage data is unavailable, asks for the smallest missing source instead of making unsupported claims.
- Presents synthesized insights before artifacts or recommendations.
- Includes fill-in statements for mission/product thesis and problem statement when useful.
- Separates audience/market from user.
- Validates audience through market size, segment reachability, buyer/adopter context, and demand signals rather than only user interviews.
- Connects every feature to a need.
- Includes infrastructure only as an enabler of experience.
- Treats product as architecture, interface, interaction, design system, branding, and comprehension.
- Creates `DESIGN.md` only in the Google Labs Code format, with YAML design tokens and canonical section order, and validates it when the linter is available.
- Treats value as rollout plus feedback, not just release.
- Includes decisions, assumptions, risks, metrics, and feedback loops when the work should continue across a team, repo, or agents.
- Keeps repo artifacts comprehensible; one compact artifact is preferred over many files until expansion is clearly justified.
- Ends with a concrete next action and validation method.
- Asks how it can help with the next step, using 2 to 3 concrete options grounded in the output.
