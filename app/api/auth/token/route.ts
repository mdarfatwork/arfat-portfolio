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
      endpoint: "OAuth 2.0 / Auth.md Token Endpoint",
      grant_types_supported: [
        "authorization_code",
        "client_credentials",
        "refresh_token",
        "urn:ietf:params:oauth:grant-type:jwt-bearer",
        "urn:ietf:params:oauth:grant-type:token-exchange",
        "urn:workos:agent-auth:grant-type:claim",
      ],
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
  let grantType = "";
  try {
    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const json = await request.json();
      grantType = json.grant_type || "";
    } else {
      const formData = await request.formData();
      grantType = (formData.get("grant_type") as string) || "";
    }
  } catch {
    grantType = "client_credentials";
  }

  const accessToken = `agtt_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;

  return Response.json(
    {
      access_token: accessToken,
      token_type: "Bearer",
      expires_in: 86400,
      scope: "openid profile email read write",
      grant_type: grantType || "client_credentials",
    },
    {
      status: 200,
      headers: {
        ...CORS_HEADERS,
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
        "Pragma": "no-cache",
      },
    },
  );
}
