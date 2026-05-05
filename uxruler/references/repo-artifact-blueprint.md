# Repo Artifact Blueprint

Use this reference when the user wants UX RULER to become repository folders, agent context, product documentation, or a persistent product operating system.

## Selection Rules

- Do not create every file by default. Start with a compact product map, then add maturity layers only when they solve a concrete comprehension, ownership, risk, or measurement problem.
- Prefer open standards and widely recognized repo conventions when they exist.
- When no strong standard exists, use a compact custom Markdown format inspired by ADR, RFC, and KEP templates.
- Each artifact should make an agent or team better at one of four things: choosing, building, measuring, or learning.
- Put tool-discovered files at the repo root. Use `PRODUCT.md` as the default product memory. Put product-stage artifacts under `product/` only when the compact map becomes too dense or needs separate ownership.
- For copyable Markdown/YAML/JSON templates, load `artifact-templates.md` alongside this blueprint.

## Default Compact Structure

Use this first for early products, prototypes, small open source projects, and repos where the user asked for product context but did not explicitly ask for a full documentation scaffold.

```text
/
  AGENTS.md
  PRODUCT.md
  README.md
```

Recommended default:

- `PRODUCT.md`: one readable map of mission, audience, user need, infrastructure/product surface, value, assumptions, risks, metrics, UX test, and next validation step.
- `AGENTS.md`: only when coding agents need persistent repo instructions and update rules.
- `README.md`: link to the product map and explain when to use it.

Do not split `PRODUCT.md` into stage files until the split would make the repo easier to understand.

## Expanded Canonical Structure

Use this as a maturity layer, not as the default output.

```text
/
  AGENTS.md
  PRODUCT.md
  CLAUDE.md
  DESIGN.md
  tokens.json
  README.md
  ROADMAP.md
  CHANGELOG.md
  SECURITY.md
  CODEOWNERS
  CONTRIBUTING.md
  .cursor/rules/product-ux.mdc
  .github/copilot-instructions.md
  .github/ISSUE_TEMPLATE/feedback.yml
  .github/ISSUE_TEMPLATE/feature_request.yml

  product/
    00-mission/
      mission.md
      product-thesis.md
      principles.md
      assumptions.md
      non-goals.md

    01-audience/
      market-map.md
      segments.md
      competitors.md
      positioning.md
      channels.md

    02-user/
      research-plan.md
      interview-guide.md
      user-profile.md
      jobs-pains-gains.md
      insights.md

    03-need/
      problem-statement.md
      opportunities.md
      feature-hypotheses.md
      prd.md

    04-infrastructure/
      architecture.md
      data-model.md
      permissions.md
      openapi.yaml
      asyncapi.yaml
      schemas/
      observability.md
      slo.md
      runbooks/
      threat-model.md
      adr/
        0001-template.md

    05-product/
      information-architecture.md
      flows.md
      interaction-patterns.md
      design-system.md
      accessibility.md
      content-guidelines.md
      empty-states.md
      error-states.md
      onboarding.md

    06-value/
      rollout.md
      release-notes.md
      feedback-plan.md
      usability-test.md
      survey.md
      analytics-events.md

    07-ux-test/
      ux-scorecard.md
      test-plan.md
      metrics.md

    08-decision-measurement/
      assumptions.md
      non-goals.md
      decision-log.md
      risk-register.md
      north-star-metric.md
      metrics-tree.md
      experiments/
        0001-template.md
      flags.json
      analytics/
        tracking-plan.yaml
        events/
      feedback/
        usability-test.md
        survey.qmd
```

## Expansion Triggers

Add focused files from the expanded structure when at least one trigger is true:

- The product map is too long to scan.
- Different people own mission, research, design, engineering, rollout, or metrics.
- A decision needs audit history.
- A feature, experiment, or rollout has real user or business risk.
- The product handles regulated, sensitive, or security-relevant data.
- Multiple agents or tools need different instruction surfaces.
- The repo has a recurring release process.

When expanding, add only the file needed for the current decision. Do not create a full `product/` tree as a placeholder.

## Root Agent And Repo Files

