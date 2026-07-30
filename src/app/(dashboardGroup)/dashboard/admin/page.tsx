import { cookies } from "next/headers";
import React from "react";
import {
  Users,
  Building,
  Grid,
  FileCheck2,
  Star,
  Wallet,
  UserCheck,
  ShieldAlert,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminOverview = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${process.env.SERVER_API_URL}/api/admin/states`, {
    headers: {
      Authorization: `${accessToken}`,
    },
    cache: "no-store",
  });

  const result = await res.json();
  const states = result?.data || {};

  const stats = [
    {
      title: "Total Revenue",
      value: `৳${(states?.totalAmount || 0).toLocaleString()}`,
      description: "Lifetime total earnings",
      icon: Wallet,
      color: "text-emerald-500 bg-emerald-500/10",
    },
    {
      title: "Total Users",
      value: states?.totalUsers || 0,
      description: `${states?.TotalTenant || 0} Tenants, ${states?.TotalLandLord || 0} Landlords`,
      icon: Users,
      color: "text-blue-500 bg-blue-500/10",
    },
    {
      title: "Total Properties",
      value: states?.totalProperty || 0,
      description: `Across ${states?.totalCategory || 0} categories`,
      icon: Building,
      color: "text-purple-500 bg-purple-500/10",
    },
    {
      title: "Rental Requests",
      value: states?.totalRentalRequest || 0,
      description: `${states?.completedRentalRequest || 0} completed successfully`,
      icon: FileCheck2,
      color: "text-amber-500 bg-amber-500/10",
    },
  ];

  const userDistribution = [
    {
      label: "Tenants",
      count: states?.TotalTenant || 0,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      label: "Landlords",
      count: states?.TotalLandLord || 0,
      icon: UserCheck,
      color: "bg-purple-500",
    },
    {
      label: "Admins",
      count: states?.TotalAdmin || 0,
      icon: ShieldAlert,
      color: "bg-rose-500",
    },
  ];

  const rentalStatus = [
    {
      label: "Completed",
      count: states?.completedRentalRequest || 0,
      icon: CheckCircle2,
      color: "text-emerald-500",
    },
    {
      label: "Approved",
      count: states?.approvedRentalRequest || 0,
      icon: FileCheck2,
      color: "text-blue-500",
    },
    {
      label: "Pending",
      count: states?.pendingRentalRequest || 0,
      icon: Clock,
      color: "text-amber-500",
    },
  ];

  return (
    <div className="space-y-6 p-2 md:p-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Admin Overview
        </h1>
        <p className="text-sm text-muted-foreground">
          Real-time updates and platform performance metrics.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card key={index} className="border-border/50 shadow-xs">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {item.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${item.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tracking-tight">
                  {item.value}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/50 shadow-xs">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              User Demographics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {userDistribution.map((user, index) => {
              const percentage = states?.totalUsers
                ? Math.round((user.count / states.totalUsers) * 100)
                : 0;
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <user.icon className="h-4 w-4 text-muted-foreground" />
                      <span>{user.label}</span>
                    </div>
                    <span className="text-muted-foreground">
                      {user.count} ({percentage}%)
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full ${user.color} transition-all duration-300`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-xs">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Rental Request Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {rentalStatus.map((status, index) => {
                const Icon = status.icon;
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center rounded-xl border border-border/40 bg-muted/20 p-4 text-center"
                  >
                    <Icon className={`h-6 w-6 mb-2 ${status.color}`} />
                    <span className="text-xl font-bold">{status.count}</span>
                    <span className="text-xs text-muted-foreground mt-1">
                      {status.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-border/40 grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-xs text-muted-foreground">
                  Total Categories
                </p>
                <div className="flex items-center justify-center gap-1.5 mt-1 font-semibold text-lg">
                  <Grid className="h-4 w-4 text-primary" />
                  {states?.totalCategory || 0}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  Platform Reviews
                </p>
                <div className="flex items-center justify-center gap-1.5 mt-1 font-semibold text-lg">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  {states?.totalReview || 0}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverview;
