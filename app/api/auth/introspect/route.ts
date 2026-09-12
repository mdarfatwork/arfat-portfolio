import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
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
 * OAuth 2.0 Token Introspection (RFC 7662)
 */
export async function POST(request: NextRequest) {
  let token = "";

  try {
    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const json = await request.json();
      token = json.token || "";
    } else {
      const formData = await request.formData();
      token = (formData.get("token") as string) || "";
    }
  } catch {
    // Treat error as unprovided token
  }

  const active = Boolean(token);

  return Response.json(
    {
      active,
      scope: active ? "openid profile email read write" : undefined,
      client_id: active ? "agent-client" : undefined,
      token_type: active ? "Bearer" : undefined,
      exp: active ? Math.floor(Date.now() / 1000) + 86400 : undefined,
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
