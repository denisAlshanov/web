"use client";

import type { ComponentType, SVGProps } from "react";
import Image from "next/image";
import { cva, type VariantProps } from "class-variance-authority";
import { User, LogOut } from "iconoir-react";

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
      style: {
        default: [
          "bg-[var(--colour-interface-background-singletone-default)]",
          "hover:bg-[var(--colour-interface-background-singletone-hover)]",
          "focus-visible:bg-[var(--colour-interface-background-singletone-focus)]",
          "active:bg-[var(--colour-interface-background-singletone-active)]",
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
      style: "default",
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
  style,
  className,
  children,
  ...props
}: AccountSettingsItemProps) {
  const iconColor = style === "danger" ? "danger" : "default";

  return (
    <button
      type="button"
      className={cn(accountSettingsItemVariants({ style }), className)}
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
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={userName}
            width={64}
            height={64}
            className="rounded-full object-cover"
          />
        ) : (
          <div
            aria-label={userName}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--colour-interface-background-singletone-hover)] text-heading-m text-[color:var(--colour-interface-text-default)]"
          >
            {userName.charAt(0).toUpperCase()}
          </div>
        )}
        <span className="font-bold text-lg leading-6 text-[color:var(--colour-interface-text-heavy)]">
          {userName}
        </span>
        <div className="flex gap-[var(--number-spacing-gap-gap-s)]">
          {roles.map((role) => (
            <RolePill key={role} role={role} />
          ))}
        </div>
      </div>

      {/* Menu section */}
      <div className="flex flex-col">
        <span className="text-heading-eyebrow text-[color:var(--colour-interface-text-supporting)] pb-1">
          SETTINGS
        </span>
        <div className="flex flex-col gap-[var(--number-spacing-gap-gap-s)]">
          <AccountSettingsItem
            icon={User}
            style="default"
            onClick={onAccountInfoClick}
          >
            Account Info
          </AccountSettingsItem>
          <AccountSettingsItem
            icon={LogOut}
            style="danger"
            onClick={onLogoutClick}
          >
            Log out
          </AccountSettingsItem>
        </div>
      </div>
    </div>
  );
}

export {
  AccountSettingsItem,
  accountSettingsItemVariants,
  RolePill,
  rolePillVariants,
  AccountSettingsDropdown,
};
