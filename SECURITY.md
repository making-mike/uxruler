# Security Policy

UX RULER is mostly documentation, templates, a static website, and an installable agent skill. Security reports are still welcome, especially if they involve unsafe install instructions, malicious links, supply-chain risk, or guidance that could cause agents to expose secrets.

## Supported Versions

The supported version is the current `main` branch.

## Reporting A Vulnerability

Please do not open a public issue for security-sensitive reports.

Preferred options:

1. Use GitHub private vulnerability reporting if it is enabled for the repository.
2. Email `security@uxruler.com`.
3. If neither channel is available, contact the repository owner privately.

Include:

- affected file or instruction;
- what could go wrong;
- reproduction steps if relevant;
- suggested fix if you have one.

## Scope

In scope:

- unsafe shell commands in installation docs;
- broken or misleading install paths that could encourage unsafe workarounds;
- malicious or compromised external references;
- instructions that could cause agents to leak secrets or overwrite unrelated project files.

Out of scope:

- product strategy disagreements;
- spelling or style issues;
- vulnerability reports for third-party tools that UX RULER links to but does not maintain.
