import { NextRequest } from "next/server";
import { getA2aAgentCard } from "@/lib/agent-discovery";

export const dynamic = "force-dynamic";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, HEAD, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept",
};

export async function GET() {
  const card = getA2aAgentCard();

  return Response.json(
    {
      status: "online",
      protocol: "A2A",
      protocolVersion: "1.0",
      agent: {
        name: card.name,
        version: card.version,
        description: card.description,
      },
      agentCardUrl: "/.well-known/agent-card.json",
      capabilities: card.capabilities,
      skills: card.skills.map((s) => ({ id: s.id, name: s.name })),
    },
    {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        ...CORS_HEADERS,
      },
    }
  );
}

export async function HEAD() {
  return new Response(null, {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...CORS_HEADERS,
    },
  });
}

export async function POST(req: NextRequest) {
  const card = getA2aAgentCard();

  let body: any;
  try {
    body = await req.json();
  } catch {
    return Response.json(
      {
        jsonrpc: "2.0",
        id: null,
        error: {
          code: -32700,
          message: "Parse error: Invalid JSON payload",
        },
      },
      {
        status: 400,
        headers: CORS_HEADERS,
      }
    );
  }

  const id = body?.id ?? null;
  const method = body?.method;

  switch (method) {
    case "initialize":
    case "agent/initialize":
      return Response.json(
        {
          jsonrpc: "2.0",
          id,
          result: {
            protocolVersion: "1.0",
            agent: {
              name: card.name,
              version: card.version,
              description: card.description,
            },
            capabilities: card.capabilities,
          },
        },
        { headers: CORS_HEADERS }
      );

    case "skills/list":
      return Response.json(
        {
          jsonrpc: "2.0",
          id,
          result: {
            skills: card.skills,
          },
        },
        { headers: CORS_HEADERS }
      );

    case "skills/get": {
      const skillId = body?.params?.id;
      const found = card.skills.find((s) => s.id === skillId);
      if (!found) {
        return Response.json(
          {
            jsonrpc: "2.0",
            id,
            error: {
              code: -32602,
              message: `Skill '${skillId}' not found`,
            },
          },
          { headers: CORS_HEADERS }
        );
      }
      return Response.json(
        {
          jsonrpc: "2.0",
          id,
          result: { skill: found },
        },
        { headers: CORS_HEADERS }
      );
    }

    case "tasks/create":
      return Response.json(
        {
          jsonrpc: "2.0",
          id,
          result: {
            taskId: `task_${Date.now()}`,
            status: "accepted",
            message: "Task received by portfolio agent.",
          },
        },
        { headers: CORS_HEADERS }
      );

    default:
      return Response.json(
        {
          jsonrpc: "2.0",
          id,
          result: {
            agent: card.name,
            version: card.version,
            message: "A2A service interface active. Refer to /.well-known/agent-card.json for discovery.",
          },
        },
        { headers: CORS_HEADERS }
      );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      ...CORS_HEADERS,
      "Access-Control-Max-Age": "86400",
    },
  });
}
