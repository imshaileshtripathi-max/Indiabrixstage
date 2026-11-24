"use client";

import {
  reload,
  type Unsubscribe,
  type User,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import {
  loginWithEmail,
  logout,
  registerWithEmail,
  resendVerificationEmail,
  sendPasswordReset,
  subscribeToAuthState,
} from "@/lib/firebase/auth";
import { UserProfileCreationError } from "@/lib/firebase/profiles";

type AuthMode = "login" | "signup";

function errorMessage(error: unknown) {
  if (error instanceof UserProfileCreationError) {
    const reason =
      error.originalError instanceof Error
        ? error.originalError.message
        : "Check the users collection security rules.";
    return `${error.message} ${reason}`;
  }

  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/email-already-in-use":
        return "An account already uses this email address. Try signing in.";
      case "auth/invalid-email":
        return "Enter a valid email address.";
      case "auth/invalid-credential":
        return "The email or password is incorrect.";
      case "auth/weak-password":
        return "Choose a password with at least 6 characters.";
      case "auth/too-many-requests":
        return "Too many attempts. Wait a little and try again.";
      case "auth/network-request-failed":
        return "Network error. Check your connection and try again.";
      case "auth/operation-not-allowed":
        return "Email/password sign-in is not enabled for this Firebase project.";
      case "permission-denied":
        return "Firestore denied this operation. Check the existing users collection rules.";
    }
  }

  return error instanceof Error
    ? error.message
    : "Something went wrong. Please try again.";
}

