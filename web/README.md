This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Firebase staging setup

The app uses the Firebase JavaScript SDK for email/password Authentication and
Firestore user profiles, and provides a client initializer for Firebase
Storage. It does not use Firebase Admin credentials.

1. In the Firebase Console, open your **staging** project. In **Project
   settings → General → Your apps**, select or create a **Web app** and copy its
   Firebase configuration values.
2. From this `web` directory, create the ignored local environment file:

   ```bash
   cp .env.example .env.local
   ```

3. Open `web/.env.local` and replace each value with its matching value from
   the staging web app configuration. The Storage Bucket value is required to
   initialize Firebase Storage. These `NEXT_PUBLIC_` values are public web-app
   configuration and are included in browser code; they are not secrets. Never
   include Admin SDK private keys or service-account credentials. Keep
   `.env.local` local; Git ignores it.
4. In Firebase Console, confirm **Authentication → Sign-in method → Email/Password**
   is enabled and **Authentication → Settings → Authorized domains** includes
   `localhost` for local testing. Before using Storage, provision the staging
   bucket and confirm its existing security rules restrict access appropriately.
5. Restart the Next.js dev server after changing environment values. Visit
   `/account` to sign in or `/account?mode=signup` to create an account.

Successful registration creates `users/{uid}` with the user's UID, email,
display name, and timestamps, then requests an email verification message.
The client does not write role or verification-status fields. Firestore
permission errors mean the currently deployed rules denied the operation; do
not loosen those rules just to make the client work. Before using registration,
confirm the existing `users/{uid}` rules require `request.auth.uid == uid`,
allow only the intended profile fields (`uid`, `email`, `displayName`,
`createdAt`, and `updatedAt`), and reject role/admin/verification fields. Keep
any stricter existing protections. Firebase configuration and service access
still depend on the staging project's enabled services and security rules.

The local [`firestore.rules`](./firestore.rules) file defines this profile
policy: authenticated users can read only their own profile and create it only
with the five validated fields. Profile updates, deletes, collection listing,
and access to other Firestore paths are denied. This file is not published
automatically; these rules must be reviewed and deployed separately.

To deploy only these Firestore rules, install the Firebase CLI if needed, sign
in with `firebase login`, and confirm that the signed-in account can access
`indiabrix-a6f53` with `firebase projects:list`. From the repository root, run:

```bash
firebase deploy --only firestore:rules --project indiabrix-a6f53
```

The root `firebase.json` maps Firestore rules to this file, and `.firebaserc`
sets `indiabrix-a6f53` as the default project. Keep the deploy command scoped
to `firestore:rules`; do not use an unrestricted `firebase deploy`.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
