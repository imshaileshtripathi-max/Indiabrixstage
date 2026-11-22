# Owner Setup Checklist

## GitHub

- [ ] Confirm the GitHub account/organization that should own the new private repository.
- [ ] Create private repository `indiabrix` (empty; no template/old code import).
- [ ] Enable branch protection and pull-request checks.
- [ ] Add collaborators with least privilege.

## Firebase

- [ ] Create a brand-new Firebase project for development (suggested ID: `indiabrix-dev`; availability is not guaranteed).
- [ ] Enable Authentication providers required for Phase 1 (email/password).
- [ ] Create Firestore in an appropriate India-region location after reviewing region availability and data-residency needs; region selection may be difficult or impossible to change later.
- [ ] Enable Storage only when needed; configure restrictive rules before uploads.
- [ ] Configure Firebase Emulator Suite for local development.
- [ ] Create a dedicated server service account only when server-side Admin SDK is introduced; store credentials securely.

## Vercel staging

- [ ] Create a separate Vercel project linked to the new repository.
- [ ] Use Preview deployments as staging initially.
- [ ] Configure staging environment variables separately from local development.
- [ ] Keep `indiabrix.com` and `www.indiabrix.com` unattached until production approval.

## Decisions to confirm before provisioning

- [ ] GitHub owner/org and who will administer it.
- [ ] Firebase project display name and region choice.
- [ ] Whether staging preview should be protected with Vercel Deployment Protection.
- [ ] Who will hold billing ownership for Firebase and Vercel.

## Local developer prerequisites

- [ ] Supported Node.js LTS version installed.
- [ ] Git installed and configured.
- [ ] Firebase CLI installed for emulator/deployment workflows.
- [ ] Access to GitHub, Firebase Console and Vercel account.
