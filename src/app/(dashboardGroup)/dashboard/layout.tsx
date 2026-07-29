import React from "react";
import { DashboardShell } from "./_components/dashboard-client";

export const metadata = {
  title: "Dashboard | Acme",
  description: "Management portal and user dashboard",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardShell>{children}</DashboardShell>;
}
