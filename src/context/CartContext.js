import { createContext, useState, useEffect } from "react";

export const CartItemCount = createContext();

export const CartItemCountProvider = ({children}) => {

    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);
    
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

