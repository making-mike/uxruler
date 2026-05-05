# PostHog post-wizard report

The wizard has completed a deep integration of your project. PostHog analytics has been added to the `index.html` landing page of UX RULER. The PostHog HTML snippet was added to `<head>` to initialize `window.posthog`. The existing `trackLandingEvent` helper already contained a PostHog capture bridge (`window.posthog.capture`), so all previously instrumented events (CTA clicks, language switching, copy button clicks) now flow to PostHog automatically. Two new event tracking calls were added: one for process accordion step opens and one for repo structure accordion group opens.

| Event | Description | File |
|---|---|---|
| `landing_install_cta_clicked` | User clicks the "Install skill" CTA button (hero or footer) | `index.html` |
| `landing_github_cta_clicked` | User clicks the "Contribute" GitHub CTA button (hero or footer) | `index.html` |
| `landing_language_switched` | User switches the page language between PL and EN | `index.html` |
| `landing_copy_clicked` | User clicks a copy button to copy an install command or starter prompt | `index.html` |
| `landing_process_step_opened` | User opens a step in the UX RULER process accordion (step number and title tracked) | `index.html` |
| `landing_structure_group_opened` | User opens a group in the repo structure accordion | `index.html` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics:** https://eu.posthog.com/project/172596/dashboard/660956
- **Install CTA clicks over time:** https://eu.posthog.com/project/172596/insights/C30NEwbo
- **GitHub CTA clicks over time:** https://eu.posthog.com/project/172596/insights/XNHRGCQx
- **Install skill conversion funnel** (pageview → Install CTA): https://eu.posthog.com/project/172596/insights/YwhTUPiy
- **Copy clicks by content type** (install vs prompts): https://eu.posthog.com/project/172596/insights/uPUYH42A
- **Process step engagement** (which steps users explore): https://eu.posthog.com/project/172596/insights/xyYxHzc7

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
