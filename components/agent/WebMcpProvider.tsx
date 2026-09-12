"use client";

import { useEffect, type ReactNode } from "react";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { getSiteUrl } from "@/lib/site";

interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: "object";
    properties?: Record<string, unknown>;
    required?: string[];
    additionalProperties?: boolean;
  };
  execute: (args?: Record<string, unknown>) => Promise<unknown>;
}

interface ModelContextAPI {
  provideContext?: (options: {
    tools?: ToolDefinition[];
    signal?: AbortSignal;
  }) => { tools?: ToolDefinition[]; unregister?: () => void };
  registerTool?: (
    tool: ToolDefinition,
    options?: { signal?: AbortSignal },
  ) => (() => void) | void;
  getTools?: () => ToolDefinition[];
  tools?: ToolDefinition[];
}

declare global {
  interface Window {
    __WEBMCP_TOOLS__?: ToolDefinition[];
    modelContext?: ModelContextAPI;
  }
  interface Navigator {
    modelContext?: ModelContextAPI;
    ai?: {
      modelContext?: ModelContextAPI;
    };
  }
}

const siteUrl = getSiteUrl();

const TOOLS: ToolDefinition[] = [
  {
    name: "get_profile_summary",
    description:
      "Retrieve Momin Mohammed Arfat's developer profile, hero summary, philosophy, and current work availability.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
    execute: async () => {
      return {
        name: profile.name,
        shortName: profile.shortName,
        title: profile.title,
        heroDescription: profile.heroDescription,
        availability: profile.availability,
        aboutBio: profile.aboutBio,
        philosophy: profile.philosophy,
        website: siteUrl,
      };
    },
  },
  {
    name: "list_projects",
    description:
      "List portfolio projects with descriptions, tech stacks, live preview URLs, and GitHub links.",
    inputSchema: {
      type: "object",
      properties: {
        technology: {
          type: "string",
          description: "Optional filter by technology (e.g., Next.js, AI, TypeScript)",
        },
      },
      additionalProperties: false,
    },
    execute: async (args?: Record<string, unknown>) => {
      const technology = typeof args?.technology === "string" ? args.technology : undefined;
      if (technology) {
        const query = technology.toLowerCase();
        return projects.filter((p) =>
          p.technologies.some((t) => t.toLowerCase().includes(query)),
        );
      }
      return projects;
    },
  },
  {
    name: "get_skills",
    description:
      "Get all technical proficiencies, languages, frameworks, AI tools, and infrastructure skills categorized by domain.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
    execute: async () => {
      return skills;
    },
  },
  {
    name: "get_contact_info",
    description:
      "Get developer contact channels including direct email, GitHub profile, and LinkedIn.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
    execute: async () => {
      return {
        name: profile.name,
        email: profile.email,
        github: profile.github,
        linkedin: profile.linkedin,
        website: siteUrl,
      };
    },
  },
  {
    name: "navigate_to_section",
    description:
      "Smoothly scroll the browser viewport to a target section on the portfolio page.",
    inputSchema: {
      type: "object",
      properties: {
        sectionId: {
          type: "string",
          enum: [
            "home",
            "about",
            "skills",
            "experience",
            "projects",
            "certifications",
            "contact",
          ],
          description: "Section anchor ID to navigate to",
        },
      },
      required: ["sectionId"],
      additionalProperties: false,
    },
    execute: async (args?: Record<string, unknown>) => {
      const sectionId = typeof args?.sectionId === "string" ? args.sectionId : "";
      if (typeof window !== "undefined" && sectionId) {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          return { success: true, navigatedTo: sectionId };
        }
      }
      return { success: false, error: `Section '${sectionId}' not found` };
    },
  },
];

function resolveModelContext(): ModelContextAPI | undefined {
  return (
    navigator.modelContext ||
    window.modelContext ||
    navigator.ai?.modelContext
  );
}

function registerWithProvideContext(
  modelContext: ModelContextAPI,
  signal: AbortSignal,
): void {
  if (typeof modelContext.provideContext !== "function") return;
  try {
    modelContext.provideContext({
      tools: TOOLS,
      signal,
    });
  } catch {
    // Ignore registration errors in experimental environments
  }
}

function registerWithRegisterTool(
  modelContext: ModelContextAPI,
  signal: AbortSignal,
): void {
  if (typeof modelContext.registerTool !== "function") return;
  for (const tool of TOOLS) {
    try {
      modelContext.registerTool(tool, { signal });
    } catch {
      // Ignore registration errors
    }
  }
}

function registerNativeModelContext(
  modelContext: ModelContextAPI,
  signal: AbortSignal,
): void {
  registerWithProvideContext(modelContext, signal);
  registerWithRegisterTool(modelContext, signal);
}

function createModelContextShim(): ModelContextAPI {
  const registeredTools = new Map<string, ToolDefinition>();
  TOOLS.forEach((t) => registeredTools.set(t.name, t));

  return {
    provideContext: (options) => {
      options.tools?.forEach((t) => registeredTools.set(t.name, t));
      return {
        tools: Array.from(registeredTools.values()),
        unregister: () => registeredTools.clear(),
      };
    },
    registerTool: (tool) => {
      registeredTools.set(tool.name, tool);
      return () => registeredTools.delete(tool.name);
    },
    getTools: () => Array.from(registeredTools.values()),
    tools: TOOLS,
  };
}

function setupModelContextShim(signal: AbortSignal): void {
  try {
    const modelContextShim = createModelContextShim();

    Object.defineProperty(navigator, "modelContext", {
      value: modelContextShim,
      configurable: true,
      writable: true,
    });

    modelContextShim.provideContext?.({ tools: TOOLS, signal });
  } catch {
    // Ignore shim assignment restriction if frozen
  }
}

export function WebMcpProvider({ children }: Readonly<{ children: ReactNode }>) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const controller = new AbortController();
    const signal = controller.signal;

    // Attach tools to global window helper for passive agent scanning & inspection
    window.__WEBMCP_TOOLS__ = TOOLS;

    const modelContext = resolveModelContext();
    if (modelContext) {
      registerNativeModelContext(modelContext, signal);
    } else {
      setupModelContextShim(signal);
    }

    return () => {
      controller.abort();
    };
  }, []);

  return <>{children}</>;
}

