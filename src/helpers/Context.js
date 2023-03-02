import { createContext, useState } from "react";

export const ContextLogin = createContext();

export const ContextLoginProvider = ({children}) => {

    const [userName, setUserName] = useState('');

       
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