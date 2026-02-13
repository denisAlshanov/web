"use client";

import { signIn, signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { MediaPlansLogo } from "@/components/ui/mediaplans-logo";
import { GoogleIcon } from "@/components/ui/google-icon";
import { Button } from "@/components/ui/button";

function getSafeCallbackUrl(raw: string | null): string {
  if (!raw || !raw.startsWith("/") || raw.startsWith("//")) {
    return "/";
  }
  // Extract pathname (before query string) for security checks
  const pathname = raw.split("?")[0];
  if (pathname === "/api" || pathname.startsWith("/api/")) {
    return "/";
  }
  // Block backslash-based open redirect attacks in the pathname
  if (pathname.includes("\\") || pathname.includes("%5C") || pathname.includes("%5c")) {
    return "/";
  }
  return raw;
}

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = getSafeCallbackUrl(searchParams.get("callbackUrl"));
  const error = searchParams.get("error");

  return (
    <div
      className="relative min-h-screen bg-[var(--colour-interface-surface-base)]"
    >
      <div className="absolute left-[var(--number-spacing-padding-pad-2xl)] top-[var(--number-spacing-padding-pad-2xl)]">
        <MediaPlansLogo />
      </div>

      <div className="flex justify-center pt-[320px]">
        <div className="flex w-full max-w-[792px] flex-col items-center gap-[var(--numbers-80)] px-[var(--number-spacing-padding-pad-xl)]">
          <div className="flex w-full flex-col gap-[var(--numbers-20)]">
            <h1
              className="text-heading-l text-[color:var(--colour-interface-text-heavy)]"
            >
              Sign In to MediaPlans.
            </h1>
            <p
              className="text-medium-l text-[color:var(--colour-interface-text-supporting)]"
            >
              Log in with your Google account to start planning your next show.
            </p>
          </div>

          {error && (
            <div
              className="w-full rounded-[var(--number-radius-rad-inner-block)] p-[var(--number-spacing-padding-pad-m)] text-center bg-[var(--colour-interface-background-semantic-error-default)] text-[color:var(--colour-interface-text-semantic-error)]"
            >
              <p className="text-medium-s">Sign-in failed. Please try again.</p>
              <button
                onClick={() => signOut({ callbackUrl: callbackUrl === "/" ? "/login" : `/login?callbackUrl=${encodeURIComponent(callbackUrl)}` })}
                className="mt-2 text-medium-xs underline text-[color:var(--colour-interface-text-semantic-error)]"
              >
                Clear session and retry
              </button>
            </div>
          )}

          <Button
            variant="tertiary"
            size="lg"
            leadingIcon={<GoogleIcon size={20} />}
            onClick={() => signIn("google", { callbackUrl })}
          >
            Continue with Google
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div
          className="flex min-h-screen items-center justify-center bg-[var(--colour-interface-surface-base)]"
        >
          <p
            className="text-medium-l text-[color:var(--colour-interface-text-supporting)]"
          >
            Loading...
          </p>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
