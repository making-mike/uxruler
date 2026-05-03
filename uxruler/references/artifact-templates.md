# Artifact Templates

Use this reference when the user asks for copyable template sections, starter files, or a repo scaffold based on UXRuler. Keep generated files compact. Replace placeholders with project-specific content and remove unused sections.

## Product Thesis

Path: `product/00-mission/product-thesis.md`

```md
# Product Thesis

## Statement

We believe [audience] needs a better way to [problem area], because [change / tension / market opportunity].

## Audience

[Who may care, buy, approve, or influence adoption.]

## Problem Area

[The broad problem space before choosing a specific task or feature.]

## Why Now

[Market, technology, regulation, behavior, or business timing.]

## Confidence

[Low / Medium / High]

## Evidence

- [Signal, research note, data point, or observation]

## Key Assumptions

- [Assumption]

## First Validation Step

[Smallest action that can reduce uncertainty.]
```

## Problem Statement

Path: `product/03-need/problem-statement.md`

```md
# Problem Statement

## Statement

The user wants [gain], so they try to [job], but they run into [pain].

## User

[Concrete user, role, situation, and context.]

## Evidence

- [Interview quote, behavior, support issue, analytics signal, or observation]

## Current Workaround

[What users do today.]

## Priority

[Why this need matters now.]

## Validation Signal

[What would prove the need is real and important.]
```

## Assumptions

Path: `product/08-decision-measurement/assumptions.md`

```md
# Assumptions

| Assumption | Stage | Confidence | Evidence | Risk if wrong | Validation step | Owner | Review date | Status |
|---|---|---|---|---|---|---|---|---|
| [Assumption] | [Mission/Market/User/Need/Infra/Product/Value] | [Low/Medium/High] | [Evidence] | [Risk] | [Step] | [Owner] | [Date] | [Open/Validated/Invalidated] |
```

## Non-Goals

Path: `product/08-decision-measurement/non-goals.md`

```md
# Non-Goals

| Non-goal | Stage | Reason | Risk prevented | Revisit trigger | Owner | Link |
|---|---|---|---|---|---|---|
| [What this product/feature will not do] | [Stage] | [Why out of scope] | [Scope/risk avoided] | [When to reconsider] | [Owner] | [Reference] |
```

## Decision Log

Path: `product/08-decision-measurement/decision-log.md`

```md
# Decision Log

| Date | Decision | Context | Options considered | Owner | Evidence | Expected metric | Review date | Link |
|---|---|---|---|---|---|---|---|---|
| [YYYY-MM-DD] | [Decision] | [Why now] | [Option A / B / C] | [Owner] | [Evidence] | [Metric] | [Date] | [ADR/RFC/Experiment] |
```

## Risk Register

Path: `product/08-decision-measurement/risk-register.md`

```md
# Risk Register

| Risk | Area | Likelihood | Impact | Detection signal | Mitigation | Owner | Status | Review date |
|---|---|---|---|---|---|---|---|---|
| [Risk] | [Market/User/UX/Tech/Security/Rollout] | [Low/Medium/High] | [Low/Medium/High] | [Signal] | [Mitigation] | [Owner] | [Open/Mitigated/Accepted] | [Date] |
```

## North Star Metric

Path: `product/08-decision-measurement/north-star-metric.md`

```md
# North Star Metric

## Product Value

[The user value the product must reliably deliver.]

## North Star Metric

[One metric that best represents delivered value.]

## Why This Metric Represents Value

[Rationale and known limitations.]

## Input Metrics

| Input metric | Why it matters | Source | Owner |
|---|---|---|---|
| [Metric] | [Connection to value] | [Analytics/research/system] | [Owner] |

## Guardrail Metrics

| Guardrail | Why it matters | Threshold |
|---|---|---|
| [Metric] | [Quality, trust, accessibility, support, or business risk] | [Limit] |

## Baseline

[Current value or unknown.]

## Target

[Target and timeframe.]

## Review Cadence

[Weekly/monthly/after rollout.]

## Decision Rules

- Continue if [condition].
- Change scope if [condition].
- Stop or roll back if [condition].
```

## Metrics Tree

Path: `product/08-decision-measurement/metrics-tree.md`

```md
# Metrics Tree

## North Star

[Metric]

## Inputs

| Input metric | User behavior | Product lever | Event/source | Owner |
|---|---|---|---|---|
| [Metric] | [Behavior] | [Feature/flow/message] | [Source] | [Owner] |

## Guardrails

| Guardrail | Risk controlled | Source |
|---|---|---|
| [Metric] | [Risk] | [Source] |

## Open Questions

- [Question]
```

## Experiment

Path: `product/08-decision-measurement/experiments/0001-template.md`

