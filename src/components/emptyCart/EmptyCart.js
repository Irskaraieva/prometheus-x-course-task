import emptyCart from "./../../images/cart.svg";
import { Link } from "react-router-dom";


const EmptyCart = () => {
    return ( 
        <main className="main">
            
        <div className="empty__cart">
            <figure className="figure__emp">
                <img src={emptyCart} alt="emptyCart" className="emptyCart" />
            </figure>
            <p className="figcaption__emp">The cart is empty...</p>

            <Link to='/book-list'>
                <button type="submit" className="purchase__to__shop">
                    <span>To the store</span>
                </button>
            </Link>
        </div>
          
        </main>
     );
}
 
export default EmptyCart;