export function AuthPanel({ initialMode }: { initialMode: AuthMode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const [initializationError, setInitializationError] = useState("");
  const [authError, setAuthError] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    let active = true;
    let unsubscribe: Unsubscribe | undefined;

    async function observeAuth() {
      try {
        unsubscribe = await subscribeToAuthState(
          (nextUser) => {
            if (!active) return;
            setUser(nextUser);
            setIsVerified(nextUser?.emailVerified ?? false);
            setAuthReady(true);
          },
          (error) => {
            if (!active) return;
            setInitializationError(errorMessage(error));
            setAuthReady(true);
          },
        );
        if (!active) unsubscribe();
      } catch (error) {
        if (active) {
          setInitializationError(errorMessage(error));
          setAuthReady(true);
        }
      }
    }

    void observeAuth();
    return () => {
      active = false;
      unsubscribe?.();
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage("");
    setAuthError("");

    try {
      if (resetMode) {
        await sendPasswordReset(email);
        setMessage(
          "If an account exists for this email, a password reset message has been sent.",
        );
        setResetMode(false);
      } else if (initialMode === "signup") {
        await registerWithEmail(displayName, email, password);
        setMessage(
          "Your account and profile were created. Check your email for a verification link.",
        );
        setPassword("");
      } else {
        await loginWithEmail(email, password);
      }
    } catch (error) {
      setAuthError(errorMessage(error));
    } finally {
      setPending(false);
    }
  }

  async function handleLogout() {
    setPending(true);
    setMessage("");
    setAuthError("");
    try {
      await logout();
    } catch (error) {
      setAuthError(errorMessage(error));
    } finally {
      setPending(false);
    }
  }

  async function handleResendVerification() {
    if (!user) return;
    setPending(true);
    setMessage("");
    setAuthError("");
    try {
      await resendVerificationEmail(user);
      setMessage("A new verification email has been sent.");
    } catch (error) {
      setAuthError(errorMessage(error));
    } finally {
      setPending(false);
    }
  }

  async function handleRefreshVerification() {
    if (!user) return;
    setPending(true);
    setMessage("");
    setAuthError("");
    try {
      await reload(user);
      setIsVerified(user.emailVerified);
      setMessage(
        user.emailVerified
          ? "Your email is verified."
          : "Your email is not verified yet. Open the link in your verification email first.",
      );
    } catch (error) {
      setAuthError(errorMessage(error));
    } finally {
      setPending(false);
    }
  }

  const isBusy = pending || !authReady;

  return (
    <section className="mt-6 rounded-2xl border border-[#E5EAF0] bg-white p-6 shadow-[0_12px_36px_rgba(23,59,101,0.10)] sm:p-8">
      {user ? (
        <>
          <p className="eyebrow">Your account</p>
          <h1 className="section-title mt-2 text-3xl">Welcome to IndiaBrix</h1>
          <p className="mt-3 break-all text-sm text-[#5E6A78]">{user.email}</p>
          <div className="mt-6 rounded-xl bg-[#F8FAFC] p-4">
            <p className="font-bold text-[#173B65]">
              Email status: {isVerified ? "Verified" : "Not verified"}
            </p>
            {!isVerified && (
              <div className="mt-3 flex flex-wrap gap-3">
                <button
                  className="text-sm font-bold text-[#0c9b87] underline"
                  disabled={isBusy}
                  onClick={handleResendVerification}
                  type="button"
                >
                  Resend verification email
                </button>
                <button
                  className="text-sm font-bold text-[#0c9b87] underline"
                  disabled={isBusy}
                  onClick={handleRefreshVerification}
                  type="button"
                >
                  I verified my email
                </button>
              </div>
            )}
          </div>
          <button
            className="mt-6 min-h-11 w-full rounded-lg bg-[#173B65] px-4 font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isBusy}
            onClick={handleLogout}
            type="button"
          >
            {pending ? "Please wait..." : "Log out"}
          </button>
        </>
      ) : (
        <>
          <p className="eyebrow">{resetMode ? "Account recovery" : "Account access"}</p>
          <h1 className="section-title mt-2 text-3xl">
            {resetMode
              ? "Reset your password"
              : initialMode === "signup"
                ? "Create your account"
                : "Welcome back"}
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#5E6A78]">
            {resetMode
              ? "Enter the email address linked to your IndiaBrix account."
              : initialMode === "signup"
                ? "Create an IndiaBrix account with your email address."
                : "Sign in to your IndiaBrix account."}
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {initialMode === "signup" && !resetMode && (
              <label className="block text-sm font-bold text-[#173B65]">
                Name
                <input
                  autoComplete="name"
                  className="mt-1.5 min-h-11 w-full rounded-lg border border-[#D7DEE7] px-3 font-normal text-[#1B2633] outline-none focus:border-[#0c9b87] focus:ring-2 focus:ring-[#0c9b87]/20"
                  onChange={(event) => setDisplayName(event.target.value)}
                  required
                  type="text"
                  value={displayName}
                />
              </label>
            )}
            <label className="block text-sm font-bold text-[#173B65]">
              Email
              <input
                autoComplete="email"
                className="mt-1.5 min-h-11 w-full rounded-lg border border-[#D7DEE7] px-3 font-normal text-[#1B2633] outline-none focus:border-[#0c9b87] focus:ring-2 focus:ring-[#0c9b87]/20"
                onChange={(event) => setEmail(event.target.value)}
                required
                type="email"
                value={email}
              />
            </label>
            {!resetMode && (
              <label className="block text-sm font-bold text-[#173B65]">
                Password
                <input
                  autoComplete={initialMode === "signup" ? "new-password" : "current-password"}
                  className="mt-1.5 min-h-11 w-full rounded-lg border border-[#D7DEE7] px-3 font-normal text-[#1B2633] outline-none focus:border-[#0c9b87] focus:ring-2 focus:ring-[#0c9b87]/20"
                  minLength={6}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  type="password"
                  value={password}
                />
              </label>
            )}

            {initialMode === "login" && !resetMode && (
              <button
                className="text-sm font-bold text-[#0c9b87] underline"
                onClick={() => {
                  setResetMode(true);
                  setMessage("");
                  setAuthError("");
                }}
                type="button"
              >
                Forgot password?
              </button>
            )}

            <button
              className="min-h-11 w-full rounded-lg bg-[#0c9b87] px-4 font-extrabold text-white shadow-[0_2px_8px_rgba(12,155,135,0.25)] hover:bg-[#097868] disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isBusy || Boolean(initializationError)}
              type="submit"
            >
              {isBusy
                ? "Please wait..."
                : resetMode
                  ? "Send reset email"
                  : initialMode === "signup"
                    ? "Create account"
                    : "Log in"}
            </button>
          </form>

          {resetMode ? (
            <button
              className="mt-5 text-sm font-bold text-[#0c9b87] underline"
              onClick={() => {
                setResetMode(false);
                setMessage("");
                setAuthError("");
              }}
              type="button"
            >
              Back to login
            </button>
          ) : (
            <p className="mt-5 text-center text-sm text-[#5E6A78]">
              {initialMode === "signup" ? "Already have an account?" : "New to IndiaBrix?"}{" "}
              <Link
                className="font-bold text-[#0c9b87] underline"
                href={initialMode === "signup" ? "/account" : "/account?mode=signup"}
                onClick={() => {
                  setAuthError("");
                  setMessage("");
                  setResetMode(false);
                }}
              >
                {initialMode === "signup" ? "Log in" : "Create an account"}
              </Link>
            </p>
          )}
        </>
      )}

      {(authError || initializationError) && (
        <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-800" role="alert">
          {authError || initializationError}
        </p>
      )}
      {message && (
        <p className="mt-4 rounded-lg bg-[#e8f8f4] p-3 text-sm text-[#145b50]" role="status">
          {message}
        </p>
      )}
      {!user && !authReady && (
        <p className="mt-4 text-center text-xs text-[#5E6A78]" role="status">
          Connecting to Firebase...
        </p>
      )}
      {authReady && initializationError && (
        <p className="mt-4 text-center text-xs text-[#5E6A78]">
          Firebase account services are unavailable until the issue above is resolved.
        </p>
      )}
    </section>
  );
}