```md
# Experiment: [Name]

## Hypothesis

If we [change], then [audience/user] will [behavior], because [reason].

## Linked Assumption

[Link to assumptions.md row or product thesis.]

## Audience

[Who is exposed.]

## Change

[What changes in product, message, flow, pricing, or rollout.]

## Primary Metric

[Metric and expected movement.]

## Guardrail Metrics

- [Metric and threshold]

## Exposure And Duration

[Sample, percentage, duration, constraints.]

## Decision Rule

- Ship if [condition].
- Iterate if [condition].
- Stop/rollback if [condition].

## Results

[To fill after experiment.]

## Decision

[To fill after review.]
```

## UX Scorecard

Path: `product/07-ux-test/ux-scorecard.md`

```md
# UX Scorecard

| Dimension | Score | Evidence | Risk | Required improvement | Owner | Review date |
|---|---:|---|---|---|---|---|
| Usefulness | [1-5] | [Evidence] | [Risk] | [Action] | [Owner] | [Date] |
| Ergonomics | [1-5] | [Evidence] | [Risk] | [Action] | [Owner] | [Date] |
| Attractiveness | [1-5] | [Evidence] | [Risk] | [Action] | [Owner] | [Date] |
| Identity | [1-5] | [Evidence] | [Risk] | [Action] | [Owner] | [Date] |

## Decision

[Continue / improve / research more / stop / roll back.]
```

## Empty States

Path: `product/05-product/empty-states.md`

```md
# Empty States

| State | User context | Why it appears | Message intent | Primary action | Secondary action | Metric |
|---|---|---|---|---|---|---|
| [State] | [Context] | [Reason] | [What user should understand] | [Action] | [Optional action] | [Metric] |
```

## Error States

Path: `product/05-product/error-states.md`

```md
# Error States

| Error state | Likely cause | User message | Recovery action | Logging/alerting | Accessibility requirement |
|---|---|---|---|---|---|
| [State] | [Cause] | [Message] | [Action] | [Signal] | [Requirement] |
```

## Rollout

Path: `product/06-value/rollout.md`

```md
# Rollout Plan

## Audience

[Who receives this release first.]

## Stages

| Stage | Audience | Entry criteria | Communication | Monitoring | Exit criteria |
|---|---|---|---|---|---|
| Pilot | [Users] | [Criteria] | [Message/channel] | [Signals] | [Criteria] |
| Gradual rollout | [Users] | [Criteria] | [Message/channel] | [Signals] | [Criteria] |
| Broad release | [Users] | [Criteria] | [Message/channel] | [Signals] | [Criteria] |

## Rollback Criteria

- [Condition]

## Feedback Loop

[How feedback will be captured and reviewed.]
```

## Usability Test: Value Validation

Path: `product/06-value/usability-test.md`

Use this for the study plan, script, logistics, and observations during pilot or rollout validation.

```md
# Usability Test

## Research Goal

[What value or flow is being validated.]

## Participants

[Recruitment criteria and sample.]

## Scenario

[Realistic user situation.]

## Tasks

| Task | Success criteria | Notes |
|---|---|---|
| [Task] | [Criteria] | [Notes] |

## Post-Task Questions

- [Question]

## Observations

[Notes during sessions.]

## Link To Decision Artifact

[Optional link to product/08-decision-measurement/feedback/usability-test.md]
```

## Usability Test: Decision Measurement

Path: `product/08-decision-measurement/feedback/usability-test.md`

Use this when usability evidence gates a product decision. Link to the value validation script if the detailed session plan already exists.

```md
# Usability Decision Evidence

## Decision Under Test

[Continue / broaden rollout / change scope / stop / rollback.]

## Linked Study

[Link to product/06-value/usability-test.md if applicable.]

## Target Users

[Who must succeed.]

## Thresholds

| Signal | Threshold | Result |
|---|---|---|
| Task success | [Threshold] | [Result] |
| Critical errors | [Threshold] | [Result] |
| Comprehension | [Threshold] | [Result] |

## Evidence Summary

[What happened.]

## Decision

[Decision and owner.]

## Follow-Up

[Next action and review date.]
```

## Tracking Plan

Path: `product/08-decision-measurement/analytics/tracking-plan.yaml`

```yaml
events:
  - name: "[event_name]"
    description: "[What happened]"
    trigger: "[When it fires]"
    owner: "[Owner]"
    linked_metric: "[Metric]"
    privacy_classification: "[none/personal/sensitive]"
    schema: "./events/[event_name].schema.json"
    properties:
      - name: "[property_name]"
        type: "[string/number/boolean/object/array]"
        required: true
        description: "[Meaning]"
```

## Feature Flags

Path: `product/08-decision-measurement/flags.json`

```json
{
  "$schema": "https://flagd.dev/schema/v0/flags.json",
  "flags": {
    "example-feature": {
      "state": "ENABLED",
      "variants": {
        "on": true,
        "off": false
      },
      "defaultVariant": "off",
      "metadata": {
        "owner": "[owner]",
        "expires": "[YYYY-MM-DD]",
        "linkedExperiment": "[experiment-id]"
      }
    }
  }
}
```
