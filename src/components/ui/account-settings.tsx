"use client";

import { useState, type ComponentType, type SVGProps } from "react";
import * as Popover from "@radix-ui/react-popover";
import { cva, type VariantProps } from "class-variance-authority";
import { User, LogOut, NavArrowDown, NavArrowUp } from "iconoir-react";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";

// ---------------------------------------------------------------------------
// AccountSettingsItem
// ---------------------------------------------------------------------------

const accountSettingsItemVariants = cva(
  [
    "flex items-center",
    "gap-[var(--number-spacing-gap-gap-s)]",
    "pl-[var(--number-spacing-padding-pad-s)] pr-[var(--number-spacing-padding-pad-m)] py-[var(--number-spacing-padding-pad-m)]",
    "rounded-[var(--number-radius-rad-inner-card)]",
    "text-medium-m cursor-pointer transition-colors",
    "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--colour-interface-border-primary-focus)]",
  ].join(" "),
  {
    variants: {
      intent: {
        default: [
          "bg-[var(--colour-interface-background-singleTone-default)]",
          "hover:bg-[var(--colour-interface-background-singleTone-hover)]",
          "focus-visible:bg-[var(--colour-interface-background-singleTone-focus)]",
          "active:bg-[var(--colour-interface-background-singleTone-active)]",
          "text-[color:var(--colour-interface-text-default)]",
        ].join(" "),
        danger: [
          "bg-[var(--colour-interface-background-semantic-danger-default)]",
          "hover:bg-[var(--colour-interface-background-semantic-danger-hover)]",
          "focus-visible:bg-[var(--colour-interface-background-semantic-danger-focus)]",
          "active:bg-[var(--colour-interface-background-semantic-danger-active)]",
          "text-[color:var(--colour-interface-text-semantic-danger)]",
        ].join(" "),
      },
    },
    defaultVariants: {
      intent: "default",
    },
  },
);

interface AccountSettingsItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof accountSettingsItemVariants> {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  children: React.ReactNode;
}

function AccountSettingsItem({
  icon,
  intent,
  className,
  children,
  ...props
}: AccountSettingsItemProps) {
  const iconColor = intent === "danger" ? "danger" : "default";

  return (
    <button
      type="button"
      className={cn(accountSettingsItemVariants({ intent }), className)}
      {...props}
    >
      <Icon icon={icon} color={iconColor} size="md" />
      {children}
    </button>
  );
}

// ---------------------------------------------------------------------------
// RolePill
// ---------------------------------------------------------------------------

const rolePillVariants = cva(
  [
    "inline-flex items-center justify-center",
    "px-[var(--number-spacing-padding-pad-m)] py-[var(--number-spacing-padding-pad-s)]",
    "rounded-[var(--number-radius-rad-pill)]",
    "text-medium-s text-[color:var(--colour-interface-text-default)]",
  ].join(" "),
  {
    variants: {
      role: {
        host: "bg-[var(--colour-interface-background-primary-default)]",
        producer:
          "bg-[var(--colour-interface-background-semantic-danger-hover)]",
      },
    },
  },
);

interface RolePillProps extends VariantProps<typeof rolePillVariants> {
  role: "host" | "producer";
  className?: string;
}

function RolePill({ role, className }: RolePillProps) {
  return (
    <span className={cn(rolePillVariants({ role }), className)}>{role}</span>
  );
}

// ---------------------------------------------------------------------------
// AccountSettingsDropdown
// ---------------------------------------------------------------------------

interface AccountSettingsDropdownProps {
  userName: string;
  avatarUrl?: string;
  roles: Array<"host" | "producer">;
  onAccountInfoClick?: () => void;
  onLogoutClick?: () => void;
  className?: string;
}

