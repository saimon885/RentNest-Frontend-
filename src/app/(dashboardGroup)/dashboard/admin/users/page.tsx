import { cookies } from "next/headers";
import React from "react";
import { UserCheck, ShieldAlert, Ban, CheckCircle2, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type User = {
  id?: string;
  name: string;
  email: string;
  role: "ADMIN" | "LANDLORD" | "TENANT" | string;
  isBanned: boolean;
  createdAt: string;
  updatedAt: string;
};

const AllUsers = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${process.env.SERVER_API_URL}/api/admin/users`, {
    headers: {
      Authorization: `${accessToken}`,
    },
    cache: "no-store",
  });

  const result = await res.json();
  const users: User[] = result?.data || [];

  const totalUsers = users.length;
  const bannedUsers = users.filter((u) => u.isBanned).length;

  return (
    <div className="space-y-6 p-2 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            User Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage system users, roles, and account statuses.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="border-border/50 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Users
            </CardTitle>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
              <UserCheck className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Accounts
            </CardTitle>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers - bannedUsers}</div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Banned Accounts
            </CardTitle>
            <div className="p-2 rounded-lg bg-destructive/10 text-destructive">
              <UserX className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bannedUsers}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 shadow-xs overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead>User Details</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined Date</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length > 0 ? (
                  users.map((item) => {
                    const userId = item.id;
                    const formattedDate = new Date(
                      item.createdAt,
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });

                    return (
                      <TableRow key={userId} className="hover:bg-muted/20">
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-semibold text-foreground">
                              {item.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {item.email}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              item.role === "ADMIN"
                                ? "border-rose-500/30 bg-rose-500/10 text-rose-500 font-semibold"
                                : item.role === "LANDLORD"
                                  ? "border-purple-500/30 bg-purple-500/10 text-purple-500 font-semibold"
                                  : "border-blue-500/30 bg-blue-500/10 text-blue-500 font-semibold"
                            }
                          >
                            {item.role}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          {item.isBanned ? (
                            <Badge variant="destructive" className="gap-1">
                              <Ban className="h-3 w-3" /> Banned
                            </Badge>
                          ) : (
                            <Badge
                              variant="secondary"
                              className="gap-1 bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                            >
                              <CheckCircle2 className="h-3 w-3" /> Active
                            </Badge>
                          )}
                        </TableCell>

                        <TableCell className="text-sm text-muted-foreground">
                          {formattedDate}
                        </TableCell>

                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            variant={item.isBanned ? "outline" : "destructive"}
                            className="h-8 text-xs font-medium cursor-pointer"
                          >
                            {item.isBanned ? (
                              <>
                                <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                                Unban
                              </>
                            ) : (
                              <>
                                <Ban className="mr-1 h-3.5 w-3.5" />
                                Ban
                              </>
                            )}
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-32 text-center text-muted-foreground"
                    >
                      No users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AllUsers;
