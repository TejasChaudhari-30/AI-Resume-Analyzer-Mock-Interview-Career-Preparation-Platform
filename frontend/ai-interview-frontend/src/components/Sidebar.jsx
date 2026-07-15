import { Link, useLocation } from "react-router-dom";

import {
    FaHome,
    FaUser,
    FaFileAlt,
    FaRobot,
    FaHistory,
    FaSignOutAlt
} from "react-icons/fa";
import { useAuth } from "../authcontext/useAuth.jsx";

function Sidebar() {

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
        // {
        //     name: "Resume Reviews",
        //     path: "/resume/reviews",
        //     icon: <FaRobot />
        // },
        {
            name: "Interview Management",
            path: "/interview/interviewmanager",
            icon: <FaRobot />
        },
        // {
        //     name: "Interview History",
        //     path: "/interview/history",
        //     icon: <FaHistory />
        // },
        {
            name: "Profile",
            path: "/profile",
            icon: <FaUser />
        }
    ];

    return (

        <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col">

            <div className="text-2xl font-bold p-6 border-b border-gray-700">
                AI Career Prep
            </div>

            <nav className="flex-1 mt-4">

                {
                    menus.map((item) => (

                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-6 py-3 hover:bg-gray-800 transition
                                ${location.pathname === item.path
                                    ? "bg-blue-600"
                                    : ""
                                }`}
                        >
                            {item.icon}
                            <span>{item.name}</span>
                        </Link>

                    ))
                }

            </nav>

            <button
                onClick={logout}
                className="flex items-center gap-3 p-6 hover:bg-red-600 transition"
            >
                <FaSignOutAlt />
                Logout
            </button>

        </aside>

    );
}

export default Sidebar;