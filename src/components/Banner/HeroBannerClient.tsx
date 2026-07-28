"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { SlideData } from "./Banner";

interface HeroBannerClientProps {
  slides: SlideData[];
}

export default function HeroBannerClient({ slides }: HeroBannerClientProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  const toggleAutoplay = () => {
    if (!swiperRef.current) return;
    if (isAutoplay) {
      swiperRef.current.autoplay.stop();
      setIsAutoplay(false);
    } else {
      swiperRef.current.autoplay.start();
      setIsAutoplay(true);
    }
  };

  return (
    <div className="relative">
      {/* Autoplay Toggle Button */}
      <div className="flex justify-end mb-3  lg:absolute lg:-top-10 lg:right-0 lg:mb-0 z-30">
        <button
          onClick={toggleAutoplay}
          className="px-3 md:my-1.5 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-full shadow-sm hover:bg-white dark:hover:bg-slate-900 transition-all cursor-pointer"
        >
          Autoplay:{" "}
          <span
            className={
              isAutoplay
                ? "text-emerald-600 dark:text-emerald-400 font-bold"
                : "text-slate-400"
            }
          >
            {isAutoplay ? "ON" : "OFF"}
          </span>
        </button>
      </div>

      <Swiper
        modules={[Autoplay, EffectFade, Navigation]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={600}
        loop={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          swiper.autoplay.stop();
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center min-h-[460px] pb-4">
              {/* Image Box */}
              <div className="order-1 lg:order-2 lg:col-span-5 relative flex justify-center items-center w-full px-2 sm:px-0">
                <div className="relative w-full max-w-full sm:max-w-[440px] aspect-[4/3] sm:aspect-[1/1] rounded-2xl bg-white dark:bg-slate-900 p-2 shadow-xl border border-slate-200/60 dark:border-slate-800">
                  {/* Main Image */}
                  <div className="relative w-full h-full rounded-xl overflow-hidden">
                    <Image
                      src={slide.imageSrc}
                      alt={slide.title}
                      fill
                      priority={slide.id === 1}
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 440px"
                    />
                  </div>

                  {/* Top Right Badge */}
                  <div className="absolute top-2 right-2 sm:top-4 sm:-right-5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 rounded-xl shadow-lg border border-slate-100 dark:border-slate-800 flex items-center gap-2 z-20">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-purple-100 dark:bg-purple-950/60 flex items-center justify-center text-purple-600 dark:text-purple-400">
                      <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] sm:text-xs font-bold text-slate-900 dark:text-white leading-tight">
                        10K+
                      </p>
                      <p className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                        Happy Renters
                      </p>
                    </div>
                  </div>

                  {/* Bottom Left Badge */}
                  <div className="absolute bottom-2 left-2 sm:-bottom-3 sm:-left-5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 rounded-xl shadow-lg border border-slate-100 dark:border-slate-800 flex items-center gap-2 z-20">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-blue-100 dark:bg-sky-950/60 flex items-center justify-center text-blue-600 dark:text-sky-400">
                      <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] sm:text-xs font-bold text-slate-900 dark:text-white leading-tight">
                        5000+
                      </p>
                      <p className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                        Properties Listed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="order-2 lg:order-1 lg:col-span-7 space-y-3 sm:space-y-6 px-1 sm:px-0">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/50 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-sky-400 animate-pulse"></span>
                  <span className="text-xs sm:text-sm font-semibold text-blue-700 dark:text-sky-300 tracking-wide">
                    {slide.welcomeText}
                  </span>
                </div>

                {/* Headings */}
                <div className="space-y-1 sm:space-y-2">
                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight leading-[1.2]">
                    {slide.title}
                  </h1>
                  <h2 className="text-base sm:text-xl font-semibold text-blue-600 dark:text-sky-400">
                    {slide.subtitle}
                  </h2>
                </div>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                  {slide.description}
                </p>

                {/* Feature Tags */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 pt-1">
                  {slide.tags.map((tag, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-sky-400"></span>
                      <span>{tag}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="pt-2">
                  <Link
                    href={slide.buttonLink}
                    className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-medium text-sm sm:text-base rounded-lg shadow-md shadow-blue-500/20 transition-all duration-200 active:scale-95"
                  >
                    {slide.buttonText}
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation & Pagination */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200/60 dark:border-slate-800/80 mt-2 sm:mt-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => swiperRef.current?.slideToLoop(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === idx
                    ? "w-7 bg-blue-600 dark:bg-sky-400"
                    : "w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 ml-1">
            {activeIndex + 1} / {slides.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous Slide"
            className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm cursor-pointer active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next Slide"
            className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm cursor-pointer active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
