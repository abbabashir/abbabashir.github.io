import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Expertise } from "@/components/Expertise";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { TechStack } from "@/components/TechStack";
import { Community } from "@/components/Community";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { IntroLoader } from "@/components/IntroLoader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bashir Aliyu — Full Stack & DevOps Engineer" },
      {
        name: "description",
        content:
          "Bashir Aliyu — Full Stack & DevOps engineer building production-grade web platforms, CI/CD pipelines, and secure cloud infrastructure.",
      },
      { property: "og:title", content: "Bashir Aliyu — Full Stack & DevOps Engineer" },
      {
        property: "og:description",
        content:
          "Full-stack engineering, shipped end-to-end. Web, APIs, cloud infrastructure, and CI/CD.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <IntroLoader />
      <SiteNav />
      <main>
        <Hero />
        <About />
        <Expertise />
        <Projects />
        <Experience />
        <TechStack />
        <Community />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
