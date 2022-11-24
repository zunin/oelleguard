import { asset, Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import Layout from "../components/Layout.tsx";
import { getAuthorizationUrl } from "../auth/auth.ts";

// https://github.com/radekg/ory-reference-compose
// https://github.com/ory/hydra-login-consent-node
// https://www.ory.sh/docs/hydra/self-hosted/configure-deploy

export interface AuthenticationRequest {
  authorizationUrl: URL;
}

export const handler: Handlers<AuthenticationRequest> = {
  async GET(_req, ctx) {
    try {
      const authorizationUrl = await getAuthorizationUrl();

      const authenticationRequest = {
        authorizationUrl,
      } as AuthenticationRequest;
  
      return ctx.render(authenticationRequest);
    } catch (e) {
      return new Response(e.message ?? "Unknown error occured during creation of authorization url, check server configuration", {
        status: 500,
      });
    }
  },
};

export default function Home(props: PageProps<AuthenticationRequest>) {
  return (
    <>
      <Head>
        <title>Ølleguard</title>
      </Head>
      <Layout>
        <div className="flex flex-col h-full w-full gap-4">
          <h1 className="flex-initial text-2xl">Ølleguard</h1>
          <image className="flex-1 w-48 h-48" src={asset("/logo.svg")} />
          <div class="flex-shrink inline-block">
            <a href={props.data?.authorizationUrl?.toString()}>
              <button
                type="submit"
                className="px-6 py-2.5 bg-yellow text-crust font-medium text-xs leading-tight uppercase rounded shadow-md"
              >
                Login
              </button>
            </a>
          </div>
          <div className="flex-grow"></div>
        </div>
      </Layout>
    </>
  );
}
