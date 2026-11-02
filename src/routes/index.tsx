import { createFileRoute } from "@tanstack/react-router";
import {
  Header,
  Hero,
  Work,
  About,
  Experience,
  Skills,
  Contact,
  Footer,
} from "@/components/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Irham Ghoffar Muzakki — Portfolio" },
      {
        name: "description",
        content:
          "Portofolio Irham Ghoffar Muzakki — Fresh Graduate Informatika (IPK 3,59, Cum Laude), Full-Stack Web Developer, Data Science & Machine Learning. Semarang, Indonesia.",
      },
      { property: "og:title", content: "Irham Ghoffar Muzakki — Portfolio" },
      {
        property: "og:description",
        content:
          "Building digital experiences — Fresh Graduate Informatika, Full-Stack Web Developer, Data Science & Machine Learning.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="grain" aria-hidden="true" />
      <Header />
      <main>
        <Hero />
        <Work />
        <About />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
