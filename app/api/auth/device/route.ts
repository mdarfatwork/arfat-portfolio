import { NextRequest } from "next/server";
import { getSiteUrl } from "@/lib/site";

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
      device_code: `dev_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`,
      user_code: "WDJB-MJHT",
      verification_uri: `${siteUrl}/auth.md`,
      verification_uri_complete: `${siteUrl}/auth.md?user_code=WDJB-MJHT`,
      expires_in: 1800,
      interval: 5,
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

export async function GET() {
  const siteUrl = getSiteUrl();

  return Response.json(
    {
      endpoint: `${siteUrl}/api/auth/device`,
      documentation: `${siteUrl}/auth.md`,
      status: "active",
      verification_uri: `${siteUrl}/auth.md`,
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
