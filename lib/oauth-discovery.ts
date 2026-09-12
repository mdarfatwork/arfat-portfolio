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
    issuer: siteUrl,
    authorization_endpoint: `${siteUrl}/api/auth/authorize`,
    token_endpoint: `${siteUrl}/api/auth/token`,
    jwks_uri: `${siteUrl}/.well-known/jwks.json`,
    registration_endpoint: `${siteUrl}/api/auth/register`,
    revocation_endpoint: `${siteUrl}/api/auth/revoke`,
    introspection_endpoint: `${siteUrl}/api/auth/introspect`,
    scopes_supported: ["openid", "profile", "email", "read", "write"],
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
      skill: "https://isitagentready.com/.well-known/agent-skills/auth-md/SKILL.md",
      register_uri: `${siteUrl}/api/auth/register`,
      identity_endpoint: `${siteUrl}/api/auth/register`,
      claim_endpoint: `${siteUrl}/api/auth/claim`,
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

This document describes authentication, token issuance, and programmatic agent registration for automated AI agents and LLMs interacting with **${profile.name}**'s portfolio and APIs.

## 1. Overview & Service Metadata

- **Service Name**: ${profile.name} Portfolio & Developer APIs
- **Resource Server**: ${siteUrl}
- **Authorization Server**: ${siteUrl}
- **Target Audience**: Autonomous AI Agents, LLM crawlers, Bot integrations, MCP Clients
- **Auth.md Standard**: [https://workos.com/auth-md](https://workos.com/auth-md)
- **Agent Skill Reference**: [https://isitagentready.com/.well-known/agent-skills/auth-md/SKILL.md](https://isitagentready.com/.well-known/agent-skills/auth-md/SKILL.md)
- **Pricing & Access**: Free, open access developer portfolio & MCP server

## 2. Discovery Endpoints

- **OAuth Protected Resource Metadata (RFC 9728)**: [${siteUrl}/.well-known/oauth-protected-resource](${siteUrl}/.well-known/oauth-protected-resource)
- **OAuth Authorization Server Metadata (RFC 8414)**: [${siteUrl}/.well-known/oauth-authorization-server](${siteUrl}/.well-known/oauth-authorization-server)
- **OpenID Connect Discovery 1.0**: [${siteUrl}/.well-known/openid-configuration](${siteUrl}/.well-known/openid-configuration)
- **JSON Web Key Set (RFC 7517)**: [${siteUrl}/.well-known/jwks.json](${siteUrl}/.well-known/jwks.json)
- **API Catalog (RFC 9727)**: [${siteUrl}/.well-known/api-catalog](${siteUrl}/.well-known/api-catalog)
- **ARD Agentic Resource Discovery**: [${siteUrl}/.well-known/ai-catalog.json](${siteUrl}/.well-known/ai-catalog.json)
- **MCP Server Card**: [${siteUrl}/.well-known/mcp/server-card.json](${siteUrl}/.well-known/mcp/server-card.json)
- **LLM Context**: [${siteUrl}/llms.txt](${siteUrl}/llms.txt) and [${siteUrl}/llms-full.txt](${siteUrl}/llms-full.txt)

## 3. Dynamic Agent Registration & Provisioning

AI agents can programmatically register and obtain credentials without human form submission.

- **Registration / Identity Endpoint**: \`${siteUrl}/api/auth/register\`
- **Claim Endpoint**: \`${siteUrl}/api/auth/claim\`
- **Token Endpoint**: \`${siteUrl}/api/auth/token\`
- **Revocation Endpoint**: \`${siteUrl}/api/auth/revoke\`
- **Events Endpoint**: \`${siteUrl}/api/auth/events\`
- **HTTP Method**: \`POST\`
- **Content-Type**: \`application/json\`

### Supported Identity Types

1. **Agent Verified Flow (\`identity_assertion\`)**:
   - Trusted agent providers assert user identity via ID-JAG token (\`urn:ietf:params:oauth:token-type:id-jag\`) or verified email (\`verified_email\`).
   - Supported Credential Types: \`bearer_token\`, \`api_key\`, \`http_message_signature\`
   - Claim URI: \`${siteUrl}/api/auth/claim\`
   - Revocation URI: \`${siteUrl}/api/auth/revoke\`
   - Supported Events: \`revocation\`, \`https://schemas.workos.com/events/agent/auth/identity/assertion/revoked\`

2. **User Claimed Flow (\`anonymous\` & \`service_auth\`)**:
   - **Anonymous Start (\`anonymous\`)**: Agent self-registers without identity and receives a pre-claim credential immediately. Can run claim ceremony anytime before expiry.
     - Credential Types: \`bearer_token\`, \`ephemeral_key\`
     - Claim URI: \`${siteUrl}/api/auth/claim\`
   - **Email Start (\`service_auth\`)**: Agent supplies user email as \`login_hint\` at registration. Assertion is issued when the user completes code confirmation.
     - Credential Types: \`bearer_token\`, \`api_key\`
     - Claim URI: \`${siteUrl}/api/auth/claim\`

## 4. Supported Credential & Authentication Methods

1. **OAuth 2.0 Bearer Tokens (RFC 6750)**:
   - Header: \`Authorization: Bearer <access_token>\`
   - Token Endpoint: \`${siteUrl}/api/auth/token\`
   - Supported Grants: \`authorization_code\`, \`client_credentials\`, \`refresh_token\`, \`urn:ietf:params:oauth:grant-type:jwt-bearer\`, \`urn:ietf:params:oauth:grant-type:token-exchange\`, \`urn:workos:agent-auth:grant-type:claim\`

2. **HTTP Message Signatures (RFC 9421 / Web Bot Auth)**:
   - Header: \`Signature-Agent: "${siteUrl}/.well-known/http-message-signatures-directory"\`
   - Algorithm: \`Ed25519 (EdDSA)\`
   - Public Keys: \`${siteUrl}/.well-known/jwks.json\`

3. **API Keys**:
   - Header: \`x-api-key: <agent_api_key>\` or \`Authorization: Bearer <agent_api_key>\`

## 5. Scope Inventory

| Scope | Description |
| :--- | :--- |
| \`openid\` | OpenID Connect user identification |
| \`profile\` | Read developer biography, summary, and experience |
| \`email\` | Access developer contact email and communication channels |
| \`read\` | Query projects, skills, certifications, and public portfolio content |
| \`write\` | Submit messages, contact forms, or collaboration requests |

## 6. Token Revocation & Lifecycle

- **Revocation Endpoint**: \`${siteUrl}/api/auth/revoke\`
- **Supported Events**: \`revocation\`, \`https://schemas.workos.com/events/agent/auth/identity/assertion/revoked\`

## 7. Contact & Support

For integration issues, agent verification, or inquiries:
- **Developer**: ${profile.name}
- **Email**: [${profile.email}](mailto:${profile.email})
- **GitHub**: [${profile.github}](${profile.github})
`;
}