### `PRODUCT.md`

Purpose: compact product memory for a repo.

Source pattern: UX RULER one-page product map.

Include:

- product thesis;
- audience and user distinction;
- primary user need;
- product and infrastructure surface;
- research insights with evidence and confidence;
- value and north-star signal;
- current assumptions;
- key risks;
- four-dimensional UX test;
- next validation step.

Keep this file readable in one sitting. If a section becomes too large, split that section into a focused artifact and link to it.

### `AGENTS.md`

Purpose: primary repo instructions for Codex-style agents.

Source pattern: OpenAI Codex AGENTS.md guidance.

Include:

- product mission and current product stage;
- how to use `PRODUCT.md` and any expanded UX RULER folders;
- build, test, lint, and verification commands;
- rules for updating assumptions, decisions, metrics, and artifacts;
- files agents should read before touching product or UX work;
- files agents must not overwrite without explicit instruction.

### `CLAUDE.md`

Purpose: project memory for Claude Code.

Source pattern: Claude Code memory files.

Include:

- project overview;
- recurring commands;
- architecture and design conventions;
- product decision rules;
- links to `PRODUCT.md` or product-stage files that Claude should treat as context.

### `.cursor/rules/product-ux.mdc`

Purpose: Cursor-specific rules for product and UX work.

Source pattern: Cursor project rules in `.cursor/rules` using MDC.

Include:

- glob patterns for relevant files;
- when to read product context;
- design system and UX scorecard rules;
- measurement and decision logging expectations.

### `.github/copilot-instructions.md`

Purpose: GitHub Copilot coding-agent context.

Source pattern: GitHub Copilot repository custom instructions.

Include:

- coding conventions;
- product context references;
- testing expectations;
- decision and measurement artifacts that should be updated when product behavior changes.

### `DESIGN.md`

Purpose: agent-readable design system and product design source of truth.

Source pattern: Google Labs Code `design.md`.

Include:

- YAML front matter at the top. When tokens are present, use the Google Labs Code schema: optional `version: alpha`, `name`, optional `description`, `colors`, `typography`, `rounded`, `spacing`, and `components`;
- color tokens as sRGB hex values such as `"#111827"`;
- typography tokens as objects with properties such as `fontFamily`, `fontSize`, `fontWeight`, `lineHeight`, and `letterSpacing`;
- component tokens that reference existing tokens with `{path.to.token}` and use supported properties such as `backgroundColor`, `textColor`, `typography`, `rounded`, `padding`, `size`, `height`, and `width`;
- markdown rationale using `##` sections in this order: `Overview`, `Colors`, `Typography`, `Layout`, `Elevation & Depth`, `Shapes`, `Components`, `Do's and Don'ts`;
- brand foundations, content guidance, interaction guidance, accessibility notes, and links to `tokens.json`, `product/05-product/design-system.md`, flows, or accessibility rules inside the canonical sections or in additional sections after the canonical sections.

Do not duplicate section headings or put custom sections between canonical sections if it changes their order. When possible, validate with `npx @google/design.md lint DESIGN.md`.

### `tokens.json`

Purpose: machine-readable design tokens.

Source pattern: W3C Design Tokens Format Module.

Include:

- color, typography, spacing, radius, elevation, motion, and component tokens;
- token groups with `$type`, `$value`, and aliases where useful;
- exported or synchronized values referenced by `DESIGN.md`.

### `README.md`

Purpose: human entry point for the repo.

Include:

- what the product is;
- who it is for;
- how to run it;
- where product context lives;
- links to `PRODUCT.md`, `AGENTS.md`, and any expanded UX RULER folders.

### `ROADMAP.md`

Purpose: visible direction and sequencing.

Source pattern: no universal standard; GitHub's public roadmap is a useful open reference for categorizing roadmap items.

Include:

- now/next/later or quarterly themes;
- link to mission, audience, user needs, and metrics;
- each roadmap item should have a problem statement or experiment reference.

### `CHANGELOG.md`

Purpose: release history.

Source pattern: Keep a Changelog.

Include:

- `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`;
- links to release notes, rollout, and feedback outcomes.

