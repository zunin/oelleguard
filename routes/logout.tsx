
import { Head, asset } from "$fresh/runtime.ts";
import Layout from "../components/Layout.tsx";


export default function Logout() {
  return (
    <>
      <Head>
        <title>Ølleguard</title>
      </Head>
      <Layout>
        <div className="flex flex-col h-full w-full gap-4">
        <h1 className="flex-initial text-2xl">Do you wish to log out?</h1>
        <image className="flex-1 w-48 h-48" src={asset("/logo.svg")}/>

        <form className="flex gap-4 flex-row">
            <input className="flex-initial px-6 py-2.5 bg-yellow text-crust font-medium text-xs leading-tight uppercase rounded shadow-md" type="submit" id="accept" value="Yes"></input>
            <input className="flex-initial px-6 py-2.5 bg-yellow text-crust font-medium text-xs leading-tight uppercase rounded shadow-md" type="submit" id="reject" value="No"></input>
        </form>

        <div className="flex-grow"></div>
        </div>
        </Layout>
    </>
  );
}
