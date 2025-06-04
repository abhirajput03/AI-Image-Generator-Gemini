import { Outlet } from "react-router";
import { Footer, Header, Sidebar } from "../components";
import { PostProvider, } from "../context/post.context";

export const Layout = () => {
    return (
        <>
            <Header />
            <PostProvider>
                <div className="flex">
                    <Sidebar />
                    <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)] flex gap-1">
                        <Outlet />
                    </main>
                </div>
            </PostProvider>
            <Footer />
        </>
    )
}
