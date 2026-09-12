import { NextRequest } from "next/server";

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

export function GET() {
  return Response.json(
    {
      ceremony: "User Claim Ceremony",
      description: "Submit user_code or claim verification to upgrade agent credentials.",
      status: "active",
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
  const body = await request.json().catch(() => ({}));
  const userCode = body.user_code || body.code;

  if (!userCode) {
    return Response.json(
      {
        error: "invalid_request",
        error_description: "Missing user_code in request body.",
      },
      {
        status: 400,
        headers: {
          ...CORS_HEADERS,
          "Content-Type": "application/json; charset=utf-8",
        },
      },
    );
  }

  return Response.json(
    {
      status: "claimed",
      message: `User claim ceremony completed successfully for code ${userCode}.`,
      scopes: ["openid", "profile", "email", "read", "write"],
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
