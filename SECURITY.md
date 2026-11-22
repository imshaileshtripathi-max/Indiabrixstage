# Security Baseline

## Non-negotiable controls

1. Firebase Admin SDK credentials and private keys remain server-only and are never prefixed with `NEXT_PUBLIC_`.
2. `.env.example` contains names and placeholders only; real values belong in deployment secret storage or a secure local ignored file.
3. Firestore and Storage rules are deny-by-default. No broad public writes.
4. Users may read/update only their permitted profile fields. They cannot edit role, account verification, listing approval or listing verification fields.
5. Public visitors can read only published public listing data. Private contact information is separately protected and disclosed only with consent and authorization.
6. Admin/moderator permissions are verified server-side and mirrored in restrictive database rules where appropriate.
7. Moderation actions require an authorized role, valid state transition, reason where sensitive, and immutable audit entry.
8. File uploads enforce authentication, ownership, MIME/type, size and path constraints; downloads follow the intended visibility model.
9. Validate inputs server-side; rate-limit sensitive endpoints; avoid logging tokens, secrets or unnecessary personal data.
10. Production environment, DNS, existing databases and existing data are out of scope without separate explicit approval.

## Suggested initial Firestore rules posture

- Deny by default.
- Allow a signed-in user to read their own user document and update only an allowlist of profile fields.
- Prevent client writes to `adminRoles`, `auditLogs`, `platformSettings`, role claims and moderation fields.
- Allow public reads only from a deliberately public published-property projection once Phase 2 implements it.
- Do not permit clients to create published or verified properties.

The final rules must be written and tested against the actual schema before Firebase deployment; this document is a policy baseline, not a substitute for tested rules.

## Secret handling

- Use distinct Firebase project credentials for local development and staging.
- Restrict access to Firebase service accounts and Vercel project settings.
- Rotate any credential suspected of exposure.
- Never paste private keys into chat or commit them to Git.
