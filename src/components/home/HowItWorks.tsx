"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Search,
  MessageSquare,
  Key,
  Home,
  PlusCircle,
  UserCheck,
  Wallet,
} from "lucide-react";

export const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState<"tenant" | "landlord">("tenant");

  const tenantSteps = [
    {
      icon: Search,
      title: "Search Property",
      description:
        "Browse thousands of verified apartments and rooms with advanced filters.",
    },
    {
      icon: MessageSquare,
      title: "Contact Landlord",
      description:
        "Directly chat or schedule a physical/virtual visit with verified property owners.",
    },
    {
      icon: Wallet,
      title: "Book & Pay Rent",
      description:
        "Secure your rental instantly using trusted digital payment methods.",
    },
    {
      icon: Key,
      title: "Move In",
      description:
        "Receive digital agreement keys and move into your new home hassle-free.",
    },
  ];

  const landlordSteps = [
    {
      icon: PlusCircle,
      title: "Post Listing",
      description:
        "Upload high-quality images, set rental prices, and list amenities in minutes.",
    },
    {
      icon: UserCheck,
      title: "Verify Request",
      description:
        "Review tenant profiles, check credentials, and accept rental requests.",
    },
    {
      icon: Wallet,
      title: "Collect Rent Online",
      description:
        "Automate monthly rent collection directly into your bank or mobile wallet.",
    },
    {
      icon: Home,
      title: "Manage Effortlessly",
      description:
        "Track maintenance, leases, and tenant communication from one dashboard.",
    },
  ];

  const currentSteps = activeTab === "tenant" ? tenantSteps : landlordSteps;

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-3xl font-bold tracking-tight">
            How RentNest Works
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
            Simple, transparent, and hassle-free rental process designed for
            both tenants and landlords.
          </p>
          <div className="flex justify-center gap-2 pt-4">
            <Button
              variant={activeTab === "tenant" ? "default" : "outline"}
              onClick={() => setActiveTab("tenant")}
              className="rounded-full px-6 transition-all"
            >
              For Tenants
            </Button>
            <Button
              variant={activeTab === "landlord" ? "default" : "outline"}
              onClick={() => setActiveTab("landlord")}
              className="rounded-full px-6 transition-all"
            >
              For Landlords
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card
                key={index}
                className="border-border/60 relative overflow-hidden transition-all hover:shadow-md"
              >
                <CardContent className="pt-6 text-center space-y-4">
                  <div className="absolute top-3 right-4 text-xs font-bold text-muted-foreground/30">
                    0{index + 1}
                  </div>
                  <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg">{step.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
