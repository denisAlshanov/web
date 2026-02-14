"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { signOut } from "next-auth/react";
import { WarningTriangle } from "iconoir-react";
import { MediaPlansLogo } from "@/components/ui/mediaplans-logo";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

function getErrorContent(reason: string | null): {
  title: string;
  description: string;
} {
  if (!reason) {
    return {
      title: "Seems like this account has not been set up yet.",
      description:
        "Contact your company to make sure your account is being approved.",
    };
  }

  if (reason === "BackendAuthError:no_token") {
    return {
      title: "Google sign-in did not provide the required credentials.",
      description:
        "Please try signing in again. If the problem persists, contact support.",
    };
  }

  if (reason === "BackendAuthError:network") {
    return {
      title: "Unable to reach the authentication service.",
      description:
        "The server may be temporarily unavailable. Please try again in a few minutes.",
    };
  }

  if (reason === "BackendAuthError:401" || reason === "BackendAuthError:403") {
    return {
      title: "Seems like this account has not been set up yet.",
      description:
        "Contact your company to make sure your account is being approved.",
    };
  }

  if (reason.startsWith("BackendAuthError:5")) {
    return {
      title: "The authentication service encountered an error.",
      description:
        "This is a temporary server issue. Please try again in a few minutes.",
    };
  }

  return {
    title: "An authentication error occurred.",
    description:
      "Please try signing in again. If the problem persists, contact support.",
  };
}

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");
  const { title, description } = getErrorContent(reason);

  return (
    <div className="flex justify-center pt-[320px]">
      <div className="flex w-full max-w-[792px] flex-col items-center gap-[var(--numbers-80)] px-[var(--number-spacing-padding-pad-xl)]">
        <div className="flex w-full flex-col items-center gap-[var(--numbers-20)]">
          <Icon icon={WarningTriangle} color="warning" size="md" />
          <h1 className="text-heading-m text-[color:var(--colour-interface-text-heavy)]">
            {title}
          </h1>
          <p className="text-medium-l text-[color:var(--colour-interface-text-default)]">
            {description}
          </p>
        </div>

        <Button
          variant="secondary"
          size="lg"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <div className="relative min-h-screen bg-[var(--colour-interface-surface-base)]">
      <div className="absolute left-[var(--number-spacing-padding-pad-2xl)] top-[var(--number-spacing-padding-pad-2xl)]">
        <MediaPlansLogo />
      </div>

      <Suspense>
        <AuthErrorContent />
      </Suspense>
    </div>
  );
}
