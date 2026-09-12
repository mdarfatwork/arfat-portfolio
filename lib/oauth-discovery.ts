import { getSiteUrl } from "@/lib/site";
import { profile } from "@/data/profile";
import { WEB_BOT_AUTH_KEYS, type WebBotAuthJwks } from "@/lib/web-bot-auth";

/**
 * OpenID Connect Discovery 1.0 metadata interface.
 * @see http://openid.net/specs/openid-connect-discovery-1_0.html
 */
export interface OpenIdConfiguration {
  issuer: string;
  authorization_endpoint: string;
  token_endpoint: string;
  userinfo_endpoint: string;
  jwks_uri: string;
  registration_endpoint?: string;
  scopes_supported: string[];
  response_types_supported: string[];
  response_modes_supported?: string[];
  grant_types_supported: string[];
  subject_types_supported: string[];
  id_token_signing_alg_values_supported: string[];
  token_endpoint_auth_methods_supported: string[];
  claims_supported?: string[];
  code_challenge_methods_supported?: string[];
  service_documentation?: string;
}

/**
 * Auth.md Agent Authentication metadata block.
 * @see https://workos.com/auth-md
 * @see https://github.com/workos/auth.md
 * @see https://isitagentready.com/.well-known/agent-skills/auth-md/SKILL.md
 */
export interface AgentAuthMetadata {
  skill: string;
  register_uri: string;
  identity_endpoint?: string;
  claim_endpoint?: string;
  claim_uri?: string;
  revocation_uri?: string;
  events_endpoint?: string;
  identity_types_supported: string[];
  identity_assertion?: {
    assertion_types_supported: string[];
    credential_types_supported: string[];
    claim_uri?: string;
    revocation_uri?: string;
  };
  anonymous?: {
    credential_types_supported: string[];
    claim_uri?: string;
  };
  service_auth?: {
    credential_types_supported: string[];
    claim_uri?: string;
  };
  events_supported?: string[];
}

/**
 * RFC 8414 OAuth 2.0 Authorization Server Metadata interface with Auth.md extensions.
 * @see https://www.rfc-editor.org/rfc/rfc8414
 */
export interface OAuthAuthorizationServerMetadata {
  issuer: string;
  authorization_endpoint: string;
  token_endpoint: string;
  jwks_uri: string;
  registration_endpoint?: string;
  revocation_endpoint?: string;
  introspection_endpoint?: string;
  scopes_supported: string[];
  response_types_supported: string[];
  response_modes_supported?: string[];
  grant_types_supported: string[];
  token_endpoint_auth_methods_supported: string[];
  token_endpoint_auth_signing_alg_values_supported?: string[];
  code_challenge_methods_supported?: string[];
  service_documentation?: string;
  agent_auth?: AgentAuthMetadata;
  resource?: string;
  authorization_servers?: string[];
  bearer_methods_supported?: string[];
}

/**
 * RFC 9728 OAuth 2.0 Protected Resource Metadata interface.
 * @see https://www.rfc-editor.org/rfc/rfc9728
 */
export interface OAuthProtectedResourceMetadata {
  resource: string;
  resource_name?: string;
  resource_documentation?: string;
  authorization_servers: string[];
  scopes_supported?: string[];
  bearer_methods_supported?: string[];
  jwks_uri?: string;
}

/**
 * Generates standard OpenID Connect 1.0 discovery metadata.
 */
