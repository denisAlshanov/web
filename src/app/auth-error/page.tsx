"use client";

import { signOut } from "next-auth/react";
import { WarningTriangle } from "iconoir-react";
import { MediaPlansLogo } from "@/components/ui/mediaplans-logo";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

export default function AuthErrorPage() {
  return (
    <div className="relative min-h-screen bg-[var(--colour-interface-surface-base)]">
      <div className="absolute left-[var(--number-spacing-padding-pad-2xl)] top-[var(--number-spacing-padding-pad-2xl)]">
        <MediaPlansLogo />
      </div>

      <div className="flex justify-center pt-[320px]">
        <div className="flex w-full max-w-[792px] flex-col items-center gap-[var(--numbers-80)] px-[var(--number-spacing-padding-pad-xl)]">
          <div className="flex w-full flex-col items-center gap-[var(--numbers-20)]">
            <Icon icon={WarningTriangle} color="warning" size="md" />
            <h1 className="text-heading-m text-[color:var(--colour-interface-text-heavy)]">
              Seems like this account has not been set up yet.
            </h1>
            <p className="text-medium-l text-[color:var(--colour-interface-text-default)]">
              Contact your company to make sure your account is being approved.
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
    </div>
  );
}
