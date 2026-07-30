"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  User,
  LogOut,
  Settings,
  HelpCircle,
  Bell,
  Menu,
  X,
  LayoutDashboard,
} from "lucide-react";
import ActiveLink from "./ActiveLink";
import { getMe, getMyProfile } from "./Navbar";
import { Button } from "@/components/ui/button";
import { LogOutUser } from "@/services/LogOut";
import { toast } from "sonner";

interface NavLink {
  href: string;
  label: string;
}

interface NavbarClientProps {
  user: getMyProfile;
  navLinks: NavLink[];
}

export default function NavbarClient({ user, navLinks }: NavbarClientProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogOut = async () => {
    await LogOutUser();
    toast.success("LogOut successfull.");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Right: Actions & Dropdown */}
      <div className="flex items-center gap-4">
        {/* User Dropdown */}
        {user?.success === true ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0F4C81] dark:bg-sky-500 text-white hover:bg-[#0A365C] dark:hover:bg-sky-600 hover:shadow-md transition"
            >
              <User size={20} />
            </button>

            {/* Dropdown Menu (Theme Aware) */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1 z-50 transition-all">
                <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {user?.data.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {user?.data.email}
                  </p>
                </div>

                <Link
                  href="/profile"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition"
                >
                  <User size={16} />
                  <span>My Profile</span>
                </Link>

                <Link
                  href={
                    user?.data?.role === "TENANT"
                      ? "/dashboard/tenant"
                      : user?.data?.role === "LANDLORD"
                        ? "/dashboard/landlord"
                        : user?.data?.role === "ADMIN"
                          ? "/dashboard/admin"
                          : "/"
                  }
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition"
                >
                  <LayoutDashboard size={16} />
                  <span>Dashboard</span>
                </Link>

                <Link
                  href="/help"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition"
                >
                  <HelpCircle size={16} />
                  <span>Help & Support</span>
                </Link>

                <div
                  onClick={() => handleLogOut()}
                  className="border-t border-slate-100 dark:border-slate-700 mt-1"
                >
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      // Logout logic
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link href="/login">
            <Button className="border-slate-300 dark:border-slate-700  font-medium px-6 rounded-lg transition-colors">
              Log In
            </Button>
          </Link>
        )}

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-[#0F4C81] dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Links (Theme Aware) */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3 space-y-1 shadow-lg z-40">
          {navLinks.map((link) => (
            <ActiveLink
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:text-[#0F4C81] dark:hover:text-sky-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              {link.label}
            </ActiveLink>
          ))}
        </div>
      )}
    </>
  );
}
