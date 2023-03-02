import { createContext, useState } from "react";

export const CartItemCount = createContext();

export const CartItemCountProvider = ({children}) => {

    const [cart, setCart] = useState([]);
    
    const value = {
        cart,
        setCart
    }
    

    return (
        <CartItemCount.Provider value={value}>
            {children}
        </CartItemCount.Provider>
    )
}

