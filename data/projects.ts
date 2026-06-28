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
      "AI-powered health and wellness platform with conversational AI, chatbot integrations, and intelligent automation workflows.",
    tags: ["Noorisys", "Client Work", "AI", "Live Project"],
    live: true,
    liveUrl: "https://welzo.ai/",
    image: "/assets/projects/welzo-ai.webp",
    initials: "WA",
    context: "Noorisys Technologies",
    details:
      "Built while working at Noorisys — Welzo AI is a live health and wellness platform focused on improving user experience through AI-powered interactions. I contributed to AI chatbot integrations, n8n automation workflows, and frontend implementation, helping build scalable AI-driven experiences for the platform.",
    features: [
      "AI chatbot integrations",
      "Health & wellness conversational workflows",
      "n8n automation pipelines",
      "Production frontend development",
    ],
    technologies: ["Next.js", "TypeScript", "React", "n8n", "AI Integrations"],
  },

  {
    id: "e-officine",
    title: "E-Officine",
    description:
      "Healthcare recruitment platform delivering a premium user experience with scalable frontend architecture.",
    tags: ["Noorisys", "Client Work", "Live Project"],
    live: true,
    liveUrl: "https://e-officine.com/",
    image: "/assets/projects/e-officine.webp",
    initials: "EO",
    context: "Noorisys Technologies",
    details:
      "Developed while working at Noorisys — E-Officine is a production healthcare recruitment platform. I contributed to responsive frontend development, UI improvements, and scalable application features while ensuring a polished experience for real users.",
    features: [
      "Healthcare recruitment workflows",
      "Responsive production UI",
      "Frontend architecture improvements",
      "Client-focused development",
    ],
    technologies: ["Next.js", "TypeScript", "React", "Tailwind CSS"],
  },

  {
    id: "ab-sidy",
    title: "AB Sidy",
    description:
      "Car auction and management platform with vehicle exchange workflows, invoice systems, and business operations.",
    tags: ["Noorisys", "Client Work", "Live Project"],
    live: true,
    liveUrl: "http://car.techtrial.work/",
    image: "/assets/projects/ab-sidy.webp",
    initials: "AB",
    context: "Noorisys Technologies",
    details:
      "Built as part of my role at Noorisys — AB Sidy is a Car24-like automotive management platform. I developed major platform workflows including vehicle exchange management, invoice handling, and core frontend modules while maintaining production stability.",
    features: [
      "Car auction workflows",
      "Vehicle exchange management",
      "Invoice handling system",
      "Production feature development",
    ],
    technologies: ["Next.js", "TypeScript", "React", "REST APIs"],
  },

  {
    id: "noorisys",
    title: "Noorisys",
    description:
      "Corporate website for a SaaS engineering company helping startups build scalable digital products.",
    tags: ["Noorisys", "Frontend", "Live Project"],
    live: true,
    liveUrl: "https://noorisys.com/",
    image: "/assets/projects/noorisys.webp",
    initials: "NS",
    context: "Noorisys Technologies",
    details:
      "Led frontend development for the redesigned Noorisys corporate website. Built a modern marketing platform with responsive layouts, animations, case studies, and conversion-focused experiences for a global SaaS engineering brand.",
    features: [
      "Modern corporate website",
      "Responsive marketing pages",
      "Interactive UI animations",
      "Conversion-focused design",
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
      "Developer-focused portfolio builder for quickly creating and showcasing personal websites.",
    tags: ["Next.js", "Full Stack", "Live Project"],
    live: true,
    liveUrl: "https://quickfolio-arfat.vercel.app/",
    githubUrl: "https://github.com/mdarfatwork/QuickFolio",
    image: "/assets/projects/quickfolio.webp",
    details:
      "QuickFolio is a portfolio generation platform built for developers. It provides a fast way to create modern portfolio websites with a responsive interface, optimized performance, and a scalable Next.js architecture.",
    features: [
      "Portfolio generation workflow",
      "Next.js App Router architecture",
      "Modern responsive UI",
      "Performance-focused development",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
  },

  {
    id: "dm-genie",
    title: "DM Genie",
    description:
      "AI-powered LinkedIn outreach assistant that generates personalized messages using resume and job context.",
    tags: ["AI", "Next.js", "Live Project"],
    live: true,
    liveUrl: "https://dmgenie-arfat.vercel.app/",
    githubUrl: "https://github.com/mdarfatwork/dmgenie",
    image: "/assets/projects/dm-genie.webp",
    details:
      "DM Genie is an AI SaaS application that helps users create personalized LinkedIn outreach messages. It analyzes resume and job descriptions to generate relevant connection messages using AI workflows.",
    features: [
      "AI message generation",
      "Resume and job description analysis",
      "Personalized outreach workflow",
      "Authentication and database system",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Clerk",
      "Neon",
      "Drizzle",
      "Gemini",
    ],
  },

  {
    id: "lettergenie",
    title: "LetterGenie",
    description:
      "AI-powered cover letter generator creating personalized professional documents instantly.",
    tags: ["AI", "SaaS", "Live Project"],
    live: true,
    liveUrl: "https://lettergenie.vercel.app/",
    githubUrl: "https://github.com/mdarfatwork/lettergenie",
    image: "/assets/projects/lettergenie.webp",
    details:
      "LetterGenie is an AI document generation SaaS tool that creates personalized cover letters using user information and AI workflows. Built with modern authentication, database systems, and AI integration.",
    features: [
      "AI cover letter generation",
      "Personalized document creation",
      "User authentication",
      "Database-backed SaaS workflow",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Clerk",
      "PostgreSQL",
      "Gemini",
    ],
  },

  {
    id: "coopay",
    title: "Coopay",
    description:
      "Expense-sharing SaaS platform with split payments, debt management, and financial tracking workflows.",
    tags: ["Full Stack", "Private Project"],
    initials: "CP",
    context: "Freelance (Luis)",
    details:
      "Coopay is a freelance SaaS application built for managing shared expenses. It includes custom split logic, recurring expenses, debt settlement, reminders, file uploads, and AI-powered transaction extraction.",
    features: [
      "Expense sharing system",
      "Debt settlement workflows",
      "Recurring expenses",
      "AI transaction extraction",
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
