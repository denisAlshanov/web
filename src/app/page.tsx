import { getServerApiClient, ApiError } from "@/lib/api-client";
import type { UserResponse } from "@/types/api";

async function fetchCurrentUser(): Promise<
  { user: UserResponse } | { error: string }
> {
  try {
    const api = await getServerApiClient();
    const { data: user } = await api.getCurrentUser();
    return { user };
  } catch (e) {
    const message =
      e instanceof ApiError ? e.message : "Failed to load user information.";
    return { error: message };
  }
}

export default async function Home() {
  const result = await fetchCurrentUser();

  if ("error" in result) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ backgroundColor: "var(--colour-interface-surface-primary)" }}
      >
        <main
          className="flex w-full max-w-md flex-col items-center gap-[var(--number-spacing-gap-gap-m)] p-[var(--number-spacing-padding-pad-2xl)]"
          style={{
            backgroundColor: "var(--colour-interface-surface-base)",
            borderRadius: "var(--number-radius-rad-card)",
            border:
              "1px solid var(--colour-interface-border-semantic-error-light)",
          }}
        >
          <p
            className="text-medium-m"
            style={{ color: "var(--colour-interface-text-semantic-error)" }}
          >
            {result.error}
          </p>
        </main>
      </div>
    );
  }

  const { user } = result;

  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ backgroundColor: "var(--colour-interface-surface-primary)" }}
    >
      <main
        className="flex w-full max-w-md flex-col gap-[var(--number-spacing-gap-gap-xl)] p-[var(--number-spacing-padding-pad-2xl)]"
        style={{
          backgroundColor: "var(--colour-interface-surface-base)",
          borderRadius: "var(--number-radius-rad-card)",
          border: "1px solid var(--colour-interface-border-primary-light)",
        }}
      >
        <h1
          className="text-heading-m"
          style={{ color: "var(--colour-interface-text-heavy)" }}
        >
          {user.first_name} {user.last_name}
        </h1>

        <dl className="flex flex-col gap-[var(--number-spacing-gap-gap-m)]">
          <div className="flex flex-col gap-[var(--number-spacing-gap-gap-xs)]">
            <dt
              className="text-heading-eyebrow"
              style={{ color: "var(--colour-interface-text-supporting)" }}
            >
              Email
            </dt>
            <dd
              className="text-medium-m"
              style={{ color: "var(--colour-interface-text-default)" }}
            >
              {user.email}
            </dd>
          </div>

          <div className="flex flex-col gap-[var(--number-spacing-gap-gap-xs)]">
            <dt
              className="text-heading-eyebrow"
              style={{ color: "var(--colour-interface-text-supporting)" }}
            >
              Roles
            </dt>
            <dd className="flex flex-wrap gap-[var(--number-spacing-gap-gap-xs)]">
              {user.roles.map((role) => (
                <span
                  key={role}
                  className="text-semibold-xs"
                  style={{
                    backgroundColor:
                      "var(--colour-interface-background-secondary-default)",
                    color: "var(--colour-interface-text-default)",
                    padding:
                      "var(--number-spacing-padding-pad-xs) var(--number-spacing-padding-pad-s)",
                    borderRadius: "var(--number-radius-rad-pill)",
                  }}
                >
                  {role}
                </span>
              ))}
            </dd>
          </div>

          <div className="flex flex-col gap-[var(--number-spacing-gap-gap-xs)]">
            <dt
              className="text-heading-eyebrow"
              style={{ color: "var(--colour-interface-text-supporting)" }}
            >
              Status
            </dt>
            <dd
              className="text-medium-m"
              style={{ color: "var(--colour-interface-text-default)" }}
            >
              {user.status}
            </dd>
          </div>
        </dl>
      </main>
    </div>
  );
}
