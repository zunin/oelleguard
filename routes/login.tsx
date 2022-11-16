
import { Head, asset } from "$fresh/runtime.ts";
import Layout from "../components/Layout.tsx";


export default function Login() {
  return (
    <>
      <Head>
        <title>Ølleguard</title>
      </Head>
      <Layout>
        <div className="flex flex-col h-full">
        <h1 className="flex-initial text-2xl">Please log in</h1>
        <image className="flex-1 w-48 h-48" src={asset("/logo.svg")}/>

        <form className="flex flex-col">
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