### `SECURITY.md`

Purpose: vulnerability reporting and security expectations.

Source pattern: GitHub security policy files and OpenSSF Scorecard checks.

Include:

- supported versions;
- how to report vulnerabilities;
- expected response process;
- link to threat model if present.

### `CODEOWNERS`

Purpose: automatic ownership for reviews.

Source pattern: GitHub CODEOWNERS.

Include:

- product artifacts owned by product/design;
- design system files owned by design/frontend;
- infrastructure and security files owned by engineering/security;
- measurement artifacts owned by product/data.

### `CONTRIBUTING.md`

Purpose: contribution workflow.

Source pattern: GitHub community health files.

Include:

- branch/PR expectations;
- required tests;
- when product artifacts must be updated;
- how to propose changes using ADR/RFC/experiment files.

### `.github/ISSUE_TEMPLATE/feedback.yml`

Purpose: structured user or stakeholder feedback capture.

Source pattern: GitHub Issue Forms.

Include fields for:

- user segment;
- context;
- task;
- expected outcome;
- observed problem;
- severity;
- screenshots/logs;
- consent for follow-up.

### `.github/ISSUE_TEMPLATE/feature_request.yml`

Purpose: structured feature requests that preserve product reasoning.

Source pattern: GitHub Issue Forms.

Include fields for:

- audience/user;
- job, pain, gain;
- proposed feature;
- evidence;
- expected metric;
- alternatives/workarounds.

## Stage Files

### `product/00-mission/mission.md`

Purpose: stable mission and product intent.

Custom format. Include:

- mission statement;
- who should benefit;
- change in the world or market;
- principles;
- what success should feel like for users.

### `product/00-mission/product-thesis.md`

Purpose: fill-in thesis before market and feature decisions.

Custom format. Include:

```text
We believe [audience] needs a better way to [problem area], because [change / tension / market opportunity].
```

Polish:

```text
Wierzymy, że [grupa odbiorców] potrzebuje lepszego sposobu na [obszar problemu], ponieważ [zmiana / napięcie / okazja rynkowa].
```

Also include confidence, evidence, risks, and first validation step.

### `product/00-mission/principles.md`

Purpose: product principles that constrain decisions.

Custom format. Include:

- principle;
- why it matters;
- tradeoff it clarifies;
- example decision it affects.

### `product/00-mission/assumptions.md`

Purpose: explicit assumptions for mission, market, user, product, and business.

Custom format inspired by KEP/RFC risk and validation sections.

Use a table:

```text
Assumption | Area | Confidence | Evidence | Risk if wrong | Validation step | Owner | Review date
```

### `product/00-mission/non-goals.md`

Purpose: prevent scope drift.

Source pattern: Kubernetes KEP and RFC templates often distinguish goals from non-goals.

Include:

- non-goal;
- why it is out of scope;
- when to revisit;
- related roadmap/proposal link.

### `product/01-audience/market-map.md`

Purpose: audience, market, buyer, and adoption context.

Custom format. Include:

- market definition;
- segments;
- audience-size estimate;
- reachable channels or communities;
- demand signals;
- buyers, users, blockers, influencers;
- alternatives and substitutes;
- channels;
- willingness-to-pay signals.

### `product/01-audience/segments.md`

Purpose: segment hypotheses and prioritization.

Include:

- segment;
- estimated size;
- trigger;
- current alternative;
- urgency;
- reachability;
- expected value;
- evidence.

### `product/01-audience/competitors.md`

Purpose: competitors and substitutes.

Include:

- competitor/substitute;
- target segment;
- key value;
- UX advantage;
- weakness;
- strategic implication.

### `product/01-audience/positioning.md`

Purpose: product position and message-market fit.

Include:

- target audience;
- category;
- problem;
- promise;
- proof;
- alternatives;
- why now.

### `product/01-audience/channels.md`

Purpose: distribution and acquisition assumptions.

Include:

- channel;
- target segment;
- message;
- cost/effort;
- expected signal;
- validation step.

### `product/02-user/research-plan.md`

Purpose: plan for learning about users.

Include:

