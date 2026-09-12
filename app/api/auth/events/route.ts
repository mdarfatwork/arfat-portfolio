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
 * Push delivery endpoint for Security Event Tokens (RFC 8417 / RFC 8935)
 * Accepts identity revocation and lifecycle events from agent providers.
 */
export async function POST(request: NextRequest) {
  try {
    const eventPayload = await request.json().catch(() => ({}));

    // In a production setup, verify the JWT Security Event Token signature against provider JWKS
    return Response.json(
      {
        status: "received",
        delivery: "acknowledged",
        event: eventPayload?.events || "revocation",
        timestamp: new Date().toISOString(),
      },
      {
        status: 202,
        headers: {
          ...CORS_HEADERS,
          "Content-Type": "application/json; charset=utf-8",
        },
      },
    );
  } catch (error) {
    return Response.json(
      {
        error: "invalid_event",
        error_description: error instanceof Error ? error.message : "Malformed event payload",
      },
      {
        status: 400,
        headers: CORS_HEADERS,
      },
    );
  }
}
