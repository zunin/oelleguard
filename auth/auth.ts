import * as oauth2 from "oauth2";
import { OAuth2ConsentRequest } from "./OAuth2ConsentRequest.ts";

// https://github.com/panva/oauth4webapi

export const client: oauth2.Client = {
  client_id: "facebook-photo-backup",
  client_secret: "some-secret",
  token_endpoint_auth_method: "client_secret_basic",
};

const ory_admin_uri = new URL("http://127.0.0.1:4445");

export const issuer = new URL("http://127.0.0.1:4444");
export const redirect_uri = "http://127.0.0.1:5555/callback";

export async function getAuthorizationUrl(): Promise<URL> {
  const authorization_endpoint = await getAuthorizationEndpoint();
  if (!authorization_endpoint) {
    throw new Error("No authorization endpoint, configuration is bad");
  }
  const state = oauth2.generateRandomState();

  const authorizationUrl = new URL(authorization_endpoint);
  authorizationUrl.searchParams.set("client_id", client.client_id);
  authorizationUrl.searchParams.set("prompt", "consent");
  authorizationUrl.searchParams.set("state", state);
  authorizationUrl.searchParams.set("redirect_uri", redirect_uri);
  authorizationUrl.searchParams.set("response_type", "code");
  authorizationUrl.searchParams.set("scope", "openid photos.read");
  return authorizationUrl;
}

async function getAuthorizatoinServer() {
  const discoveryResponse = await oauth2.discoveryRequest(issuer);
  return await oauth2.processDiscoveryResponse(issuer, discoveryResponse);
}

async function getAuthorizationEndpoint() {
  const { authorization_endpoint } = await getAuthorizatoinServer();
  return authorization_endpoint;
}

export async function fetchLoginRequestInformation(
  login_challenge: string,
): Promise<OAuth2ConsentRequest> {
  const url = new URL(`${ory_admin_uri}/oauth2/auth/requests/login`);
  url.searchParams.append("login_challenge", login_challenge);
  const res = await fetch(url);
  const body = await res.json();
  return body as OAuth2ConsentRequest;
}

export async function acceptLogin(
  login_challenge: string,
  rememberMe: boolean,
  subject: string
) {
  const url = new URL(`${ory_admin_uri}oauth2/auth/requests/login/accept`);
  url.searchParams.append("login_challenge", login_challenge);
  
  const content = JSON.stringify({
    "subject": subject,
    "remember": rememberMe,
    "remember_for": 3600,
  });

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: content,
  });
  if (!res.ok) {
    const responseText = await res.text();
    throw new Error(`${res.status} ${res.statusText} ${responseText}}`)
  }
  const body = await res.json();
  return body as RedirectRespone;
}

interface RedirectRespone {
  redirect_to: string
}

export async function allowConsent(
  consent_challenge: string,
  scopes: string[]
): Promise<RedirectRespone> {
  const url = new URL(`${ory_admin_uri}oauth2/auth/requests/consent/accept`);
  url.searchParams.append("consent_challenge", consent_challenge);
  
  const content = JSON.stringify({grant_scope: scopes});

  const res = await fetch(url, {
    method: "PUT",
    body: content,
  });
  if (!res.ok) {
    const responseText = await res.text();
    throw new Error(`${res.status} ${res.statusText} ${responseText}}`)
  }
  const body = await res.json();
  return body as RedirectRespone;
}

export async function denyConsent(login_challenge: string) {
  const url = new URL(`${ory_admin_uri}/oauth2/auth/requests/login/deny`);
  url.searchParams.append("login_challenge", login_challenge);

  const res = await fetch(url);
  const body = await res.json();
  console.log("denyConsent", body);
  return body as OAuth2ConsentRequest;
}