- research questions;
- target participants;
- method;
- recruitment criteria;
- script link;
- success signals;
- schedule.

### `product/02-user/interview-guide.md`

Purpose: user interview script.

Include:

- intro and consent;
- context questions;
- current workflow;
- jobs, pains, gains;
- workarounds;
- buying/adoption context;
- closing.

### `product/02-user/user-profile.md`

Purpose: concrete user profile, not broad audience.

Include:

- role/context;
- goals;
- responsibilities;
- constraints;
- tools;
- decision authority;
- emotional/social stakes.

### `product/02-user/jobs-pains-gains.md`

Purpose: value proposition user side.

Include:

- jobs;
- pains;
- gains;
- evidence;
- priority;
- implications for features.

### `product/02-user/insights.md`

Purpose: synthesized research insights.

Include:

- insight;
- evidence;
- affected segment/user;
- opportunity;
- confidence;
- decision impact.

### `product/03-need/problem-statement.md`

Purpose: bridge from research to feature work.

Custom format. Include:

```text
The user wants [gain], so they try to [job], but they run into [pain].
```

Polish:

```text
Użytkownik chce [korzyść], dlatego próbuje [zadanie], ale napotyka [bolączkę].
```

Also include evidence, current workaround, priority, and validation signal.

### `product/03-need/opportunities.md`

Purpose: opportunity backlog before feature selection.

Include:

- opportunity;
- linked need;
- expected user value;
- solution ideas;
- confidence;
- effort;
- metric.

### `product/03-need/feature-hypotheses.md`

Purpose: feature ideas written as testable hypotheses.

Include:

- feature hypothesis;
- user need;
- mechanism;
- expected metric movement;
- guardrail metric;
- validation method.

### `product/03-need/prd.md`

Purpose: product requirements for a selected feature or product slice.

Source pattern: no universal standard; keep it concise and link to mission, need, metric, risks, and rollout.

Include:

- problem;
- users;
- goals/non-goals;
- requirements;
- user flows;
- data/infra implications;
- metrics;
- rollout;
- open questions.

## Infrastructure Files

### `product/04-infrastructure/architecture.md`

Purpose: system architecture in product context.

Include:

- architecture overview;
- key components;
- data flow;
- product experience enabled;
- constraints;
- tradeoffs;
- links to ADRs.

### `product/04-infrastructure/data-model.md`

Purpose: core data model and product concepts.

Include:

- entities;
- relationships;
- ownership;
- lifecycle;
- privacy/security notes;
- analytics implications.

### `product/04-infrastructure/permissions.md`

Purpose: roles, permissions, and user access model.

Include:

- roles;
- permissions matrix;
- sensitive actions;
- audit requirements;
- edge cases.

### `product/04-infrastructure/openapi.yaml`

Purpose: HTTP API contract.

Source pattern: OpenAPI Specification.

Include:

- paths;
- operations;
- request/response schemas;
- auth;
- errors;
- examples.

### `product/04-infrastructure/asyncapi.yaml`

Purpose: event-driven API and messaging contract.

Source pattern: AsyncAPI Specification.

Include:

- channels;
- messages;
- schemas;
- producers/consumers;
- delivery guarantees where known.

### `product/04-infrastructure/schemas/`

Purpose: structured data contracts.

Source pattern: JSON Schema.

Include schemas for:

- API payloads;
- analytics events;
- domain entities;
- config files.

### `product/04-infrastructure/observability.md`

Purpose: what the team observes in production.

Source pattern: OpenTelemetry signals and semantic conventions.

Include:

- logs, metrics, traces;
- business and UX signals;
- key spans/events;
- dashboards;
- alerting rules;
- privacy constraints.

### `product/04-infrastructure/slo.md`

Purpose: reliability promises tied to user experience.

Source pattern: Google SRE SLO document.

Include:

- service;
- user journey;
- SLI;
- SLO target;
- error budget;
- measurement source;
- response policy.

### `product/04-infrastructure/runbooks/`

Purpose: operational response instructions.

Include per runbook:

- symptom;
- impact;
- diagnosis;
- mitigation;
- rollback;
- escalation;
- post-incident learning.

