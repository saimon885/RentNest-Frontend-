import React from "react";
import Image from "next/image";
import RegisterCard from "../_components/RegisterCard";

const Register = () => {
  return (
    <section className="min-h-screen w-full flex items-center justify-center p-4 my-8 lg:my-12 bg-slate-50/50 dark:bg-slate-950 transition-colors">
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Text & Image (Hidden on Mobile, Visible on PC) */}
        <div className="hidden lg:flex lg:col-span-6 flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/50 rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-sky-400 animate-pulse"></span>
              <span className="text-xs font-semibold text-blue-700 dark:text-sky-300">
                Join RentNest Community
              </span>
            </div>

            <h1 className="text-3xl xl:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
              Manage Properties & Find Homes Seamlessly
            </h1>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
              Whether you are a landlord looking to list verified properties or
              a tenant searching for your dream rental, RentNest connects you
              instantly.
            </p>
          </div>

          {/* Landlord / Rental Related Image Container */}
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 dark:border-slate-800">
            <Image
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop"
              alt="Landlord holding keys to property"
              fill
              priority
              className="object-cover object-center hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 1024px) 0vw, 500px"
            />
            {/* Subtle Overlay Badge */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 font-medium shadow-md">
              🏡 Direct Landlord-Tenant Connections & Verified Listings
            </div>
          </div>
        </div>

        {/* Right Side: Register Card Form (Full Width on Mobile, 6 Columns on PC) */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center">
          {/* Mobile Only Header */}
          <div className="text-center mb-6 lg:hidden space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Welcome to RentNest
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Create an account to start your rental journey.
            </p>
          </div>

          <RegisterCard />
        </div>
      </div>
    </section>
  );
};

export default Register;
