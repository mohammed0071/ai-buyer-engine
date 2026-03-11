import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import WhatIsNuGen from "@/components/WhatIsNuGen";
import HowItWorks from "@/components/HowItWorks";
import Diagnostics from "@/components/Diagnostics";
import Pricing from "@/components/Pricing";
import PerformanceLabs from "@/components/PerformanceLabs";
import FAQ from "@/components/FAQ";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <TrustBadges />
      <WhatIsNuGen />
      <HowItWorks />
      <Diagnostics />
      <Pricing />
      <PerformanceLabs />
      <FAQ />
      <Waitlist />
      <Footer />
    </main>
  );
}
