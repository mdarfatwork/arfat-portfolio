export const experience = [
  {
    company: "Noorisys Technologies Pvt. Ltd.",
    role: "Software Engineer",
    location: "Malegaon, Maharashtra",
    period: "Present",
    status: "current" as const,
    highlights: [
      "Building scalable, user-friendly web applications as a Full-Stack Developer.",
      "Working with Next.js, TypeScript, and the MERN stack in production environments.",
      "Contributing across frontend and backend with PostgreSQL, Firebase, and Vercel.",
      "Collaborating in team environments to deliver high-quality production software.",
    ],
  },
  {
    company: "Freelance (Luis)",
    role: "Full Stack Developer",
    location: "Remote",
    period: "Feb 2025 — Sep 2025",
    status: "past" as const,
    highlights: [
      "Built Coopay, an expense-tracking app with custom split logic and debt settlement.",
      "Implemented email verification with Resend + BetterAuth and receipt uploads via UploadThing + Cloudflare R2.",
      "Integrated AI-powered transaction extraction using Google Gemini.",
      "Merged 20+ PRs across the stack with professional Git workflows and strong TypeScript practices.",
    ],
  },
] as const;
