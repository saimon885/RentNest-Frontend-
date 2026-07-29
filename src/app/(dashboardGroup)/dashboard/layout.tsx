import { GetMyProfile } from "@/services/GetMyProfie";
import { DashboardShell } from "./_components/dashboard-client";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const getUser = await GetMyProfile();
  const userRole = getUser?.data?.role;

  return <DashboardShell role={userRole}>{children}</DashboardShell>;
}
