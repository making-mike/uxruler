# Product Map

This is the compact UX RULER map for this repository. It keeps the product logic in one readable place. `ROADMAP.md` sequences the next product moves once the mission or direction is decided. Use the full artifact blueprint in `uxruler/references/repo-artifact-blueprint.md` only when the project has enough usage, risk, or collaborators to justify more files.

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
- `ROADMAP.md`: compact now/next/later sequence for decided product direction.
- `index.html`: bilingual public explanation, process map, install commands, and selectable examples with action schemas.
- `install.html`: guided install flow with tool choice and matching instruction in one step, first prompt, and optional post-use feedback.
- `feedback.html`: direct open-ended feedback page that can be shared as a standalone link.
- `.github/`: issue and PR templates for contributions.

## Research Insights

| Insight | Evidence | Confidence | Decision Implication |
|---|---|---|---|
| UX RULER should be conversational before it becomes documentary. | User feedback: the previous skill application created too many files and was hard to comprehend; follow-up feedback asks for context questions and research. | High | Make conversation, clarification, and synthesis part of the skill contract. |
| Compact artifacts remain important, but they should come after insight. | Repo now uses `PRODUCT.md` instead of a generated `product/` tree. | High | Keep `PRODUCT.md` as the default artifact and expand only when needed. |
| Agentic research is a differentiator over static UX worksheets. | User explicitly asked the skill to verify context and present insights. | Medium | Add research planning, source verification, confidence labels, and insight synthesis to the workflow. |
| Broad repo requests need decision framing before audit output. | User tested `use SKILL.md on this repo`; the output was compact and evidence-backed, but it did not ask what decision the audit should support. | High | Add an explicit ambiguous-repo-request rule to the skill. |
| UX RULER needs a reusable plain-language wording pattern. | User feedback with screenshot: the question "What decision do you want this pass to support?" used abstract process language; follow-up clarified this should be a general rule of thumb and use wording like "what do you want to decide after I look?" | High | Add a wording rule of thumb to the skill: ask what to decide, say what was found, name what is missing, and suggest what to do next. |
| Audience validation should not be reduced to testing with a few users. | User feedback: the audience row suggested testing with target users, but audience should validate how many potential users exist. | High | Separate market sizing and reachability from user-need validation in the skill. |
| Real usage and repo-connected data should be checked before asking the user for evidence. | User asked the skill to gather real app usage or any other repo-connected data available to agents, and to ask for information when that is not possible. | High | Add a usage-data discovery rule and fallback question pattern to the skill workflow. |
| Measurement work needs an explicit handoff from instrumentation to decisions. | User feedback: the landing-page run added measurement events and updated this product map, but ended as an implementation report instead of explaining what the events make decidable or what should happen next. | High | Add skill rules for post-artifact closeout, measurement handoff, and transparent execution plans before file edits. |
| Install feedback should not interrupt copy intent. | User feedback: showing a survey immediately after copy feels intrusive because the visitor is trying to install, not answer a questionnaire; follow-up decision moved the heavier install flow out of a modal and then asked for a step-by-step experience. | High | Keep direct copy on the landing page, move guided setup to a dedicated install page, reveal one install decision at a time, and make feedback optional at the bottom. |
| Tool choice, install confirmation, and first use are distinct moments. | User feedback with install screenshots: the matching instruction should be visible beside the tool choice, copy should confirm lightly, then the visitor should explicitly confirm installation before choosing a starter prompt. | High | Make the install guide a four-step flow: tool/instruction, start confirmation, use prompt, and feedback; keep copy confirmation lightweight and non-blocking. |
| Feedback should live at the bottom, not in the hero. | User correction: the feedback form should appear only at the bottom of the page. | High | Add a compact footer feedback form that captures open-ended feedback without blocking install intent or the hero. |
| Feedback sometimes needs a standalone share link. | User request with screenshot: create a separate survey page so it can be shared directly by link. | High | Add `feedback.html` as a focused open-ended survey page and track dedicated-page submissions separately from footer and install feedback. |
| A decided mission needs an early roadmap, not only a product map. | User feedback: concern that no roadmap file exists yet and that a roadmap should be created as soon as a skill user decides on a mission or direction. | High | Add compact `ROADMAP.md` as the sequencing companion to `PRODUCT.md`, and teach the skill to create or update it after direction is chosen. |
| Standards-backed repo artifacts need executable templates, not only source names. | User feedback: UX RULER-created `design.md` was not compatible with Google Labs Code `design.md`; upstream expects YAML design tokens plus ordered markdown rationale. | High | Add a compliant `DESIGN.md` template and lint expectation before recommending or creating that artifact. |
| Empty repo starts need guided mission definition, not a generic request for context. | User tested UX RULER on an empty repo; the response asked what to evaluate and who the audience is, but did not help shape the mission. | High | Add an explicit empty-repo branch that offers mission lenses or thesis drafts before asking for details. |

