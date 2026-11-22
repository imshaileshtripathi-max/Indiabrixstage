# IndiaBrix — Phase 1 Architecture

## Logical architecture

```text
Browser
  └── Next.js App Router
      ├── Public experience (home, shared shell)
      ├── Auth experience (register, login, reset)
      ├── Server actions / route handlers
      │   ├── Input validation and business services
      │   ├── Firebase Admin SDK (server only)
      │   └── Authorization and audit boundary
      └── Firebase client SDK (limited client-side Auth and approved reads)

Firebase
  ├── Authentication
  ├── Cloud Firestore
  └── Cloud Storage

Vercel
  └── Preview/staging deployments only
```

## Architectural boundaries

- UI components do not access privileged Admin SDK functionality.
- Domain logic is separated from Next.js route handlers and UI.
- Firebase client configuration is isolated from Admin SDK configuration.
- All privileged writes pass through server-side authentication and permission checks.
- Search is defined behind a `PropertySearchProvider`/repository interface. Initial provider uses Firestore-compatible structured queries and indexed filters; a dedicated search engine can replace it later without coupling the UI to a vendor.
- Public content and private user data use separate read paths and security policies.

## Proposed repository layout

```text
indiabrix/
├── public/
│   ├── brand/
│   └── images/
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   ├── (auth)/
│   │   ├── (account)/       # reserved for later phase
│   │   ├── admin/           # reserved; server-protected when implemented
│   │   ├── api/
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   └── home/
│   ├── features/
│   │   └── auth/
│   ├── lib/
│   │   ├── firebase/
│   │   ├── auth/
│   │   ├── env/
│   │   └── validation/
│   ├── server/
│   │   ├── auth/
│   │   ├── authorization/
│   │   └── services/
│   ├── domain/
│   │   ├── users/
│   │   ├── properties/
│   │   └── locations/
│   ├── config/
│   └── types/
├── firebase/
│   ├── firestore.rules
│   ├── firestore.indexes.json
│   └── storage.rules
├── docs/
├── tests/
├── .env.example
├── .gitignore
├── firebase.json
├── next.config.ts
├── package.json
└── README.md
```

## Initial Firestore document outlines

### `users/{uid}`

- `uid: string` — must match document ID and authenticated Firebase UID.
- `displayName: string`
- `email: string`
- `phoneE164?: string`
- `preferredLanguage: "en" | "hi"` (default `en`)
- `accountType: "buyer_tenant" | "seller_owner" | "agent" | "builder"`
- `status: "active" | "suspended" | "deletion_pending"`
- `createdAt`, `updatedAt`: server timestamps

Role grants are not self-editable profile fields. Privileged roles and permissions are held in trusted server-managed claims and/or protected role documents.

### `properties/{propertyId}` (schema reserved; workflow later)

- `propertyId`, `ownerUid`, `title`, `transactionType`, `category`, `propertyType`
- `location`: normalized country/state/city/district/locality identifiers and display labels
- `price`: integer minor/whole INR convention to be formally fixed before implementation; never use floating-point money
- `status`: `draft | pending | changes_requested | rejected | published | suspended | expired`
- `verificationStatus`: `unverified | under_review | verified | rejected`
- `createdAt`, `updatedAt`, `submittedAt`, `reviewedAt`

All status transitions are validated server-side. Public reads are limited to published, public-safe fields. A user's own document ownership does not grant authority to approve or verify it.

### `adminRoles/{uid}`

Protected role assignments and granular permissions, writable only by a trusted bootstrap/super-admin process. No public client writes.

### `auditLogs/{logId}`

Append-only administrative audit entries: actor UID, action, target type/ID, timestamp, reason and carefully minimized before/after data. Ordinary admins cannot edit or delete logs.

## Role model

Roles from the master brief: Super Admin, Admin, Property Moderator, Customer Support, Finance Manager, Marketing Manager, Agent, Builder, Seller/Owner, Buyer/Tenant.

Authorization is deny-by-default and permission-based. Route visibility is not authorization. Admin identity must be verified on the server; no user may grant themselves a higher role. Initial bootstrap of the first Super Admin must be a controlled out-of-band operation documented and audited.

## India-wide locations and search

- Canonical location IDs are preferred over free-text-only city/locality values.
- Keep a versioned location dataset source and update process; do not invent an exhaustive locality catalogue.
- Firestore compound queries require explicit indexes and may constrain combinations of range/order filters. Validate each supported filter combination with emulator/integration tests.
- Prefix matching is not equivalent to typo-tolerant full-text search. Document these limits in UI/technical docs.
