import { useEffect } from "react";
import { useLocation } from "react-router";
import { Conditions } from "@/components/focus/Conditions";
import { Hero } from "@/components/focus/Hero";
import { Hypothesis } from "@/components/focus/Hypothesis";
import { Method } from "@/components/focus/Method";
import { PrototypePreview } from "@/components/focus/PrototypePreview";
import { ResearchQuestion } from "@/components/focus/ResearchQuestion";
import { SiteFooter } from "@/components/focus/SiteFooter";
import { SiteNav } from "@/components/focus/SiteNav";
import { StartExperiment } from "@/components/focus/StartExperiment";

/**
 * Study overview: the research introduction, ending in the call to start the
 * task. Arriving from another route with a `#hash` scrolls to that section
 * (CSS smooth scrolling respects `prefers-reduced-motion`); otherwise the
 * page starts at the top.
 */
export default function Landing() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash]);

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <ResearchQuestion />
        <Hypothesis />
        <Conditions />
        <Method />
        <PrototypePreview />
        <StartExperiment />
      </main>
      <SiteFooter />
    </div>
  );
}
