import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Building2,
  ShieldCheck,
  Users,
  Sparkles,
  Target,
  Eye,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";


const stats = [
  { label: "Active Listings", value: "2,500+" },
  { label: "Verified Landlords", value: "850+" },
  { label: "Happy Tenants", value: "10,000+" },
  { label: "Cities Covered", value: "12+" },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Trust & Transparency",
    description:
      "Every property listing and user profile goes through verification to ensure a fraud-free experience.",
  },
  {
    icon: Users,
    title: "Tenant-First Approach",
    description:
      "We simplify search filters, zero hidden fees, and offer hassle-free online communication.",
  },
  {
    icon: Sparkles,
    title: "Smart Automation",
    description:
      "Automated lease agreements, online rent tracking, and instant maintenance requests.",
  },
];

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 1. Hero Banner */}
      <section className="relative bg-muted/40 py-20 border-b border-border/50">
        <div className="container mx-auto px-4 max-w-6xl text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
            <Building2 className="h-3.5 w-3.5" />
            <span>Redefining Housing Rentals</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
            Simplifying How You Rent Homes in{" "}
            <span className="text-primary">Bangladesh</span>
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            RentNest is built on a simple mission: eliminating traditional
            brokerage hassles and creating a secure, seamless digital ecosystem
            for tenants and property owners.
          </p>
        </div>
      </section>

      {/* 2. Stats Section */}
      <section className="py-12 bg-background border-b border-border/40">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center space-y-1">
                <h3 className="text-3xl sm:text-4xl font-extrabold text-primary">
                  {stat.value}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 max-w-6xl space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                <Target className="h-4 w-4" />
                <span>Our Mission</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight">
                Empowering Everyone with Transparent Rental Solutions
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Finding a house shouldnt require paying unnecessary agent fees
                or dealing with fake property posts. RentNest connects landlords
                and tenants directly using smart technology, verified
                identities, and automated agreements.
              </p>
              <ul className="space-y-3 text-sm text-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span>100% Verified Property Listings</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span>Direct Communication with Property Owners</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span>Digital Rental Agreements & Receipts</span>
                </li>
              </ul>
            </div>

            <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden border border-border shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1000&q=80"
                alt="RentNest Real Estate Team"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Values */}
      <section className="py-16 bg-muted/30 border-y border-border/50">
        <div className="container mx-auto px-4 max-w-6xl space-y-12">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight">
              Why Choose RentNest?
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Built with precision to provide the best rental experience in
              Bangladesh.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Card
                  key={idx}
                  className="border-border/60 bg-background shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardContent className="pt-6 space-y-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Call to Action Banner */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="rounded-3xl bg-primary text-primary-foreground p-8 sm:p-12 text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Find Your Next Dream Home?
            </h2>
            <p className="text-primary-foreground/80 text-sm sm:text-base max-w-xl mx-auto">
              Browse through hundreds of verified apartments or list your
              property today with zero commission.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link href="/properties">
                <Button
                  size="lg"
                  variant="secondary"
                  className="font-semibold gap-2"
                >
                  <span>Explore Properties</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/dashboard/landlord/properties/create">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white/30 text-white hover:bg-white/10"
                >
                  <span>Post Your Property</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
