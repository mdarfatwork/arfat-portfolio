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
 */
export interface AgentAuthMetadata {
  skill: string;
  register_uri: string;
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
  authorization_servers: string[];
  scopes_supported?: string[];
  bearer_methods_supported?: string[];
  resource_documentation?: string;
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
      "urn:ietf:params:oauth:grant-type:token-exchange",
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
      identity_types_supported: ["identity_assertion", "anonymous"],
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
      events_supported: ["revocation"],
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
    authorization_servers: [siteUrl],
    scopes_supported: ["openid", "profile", "email", "read", "write"],
    bearer_methods_supported: ["header"],
    resource_documentation: `${siteUrl}/auth.md`,
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

## 1. Overview & Audience

- **Resource Server**: ${siteUrl}
- **Authorization Server**: ${siteUrl}
- **Target Audience**: Autonomous AI Agents, LLM crawlers, Bot integrations, MCP Clients
- **Auth.md Standard**: [https://workos.com/auth-md](https://workos.com/auth-md)
- **Agent Skill Reference**: [https://isitagentready.com/.well-known/agent-skills/auth-md/SKILL.md](https://isitagentready.com/.well-known/agent-skills/auth-md/SKILL.md)

## 2. Dynamic Agent Registration & Provisioning

AI agents can programmatically request credentials or register client instances without human intervention.

- **Registration Endpoint**: \`${siteUrl}/api/auth/register\`
- **HTTP Method**: \`POST\`
- **Content-Type**: \`application/json\`

### Supported Identity Types

1. **Identity Assertion (\`identity_assertion\`)**:
   - Assertions: \`urn:ietf:params:oauth:token-type:id-jag\` (ID-JAG token assertion), \`verified_email\`
   - Credential Types: \`bearer_token\`, \`api_key\`, \`http_message_signature\`
   - Claim URI: \`${siteUrl}/api/auth/claim\`
   - Revocation URI: \`${siteUrl}/api/auth/revoke\`
2. **Anonymous / Ephemeral (\`anonymous\`)**:
   - Credential Types: \`bearer_token\`, \`ephemeral_key\`
   - Claim URI: \`${siteUrl}/api/auth/claim\`

## 3. Supported Credential & Authentication Methods

1. **OAuth 2.0 Bearer Tokens (RFC 6750)**:
   - Header: \`Authorization: Bearer <access_token>\`
   - Token Endpoint: \`${siteUrl}/api/auth/token\`
   - Supported Grants: \`authorization_code\`, \`client_credentials\`, \`refresh_token\`, \`urn:ietf:params:oauth:grant-type:token-exchange\`
2. **HTTP Message Signatures (RFC 9421 / Web Bot Auth)**:
   - Header: \`Signature-Agent: "${siteUrl}/.well-known/http-message-signatures-directory"\`
   - Algorithm: \`Ed25519 (EdDSA)\`
   - Public Keys: \`${siteUrl}/.well-known/jwks.json\`
3. **API Keys**:
   - Header: \`x-api-key: <agent_api_key>\` or \`Authorization: Bearer <agent_api_key>\`

## 4. Discovery Endpoints

- **OAuth Protected Resource Metadata (RFC 9728)**: \`${siteUrl}/.well-known/oauth-protected-resource\`
- **OAuth Authorization Server Metadata (RFC 8414)**: \`${siteUrl}/.well-known/oauth-authorization-server\`
- **OpenID Connect Discovery 1.0**: \`${siteUrl}/.well-known/openid-configuration\`
- **JSON Web Key Set (RFC 7517)**: \`${siteUrl}/.well-known/jwks.json\`
- **API Catalog (RFC 9727)**: \`${siteUrl}/.well-known/api-catalog\`
- **LLM Context**: \`${siteUrl}/llms.txt\` and \`${siteUrl}/llms-full.txt\`

## 5. Token Revocation & Lifecycle Events

- **Revocation Endpoint**: \`${siteUrl}/api/auth/revoke\`
- **Supported Events**: \`revocation\`
`;
}
