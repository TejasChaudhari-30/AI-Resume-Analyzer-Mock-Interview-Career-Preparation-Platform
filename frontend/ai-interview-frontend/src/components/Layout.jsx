import Sidebar from "./Sidebar.jsx";

function Layout({ children }) {

    return (

        <div className="flex">

            <Sidebar />

            <main className="flex-1 bg-gray-100 min-h-screen p-8">

                {children}

            </main>

        </div>

    );

}

export default Layout;