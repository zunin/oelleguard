
import { Head, asset } from "$fresh/runtime.ts";
import Layout from "../components/Layout.tsx";


export default function Home() {
  return (
    <>
      <Head>
        <title>Ølleguard</title>
      </Head>
      <Layout>
        <div className="flex flex-col h-full">
        <h1 className="flex-initial text-2xl">Ølleguard</h1>
        <image className="flex-1 w-48 h-48" src={asset("/logo.svg")}/>
        <div class="flex-shrink inline-block"><form  action="/login">
        <button 
            type="submit"
            class="px-6 py-2.5 bg-yellow text-crust font-medium text-xs leading-tight uppercase rounded shadow-md "
          >Login</button>
        </form></div>
        <div className="flex-grow"></div>
        </div>
        </Layout>
    </>
  );
}
