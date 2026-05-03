---
name: uxruler
description: UXRuler product and UX strategy workflow for turning a mission or product idea into a concrete digital product, feature, rollout plan, repo artifact map, or product audit. Use when the user asks to plan, evaluate, or improve a digital product, UX strategy, product discovery, market/user needs, value proposition, feature prioritization, infrastructure-to-experience mapping, design systems, rollout, usability feedback, product decisions, product metrics, repository documentation, or UXRuler-style product guidance for teams and agents.
---

# UXRuler

Technical skill ID: `uxruler`.

Use this skill to help a user move from a product mission to delivered user value. Do not start from screens or features unless the user already has a narrow feature brief. Prefer the sequence:

`mission -> audience/market -> user -> need -> infrastructure -> product -> value -> decision & measurement -> UX test`

Respond in the user's language. If the user writes in Polish, use Polish terminology: `misja`, `odbiorcy`, `użytkownik`, `potrzeba`, `infrastruktura`, `produkt`, `wartość`, `użyteczność`, `ergonomia`, `atrakcyjność`, `tożsamość`.

## Operating Principles

- Treat UX as the design of rules and conditions that create a user's experience, not as interface polish.
- If the market is unknown, begin with mission/product thesis. Do not ask the user to choose a user task before market context exists.
- If the market is known, move quickly to the target audience and user needs.
- If a feature is already specified, audit whether it traces back to a real need and a viable market.
- Keep the scope concrete. For execution work, narrow to one product, feature, process, or user decision.
- When information is missing, state assumptions and propose the smallest validation step instead of pretending certainty.
- Tie every proposed feature to a real need, a product experience, and a way to measure delivered value.
- Preserve product decisions and measurement logic as durable repo artifacts when the user wants agents or a team to continue the work.

## Fill-In Statements

Use fill-in statements whenever the output is meant to become a UXRuler worksheet, workshop exercise, or agent prompt. They make abstract product thinking executable.

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
- **Action:** Map audience segments, competitors, substitutes, channels, language, buying roles, and decision makers.
- **Artifact:** Market map, primary segment, competitor/substitute list, positioning hypothesis.
- **Decision:** Which segment should be addressed first?
- **Metrics:** Interest signals, interviews booked, CTR, waitlist/signups, sales conversations, willingness to pay.
- **Responsible roles:** Product, marketing, research, founder.

Remember: audience is not always user. One person may buy, another may use, another may approve or block adoption.

### 2. User

User means the concrete person who performs tasks in the product. This is the user side of the value proposition: jobs, pains, and gains.

- **Question:** What is the user trying to do, and what blocks or frustrates them?
- **Action:** Collect jobs, pains, and desired gains through interviews, behavioral data, observation, support logs, or current workaround analysis.
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

Decision and measurement is the control layer for the whole UXRuler workflow. It records assumptions, non-goals, risks, decision history, experiments, metrics, feedback, and review cadence.

- **Question:** What do we believe, what did we decide, and how will we know whether it worked?
- **Action:** Capture assumptions, decision records, risks, north-star/input metrics, experiment plans, tracking plans, feedback methods, and review dates.
- **Artifact:** Assumption table, ADR/RFC/KEP-style proposal, decision log, risk register, metrics tree, experiment plan, analytics tracking plan, feedback plan.
- **Decision:** Continue, change scope, run an experiment, roll back, or stop?
- **Metrics:** Confidence level, validation signal, north-star/input metric movement, guardrail metrics, risk exposure, learning velocity.
- **Responsible roles:** Product, design, engineering, research, marketing, customer success.

This layer should answer four questions for each meaningful product move: what do we assume, what evidence supports it, what decision follows, and what signal will tell us we were right or wrong?

## Repo Artifact Blueprint

When the user asks to map the UXRuler to repository folders, create project documentation, or prepare agent-readable product context, use `references/repo-artifact-blueprint.md`.

Prefer a repo structure that separates:

- root files that tools and agents discover automatically;
- `product/00-*` to `product/07-*` stage artifacts that follow the UXRuler;
- `product/08-decision-measurement/` as the control layer for assumptions, decisions, risks, experiments, metrics, analytics, and feedback.

Do not recommend creating every file by default. Start with a minimum viable artifact set, then expand based on product maturity, team size, risk, and whether the repo is private, team-facing, agent-facing, or open source.

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
2. Initial market hypothesis
3. Primary user hypothesis
4. Top needs to validate
5. First prototype or research step
6. Key risks and evidence needed

For a feature or product audit, produce a table with:

`Stage | Current assumption | Evidence | Artifact | Decision | Metric | Next action`

For a team using UXRuler, produce:

1. One-sentence scope
2. Fill-in statements for mission, problem, and feature/product decision
3. The 8-stage map from mission to decision and measurement
4. Role ownership
5. Concrete artifacts to create
6. Minimum validation plan
7. Four-dimensional UX test

For a repo artifact map with template sections, load `references/repo-artifact-blueprint.md` and `references/artifact-templates.md`, then produce:

1. Recommended folder tree
2. Minimum viable artifact set
3. Optional maturity layers
4. Purpose and source pattern for each file
5. Template sections for custom product files
6. Rules for what agents should read or update

For a printable or slide-based UXRuler worksheet, use a repeatable one-page pattern for each stage:

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
Audit this feature. Show whether it traces back to a real audience, user need, infrastructure capability, product experience, measurable delivered value, and a decision/measurement artifact.
```

```text
Turn these user research notes into prioritized needs, feature hypotheses, success metrics, decision rules, and a rollout/feedback plan.
```

## Quality Bar

Before finishing, ensure the output:

- Starts from mission if market is unknown.
- Includes fill-in statements for mission/product thesis and problem statement when useful.
- Separates audience/market from user.
- Connects every feature to a need.
- Includes infrastructure only as an enabler of experience.
- Treats product as architecture, interface, interaction, design system, branding, and comprehension.
- Treats value as rollout plus feedback, not just release.
- Includes decisions, assumptions, risks, metrics, and feedback loops when the work should continue across a team, repo, or agents.
- Ends with a concrete next action and validation method.