function AccountSettingsDropdown({
  userName,
  avatarUrl,
  roles,
  onAccountInfoClick,
  onLogoutClick,
  className,
}: AccountSettingsDropdownProps) {
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  const imgError = avatarUrl != null && failedUrl === avatarUrl;

  return (
    <div
      data-testid="account-settings-dropdown"
      className={cn(
        "bg-[var(--colour-interface-surface-base)]",
        "rounded-[var(--number-radius-rad-modal)]",
        "shadow-[0px_1px_8px_rgba(38,44,52,0.04)]",
        "pt-[var(--number-spacing-padding-pad-xl)] pl-[var(--number-spacing-padding-pad-m)] pr-[var(--number-spacing-padding-pad-xl)] pb-[var(--number-spacing-padding-pad-l)]",
        "flex flex-col gap-[var(--number-spacing-gap-gap-xl)]",
        className,
      )}
    >
      {/* Profile section */}
      <div className="flex flex-col items-center gap-[var(--number-spacing-padding-pad-m)]">
        {avatarUrl && !imgError ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={avatarUrl}
            alt={userName}
            width={64}
            height={64}
            className="h-16 w-16 rounded-full object-cover"
            onError={() => setFailedUrl(avatarUrl)}
          />
        ) : (
          <div
            aria-label={userName}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--colour-interface-background-singleTone-hover)] text-heading-m text-[color:var(--colour-interface-text-default)]"
          >
            {userName.charAt(0).toUpperCase() || "?"}
          </div>
        )}
        <span className="text-heading-s text-[color:var(--colour-interface-text-heavy)]">
          {userName}
        </span>
        {roles.length > 0 && (
          <div className="flex gap-[var(--number-spacing-gap-gap-s)]">
            {roles.map((role, index) => (
              <RolePill key={`${role}-${index}`} role={role} />
            ))}
          </div>
        )}
      </div>

      {/* Menu section */}
      <div className="flex flex-col">
        <span className="text-heading-eyebrow text-[color:var(--colour-interface-text-supporting)] pb-[var(--number-spacing-padding-pad-xs)]">
          Settings
        </span>
        <div className="flex flex-col gap-[var(--number-spacing-gap-gap-s)]">
          <AccountSettingsItem
            icon={User}
            intent="default"
            onClick={onAccountInfoClick}
          >
            Account Info
          </AccountSettingsItem>
          <AccountSettingsItem
            icon={LogOut}
            intent="danger"
            onClick={onLogoutClick}
          >
            Log out
          </AccountSettingsItem>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// AccountSettings (composed widget)
// ---------------------------------------------------------------------------

interface AccountSettingsProps
  extends Omit<AccountSettingsDropdownProps, "className"> {
  className?: string;
}

function AccountSettings({
  userName,
  avatarUrl,
  roles,
  onAccountInfoClick,
  onLogoutClick,
  className,
}: AccountSettingsProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          aria-label={`Account settings for ${userName}`}
          className={cn(
            "flex items-center",
            "gap-[var(--number-spacing-gap-gap-s)]",
            "p-[var(--number-spacing-padding-pad-m)]",
            "rounded-[var(--number-radius-rad-inner-card)]",
            "text-semibold-m text-[color:var(--colour-interface-text-default)]",
            "cursor-pointer transition-colors",
            "bg-[var(--colour-interface-background-singleTone-default)]",
            "hover:bg-[var(--colour-interface-background-singleTone-hover)]",
            "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--colour-interface-border-primary-focus)] focus-visible:bg-[var(--colour-interface-background-singleTone-focus)]",
            "active:bg-[var(--colour-interface-background-singleTone-active)]",
            className,
          )}
        >
          {userName}
          {open ? (
            <Icon
              icon={NavArrowUp}
              color="default"
              size="md"
              data-testid="chevron-up"
            />
          ) : (
            <Icon
              icon={NavArrowDown}
              color="default"
              size="md"
              data-testid="chevron-down"
            />
          )}
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content align="end" sideOffset={8}>
          <AccountSettingsDropdown
            userName={userName}
            avatarUrl={avatarUrl}
            roles={roles}
            onAccountInfoClick={() => {
              setOpen(false);
              onAccountInfoClick?.();
            }}
            onLogoutClick={() => {
              setOpen(false);
              onLogoutClick?.();
            }}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export {
  AccountSettingsItem,
  accountSettingsItemVariants,
  RolePill,
  rolePillVariants,
  AccountSettingsDropdown,
  AccountSettings,
};
