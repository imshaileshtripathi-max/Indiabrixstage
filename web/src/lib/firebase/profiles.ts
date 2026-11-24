"use client";

import { doc, runTransaction, serverTimestamp } from "firebase/firestore";
import type { User } from "firebase/auth";
import { getFirebaseClient } from "@/lib/firebase/client";

export class UserProfileCreationError extends Error {
  readonly originalError: unknown;

  constructor(originalError: unknown) {
    super("Your account was created, but its user profile could not be saved.");
    this.name = "UserProfileCreationError";
    this.originalError = originalError;
  }
}

export async function createUserProfile(user: User, displayName: string) {
  const { firestore } = getFirebaseClient();
  const profileRef = doc(firestore, "users", user.uid);

  try {
    await runTransaction(firestore, async (transaction) => {
      const profile = await transaction.get(profileRef);
      if (profile.exists()) return;

      transaction.set(profileRef, {
        uid: user.uid,
        email: user.email,
        displayName: displayName.trim(),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    });
  } catch (error) {
    throw new UserProfileCreationError(error);
  }
}
