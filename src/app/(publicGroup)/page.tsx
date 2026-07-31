import HeroBanner from "@/components/Banner/Banner";
import HomeProperties from "@/components/home/HomeProperties";
import { HowItWorks } from "@/components/home/HowItWorks";
import { LandlordCTA } from "@/components/home/LandlordCTA";
import { PopularLocations } from "@/components/home/PopularLocations";

export default function Home() {
  return (
    <div className="min-h-[100vh]">
      <section>
        <HeroBanner></HeroBanner>
      </section>
      <main>
        <HomeProperties></HomeProperties>
      </main>
      <section>
        <HowItWorks></HowItWorks>
      </section>
      <section>
        <PopularLocations></PopularLocations>
      </section>
      <section>
        <LandlordCTA></LandlordCTA>
      </section>
    </div>
  );
}