### `product/04-infrastructure/threat-model.md`

Purpose: security threat model.

Source pattern: OWASP threat modeling guidance and OWASP pytm/threat-model-cookbook.

Include:

- assets;
- actors;
- trust boundaries;
- data flows;
- threats;
- mitigations;
- residual risk;
- owner/review date.

### `product/04-infrastructure/adr/0001-template.md`

Purpose: architecture decision records.

Source pattern: MADR and Google Cloud ADR guidance.

Include:

- status;
- context;
- decision;
- consequences;
- considered options;
- linked product need and metric where relevant.

## Product Experience Files

### `product/05-product/information-architecture.md`

Purpose: product structure and navigation.

Include:

- major objects;
- pages/views;
- navigation model;
- user mental model;
- key entry points;
- permissions impact.

### `product/05-product/flows.md`

Purpose: user flows for key jobs.

Include:

- entry point;
- user goal;
- steps;
- system responses;
- edge cases;
- success state;
- analytics events.

### `product/05-product/interaction-patterns.md`

Purpose: reusable interaction rules.

Include:

- pattern name;
- when to use;
- user expectation;
- states;
- accessibility;
- analytics/feedback signal.

### `product/05-product/design-system.md`

Purpose: product-specific design system overview.

Source pattern: pair this with root `DESIGN.md` and W3C `tokens.json`.

Include:

- product principles;
- brand within the design system;
- tokens;
- components;
- layouts;
- content patterns;
- interaction patterns;
- accessibility rules.

### `product/05-product/accessibility.md`

Purpose: accessibility quality plan.

Source pattern: WCAG and A11Y Project checklist.

Include:

- target WCAG level;
- known requirements;
- keyboard/focus rules;
- color contrast;
- forms/errors;
- testing checklist;
- ownership.

### `product/05-product/content-guidelines.md`

Purpose: product voice and interface content rules.

Source pattern: design system content guidance such as GOV.UK Design System patterns.

Include:

- voice/tone;
- labels;
- helper text;
- error messages;
- empty states;
- release communication;
- terminology.

### `product/05-product/empty-states.md`

Purpose: make no-data/new-user states useful.

Custom format; no universal standard.

Include:

- state;
- user context;
- reason it appears;
- message;
- primary action;
- secondary action;
- metric to watch.

### `product/05-product/error-states.md`

Purpose: make errors recoverable and trustworthy.

Source pattern: accessibility and design system error message guidance.

Include:

- error state;
- likely cause;
- user-facing message;
- recovery action;
- logging/alerting;
- accessibility requirements.

### `product/05-product/onboarding.md`

Purpose: first-use and feature discovery experience.

Custom format.

Include:

- target user;
- activation moment;
- first-run path;
- progressive disclosure;
- support content;
- success metric;
- drop-off risks.

## Value And Feedback Files

### `product/06-value/rollout.md`

Purpose: release plan for value delivery.

Source pattern: borrow from KEP sections for rollout, monitoring, rollback, and risks.

Include:

- audience;
- release stages;
- eligibility;
- communication;
- feature flags;
- monitoring;
- rollback criteria;
- feedback loop.

### `product/06-value/release-notes.md`

Purpose: user-facing release communication.

Source pattern: Keep a Changelog categories can structure release notes.

Include:

- what changed;
- who it helps;
- how to use it;
- known limits;
- feedback link.

### `product/06-value/feedback-plan.md`

Purpose: how the team will collect and interpret feedback.

Include:

- questions;
- audience/sample;
- method;
- timing;
- channel;
- success signal;
- decision rule.

### `product/06-value/usability-test.md`

Purpose: moderated or unmoderated usability test plan used during rollout/value validation.

Ownership rule: use this file for the study setup, script, tasks, logistics, and notes while validating released or pilot value. Link to `product/08-decision-measurement/feedback/usability-test.md` only when the study gates a product decision.

Custom format grounded in standard usability testing practice.

Include:

- research goal;
- participant criteria;
- scenario;
- tasks;
- success criteria;
- observation notes;
- post-task questions;
- decision rule.

