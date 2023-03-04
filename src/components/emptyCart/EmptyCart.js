import emptyCart from "./../../images/cart.svg";
import BtnToTheStore from "../btnToTheStore/BtnToTheStore";


const EmptyCart = () => {
    return ( 
        <main className="main">
            
        <div className="empty__cart">
            <figure className="figure__emp">
                <img src={emptyCart} alt="emptyCart" className="emptyCart" />
            </figure>
            <p className="figcaption__emp">The cart is empty...</p>

            <BtnToTheStore />
        </div>
          
        </main>
     );
}
 
export default EmptyCart;