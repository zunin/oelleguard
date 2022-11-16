import { UnknownPageProps } from "$fresh/server.ts";
import { Head, asset } from "$fresh/runtime.ts";
import Layout from "../components/Layout.tsx";


export default function NotFoundPage({ url }: UnknownPageProps) {
    return <>
    <Head>
      <title>Ølleguard</title>
    </Head>
    <Layout>
      <div className="flex flex-col h-full">
      <h1 className="flex-initial text-2xl">404 not found</h1>
      <image className="flex-1 w-48 h-48" src={asset("/logo.svg")}/>

      <div className="flex-grow"></div>
      </div>
      </Layout>
  </>
}