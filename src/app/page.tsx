import { AppLayout } from "@/components/layout/app-layout";
import { EmptyState } from "@/components/ui/empty-state";

export default function Home() {
  return (
    <AppLayout heading="Home" activeNavItem="home">
      <EmptyState
        heading="Nothing to see here (yet)."
        description="Come back later to check if there's someone new!"
      />
    </AppLayout>
  );
}