export function getOpenIdConfiguration(): OpenIdConfiguration {
  const siteUrl = getSiteUrl();

  return {
    issuer: siteUrl,
    authorization_endpoint: `${siteUrl}/api/auth/authorize`,
    token_endpoint: `${siteUrl}/api/auth/token`,
    userinfo_endpoint: `${siteUrl}/api/auth/userinfo`,
    jwks_uri: `${siteUrl}/.well-known/jwks.json`,
    registration_endpoint: `${siteUrl}/api/auth/register`,
    scopes_supported: ["openid", "profile", "email", "offline_access"],
    response_types_supported: [
      "code",
      "token",
      "id_token",
      "code id_token",
      "code token",
      "id_token token",
      "code id_token token",
    ],
    response_modes_supported: ["query", "fragment"],
    grant_types_supported: [
      "authorization_code",
      "client_credentials",
      "refresh_token",
      "urn:ietf:params:oauth:grant-type:token-exchange",
    ],
    subject_types_supported: ["public"],
    id_token_signing_alg_values_supported: ["RS256", "EdDSA", "ES256"],
    token_endpoint_auth_methods_supported: [
      "client_secret_basic",
      "client_secret_post",
      "private_key_jwt",
      "none",
    ],
    claims_supported: [
      "sub",
      "iss",
      "aud",
      "exp",
      "nbf",
      "iat",
      "name",
      "email",
      "email_verified",
      "profile",
      "picture",
    ],
    code_challenge_methods_supported: ["S256", "plain"],
    service_documentation: `${siteUrl}/auth.md`,
  };
}

/**
 * Generates RFC 8414 OAuth 2.0 Authorization Server discovery metadata with Auth.md agent_auth block.
 */
export function getOAuthAuthorizationServerMetadata(): OAuthAuthorizationServerMetadata {
  const siteUrl = getSiteUrl();

  return {
    resource: siteUrl,
    authorization_servers: [siteUrl],
    scopes_supported: ["openid", "profile", "email", "read", "write"],
    bearer_methods_supported: ["header"],
    issuer: siteUrl,
    authorization_endpoint: `${siteUrl}/api/auth/authorize`,
    token_endpoint: `${siteUrl}/api/auth/token`,
    jwks_uri: `${siteUrl}/.well-known/jwks.json`,
    registration_endpoint: `${siteUrl}/api/auth/register`,
    revocation_endpoint: `${siteUrl}/api/auth/revoke`,
    introspection_endpoint: `${siteUrl}/api/auth/introspect`,
    response_types_supported: ["code", "token"],
    response_modes_supported: ["query", "fragment"],
    grant_types_supported: [
      "authorization_code",
      "client_credentials",
      "refresh_token",
      "urn:ietf:params:oauth:grant-type:jwt-bearer",
      "urn:ietf:params:oauth:grant-type:token-exchange",
      "urn:workos:agent-auth:grant-type:claim",
    ],
    token_endpoint_auth_methods_supported: [
      "client_secret_basic",
      "client_secret_post",
      "private_key_jwt",
      "none",
    ],
    token_endpoint_auth_signing_alg_values_supported: [
      "RS256",
      "EdDSA",
      "ES256",
    ],
    code_challenge_methods_supported: ["S256", "plain"],
    service_documentation: `${siteUrl}/auth.md`,
    agent_auth: {
      skill: `${siteUrl}/auth.md`,
      register_uri: `${siteUrl}/api/auth/register`,
      identity_endpoint: `${siteUrl}/api/auth/register`,
      claim_endpoint: `${siteUrl}/api/auth/claim`,
      claim_uri: `${siteUrl}/api/auth/claim`,
      revocation_uri: `${siteUrl}/api/auth/revoke`,
      events_endpoint: `${siteUrl}/api/auth/events`,
      identity_types_supported: [
        "identity_assertion",
        "anonymous",
        "service_auth",
      ],
      identity_assertion: {
        assertion_types_supported: [
          "urn:ietf:params:oauth:token-type:id-jag",
          "verified_email",
        ],
        credential_types_supported: [
          "bearer_token",
          "api_key",
          "http_message_signature",
        ],
        claim_uri: `${siteUrl}/api/auth/claim`,
        revocation_uri: `${siteUrl}/api/auth/revoke`,
      },
      anonymous: {
        credential_types_supported: ["bearer_token", "ephemeral_key"],
        claim_uri: `${siteUrl}/api/auth/claim`,
      },
      service_auth: {
        credential_types_supported: ["bearer_token", "api_key"],
        claim_uri: `${siteUrl}/api/auth/claim`,
      },
      events_supported: [
        "revocation",
        "https://schemas.workos.com/events/agent/auth/identity/assertion/revoked",
      ],
    },
  };
}

