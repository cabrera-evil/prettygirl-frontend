import React, { useState } from "react";


const ConfigContext = React.createContext();


export const ConfigProvider = (props) => {
    const [isLogged, setIsLogged] = useState(false);
    const [role, setRole] = useState();

    const Logout = () => {
        setIsLogged(false);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
    }

    const Login = () => {
        setIsLogged(localStorage.getItem('token') ? true : false)
    }

    const Role = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            if (user.role === 'ADMIN_ROLE') setRole(true);
            else setRole(false);
        }
        else setRole(false);
    }

    const state = {
        isLogged,
        role,
        Logout,
        Login,
        Role,
    }

    return (
        <ConfigContext.Provider value={state} {...props} />
    )
}

export const useConfigContext = () => {
    const context = React.useContext(ConfigContext);

    if (!context)
        throw new Error("useConfigContext must be call inside of a ConfigContextProvider component");

    return context;
}