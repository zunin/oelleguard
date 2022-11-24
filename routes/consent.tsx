import { asset, Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import Layout from "../components/Layout.tsx";
import {
  allowConsent,
  denyConsent,
  fetchLoginRequestInformation,
} from "../auth/auth.ts";
import { OAuth2ConsentRequest } from "../auth/OAuth2ConsentRequest.ts";
import { JSXInternal } from "https://esm.sh/v95/preact@10.11.0/src/jsx.d.ts";

export interface ConsentProps {
  information: OAuth2ConsentRequest;
  consentChallenge: string;
}


export const handler: Handlers<ConsentProps> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const consent_challenge = url.searchParams.get("consent_challenge");
    
    if (!consent_challenge) {
      return new Response(
        "Expected consent challenge to be set but received none.",
        {
          status: 500,
        },
      );
    }
    

    const authenticationRequest = {
      consentChallenge: consent_challenge,
    } as ConsentProps;

    return ctx.render(authenticationRequest);
  },
  async POST(req, ctx) {
    
    const url = new URL(req.url);
    const consent_challenge = url.searchParams.get("consent_challenge");
  
    if (!consent_challenge) {
      return new Response(
        "Expected consent challenge to be set but received none.",
        {
          status: 500,
        },
      );
    }

    const scopes = url.searchParams.getAll("grant_scope");

    const redirectResponse = await allowConsent(consent_challenge, scopes)
    return Response.redirect(redirectResponse.redirect_to, 302);
  }
};

export default function Consent(props: PageProps<ConsentProps>) {
  const submit = (event: JSXInternal.TargetedEvent<HTMLFormElement, Event>) => {
    event.preventDefault();
    //allowConsent("", true, "nikolai@oellegaard.com").then(console.log)
    return false;
  };

  return (
    <>
      <Head>
        <title>Ølleguard</title>
      </Head>
      <Layout>
        <div className="flex flex-col h-full gap-4">
          <h1 className="flex-initial text-2xl">
            An application requests access to your data!
          </h1>
          <image className="flex-1 w-48 h-48" src={asset("/logo.svg")} />

          <form
            className="flex flex-col flex-auto gap-4"
            method="POST"
          >
            <input hidden id="consent_challenge" name="consent_challenge" value={props.data.consentChallenge} />
            {(props.data.information?.requested_scope ?? []).map((scope) => (
              <div className="flex gap-4">
                <label className="flex-initial" for={scope}>{scope}</label>
                <input
                  className="flex-initial"
                  type="checkbox"
                  id={scope}
                  value={scope}
                  name="grant_scope"
                />
              </div>
            ))}

            <div class="flex gap-4">
              <label className="flex-initial" for="remember">Remember me</label>
              <input
                className="flex-initial"
                type="checkbox"
                id="remember"
                name="remember"
                value="1"
              >
              </input>
            </div>
            <input
              className="flex-initial px-6 py-2.5 bg-yellow text-crust font-medium text-xs leading-tight uppercase rounded shadow-md"
              type="submit"
              id="accept"
              value="Allow access"
            >
            </input>
            <input
              className="flex-initial px-6 py-2.5 bg-yellow text-crust font-medium text-xs leading-tight uppercase rounded shadow-md"
              type="submit"
              id="reject"
              value="Deny access"
            >
            </input>
          </form>

          <div className="flex-grow"></div>
        </div>
      </Layout>
    </>
  );
}
