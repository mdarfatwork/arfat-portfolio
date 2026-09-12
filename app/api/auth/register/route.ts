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

export function GET() {
  const siteUrl = getSiteUrl();

  return Response.json(
    {
      service: "Auth.md Dynamic Agent Registration",
      documentation: `${siteUrl}/auth.md`,
      identity_types_supported: ["identity_assertion", "anonymous", "service_auth"],
      endpoints: {
        register: `${siteUrl}/api/auth/register`,
        claim: `${siteUrl}/api/auth/claim`,
        token: `${siteUrl}/api/auth/token`,
        revoke: `${siteUrl}/api/auth/revoke`,
      },
    },
    {
      status: 200,
      headers: {
        ...CORS_HEADERS,
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    },
  );
}

export async function POST(request: NextRequest) {
  const siteUrl = getSiteUrl();

  try {
    const body = await request.json().catch(() => ({}));
    const type = body.type || body.identity_type || "anonymous";

    if (type === "anonymous") {
      const ephemeralId = `agent_anon_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      return Response.json(
        {
          type: "anonymous",
          agent_id: ephemeralId,
          identity_assertion: `assert_${ephemeralId}`,
          token_endpoint: `${siteUrl}/api/auth/token`,
          claim_uri: `${siteUrl}/api/auth/claim`,
          expires_in: 3600,
          status: "pre_claim",
        },
        {
          status: 201,
          headers: {
            ...CORS_HEADERS,
            "Content-Type": "application/json; charset=utf-8",
          },
        },
      );
    }

    if (type === "identity_assertion") {
      const assertionId = `assert_jag_${Date.now()}`;
      return Response.json(
        {
          type: "identity_assertion",
          assertion: assertionId,
          token_endpoint: `${siteUrl}/api/auth/token`,
          claim_uri: `${siteUrl}/api/auth/claim`,
          revocation_uri: `${siteUrl}/api/auth/revoke`,
          expires_in: 3600,
          status: "verified",
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

    if (type === "service_auth") {
      const userCode = Math.floor(100000 + Math.random() * 900000).toString();
      return Response.json(
        {
          type: "service_auth",
          user_code: userCode,
          claim_uri: `${siteUrl}/api/auth/claim`,
          verification_uri: `${siteUrl}/auth.md`,
          expires_in: 600,
          status: "pending_claim",
        },
        {
          status: 202,
          headers: {
            ...CORS_HEADERS,
            "Content-Type": "application/json; charset=utf-8",
          },
        },
      );
    }

    return Response.json(
      {
        error: "unsupported_identity_type",
        error_description: `Identity type '${type}' is not supported. Use 'identity_assertion', 'anonymous', or 'service_auth'.`,
      },
      {
        status: 400,
        headers: {
          ...CORS_HEADERS,
          "Content-Type": "application/json; charset=utf-8",
        },
      },
    );
  } catch (error) {
    return Response.json(
      {
        error: "invalid_request",
        error_description: error instanceof Error ? error.message : "Malformed request",
      },
      {
        status: 400,
        headers: CORS_HEADERS,
      },
    );
  }
}
