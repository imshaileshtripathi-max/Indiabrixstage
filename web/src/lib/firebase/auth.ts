"use client";

import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  type Auth,
  type Unsubscribe,
  type User,
} from "firebase/auth";
import { getFirebaseClient } from "@/lib/firebase/client";
import { createUserProfile } from "@/lib/firebase/profiles";

let persistenceSetup: Promise<void> | undefined;

export function enableLocalAuthPersistence(auth: Auth) {
  persistenceSetup ??= setPersistence(auth, browserLocalPersistence);
  return persistenceSetup;
}

export async function subscribeToAuthState(
  onUserChanged: (user: User | null) => void,
  onError: (error: Error) => void,
): Promise<Unsubscribe> {
  const { auth } = getFirebaseClient();
  await enableLocalAuthPersistence(auth);
  return onAuthStateChanged(auth, onUserChanged, onError);
}

export async function registerWithEmail(
  displayName: string,
  email: string,
  password: string,
): Promise<User> {
  const { auth } = getFirebaseClient();
  await enableLocalAuthPersistence(auth);

  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  await createUserProfile(credential.user, displayName);
  await sendEmailVerification(credential.user);
  return credential.user;
}

export async function loginWithEmail(
  email: string,
  password: string,
): Promise<User> {
  const { auth } = getFirebaseClient();
  await enableLocalAuthPersistence(auth);
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}

export async function logout() {
  const { auth } = getFirebaseClient();
  await signOut(auth);
}

export async function sendPasswordReset(email: string) {
  const { auth } = getFirebaseClient();
  await sendPasswordResetEmail(auth, email);
}

export async function resendVerificationEmail(user: User) {
  await sendEmailVerification(user);
}
