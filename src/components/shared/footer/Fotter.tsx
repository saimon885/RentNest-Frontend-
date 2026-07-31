"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Phone, Mail, Send } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { toast } from "sonner";
import Logo from "../navbar/Logo";

export const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    toast.success("Thank you for subscribing to RentNest updates!");
    setEmail("");
  };

  return (
    <footer className="bg-slate-950 text-slate-200 border-t border-slate-800 pt-16 pb-8">
      <div className="container mx-auto px-4 max-w-6xl space-y-12">
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info (2 columns on large screens) */}
          <div className="lg:col-span-2 space-y-4">
            <Logo></Logo>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              RentNest is Bangladeshs premier smart rental management platform
              connecting verified tenants with property owners seamlessly and
              securely.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary hover:border-primary transition-all"
              >
                <FaFacebook className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary hover:border-primary transition-all"
              >
                <FaInstagram className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary hover:border-primary transition-all"
              >
                <FaTwitter className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary hover:border-primary transition-all"
              >
                <FaLinkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link
                  href="/properties"
                  className="hover:text-primary transition-colors"
                >
                  Explore Properties
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  About RentNest
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/landlord/properties/create"
                  className="hover:text-primary transition-colors"
                >
                  List Your Property
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-primary transition-colors"
                >
                  Rental Blog & Advice
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Top Locations */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase">
              Popular Cities
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link
                  href="/properties?location=Gulshan"
                  className="hover:text-primary transition-colors"
                >
                  Apartments in Gulshan
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?location=Banani"
                  className="hover:text-primary transition-colors"
                >
                  Rentals in Banani
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?location=Dhanmondi"
                  className="hover:text-primary transition-colors"
                >
                  Flats in Dhanmondi
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?location=Uttara"
                  className="hover:text-primary transition-colors"
                >
                  Homes in Uttara
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?location=Chittagong"
                  className="hover:text-primary transition-colors"
                >
                  Properties in Chittagong
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase">
              Newsletter
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Subscribe to get the latest property alerts and market updates
              directly in your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-900 border-slate-800 text-slate-200 placeholder:text-slate-500 text-xs pr-10 focus-visible:ring-primary"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-1 top-1 bottom-1 h-7 w-7 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Send className="h-3.5 w-3.5" />
                </Button>
              </div>
            </form>

            <div className="pt-2 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-primary shrink-0" />
                <span>+880 1700-000000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-primary shrink-0" />
                <span>support@rentnest.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                <span>Banani C/A, Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800/80" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} RentNest Technologies Ltd. All rights
            reserved.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/privacy"
              className="hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-slate-300 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="hover:text-slate-300 transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
