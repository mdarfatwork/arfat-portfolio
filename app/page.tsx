import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";

const About = dynamic(() =>
  import("@/components/sections/About").then((m) => ({ default: m.About })),
);
const Skills = dynamic(() =>
  import("@/components/sections/Skills").then((m) => ({ default: m.Skills })),
);
const Experience = dynamic(() =>
  import("@/components/sections/Experience").then((m) => ({
    default: m.Experience,
  })),
);
const Projects = dynamic(() =>
  import("@/components/sections/Projects").then((m) => ({
    default: m.Projects,
  })),
);
const Certifications = dynamic(() =>
  import("@/components/sections/Certifications").then((m) => ({
    default: m.Certifications,
  })),
);
const Services = dynamic(() =>
  import("@/components/sections/Services").then((m) => ({
    default: m.Services,
  })),
);
const Contact = dynamic(() =>
  import("@/components/sections/Contact").then((m) => ({
    default: m.Contact,
  })),
);
const Footer = dynamic(() =>
  import("@/components/layout/Footer").then((m) => ({ default: m.Footer })),
);

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Certifications />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}
