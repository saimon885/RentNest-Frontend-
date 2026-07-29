import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GetMyProfile } from "@/services/GetMyProfie";
import {
  User,
  Mail,
  ShieldCheck,
  Calendar,
  Clock,
  Edit,
  CheckCircle2,
  Ban,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Editprofile from "../_components/profile/Editprofile";
export interface UserProfile {
  name: string;
  email: string;
  role: "TENANT" | "LANDLORD" | "ADMIN";
  isBanned: boolean;
  createdAt: string;
  updatedAt: string;
  avatarUrl?: string;
}

const Profile = async () => {
  // Fetching User Profile Data
  const response = await GetMyProfile();
  const user: UserProfile = response?.data;

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-slate-500 dark:text-slate-400">
          User profile not found.
        </p>
      </div>
    );
  }

  // Format Date Function
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header Card */}
        <Card className="overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-md">
          {/* Cover Banner */}
          <div className="h-32 sm:h-44 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 relative" />

          <CardContent className="relative px-6 pb-6 pt-0">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 sm:-mt-20 gap-4 mb-4">
              {/* Avatar & Basic Info */}
              <div className="flex items-end gap-4">
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 flex items-center justify-center shadow-lg overflow-hidden shrink-0">
                  {user.avatarUrl ? (
                    <Image
                      src={user.avatarUrl}
                      alt={user.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 sm:w-16 sm:h-16 text-slate-400" />
                  )}
                </div>

                <div className="mb-2">
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white capitalize">
                      {user.name}
                    </h1>
                    <Badge
                      variant="secondary"
                      className="capitalize bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-sky-300 font-semibold text-xs border border-blue-200 dark:border-blue-900"
                    >
                      {user.role.toLowerCase()}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="sm:mb-2">
                <Editprofile></Editprofile>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Account Information Card */}
          <Card className="border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600 dark:text-sky-400" />
                Account Overview
              </h2>

              <div className="space-y-3.5">
                {/* Full Name */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                    Full Name
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white capitalize">
                    {user.name}
                  </span>
                </div>

                {/* Email */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5">
                    <Mail className="h-4 w-4 text-slate-400" />
                    Email
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {user.email}
                  </span>
                </div>

                {/* Account Status */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-slate-400" />
                    Account Status
                  </span>
                  <div>
                    {user.isBanned ? (
                      <Badge variant="destructive" className="gap-1 text-xs">
                        <Ban className="h-3 w-3" /> Banned
                      </Badge>
                    ) : (
                      <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 gap-1 text-xs">
                        <CheckCircle2 className="h-3 w-3" /> Active
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity / System Info Card */}
          <Card className="border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600 dark:text-sky-400" />
                Activity Details
              </h2>

              <div className="space-y-3.5">
                {/* Joined Date */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    Joined Date
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {formatDate(user.createdAt)}
                  </span>
                </div>

                {/* Last Profile Update */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-slate-400" />
                    Last Updated
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {formatDate(user.updatedAt)}
                  </span>
                </div>

                {/* User Role */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                    User Role
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white uppercase tracking-wider text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                    {user.role}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
