import { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import { Menu } from "lucide-react";

function Layout({ children }) {

    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (

        <div className="min-h-screen bg-slate-100 dark:bg-[#111318]">

            {/* Mobile Header */}

            <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5 shadow-sm dark:border-slate-800 dark:bg-[#181b21] lg:hidden">

                <button

                    onClick={() => setMobileOpen(true)}

                    className="rounded-xl p-2 hover:bg-slate-100 dark:hover:bg-slate-800"

                >

                    <Menu className="h-6 w-6" />

                </button>

                <h1 className="font-bold">

                    AI Career Prep

                </h1>

                <div className="w-6"></div>

            </header>

            <Sidebar

                collapsed={collapsed}

                setCollapsed={setCollapsed}

                mobileOpen={mobileOpen}

                setMobileOpen={setMobileOpen}

            />

            <main

                className={`

                    transition-all

                    duration-300

                    bg-slate-100

                    dark:bg-[#111318]

                    min-h-screen

                    p-6

                    lg:p-8

                    ${collapsed ? "lg:ml-20" : "lg:ml-72"}

                `}

            >

                {children}

            </main>

        </div>

    );

}

export default Layout;