### `product/06-value/survey.md`

Purpose: lightweight survey plan.

Custom format; can be converted to `survey.qmd` when using surveydown.

Include:

- audience;
- questions;
- response scales;
- branching if needed;
- analysis plan;
- decision rule.

### `product/06-value/analytics-events.md`

Purpose: readable analytics event inventory.

Source pattern: pair with `product/08-decision-measurement/analytics/tracking-plan.yaml` or JSON schemas.

Include:

- event name;
- trigger;
- user intent;
- properties;
- privacy notes;
- owning metric.

## UX Test Files

### `product/07-ux-test/ux-scorecard.md`

Purpose: evaluate usefulness, ergonomics, attractiveness, and identity.

Custom format.

Include:

- dimension;
- score;
- evidence;
- risk;
- required improvement;
- owner;
- next review date.

### `product/07-ux-test/test-plan.md`

Purpose: combined quality plan for a product slice.

Include:

- flows to test;
- acceptance criteria;
- accessibility tests;
- analytics checks;
- usability tests;
- rollout checks.

### `product/07-ux-test/metrics.md`

Purpose: local metrics for the UX test.

Include:

- task completion;
- time on task;
- error rate;
- comprehension;
- satisfaction;
- qualitative signal;
- linked north-star/input metric.

## Decision And Measurement Files

### `product/08-decision-measurement/decision-log.md`

Purpose: chronological record of product decisions.

Source pattern: ADR/MADR for major decisions; lightweight log for smaller decisions.

Use a table:

```text
Date | Decision | Context | Options considered | Owner | Evidence | Expected metric | Review date | Link
```

Create an ADR/RFC/experiment file when a log entry is too large for one row.

### `product/08-decision-measurement/assumptions.md`

Purpose: consolidated assumptions across mission, market, user, need, infrastructure, product, value, and business model.

Custom format inspired by RFC/KEP validation and risk sections.

Use a table:

```text
Assumption | Stage | Confidence | Evidence | Risk if wrong | Validation step | Owner | Review date | Status
```

Use `product/00-mission/assumptions.md` for early thesis assumptions. Use this file as the cross-stage control layer once work moves beyond initial discovery.

### `product/08-decision-measurement/non-goals.md`

Purpose: consolidated non-goals that protect scope across product, UX, engineering, rollout, and metrics.

Source pattern: Kubernetes KEP and RFC templates distinguish goals from non-goals.

Use a table:

```text
Non-goal | Stage | Reason | Risk prevented | Revisit trigger | Owner | Link
```

### `product/08-decision-measurement/risk-register.md`

Purpose: active product, UX, market, technical, security, and rollout risks.

Source pattern: KEP risk sections and OWASP risk rating concepts.

Use a table:

```text
Risk | Area | Likelihood | Impact | Detection signal | Mitigation | Owner | Status | Review date
```

### `product/08-decision-measurement/north-star-metric.md`

Purpose: define the metric that best represents delivered user value.

Custom format. Include:

- product value;
- north-star metric;
- why this metric represents value;
- input metrics;
- guardrail or anti-metrics;
- current baseline;
- target;
- review cadence;
- decision rules.

### `product/08-decision-measurement/metrics-tree.md`

Purpose: map product value to measurable inputs.

Custom format. Include:

- north-star metric;
- input metrics;
- activation/retention/quality/business metrics where relevant;
- event sources;
- owner;
- expected behavior change.

### `product/08-decision-measurement/experiments/0001-template.md`

Purpose: test product assumptions before or during rollout.

Source pattern: RFC/KEP sections plus feature-flag/experimentation practice.

Include:

- hypothesis;
- target audience;
- change;
- primary metric;
- guardrail metrics;
- sample/exposure;
- duration;
- rollout plan;
- stop/ship/iterate decision rule;
- owner;
- results.

### `product/08-decision-measurement/flags.json`

Purpose: feature flag definitions as code.

Source pattern: OpenFeature/flagd `flags.json`.

Include:

- flag keys;
- variants;
- default variant;
- targeting rules if used;
- owner and expiration metadata if supported by the chosen tooling.

