import { getSiteUrl } from "@/lib/site";

/**
 * JWK (JSON Web Key) interface according to RFC 7517 and RFC 8037 (OKP for Ed25519).
 */
export interface WebBotAuthJwk {
  kty: "OKP";
  crv: "Ed25519";
  kid: string;
  x: string;
  use?: "sig";
  alg?: "EdDSA";
}

/**
 * JWKS (JSON Web Key Set) directory format per draft-meunier-http-message-signatures-directory.
 */
export interface WebBotAuthJwks {
  keys: WebBotAuthJwk[];
}

/**
 * Primary Ed25519 public key for Web Bot Auth request signing.
 * - x: Base64URL-encoded Ed25519 public key coordinate
 * - kid: RFC 7638 / RFC 8037 SHA-256 base64url JWK thumbprint
 */
export const WEB_BOT_AUTH_KEYS: WebBotAuthJwk[] = [
  {
    kty: "OKP",
    crv: "Ed25519",
    kid: "NTxjvjSVhhHophIo_99COCBg5H0ttHB7p749c7mKtIQ",
    x: "lBjIyND9MzQIOgjy71K_I6r0HQrrus_EH_TZgQDSAd0",
    use: "sig",
    alg: "EdDSA",
  },
];

/**
 * Returns the Web Bot Auth JWKS directory payload.
 */
export function getWebBotAuthJwks(): WebBotAuthJwks {
  return {
    keys: WEB_BOT_AUTH_KEYS,
  };
}

/**
 * Returns helper metadata for outbound bot requests signed by this origin.
 */
export function getSignatureAgentHeader(): string {
  const siteUrl = getSiteUrl();
  return `"${siteUrl}/.well-known/http-message-signatures-directory"`;
}
