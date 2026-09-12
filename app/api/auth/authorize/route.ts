import { NextRequest } from "next/server";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept, X-Requested-With",
  "Access-Control-Max-Age": "86400",
};

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

/**
 * OAuth 2.0 Authorization Endpoint (RFC 6749)
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const redirectUri = searchParams.get("redirect_uri");
  const state = searchParams.get("state") || "";
  const code = `auth_code_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

  if (redirectUri) {
    const target = new URL(redirectUri);
    target.searchParams.set("code", code);
    if (state) target.searchParams.set("state", state);
    return Response.redirect(target.toString(), 302);
  }

  const siteUrl = getSiteUrl();

  return Response.json(
    {
      authorization_endpoint: `${siteUrl}/api/auth/authorize`,
      status: "ready",
      instructions: "Provide client_id, redirect_uri, response_type=code, and state to initiate authorization flow.",
      auth_code_sample: code,
    },
    {
      status: 200,
      headers: {
        ...CORS_HEADERS,
        "Content-Type": "application/json; charset=utf-8",
      },
    },
  );
}

export async function POST(request: NextRequest) {
  return GET(request);
}
