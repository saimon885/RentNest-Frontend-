import Link from "next/link";
import NavbarClient from "./NavbarClient";
import Logo from "./Logo";
import ActiveLink from "./ActiveLink";

type UserRole = "TENANT" | "LANDLORD" | "ADMIN";
export interface getMyProfile {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    isBanned: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export interface getMe {
  profile: getMyProfile;
}

export default function Navbar({ profile }: getMe) {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/properties", label: "Properties" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: RentNest Branding */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Center: Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <ActiveLink
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-[#0F4C81] dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                {link.label}
              </ActiveLink>
            ))}
          </div>

          {/* Right: Client Interactivity */}
          <NavbarClient user={profile} navLinks={navLinks} />
        </div>
      </div>
    </nav>
  );
}
