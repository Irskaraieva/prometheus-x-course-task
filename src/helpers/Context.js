import { createContext, useState, useEffect } from "react";

export const ContextLogin = createContext();

export const ContextLoginProvider = ({children}) => {

    const [userName, setUserName] = useState(localStorage.getItem("username"));

    useEffect(() => {
        localStorage.setItem("username", userName);
      }, [userName]);

    const value = {
        userName,
        setUserName,
    }
    

    return (
        <ContextLogin.Provider value={value}>
            {children}
        </ContextLogin.Provider>
    )
}