## Value

UX RULER is useful when it helps a person and agent have a better product conversation, verify important assumptions with available usage/repo evidence, make a clearer product decision, narrow a feature, create durable repo context, or define a validation step before implementation.

North-star signal: validated UX RULER applications, meaning real uses where the conversation and research change or clarify a product decision, metric, assumption, risk, or next validation step.

Landing page measurement plan:

| Event | Signal | Decision Supported |
|---|---|---|
| `landing_install_cta_clicked` | Visitor clicks the hero or footer install CTA. | Whether the page creates enough intent to try the skill. |
| `landing_copy_clicked` with `copy_group: install` | Visitor copies a Codex, Claude Code, or project-local install command. | Whether the install section is discoverable and usable. |
| `landing_copy_clicked` with `copy_group: prompt` | Visitor copies a starter prompt. | Whether the page helps users start a UX RULER conversation after install. |
| `landing_prompt_selected` | Visitor chooses a landing-page example prompt and sees the action schema. | Which activation scenario needs clearer explanation before copy intent. |
| `landing_install_path_opened` | Visitor opens the dedicated install guide from a specific landing-page install card. | Which install path needs a deeper setup surface. |
| `landing_language_switched` | Visitor switches between Polish and English. | Whether bilingual support is being used enough to keep maintaining both paths. |
| `landing_github_cta_clicked` | Visitor clicks through to GitHub from hero or footer. | Whether contribution/source-code intent is visible. |
| `landing_process_step_opened` | Visitor opens a UX RULER process step. | Which parts of the process visitors inspect before install or prompt-copy intent. |
| `landing_structure_group_opened` | Visitor opens a repo artifact structure group. | Whether the repo-memory section helps or distracts before adoption. |
| `landing_feedback_sent` with `feedback_surface: footer` | Visitor sends feedback from the bottom-page form. | Which confusion, missing value, or next test users volunteer before or instead of installing. |
| `feedback_page_viewed` | Visitor opens the standalone feedback link. | Whether a direct ask generates feedback beyond embedded footer or install forms. |
| `feedback_page_sent` with `feedback_surface: dedicated_page` | Visitor sends open-ended feedback from `feedback.html`. | Which unclear, missing, or test-first topics emerge when the survey is shared directly. |
| `feedback_page_link_copied` | Visitor copies the standalone feedback page URL. | Whether the page itself supports manual sharing. |
| `survey shown`, `survey dismissed`, `survey sent` with `$survey_id` | Visitor opens, dismisses, or submits a manually rendered PostHog API survey from a direct survey link. | Whether expectations before use and outcomes after use are collected in PostHog Surveys, not only custom feedback events. |
| `landing_survey_unavailable` | A direct survey link cannot find or use a matching PostHog API survey. | Whether missing survey responses mean low feedback intent or a broken survey setup. |
| `install_page_viewed` | Visitor lands on the dedicated install page. | Whether landing-page intent carries into committed setup. |
| `install_target_selected` | Visitor chooses or lands on Codex, Claude Code, or project-local setup. | Which install path is most important to improve. |
| `install_flow_step_viewed` | Visitor moves through tool/instruction, start confirmation, use prompt, and feedback steps. | Where the guided setup loses people or creates enough momentum to continue. |
| `install_instruction_copied` | Visitor copies a tool-specific install instruction on the install page and is advanced to the start confirmation step. | Whether the dedicated guide completes the practical install action before asking for first use. |
| `install_prompt_selected` | Visitor chooses a first-use prompt scenario. | Which activation use case resonates after setup. |
| `install_prompt_copied` | Visitor copies a starter prompt from the install page and is advanced to optional feedback. | Whether setup leads into first-use activation and whether feedback is reached after the real activation action. |
| `install_feedback_sent` | Visitor leaves optional feedback and optionally an email from the install page. | Whether early adopters want contact, contribution, or a follow-up research conversation. |

