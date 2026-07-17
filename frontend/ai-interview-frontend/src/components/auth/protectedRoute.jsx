import { Navigate } from "react-router-dom";
import { useAuth } from "../../authcontext/useAuth.jsx";
function ProtectedRoute({ children }) {

    const { isAuthenticated,loading } = useAuth();

     if (loading) {
    return <div>Loading...</div>;
}
    if (!isAuthenticated) {
        alert("User session is expired pls relogin");
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;