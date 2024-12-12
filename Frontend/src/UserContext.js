import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);
    const [ token, setToken ] = useState(null);
    const [ email, setEmail ] = useState(null);

    const handleLogin = ( userData, jwtToken, email ) => {
        setUser(userData);
        setToken(jwtToken);
        setEmail(email);
        localStorage.setItem("accessToken", jwtToken);
    };

    const handleLogout = () => {
        setUser(null);
        setToken(null);
    };

    const contextvalue = {
        user,
        email,
        token, 
        login : handleLogin,
        logout: handleLogout,
    };

    return (
        <UserContext.Provider value={contextvalue}>
            {children}
        </UserContext.Provider>
    );
};