Implementation note: the static pages keep local debug copies in `window.uxrulerLandingEvents`, `window.uxrulerInstallEvents`, and `window.uxrulerFeedbackEvents`, push the same events into `window.dataLayer`, dispatch browser events, and send events to PostHog when `window.posthog.capture` is available. PostHog is enabled only on `uxruler.com` production hosts and is configured for pageview/pageleave plus explicit events. `index.html` enables PostHog Surveys only for manually rendered API surveys and disables automatic survey display; `install.html` and `feedback.html` keep surveys disabled. Survey submissions include both recommended ID-based response properties such as `$survey_response_<question.id>` and legacy index-based response properties such as `$survey_response` and `$survey_response_1`, so PostHog can attach answers to the Surveys results view while remaining resilient to question reordering. Autocapture, replay, heatmaps, dead-click capture, exception capture, and performance capture are disabled to keep the site fast and focused on the decisions above. The footer, install, and standalone feedback forms record custom feedback events and do not write to a repo file, inbox, separate database, or the PostHog Surveys results view. Landing install cards keep direct copy buttons and link to `install.html` for the fuller setup guide. Landing examples let visitors select a simplified starter prompt and inspect the expected action schema before copying. The install page uses the same topbar signal as the landing page, avoids a separate bottom footer, and shows a guided flow with tool/instruction, start confirmation, use prompt, and optional feedback. Copying an install instruction shows a bottom snackbar and advances to the start confirmation step; the start step asks visitors to paste or run the install instruction in the selected tool and confirm `Zainstalowałem` before choosing a starter prompt. Copying a starter prompt advances to the optional feedback step.

Review cadence and decision rule: review PostHog weekly during early release. If visitors enter the install page but do not copy an install instruction, simplify the visible instruction or default the path from the referrer or anchor. If direct landing copy beats install-page copy, keep the landing fast path prominent. If landing example selections happen but prompt copies lag, simplify the action schema or make the selected prompt more obviously copyable. If instruction copies happen but prompt copies lag, improve the Start confirmation or Use prompt step. If footer or standalone feedback clusters around unclear value, missing examples, or trust concerns, adjust the page before adding new artifacts. If visitors leave feedback or email, follow up to learn whether UX RULER changed a decision, metric, risk, or next validation step. If the standalone feedback page is shared but gets few submissions, shorten the prompt or make the ask more specific. If language switching is low for several weeks, keep bilingual support but avoid expanding Polish-only content.

## Current Assumptions

