import { GetMyProfile } from "@/services/GetMyProfie";
import { DashboardShell } from "./_components/dashboard-client";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const getUser = await GetMyProfile();
  const userRole = getUser?.data?.role;

  return (
    <DashboardShell role={userRole}>
      <main className="w-full max-w-full min-w-0 flex-1 overflow-x-hidden">
        {children}
      </main>
    </DashboardShell>
  );
}
