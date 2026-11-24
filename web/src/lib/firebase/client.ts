"use client";

import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

function getFirebaseApp() {
  const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
  const messagingSenderId =
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    ...(storageBucket && storageBucket !== "replace_me" ? { storageBucket } : {}),
    ...(messagingSenderId && messagingSenderId !== "replace_me"
      ? { messagingSenderId }
      : {}),
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };
  const requiredValues = [
    ["NEXT_PUBLIC_FIREBASE_API_KEY", config.apiKey],
    ["NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN", config.authDomain],
    ["NEXT_PUBLIC_FIREBASE_PROJECT_ID", config.projectId],
    ["NEXT_PUBLIC_FIREBASE_APP_ID", config.appId],
  ] as const;
  const missingValues = requiredValues
    .filter(([, value]) => !value || value === "replace_me")
    .map(([name]) => name);

  if (missingValues.length > 0) {
    throw new Error(
      `Missing Firebase configuration: ${missingValues.join(", ")}. Add the staging web app values to web/.env.local and restart Next.js.`,
    );
  }

  const hasDefaultApp = getApps().some((app) => app.name === "[DEFAULT]");
  return hasDefaultApp ? getApp() : initializeApp(config);
}

export function getFirebaseClient() {
  const app = getFirebaseApp();
  return {
    auth: getAuth(app),
    firestore: getFirestore(app),
  };
}

export function getFirebaseStorage() {
  const app = getFirebaseApp();
  if (!app.options.storageBucket) {
    throw new Error(
      "Missing Firebase configuration: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET. Add the staging web app value to web/.env.local and restart Next.js.",
    );
  }
  return getStorage(app);
}
