import { NextRequest } from "next/server";
import { profile } from "@/data/profile";

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
 * OpenID Connect 1.0 UserInfo Endpoint
 */
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization") || "";

  if (!authHeader.startsWith("Bearer ")) {
    return Response.json(
      {
        error: "invalid_token",
        error_description: "Missing or invalid Bearer token",
      },
      {
        status: 401,
        headers: {
          ...CORS_HEADERS,
          "WWW-Authenticate": 'Bearer error="invalid_token"',
          "Content-Type": "application/json; charset=utf-8",
        },
      },
    );
  }

  return Response.json(
    {
      sub: "momin-mohammed-arfat",
      name: profile.name,
      given_name: profile.shortName,
      email: profile.email,
      email_verified: true,
      profile: profile.github,
      picture: "https://github.com/mdarfatwork.png",
      locale: "en-US",
      updated_at: Math.floor(Date.now() / 1000),
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
