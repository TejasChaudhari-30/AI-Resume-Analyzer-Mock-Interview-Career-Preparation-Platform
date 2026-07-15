import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setloading]=useState(true);

    useEffect(() => {

        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            setIsAuthenticated(true);

            // Later:
            // Fetch user profile here using the token
        }

        setloading(false);

    }, []);

    const login = (userData, jwtToken) => {

        localStorage.setItem("token", jwtToken);

        setUser(userData);
        setToken(jwtToken);
        setIsAuthenticated(true);

    };

    const logout = () => {

        localStorage.removeItem("token");

        setUser(null);
        setToken(null);
        setIsAuthenticated(false);

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