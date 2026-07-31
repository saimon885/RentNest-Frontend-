"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Building,
  CreditCard,
  Settings,
  Menu,
  UserCheck,
  FilePlusCorner,
  SavePlus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

import { cn } from "@/lib/utils";
import Logo from "@/components/shared/navbar/Logo";

export type UserRole = "TENANT" | "LANDLORD" | "ADMIN" | string;

export type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
};

export const TENANT_NAV_ITEMS: NavItem[] = [
  { label: "Overview", href: "/dashboard/tenant", icon: LayoutDashboard },
];

export const LANDLORD_NAV_ITEMS: NavItem[] = [
  { label: "Overview", href: "/dashboard/landlord", icon: LayoutDashboard },
  {
    label: "Rental Requests",
    href: "/dashboard/landlord/requests",
    icon: UserCheck,
  },
  {
    label: "Category",
    href: "/dashboard/landlord/category",
    icon: SavePlus,
  },
  {
    label: "New Properties",
    href: "/dashboard/landlord/properties",
    icon: FilePlusCorner,
  },
];

export const ADMIN_NAV_ITEMS: NavItem[] = [
  { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
  { label: "Manage Users", href: "/dashboard/admin/users", icon: Users },
  {
    label: "All Properties",
    href: "/dashboard/admin/properties",
    icon: Building,
  },
];

const NAV_BY_ROLE: Record<string, NavItem[]> = {
  TENANT: TENANT_NAV_ITEMS,
  LANDLORD: LANDLORD_NAV_ITEMS,
  ADMIN: ADMIN_NAV_ITEMS,
};

const getNavItemsByRole = (role?: string): NavItem[] => {
  if (!role) return [];
  const normalizedRole = role.toUpperCase();
  return NAV_BY_ROLE[normalizedRole] || [];
};

export function NavLink({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      <Icon
        className={cn(
          "h-4 w-4 shrink-0",
          isActive
            ? "text-primary"
            : "text-muted-foreground group-hover:text-foreground",
        )}
      />
      <span className="flex-1 truncate">{item.label}</span>
      {item.badge ? (
        <Badge
          variant="secondary"
          className="h-5 px-1.5 text-[11px] font-semibold"
        >
          {item.badge}
        </Badge>
      ) : null}
    </Link>
  );
}

export function SidebarContent({
  role,
  onNavigate,
}: {
  role?: UserRole;
  onNavigate?: () => void;
}) {
  const navItems = getNavItemsByRole(role);

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center px-4 shrink-0">
        <Logo />
      </div>

      <Separator />

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="flex flex-col gap-1">
          <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Menu
          </p>
          {navItems.length > 0 ? (
            navItems.map((item) => (
              <NavLink key={item.href} item={item} onNavigate={onNavigate} />
            ))
          ) : (
            <p className="px-3 py-2 text-xs text-muted-foreground">
              No menu items available
            </p>
          )}
        </nav>
      </ScrollArea>
    </div>
  );
}

export function Header({
  role,
  onOpenMobileNav,
}: {
  role?: UserRole;
  onOpenMobileNav: () => void;
}) {
  const normalizedRole = role ? role.toUpperCase() : "";
  const roleTitle = normalizedRole
    ? normalizedRole.charAt(0) + normalizedRole.slice(1).toLowerCase()
    : "";

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 w-full items-center gap-3 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onOpenMobileNav}
        aria-label="Open navigation menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      <div className="flex items-center gap-2">
        <h2 className="text-base font-semibold capitalize tracking-tight text-foreground sm:text-lg">
          {roleTitle ? `${roleTitle} Dashboard` : "Dashboard"}
        </h2>
      </div>

      <div className="flex-1" />
    </header>
  );
}

export function DashboardShell({
  children,
  role,
}: {
  children: React.ReactNode;
  role?: UserRole;
}) {
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

  return (
    <div className="relative flex min-h-screen w-full max-w-full overflow-x-hidden bg-muted/20">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r bg-background lg:block">
        <div className="sticky top-0 h-screen w-64">
          <SidebarContent role={role} />
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <SheetTitle className="sr-only">Navigation menu</SheetTitle>
          <SidebarContent
            role={role}
            onNavigate={() => setMobileNavOpen(false)}
          />
        </SheetContent>
      </Sheet>

      {/* Main Content Area */}
      <div className="flex min-h-screen flex-1 flex-col w-full max-w-full min-w-0 overflow-x-hidden">
        <Header role={role} onOpenMobileNav={() => setMobileNavOpen(true)} />
        <main className="flex-1 p-3 md:p-6 w-full max-w-full min-w-0 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
