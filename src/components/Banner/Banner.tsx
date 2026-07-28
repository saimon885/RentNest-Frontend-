import React from "react";
import HeroBannerClient from "./HeroBannerClient";

export interface SlideData {
  id: number;
  welcomeText: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  buttonText: string;
  buttonLink: string;
  imageSrc: string;
}

const slides: SlideData[] = [
  {
    id: 1,
    welcomeText: "Welcome to rentNest",
    title: "Connect with Landlords",
    subtitle: "Build Lasting Relationships",
    description:
      "Direct communication with property owners. Get answers instantly and build trust before signing the lease.",
    tags: ["Direct Messaging", "Verified Owners", "Safe Transactions"],
    buttonText: "Browse Listings",
    buttonLink: "/properties",
    imageSrc:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    welcomeText: "Welcome to rentNest",
    title: "Hassle-Free Leasing",
    subtitle: "Simplified Rental Process",
    description:
      "Complete your rental journey online. From application to move-in, everything is streamlined for your convenience.",
    tags: ["Quick Application", "Instant Approval", "Move-in Ready"],
    buttonText: "Start Leasing",
    buttonLink: "/properties",
    imageSrc:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    welcomeText: "Welcome to rentNest",
    title: "Find Your Perfect Rental",
    subtitle: "Discover Premium Properties",
    description:
      "Browse thousands of verified listings from trusted landlords. Modern homes tailored to your lifestyle.",
    tags: ["Verified Listings", "24/7 Support", "Secure Booking"],
    buttonText: "Explore Properties",
    buttonLink: "/properties",
    imageSrc:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function Banner() {
  return (
    <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-slate-50 dark:bg-[#0a0f1d] py-8 lg:py-16 overflow-hidden transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-8 sm:px-9 lg:px-8">
        <HeroBannerClient slides={slides} />
      </div>
    </section>
  );
}
