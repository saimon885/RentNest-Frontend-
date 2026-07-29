"use client";

import React, { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail, User, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { startTransition } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RegisterAction from "../_actions/RegisterAction";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export default function RegisterCard() {
  const [state, formAction, isPending] = useActionState(RegisterAction, null);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message || "Register successful");
      startTransition(() => {
        setFormData({
          name: "",
          email: "",
          password: "",
          role: "",
        });
      });
      redirect("/login");
    }
    if (!state.success) {
      toast.error(state.message || "Register Failed");
    }
  }, [state]);

  return (
    <Card className="w-full max-w-md shadow-xl border-slate-200/80 dark:border-slate-800">
      <CardHeader className="space-y-1 pb-4 text-center">
        <CardTitle className="text-xl font-semibold tracking-tight">
          Register
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form action={formAction} className="space-y-4">
          {state?.success === false && (
            <div className="p-3 text-sm font-medium text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
              {state.message}
            </div>
          )}

          {state?.success === true && (
            <div className="p-3 text-sm font-medium text-green-600 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-md">
              {state.message}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                name="name"
                placeholder="your name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2 text-sm bg-transparent border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-sky-400 transition"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="email"
                name="email"
                placeholder="your email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2 text-sm bg-transparent border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-sky-400 transition"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-9 pr-10 py-2 text-sm bg-transparent border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-sky-400 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
              Register As
            </label>
            <div className="relative">
              <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              <select
                name="role"
                required
                value={formData.role}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2 text-sm bg-transparent border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-sky-400 transition cursor-pointer appearance-none text-slate-900 dark:text-slate-100"
              >
                <option
                  value=""
                  disabled
                  className="text-slate-400 dark:bg-slate-900"
                >
                  Select your role
                </option>
                <option value="TENANT" className="dark:bg-slate-900">
                  Tenant
                </option>
                <option value="LANDLORD" className="dark:bg-slate-900">
                  Landlord
                </option>
              </select>
            </div>
          </div>

          <Button type="submit" disabled={isPending} className="w-full mt-2">
            {isPending ? "Registering..." : "Register"}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center border-t border-slate-100 dark:border-slate-800 pt-4">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 dark:text-sky-400 font-semibold hover:underline"
          >
            Log in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
