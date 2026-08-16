import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import api, {
    setAccessToken
} from "../api/backendapi.jsx";


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [token, setToken] = useState(null);

    const [isAuthenticated, setIsAuthenticated] =
        useState(false);

    const [loading, setLoading] =
        useState(true);


    // ==========================================
    // Restore session when application starts
    // ==========================================

    useEffect(() => {

        const restoreSession = async () => {

            try {

                const response =
                    await api.post("/auth/refresh");

                const newAccessToken =
                    response.data.accessToken;

                setAccessToken(newAccessToken);

                setToken(newAccessToken);

                setIsAuthenticated(true);

                // If backend returns user
                if (response.data.user) {

                    setUser(response.data.user);

                }

            } catch (error) {

                console.log(
                    "No active session"
                );

                setAccessToken(null);

                setToken(null);

                setUser(null);

                setIsAuthenticated(false);

            } finally {

                setLoading(false);

            }

        };


        restoreSession();

    }, []);


    // ==========================================
    // LOGIN
    // ==========================================

    const login = (userData, jwtToken) => {

        // DO NOT store token in localStorage

        setAccessToken(jwtToken);

        setToken(jwtToken);

        setUser(userData);

        setIsAuthenticated(true);

    };


    // ==========================================
    // LOGOUT
    // ==========================================

    const logout = async () => {

        try {

            await api.post("/auth/logout");

        } catch (error) {

            console.error(
                "Logout error:",
                error
            );

        } finally {

            setAccessToken(null);

            setToken(null);

            setUser(null);

            setIsAuthenticated(false);

        }

    };


    return (

        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                isAuthenticated,
                login,
                logout
            }}
        >

            {children}

        </AuthContext.Provider>

    );

};


export const useAuth = () => {

    return useContext(AuthContext);

};