import { getServerApiClient } from "@/lib/api-client";
import type { UserResponse } from "@/types/api";
import { unstable_rethrow } from "next/navigation";

async function fetchCurrentUser(): Promise<
  { user: UserResponse } | { error: string }
> {
  try {
    const api = await getServerApiClient();
    const { data: user } = await api.getCurrentUser();
    return { user };
  } catch (e) {
    unstable_rethrow(e);
    console.error("Failed to fetch current user:", e);
    return { error: "Failed to load user information." };
  }
}

export default async function Home() {
  const result = await fetchCurrentUser();

  if ("error" in result) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--colour-interface-surface-primary)]">
        <main className="flex w-full max-w-md flex-col items-center gap-[var(--number-spacing-gap-gap-m)] rounded-[var(--number-radius-rad-card)] border border-[var(--colour-interface-border-semantic-error-light)] bg-[var(--colour-interface-surface-base)] p-[var(--number-spacing-padding-pad-2xl)]">
          <p className="text-medium-m text-[color:var(--colour-interface-text-semantic-error)]">
            {result.error}
          </p>
        </main>
      </div>
    );
  }

  const { user } = result;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--colour-interface-surface-primary)]">
      <main className="flex w-full max-w-md flex-col gap-[var(--number-spacing-gap-gap-xl)] rounded-[var(--number-radius-rad-card)] border border-[var(--colour-interface-border-primary-light)] bg-[var(--colour-interface-surface-base)] p-[var(--number-spacing-padding-pad-2xl)]">
        <h1 className="text-heading-m text-[color:var(--colour-interface-text-heavy)]">
          {user.first_name} {user.last_name}
        </h1>

        <dl className="flex flex-col gap-[var(--number-spacing-gap-gap-m)]">
          <div className="flex flex-col gap-[var(--number-spacing-gap-gap-xs)]">
            <dt className="text-heading-eyebrow text-[color:var(--colour-interface-text-supporting)]">
              Email
            </dt>
            <dd className="text-medium-m text-[color:var(--colour-interface-text-default)]">
              {user.email}
            </dd>
          </div>

          <div className="flex flex-col gap-[var(--number-spacing-gap-gap-xs)]">
            <dt className="text-heading-eyebrow text-[color:var(--colour-interface-text-supporting)]">
              Roles
            </dt>
            <dd className="flex flex-wrap gap-[var(--number-spacing-gap-gap-xs)]">
              {user.roles.map((role) => (
                <span
                  key={role}
                  className="text-semibold-xs rounded-[var(--number-radius-rad-pill)] bg-[var(--colour-interface-background-secondary-default)] px-[var(--number-spacing-padding-pad-s)] py-[var(--number-spacing-padding-pad-xs)] text-[color:var(--colour-interface-text-default)]"
                >
                  {role}
                </span>
              ))}
            </dd>
          </div>

          <div className="flex flex-col gap-[var(--number-spacing-gap-gap-xs)]">
            <dt className="text-heading-eyebrow text-[color:var(--colour-interface-text-supporting)]">
              Status
            </dt>
            <dd className="text-medium-m text-[color:var(--colour-interface-text-default)]">
              {user.status}
            </dd>
          </div>
        </dl>
      </main>
    </div>
  );
}
