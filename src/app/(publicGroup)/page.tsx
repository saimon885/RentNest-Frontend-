import HeroBanner from "@/components/Banner/Banner";
import HomeProperties from "@/components/home/HomeProperties";

export default function Home() {
  return (
    <div className="min-h-[100vh]">
      <section>
        <HeroBanner></HeroBanner>
      </section>
      <main>
        <HomeProperties></HomeProperties>
      </main>
    </div>
  );
}
