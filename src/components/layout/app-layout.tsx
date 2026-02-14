"use client";

import { useSession, signOut } from "next-auth/react";

import { SideNavbar, type NavItemId } from "@/components/layout/side-navbar";
import { PageHeader } from "@/components/layout/page-header";
import { AccountSettings } from "@/components/ui/account-settings";

export interface AppLayoutProps {
  heading: string;
  activeNavItem?: NavItemId;
  children: React.ReactNode;
}

export function AppLayout({
  heading,
  activeNavItem = "home",
  children,
}: AppLayoutProps) {
  const { data: session, status } = useSession();

  const userName = session?.user?.name ?? "";
  const avatarUrl = session?.user?.image ?? undefined;
  const knownRoles = ["host", "producer"] as const;
  const roles = (session?.backendUser?.roles ?? []).filter(
    (r): r is "host" | "producer" =>
      knownRoles.includes(r as "host" | "producer"),
  );

  return (
    <div className="relative flex h-screen">
      <div className="w-[120px] shrink-0" aria-hidden="true" data-testid="sidebar-spacer" />
      <SideNavbar activeItem={activeNavItem} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader
          heading={heading}
          tabbedView={false}
          accountSettings={
            status === "loading" ? null : (
              <AccountSettings
                userName={userName}
                avatarUrl={avatarUrl}
                roles={roles}
                onLogoutClick={() => void signOut()}
              />
            )
          }
        />
        <main className="flex flex-1 items-center justify-center overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
