# Phase 1 — Implementation Plan

## Workstream 0 — Workspace and ownership

- Create a new private GitHub repository named `indiabrix` (owner/account to be confirmed by the project owner).
- Protect the default branch; require pull requests and passing checks before merge.
- Create a new Firebase project for development; do not connect an old project.
- Create a separate Vercel project linked to the new repository.
- Use Vercel Preview deployments as the staging surface. Do not attach `indiabrix.com`, `www.indiabrix.com`, or alter DNS during Phase 1.
- Record project IDs and environment ownership in a secure team vault, not in Git.

## Workstream 1 — Application foundation

- Scaffold current stable Next.js App Router with TypeScript and Tailwind.
- Add shadcn/ui and Lucide icons; establish lint, formatting, type-check and test commands.
- Define route groups for public pages, authentication and future protected areas.
- Establish server/client component conventions and centralized error handling.
- Add `.env.example`; validate required variables at startup without logging secret values.

## Workstream 2 — Design system and public shell

Use the approved palette:

| Token | Value |
|---|---|
| Primary blue | `#155EEF` |
| Dark navy | `#102A56` |
| Secondary blue | `#36A3FF` |
| Light blue | `#EFF6FF` |
| Background | `#F5F8FF` |
| White | `#FFFFFF` |
| Primary text | `#172033` |
| Secondary text | `#667085` |
| Success | `#12A66A` |
| Warning | `#F59E0B` |
| Error | `#DC2626` |

- Define typography, spacing, radii, shadows, focus states and responsive breakpoints.
- Build responsive header, mobile navigation, footer and reusable buttons/inputs/cards.
- Build the homepage shell and hero search UI. Search controls must be clearly non-functional until Phase 2 connects them to real data; do not imply live search exists.
- Avoid fabricated property listings, testimonials, verification claims, metrics or partner logos.

## Workstream 3 — Authentication

- Firebase email/password registration, login and logout.
- Email verification and password reset.
- Server-side session strategy with secure, HTTP-only cookies where applicable.
- Validate Firebase ID tokens/session cookies on the server.
- Protect private routes server-side; client route guards are supplementary only.
- Define account profile creation and safe defaults. Do not allow a user to assign themselves privileged roles.

## Workstream 4 — Data model and security foundation

Initial collections: `users`, `properties`, `agents`, `builders`, `projects`, `enquiries`, `leads`, `favourites`, `savedSearches`, `subscriptions`, `payments`, `plans`, `notifications`, `reports`, `banners`, `blogPosts`, `locations`, `adminRoles`, `auditLogs`, `platformSettings`.

Phase 1 implements only the foundational documents and rules needed for authentication, authorization and future property moderation. Define schemas and indexes for later collections without pretending their business workflows are implemented.

- Store a normalized India-wide location hierarchy: country, state/UT, city, district and locality/sector.
- Use INR as the currency convention; validate Indian phone numbers at the application boundary.
- Keep user-owned records linked to Firebase UID.
- Property status lifecycle must include draft/pending/rejected/published/suspended/expired as appropriate; new submissions default to pending review.
- Verification is a separate, privileged moderation decision and is never inferred from publication.

## Workstream 5 — Quality and staging

- Unit tests for schemas, permissions and core helpers.
- Integration tests against Firebase Emulator Suite for Auth/Firestore/Storage rules where feasible.
- Responsive checks at mobile, tablet and desktop widths.
- Accessibility review for keyboard use, focus visibility, labels and contrast.
- Run lint, type-check, tests and production build; record actual outputs.
- Deploy only to a Vercel preview/staging target after account setup and project-owner approval of the exact deployment action.

## Milestones and estimates

| Milestone | Scope | Exit evidence |
|---|---|---|
| M0 | Repository/cloud workspace plan | Owner confirms GitHub org/account; Firebase and Vercel project IDs documented |
| M1 | App scaffold and engineering conventions | Clean install, lint, type-check and build pass |
| M2 | Design system and public shell | Responsive header/footer/homepage reviewed |
| M3 | Firebase Auth | Auth flows tested; session and server authorization reviewed |
| M4 | Data and security foundation | Rules, indexes, schema docs and emulator tests reviewed |
| M5 | Staging readiness | QA report, setup docs and staging preview URL |

Planning estimate: approximately 2–3 weeks for a focused implementation, subject to account access, design review, integration setup and testing findings. This is an estimate, not a delivery commitment.

## Phase gate

At the end of Phase 1, present completed features, test evidence, known gaps, staging URL (if deployed) and Phase 2 proposal. Production deployment and DNS changes require a separate explicit approval.
