export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  live?: boolean;
  initials?: string;
  image?: string;
  details: string;
  features: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  context?: string;
};

export const PROJECTS_PAGE_SIZE = 4;

export const projects: Project[] = [
  {
    id: "welzo-ai",
    title: "Welzo AI",
    description:
      "AI-powered health and wellness platform with chatbot integrations and intelligent automation for the Welzo ecosystem.",
    tags: ["Noorisys", "Client Work", "AI", "Live Project"],
    live: true,
    liveUrl: "https://welzo.ai/",
    image: "/assets/projects/welzo-ai.webp",
    initials: "WA",
    context: "Noorisys Technologies",
    details:
      "Built while working at Noorisys — Welzo AI is a live health and wellness platform where I contributed AI chatbot integrations, n8n workflow automation, and frontend implementation. The work focused on intelligent automation across the Welzo ecosystem, improving user engagement through conversational AI and streamlining internal operations with production-ready integrations.",
    features: [
      "AI chatbot integrations for health & wellness",
      "n8n workflow automation pipelines",
      "Production frontend implementation",
      "Cross-team collaboration on live platform",
    ],
    technologies: ["Next.js", "TypeScript", "n8n", "AI Integrations", "React"],
  },
  {
    id: "e-officine",
    title: "E-Officine",
    description:
      "A premium healthcare recruitment platform with polished frontend experiences and scalable platform functionality.",
    tags: ["Noorisys", "Client Work", "Live Project"],
    live: true,
    liveUrl: "https://e-officine.com/",
    image: "/assets/projects/e-officine.webp",
    initials: "EO",
    context: "Noorisys Technologies",
    details:
      "Contributed to E-Officine while at Noorisys — a premium healthcare recruitment platform serving production users. I built and refined responsive frontend experiences, improved UI polish across key flows, and helped deliver scalable platform functionality for a healthcare client with high standards for design and reliability.",
    features: [
      "Premium responsive healthcare UI",
      "Recruitment platform workflows",
      "Scalable frontend architecture",
      "Production-ready client delivery",
    ],
    technologies: ["Next.js", "TypeScript", "React", "Tailwind CSS"],
  },
  {
    id: "ab-sidy",
    title: "AB Sidy",
    description:
      "A car auction and management platform with exchange workflows, invoice handling, and production-ready business logic.",
    tags: ["Noorisys", "Client Work", "Live Project"],
    live: true,
    liveUrl: "http://car.techtrial.work/",
    image: "/assets/projects/ab-sidy.webp",
    initials: "AB",
    context: "Noorisys Technologies",
    details:
      "Delivered as part of my role at Noorisys — AB Sidy is a Car24-like car auction and management platform. I built exchange car workflows, invoice handling features, and core frontend modules while fixing production bugs in a live environment, ensuring business-critical flows remained stable for daily operations.",
    features: [
      "Car auction & exchange workflows",
      "Invoice handling system",
      "Production bug fixes & features",
      "Car management platform UI",
    ],
    technologies: ["Next.js", "TypeScript", "React", "REST APIs"],
  },
  {
    id: "noorisys",
    title: "Noorisys",
    description:
      "The new corporate website for Noorisys Technologies — a startup product engineering partner helping founders build scalable SaaS MVPs.",
    tags: ["Noorisys", "Frontend", "Live Project"],
    live: true,
    liveUrl: "https://noorisys.com/",
    image: "/assets/projects/noorisys.webp",
    initials: "NS",
    context: "Noorisys Technologies",
    details:
      "Led frontend development for the redesigned Noorisys corporate website — a premium marketing platform showcasing the Founder Launch Programme™, MVP to Scale Programme, case studies, client testimonials, and founder application flows. Built responsive, conversion-focused UI for a global SaaS engineering brand serving 500+ startups across 25+ countries.",
    features: [
      "Redesigned corporate marketing site",
      "Founder programme & case study pages",
      "Conversion-focused responsive UI",
      "Framer Motion interactions",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Framer Motion",
    ],
  },
  {
    id: "quickfolio",
    title: "QuickFolio",
    description:
      "A developer-focused portfolio builder designed for quickly generating and showcasing personal portfolio websites.",
    tags: ["Next.js", "Full Stack", "Live Project"],
    live: true,
    liveUrl: "https://quickfolio-arfat.vercel.app/",
    githubUrl: "https://github.com/mdarfatwork/QuickFolio",
    image: "/assets/projects/quickfolio.webp",
    details:
      "QuickFolio is a dynamic portfolio generation tool built for developers who want to showcase their work quickly. It features a responsive modern UI, Next.js App Router architecture, Tailwind CSS styling, and optimized performance — making it easy to go from idea to a polished personal site in minutes.",
    features: [
      "Dynamic portfolio generation",
      "Next.js App Router architecture",
      "Fast, developer-focused UX",
      "Optimized performance",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
  },
  {
    id: "dm-genie",
    title: "DM Genie",
    description:
      "AI-powered outreach assistant that generates personalized LinkedIn messages using resume and job description context.",
    tags: ["AI", "Next.js", "Live Project"],
    live: true,
    liveUrl: "https://dmgenie-arfat.vercel.app/",
    githubUrl: "https://github.com/mdarfatwork/dmgenie",
    image: "/assets/projects/dm-genie.webp",
    details:
      "DM Genie is an AI-powered LinkedIn outreach assistant that parses resumes and job descriptions to generate personalized connection messages. Built with Next.js, Clerk authentication, Neon PostgreSQL, Drizzle ORM, and Google Gemini — it streamlines job search outreach with a modern, responsive interface.",
    features: [
      "AI-powered LinkedIn DM generation",
      "Resume & job description parsing",
      "Personalized outreach workflows",
      "Clerk auth with Neon database",
    ],
    technologies: ["Next.js", "TypeScript", "Clerk", "Neon", "Drizzle", "Gemini"],
  },
  {
    id: "lettergenie",
    title: "LetterGenie",
    description:
      "An AI-based cover letter generator that creates professional personalized cover letters within seconds.",
    tags: ["AI", "SaaS", "Live Project"],
    live: true,
    liveUrl: "https://lettergenie.vercel.app/",
    githubUrl: "https://github.com/mdarfatwork/lettergenie",
    image: "/assets/projects/lettergenie.webp",
    details:
      "LetterGenie is an AI cover letter generator that creates professional, personalized cover letters in seconds. It features a fast minimal UX, AI-generated content workflows, and PostgreSQL-backed user management using Next.js 15, Clerk authentication, and Google Gemini for intelligent document generation.",
    features: [
      "AI cover letter generation",
      "Fast minimal user experience",
      "PostgreSQL user management",
      "Clerk authentication",
    ],
    technologies: ["Next.js", "TypeScript", "Clerk", "PostgreSQL", "Gemini"],
  },
  {
    id: "coopay",
    title: "Coopay",
    description:
      "Expense-sharing and debt-management platform with advanced payment tracking and reminder workflows.",
    tags: ["Full Stack", "Private Project"],
    initials: "CP",
    context: "Freelance (Luis)",
    details:
      "Coopay is a SaaS-focused expense-sharing platform developed as freelance work. It supports shared expense tracking, debt splitting, reminder scheduling, recurring expenses, custom splits, and group reports — built with Drizzle ORM, PostgreSQL, BetterAuth, UploadThing, and Gemini integrations for a complete full-stack experience.",
    features: [
      "Shared expense tracking",
      "Debt splitting & reminders",
      "Recurring expenses & custom splits",
      "Group reports & analytics",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Drizzle",
      "PostgreSQL",
      "BetterAuth",
      "UploadThing",
      "Gemini",
    ],
  },
];
