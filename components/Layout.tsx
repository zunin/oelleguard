import { ComponentChildren } from "preact";
import Footer from "./Footer.tsx";

export interface LayoutProps {
    children: ComponentChildren
}

export default function Layout(props: LayoutProps) {
    return <div className="min-h-screen w-full flex flex-col">
    <div className={`grid bg-gradient-to-b from-base to-crust text-text flex-auto`}>
    <main class="p-4 mx-auto max-w-screen-md ">
    {props.children}
    </main>
    </div>
    <Footer></Footer>
    </div>;
}
