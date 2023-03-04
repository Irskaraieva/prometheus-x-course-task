import { useContext, useEffect } from "react";
import SinglePursheBook from "./SinglePursheBook";
import EmptyCart from "../../components/emptyCart/EmptyCart";
import img from "./../../images/imageNotFound.png";
import { AiFillDelete } from 'react-icons/ai';
import { CartItemCount } from "../../context/CartContext";
import { ContextLogin } from "../../helpers/Context";
import BtnToTheStore from "../btnToTheStore/BtnToTheStore";


const PurchaseList = () => {
  const { cart, setCart } = useContext(CartItemCount);
  const { userName } = useContext(ContextLogin);

  useEffect ( () => {
      const cartContent = JSON.parse(localStorage.getItem("cart")) || [];
      if (cart) {
          setCart(cartContent)
      }
  }, [])

  const cartItems = Object.values(cart);
  const totalPriceSum = parseFloat(cartItems.reduce((acc, {totalPrice}) => acc + totalPrice, 0)).toFixed(2);

  const handleDelete = (id) => {
    const newCart = cartItems.filter(el => el.id !== id);
    setCart(newCart);   
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const cleanCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  }

  if (!userName) {
    return (
      <div>
        Please back to enter your name to be able to enter the store...
      </div>
    );
  }

  return (
    <>
      <div className="purchaseList">
        <button type="submit" className="purchase" onClick={() => cleanCart()}>
          <span>Purchase</span>
        </button>
      
        <div className="purchase__total__btn">
          {cartItems.length > 0 ? (
            <BtnToTheStore />
          ) : null}
          <span className="total__price__pur">
            Total price, $ {totalPriceSum}
          </span>
        </div>

        <div className="list__items">

          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div className="single__li" key={item.id} >
                <SinglePursheBook
                    id={item.id}
                    title={item.title}
                    img={item.image || img}
                    price={item.price}
                    totalPrice={parseFloat(item.totalPrice).toFixed(2)}
                    count={item.quantity}
                    handleDelete={handleDelete}
                />
                <AiFillDelete className="dlete__cart" onClick={() => handleDelete(item.id)}/>
              </div>
            ))            
          ) : (
            <>
              <EmptyCart />
              {localStorage.removeItem("cart")}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PurchaseList;