| Assumption | Confidence | Validation |
|---|---|---|
| AI-assisted product builders need repo-native product context. | Medium | Watch whether users apply UX RULER to real repos, not just read it. |
| There are enough potential AI coding-agent product builders to justify the skill. | Medium | Estimate audience size and reachability using public agent adoption signals, GitHub/search interest, communities, and comparable tool ecosystems. |
| Users want UX RULER to ask clarifying questions before producing artifacts. | High | Test whether conversational starts feel clearer than one-shot outputs. |
| Plain-language wording makes UX RULER easier to use without weakening product rigor. | High | Test whether users understand what the agent is asking, what the agent found, what is missing, and what can happen next. |
| Users need artifact updates to explain the next move, not only list changed files. | High | Test whether UX RULER closes file-edit work by naming the supported decision, measurable signal, missing handoff, and 2 to 3 concrete next options. |
| A compact roadmap will improve follow-through after the mission is decided. | High | In the next 3 UX RULER repo applications, check whether `ROADMAP.md` makes the next product move easier to choose without creating document bloat. |
| Ambiguous repo requests should not default silently to a full audit. | High | In future tests, check whether UX RULER asks the plain decision question or states an explicit assumed decision. |
| Empty repo users need mission scaffolding before research or artifacts. | High | Test whether an empty-repo run offers useful thesis options and asks only for the smallest mission-shaping input. |
| Agentic research makes UX RULER more useful than a static worksheet. | Medium | Compare outputs with and without repo/web/source verification. |
| Agents can often discover useful usage signals from repo-connected tools or artifacts before asking the user. | Medium | Test UX RULER on repos with analytics configs, issues, feedback exports, logs, and connected tools; check whether it asks only for missing evidence. |
| A compact artifact set is more useful than scaffolding many files. | High | Keep this repo to `PRODUCT.md` unless a specific decision needs a separate artifact. |
| The static website is enough for early adoption. | Medium | Ask early users whether the install path and process map are clear. |
| A bilingual website can improve reach while preserving Polish examples and English open source workflows. | Low | Ask Polish and non-Polish users whether the language switch, install paths, and prompts feel clear. |

## Risks

| Risk | Response |
|---|---|
| UX RULER feels like product theory instead of practical agent tooling. | Use plain language and add examples that show real repo decisions. |
| UX RULER asks too many questions and slows the user down. | Ask only 1 to 3 focused questions, then proceed with stated assumptions. |
| UX RULER asks for mission context but leaves the user to invent the mission alone. | For empty repos, offer draft mission directions first, then ask the user to choose or refine. |
| Research looks authoritative even when evidence is weak. | Separate user claims, verified evidence, inference, and unknowns. |
| UX RULER may imply access to private usage data the current agent cannot actually see. | Require agents to name what they can access and ask for the smallest missing export, summary, or tool access instead of inventing evidence. |
| UX RULER outputs can stop at a decision without helping the user move. | End each use by asking how the agent can help with the next step, offering concrete options. |
| Measurement plans can look complete before any data is actually collected. | Require a measurement handoff: where events are emitted, whether a collector exists, who reviews the signal, and what decision the data should change. |
| The workflow creates document bloat. | Default to one compact product map; expand only for real decisions. |
| Roadmaps can turn into feature backlogs disconnected from evidence. | Keep `ROADMAP.md` compact, use now/next/later, and tie each item to a problem, evidence, and signal. |
| Referenced artifact standards drift or get applied loosely. | Keep source-pattern notes, compliant templates, and validation commands for standards-backed artifacts such as `DESIGN.md`. |
| Install instructions drift as tools change. | Verify install examples when changing repo URL or folder layout. |
| Website and skill wording drift apart. | Update `README.md`, `index.html`, and `uxruler/SKILL.md` together when the workflow changes. |

## UX Test

| Dimension | Current Read | Next Improvement |
|---|---|---|
| Usefulness | Strong promise, still needs external evidence. | Validate with 3 real applications. |
| Ergonomics | Compact skill and website, but some skill questions still need simpler wording, clearer next-step guidance, guided empty-repo mission scaffolding, early roadmap handoff, and better post-edit handoffs. | Test the plain-language repo question, test artifact closeouts after file edits, test whether `ROADMAP.md` helps choose the next move, test the empty-repo mission-definition path, and add one applied example. |
| Attractiveness | Distinct process map and clear visual system. | Keep visual clarity while avoiding extra decoration. |
| Identity | Positions users as thoughtful builders who use AI without skipping product judgment. | Keep artifacts lightweight so the identity does not feel bureaucratic. |

## Next Validation Step

Use `ROADMAP.md` to sequence the next work. First validate audience scale and reachability: estimate how many potential AI coding-agent product builders exist, where they gather, and what demand signals suggest interest in product/UX strategy workflows. Then run 5 to 8 user sessions to test whether UX RULER changes a decision, metric, risk, or next validation step.