### `product/08-decision-measurement/analytics/tracking-plan.yaml`

Purpose: event tracking plan in source control.

Source pattern: Snowplow data structures in Git, event schemas, and tracking-plan practice.

Include:

- event name;
- description;
- trigger;
- owner;
- linked metric;
- required properties;
- property types;
- privacy classification;
- schema reference.

### `product/08-decision-measurement/analytics/events/`

Purpose: machine-readable event schemas.

Source pattern: JSON Schema and Snowplow self-describing event schemas.

Include one schema per event, with:

- `$schema`;
- event title/description;
- properties;
- required properties;
- examples;
- versioning policy.

### `product/08-decision-measurement/feedback/usability-test.md`

Purpose: measurement-grade usability script tied to decision rules.

Ownership rule: use this file when usability evidence is used to continue, stop, roll back, broaden rollout, or change scope. It can link back to `product/06-value/usability-test.md` for the detailed script and should store thresholds, results, and the decision.

Include:

- product decision under test;
- target users;
- tasks;
- success criteria;
- observation fields;
- failure thresholds;
- decision rule.

### `product/08-decision-measurement/feedback/survey.qmd`

Purpose: survey as a reusable source-controlled artifact.

Source pattern: surveydown uses Quarto-flavored survey definitions.

Include:

- survey purpose;
- target audience;
- questions;
- scales/options;
- branching logic if used;
- analysis notes;
- decision rule.

## Source Patterns

Use these sources as patterns, not as long content to copy:

- OpenAI Codex AGENTS.md: https://developers.openai.com/codex/guides/agents-md
- Claude Code memory / `CLAUDE.md`: https://docs.claude.com/en/docs/claude-code/memory
- Cursor rules: https://docs.cursor.com/context/rules
- GitHub Copilot custom instructions: https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot
- Google Labs Code `design.md`: https://github.com/google-labs-code/design.md
- W3C Design Tokens Format Module: https://www.w3.org/community/reports/design-tokens/CG-FINAL-format-20251028/
- MADR: https://adr.github.io/madr/
- Google Cloud ADR guidance: https://cloud.google.com/architecture/architecture-decision-records
- Rust RFC template: https://github.com/rust-lang/rfcs/blob/master/0000-template.md
- Kubernetes KEP template: https://github.com/kubernetes/enhancements/blob/master/keps/NNNN-kep-template/README.md
- OpenAPI Specification: https://spec.openapis.org/oas/latest.html
- AsyncAPI Specification: https://www.asyncapi.com/docs/reference/specification/latest
- JSON Schema: https://json-schema.org/specification
- OpenTelemetry semantic conventions: https://github.com/open-telemetry/semantic-conventions
- Google SRE Workbook SLO document: https://sre.google/workbook/slo-document/
- OWASP Threat Model Cookbook: https://github.com/OWASP/threat-model-cookbook
- OWASP Risk Rating Methodology: https://owasp.org/www-community/OWASP_Risk_Rating_Methodology
- OpenFeature flagd flags: https://flagd.dev/reference/flag-definitions/
- GrowthBook: https://github.com/growthbook/growthbook
- Snowplow schemas: https://docs.snowplow.io/docs/fundamentals/schemas/
- Snowplow data structures in Git: https://docs.snowplow.io/tutorials/data-structures-in-git/local-setup/
- WCAG: https://www.w3.org/TR/WCAG22/
- A11Y Project checklist: https://www.a11yproject.com/checklist/
- GOV.UK Design System error messages: https://design-system.service.gov.uk/components/error-message/
- Carbon Design System empty states: https://carbondesignsystem.com/patterns/empty-states-pattern/
- GitHub Issue Forms: https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms
- GitHub community health files: https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/creating-a-default-community-health-file
- GitHub CODEOWNERS: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners
- GitHub security policy: https://docs.github.com/en/code-security/getting-started/adding-a-security-policy-to-your-repository
- OpenSSF Scorecard: https://openssf.org/scorecard/
- Keep a Changelog: https://keepachangelog.com/en/1.1.0/
- surveydown: https://surveydown.org/
