# MK AOE3 Standards Institute & Professional Academy

## Public presentation repository

This repository contains the public bilingual English/Arabic website for the **MK AOE3 Standards Institute & Professional Academy**.

It presents the Academy’s purpose, AOE3 doctrine, ten foundational principles, twelve standards families, eight Body of Knowledge domains, six proposed certification pathways, and synthetic educational stories.

The private Academy development repository remains separate. This repository is a presentation layer, not a copy of the private working estate.

## Current status

- The website is a public educational presentation.
- AOE3 standards remain in development; Draft and Planned labels are intentional.
- Certification pathways are proposed and no credentials are currently awarded.
- Public credential verification is not active.
- No external accreditation, professional recognition, partnership, product conformance, security efficacy, or engineering qualification is claimed.

## Repository boundary

The public site includes educational summaries only.

It does not include:

- Full normative standards or controlled working drafts.
- Decision, risk, curriculum, examination, improvement, or evidence registers.
- Examination banks, assessment answers, learner records, or personal data.
- Track A material, canonical evidence, internal release records, or owner-only guides.
- Credentials, recovery information, private keys, secrets, or private repository content.

See `PUBLIC-CONTENT-BOUNDARY.md` for the standing publication rules.

## Open the website

Open `index.html` directly in a modern browser, or run a local static server from this directory:

```text
python3 -m http.server 8765
```

Then open `http://localhost:8765`.

The site has no build step and no package installation requirement.

## Website operation

- English and Arabic presentation with LTR/RTL switching.
- Responsive desktop, tablet, and mobile layouts.
- Keyboard-accessible navigation and expandable educational content.
- Reduced-motion support.
- Local system fonts; no remote font service.
- No backend, accounts, analytics, advertising trackers, cookies, or remote data collection.
- The inquiry form creates a local text download. It does not transmit or store the inquiry.

## Project structure

```text
MK-AOE3-Academy-Public/
├── index.html
├── src/
│   ├── main.js
│   └── styles.css
├── PUBLIC-CONTENT-BOUNDARY.md
├── COPYRIGHT.txt
├── CREDITS.md
├── MANIFEST-SHA256.txt
└── README.md
```

## Update discipline

Update English and Arabic blocks together. Preserve `data-lang`, `lang`, and Arabic `dir="rtl"` attributes.

Do not change Draft, Planned, Proposed, or Not yet active wording unless the corresponding owner-controlled status has actually changed.

Routine private Academy progress belongs in the private Academy registers, not in this public README. Update this repository only for material changes to public content, navigation, design, behavior, legal notices, or publication boundaries.

## Rights

Copyright © 2026 Musab Badewi Mustafa Khiri. All rights reserved.

Public visibility does not grant an open-source license or permission to reproduce, modify, redistribute, sublicense, or commercially exploit proprietary AOE3 material. See `COPYRIGHT.txt`.
