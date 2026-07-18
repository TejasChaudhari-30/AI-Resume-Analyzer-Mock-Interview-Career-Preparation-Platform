import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../authcontext/useAuth.jsx";

import {
    FaHome,
    FaUser,
    FaFileAlt,
    FaRobot,
    FaSignOutAlt,
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa";

import { X } from "lucide-react";

function Sidebar({

    collapsed,

    setCollapsed,

    mobileOpen,

    setMobileOpen,

}) {

    const location = useLocation();

    const { logout } = useAuth();

    const menus = [

        {
            name: "Dashboard",
            path: "/dashboard",
            icon: <FaHome />
        },

        {
            name: "Resume Management",
            path: "/resume/resumemanager",
            icon: <FaFileAlt />
        },

        {
            name: "Interview Management",
            path: "/interview/interviewmanager",
            icon: <FaRobot />
        },

        {
            name: "Profile",
            path: "/profile",
            icon: <FaUser />
        }

    ];

   
return (

    <>

        {/* Mobile Overlay */}

        {mobileOpen && (

            <div
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
                onClick={() => setMobileOpen(false)}
            />

        )}

        <aside
            className={`
                fixed
                left-0
                top-0
                z-50
                h-screen
                transition-all
                duration-300
                ease-[cubic-bezier(.22,1,.36,1)]
                shadow-xl
                border-r
                border-slate-200
                dark:border-slate-800
                bg-white
                dark:bg-[#181b21]

                ${collapsed ? "lg:w-20" : "lg:w-72"}

                w-72

                transform

                ${
                    mobileOpen
                        ? "translate-x-0"
                        : "-translate-x-full lg:translate-x-0"
                }
            `}
        >
            {/* ================= Logo ================= */}

           <div className="p-6">
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-xl font-bold text-white shadow-lg">
                AI
            </div>

            {!collapsed && (
                <div>
                    <h2 className="font-bold text-slate-900 dark:text-white">
                        AI Career Prep
                    </h2>
                    <p className="text-xs text-slate-500">
                        Interview Platform
                    </p>
                </div>
            )}
        </div>

        {/* Mobile Close Button */}
        <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden rounded-xl p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800"
        >
            <X className="h-5 w-5" />
        </button>
    </div>
</div>
               

               {/* Desktop Collapse Button */}
<button
    onClick={() => setCollapsed(!collapsed)}
    className="hidden lg:flex absolute -right-4 top-8 h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white shadow-lg transition hover:scale-110 dark:border-slate-700 dark:bg-[#181b21] dark:text-white"
>
    {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
</button>

            

            {/* ================= Navigation ================= */}

            <nav className="mt-8 flex flex-col gap-2 px-3">

                {

                    menus.map((item) => {

                        const active =

                            location.pathname === item.path;

                        return (

                            <Link

                                key={item.path}

                                to={item.path}

                                title={collapsed ? item.name : ""}
                                onClick={() => setMobileOpen(false)}

                                className={`

                                group

                                relative

                                flex

                                items-center

                                gap-4

                                rounded-2xl

                                px-4

                                py-4

                                transition-all

                                duration-300

                                ${

                                    active

                                        ?

                                        "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"

                                        :

                                        "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"

                                }

                            `}

                            >

                                <span className="text-lg">

                                    {item.icon}

                                </span>

                                {

                                    !collapsed &&

                                    <span className="font-medium">

                                        {item.name}

                                    </span>

                                }

                            </Link>

                        );

                    })

                }

            </nav>

            {/* ================= Bottom ================= */}

            <div className="absolute bottom-0 left-0 w-full border-t border-slate-200 p-4 dark:border-slate-800">

                <button

                    onClick={logout}

                    className="flex w-full items-center justify-center gap-3 rounded-2xl bg-red-500 px-4 py-3 font-medium text-white transition hover:bg-red-600"

                >

                    <FaSignOutAlt />

                    {

                        !collapsed &&

                        "Logout"

                    }

                </button>

            </div>

              </aside>

    </>

);

}

export default Sidebar;