/**
 * Generates RFC 9728 OAuth 2.0 Protected Resource Metadata.
 */
export function getOAuthProtectedResourceMetadata(): OAuthProtectedResourceMetadata {
  const siteUrl = getSiteUrl();

  return {
    resource: siteUrl,
    resource_name: `${profile.name} Portfolio & Developer APIs`,
    resource_documentation: `${siteUrl}/auth.md`,
    authorization_servers: [siteUrl],
    scopes_supported: ["openid", "profile", "email", "read", "write"],
    bearer_methods_supported: ["header"],
    jwks_uri: `${siteUrl}/.well-known/jwks.json`,
  };
}

/**
 * Generates RFC 7517 compliant JSON Web Key Set (JWKS).
 */
export function getStandardJwks(): WebBotAuthJwks {
  return {
    keys: WEB_BOT_AUTH_KEYS,
  };
}

/**
 * Generates Auth.md agent authentication & registration document.
 */
export function getAuthMd(): string {
  const siteUrl = getSiteUrl();

  return `# auth.md — Agent Authentication & Registration

> Specification & Discovery for AI Agent Registration and Automated Authentication

You are an agent. This service supports **agentic registration**: discover → register → (claim if needed) → exchange for an access_token → call API → handle revocation. Follow the steps in order; do not skip ahead.

## Step 1 — Discover

Discovery starts with the OAuth Protected Resource Metadata (PRM) and Authorization Server (AS) metadata.

### 1a. Fetch the Protected Resource Metadata (RFC 9728)

\`\`\`http
GET /.well-known/oauth-protected-resource
\`\`\`

**Response:**

\`\`\`json
{
  "resource": "${siteUrl}",
  "resource_name": "${profile.name} Portfolio & Developer APIs",
  "resource_documentation": "${siteUrl}/auth.md",
  "authorization_servers": ["${siteUrl}"],
  "scopes_supported": ["openid", "profile", "email", "read", "write"],
  "bearer_methods_supported": ["header"],
  "jwks_uri": "${siteUrl}/.well-known/jwks.json"
}
\`\`\`

- \`resource\` — Canonical URL of the API. Use this as \`aud\` when minting an ID-JAG token.
- \`authorization_servers\` — Base URLs of the OAuth Authorization Server(s).
- \`scopes_supported\` — Scopes understood by the service.
- \`bearer_methods_supported\` — Access token transmission format (\`"header"\` = \`Authorization: Bearer <token>\`).

### 1b. Fetch the Authorization Server Metadata (RFC 8414)

\`\`\`http
GET /.well-known/oauth-authorization-server
\`\`\`

**Response (with Auth.md agent_auth block):**

\`\`\`json
{
  "resource": "${siteUrl}",
  "authorization_servers": ["${siteUrl}"],
  "scopes_supported": ["openid", "profile", "email", "read", "write"],
  "bearer_methods_supported": ["header"],
  "issuer": "${siteUrl}",
  "authorization_endpoint": "${siteUrl}/api/auth/authorize",
  "token_endpoint": "${siteUrl}/api/auth/token",
  "registration_endpoint": "${siteUrl}/api/auth/register",
  "revocation_endpoint": "${siteUrl}/api/auth/revoke",
  "introspection_endpoint": "${siteUrl}/api/auth/introspect",
  "jwks_uri": "${siteUrl}/.well-known/jwks.json",
  "grant_types_supported": [
    "authorization_code",
    "client_credentials",
    "refresh_token",
    "urn:ietf:params:oauth:grant-type:jwt-bearer",
    "urn:ietf:params:oauth:grant-type:token-exchange",
    "urn:workos:agent-auth:grant-type:claim"
  ],
  "agent_auth": {
    "skill": "${siteUrl}/auth.md",
    "register_uri": "${siteUrl}/api/auth/register",
    "identity_endpoint": "${siteUrl}/api/auth/register",
    "claim_endpoint": "${siteUrl}/api/auth/claim",
    "claim_uri": "${siteUrl}/api/auth/claim",
    "revocation_uri": "${siteUrl}/api/auth/revoke",
    "events_endpoint": "${siteUrl}/api/auth/events",
    "identity_types_supported": ["identity_assertion", "anonymous", "service_auth"],
    "identity_assertion": {
      "assertion_types_supported": ["urn:ietf:params:oauth:token-type:id-jag", "verified_email"],
      "credential_types_supported": ["bearer_token", "api_key", "http_message_signature"],
      "claim_uri": "${siteUrl}/api/auth/claim",
      "revocation_uri": "${siteUrl}/api/auth/revoke"
    },
    "anonymous": {
      "credential_types_supported": ["bearer_token", "ephemeral_key"],
      "claim_uri": "${siteUrl}/api/auth/claim"
    },
    "service_auth": {
      "credential_types_supported": ["bearer_token", "api_key"],
      "claim_uri": "${siteUrl}/api/auth/claim"
    },
    "events_supported": [
      "revocation",
      "https://schemas.workos.com/events/agent/auth/identity/assertion/revoked"
    ]
  }
}
\`\`\`

## Step 2 — Pick an Identity Flow

1. **Identity Assertion Flow (\`identity_assertion\`)**:
   - For agent providers with user identity assertions (ID-JAG \`urn:ietf:params:oauth:token-type:id-jag\` or verified email \`verified_email\`).
2. **Anonymous Flow (\`anonymous\`)**:
   - Self-registration without upfront identity. Receives a pre-claim credential immediately. Claim ceremony can be completed at any time.
3. **Service Auth Flow (\`service_auth\`)**:
   - Provide email as login hint at registration, followed by verification ceremony.

## Step 3 — Register Agent

Send a POST request to \`${siteUrl}/api/auth/register\`:

\`\`\`http
POST /api/auth/register
Content-Type: application/json

{
  "type": "anonymous"
}
\`\`\`

**Response:**

\`\`\`json
{
  "type": "anonymous",
  "agent_id": "agent_anon_...",
  "identity_assertion": "assert_agent_anon_...",
  "token_endpoint": "${siteUrl}/api/auth/token",
  "claim_uri": "${siteUrl}/api/auth/claim",
  "expires_in": 3600,
  "status": "pre_claim"
}
\`\`\`

## Step 4 — User Claim Ceremony (When Applicable)

Complete user verification at \`${siteUrl}/api/auth/claim\`:

\`\`\`http
POST /api/auth/claim
Content-Type: application/json

{
  "user_code": "123456"
}
\`\`\`

## Step 5 — Obtain Access Token

Request an OAuth 2.0 Bearer token at \`${siteUrl}/api/auth/token\`:

\`\`\`http
POST /api/auth/token
Content-Type: application/json

{
  "grant_type": "client_credentials"
}
\`\`\`

**Response:**

\`\`\`json
{
  "access_token": "agtt_...",
  "token_type": "Bearer",
  "expires_in": 86400,
  "scope": "openid profile email read write"
}
\`\`\`

## Step 6 — Make Authenticated API Calls

Include the access token in HTTP headers:

\`\`\`http
GET /api/mcp
Authorization: Bearer <access_token>
\`\`\`

## Step 7 — Token Revocation & Security Events

Revoke active credentials:

\`\`\`http
POST /api/auth/revoke
Content-Type: application/json

{
  "token": "<access_token>"
}
\`\`\`

Push security events (RFC 8417 / RFC 8935) to \`${siteUrl}/api/auth/events\`.

## Contact & Support

- **Maintainer**: ${profile.name}
- **Email**: [${profile.email}](mailto:${profile.email})
- **GitHub**: [${profile.github}](${profile.github})
- **Auth.md Standard**: [https://workos.com/auth-md](https://workos.com/auth-md)
- **Agent Skill Reference**: [https://isitagentready.com/.well-known/agent-skills/auth-md/SKILL.md](https://isitagentready.com/.well-known/agent-skills/auth-md/SKILL.md)
`;
}
