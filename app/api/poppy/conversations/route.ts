import { NextRequest } from "next/server";
import { getSiteUrl } from "@/lib/site";
import { profile } from "@/data/profile";

export const dynamic = "force-dynamic";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept",
};

export async function POST(req: NextRequest) {
  const siteUrl = getSiteUrl();

  return Response.json(
    {
      conversation_id: `conv_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      status: "active",
      responder: {
        name: profile.name,
        type: "ai",
      },
      agent_url: `${siteUrl}/api/a2a`,
      message: "Personal Agent Protocol conversation initialized.",
    },
    {
      status: 201,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        ...CORS_HEADERS,
      },
    }
  );
}

export async function GET() {
  const siteUrl = getSiteUrl();

  return Response.json(
    {
      protocol: "poppy",
      version: "0.1",
      endpoint: `${siteUrl}/api/poppy/conversations`,
      manifest: `${siteUrl}/.well-known/poppy.json`,
      status: "active",
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

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      ...CORS_HEADERS,
      "Access-Control-Max-Age": "86400",
    },
  });
}
