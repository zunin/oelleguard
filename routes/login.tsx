
import { Head, asset } from "$fresh/runtime.ts";
import { PageProps, Handlers } from "$fresh/server.ts";
import Layout from "../components/Layout.tsx";
import { fetchLoginRequestInformation, acceptLogin } from "../auth/auth.ts"
import { OAuth2ConsentRequest } from "../auth/OAuth2ConsentRequest.ts";

export interface LoginChallenge {
  information: OAuth2ConsentRequest,
  loginChallenge: string
}

export const handler: Handlers<LoginChallenge> = {
  async GET(req, ctx) {
    const url = new URL(req.url)
    const login_challenge = url.searchParams.get('login_challenge');
    if (!login_challenge) {
      return new Response("Expected login challenge to be set but received none.", {
        status: 500,
      });
    }
    
    const login_reuqest_information = await fetchLoginRequestInformation(login_challenge);
    
    const authenticationRequest = {
      information: login_reuqest_information,
      loginChallenge: login_challenge
    } as LoginChallenge;

    return ctx.render(authenticationRequest);
  },
  async POST(req, ctx) {
    const formdata = await req.formData();
    const login_challenge = formdata.get("login_challenge");
    const rememberMe = formdata.get("remember") == "1";
    const email = formdata.get("email");
    console.log({
      login_challenge,
      rememberMe,
      email
    })
    if (!login_challenge || !email) {
      return new Response(
        "Expected login challenge to be set but received none.",
        {
          status: 500,
        },
      );
    }

    const redirectResponse = await acceptLogin(login_challenge.toString(), rememberMe, email.toString())
    console.log(redirectResponse);
    return Response.redirect(redirectResponse.redirect_to, 302);
  }
};

export default function Login(props: PageProps<LoginChallenge>) {
  return (
    <>
      <Head>
        <title>Ølleguard</title>
      </Head>
      <Layout>
        <div className="flex flex-col h-full w-full gap-4">
        <h1 className="flex-initial text-2xl">Please log in</h1>
        <image className="flex-1 w-48 h-48" src={asset("/logo.svg")}/>

        <form className="flex flex-col" method="POST">
            <input hidden id="login_challenge" name="login_challenge" value={props.data.loginChallenge} />
            <label className="flex-initial" for="email">Email</label>
            <input className="flex-initial" type="email" id="email" name="email" placeholder="name@example.com"></input>
            
            <label className="flex-initial" for="password">Password</label>
            <input className="flex-initial" type="password" id="password" name="password"></input>
            <div class="flex-initial">
                <label className="flex-initial" for="remember">Remember me</label>
                <input className="flex-initial" type="checkbox" id="remember" name="remember" value="1"></input>
            </div>
            <input className="px-6 py-2.5 bg-yellow text-crust font-medium text-xs leading-tight uppercase rounded shadow-md" type="submit" id="accept" name="submit" value="Log in"></input>
        </form>
        <div className="flex-grow"></div>
        </div>
        </Layout>
    </>
  );
}
