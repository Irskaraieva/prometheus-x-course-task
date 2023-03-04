import style from './Header.module.css';
import { useState, useEffect, useContext } from "react";
import { RiShoppingCart2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai';
import { CartItemCount } from "./../../context/CartContext";
import { ContextLogin } from "../../helpers/Context";
import { FcReading } from 'react-icons/fc';

const Header = () => {

    const [navigate, setNavigate] = useState(false);
    const { userName, setUserName } = useContext(ContextLogin);
    const { cart, setCart } = useContext(CartItemCount);
    const cartItems = Object.values(cart);

    useEffect ( () => {
      const savedUsername = localStorage.getItem('username') || '';
      if (userName) {
        setUserName(savedUsername)
      }
    }, [setUserName, userName])

    const signOut = () => {
      setUserName('');
      localStorage.removeItem("username");
      setCart([]);
      localStorage.removeItem("cart");
    }

    return (
        <header className={style.header}>
        <div className={style.header__content}>

          <div className={style.leftheader}>
            <a href="https://prometheus.org.ua/prometheus-plus/front-end-ciklum/" ><span className={style.brandName}>X-course task / </span></a>
            <a href="https://example.com" target="_blank" rel="noreferrer" className={style.author__header}><span> Iryna Skaraieva</span></a>
          </div>

        
          <nav className={(navigate && window.innerWidth < 700) ? [style.nav__navigate, style.active].join(' ') : [style.nav__navigate] }>
            { (userName !== '') && (
              <>
              <Link to='/cart' className={style.cart__header}>
                <RiShoppingCart2Line color="gray" size={32}  onClick={() => setNavigate(false)}/>
                {cartItems.length > 0 && <span className="cart__count">{cartItems.length}</span>}
              </Link>

              <Link to='/sign-in'>
                <button
                  type="submit"
                  className={style.btn}
                  onClick={() => {
                    setNavigate(false);
                    signOut()}}
                >
                  <span>Sing-Out</span>
                </button>
              </Link>
              </>
            )}
            <a href="https://example.com">< FcReading className={style.headerimg2} onClick={() => setNavigate(false)}/>
            </a>
            <a href="https://example.com" className={style.username} onClick={() => setNavigate(false)}><span>{userName ? userName : 'Username'}</span></a>
          </nav>
       
          <div onClick={() => setNavigate(!navigate)} className={style.burger}>
            {navigate ? <AiOutlineClose size={32} color= 'white'/> : <AiOutlineMenu size={32} color= 'white'/>}
          </div>
        </div>
        </header>
      );
      }
 
export default Header;