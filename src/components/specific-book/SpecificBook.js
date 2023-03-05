import { Link, useParams } from "react-router-dom";
import { useState, useContext } from "react";
import { books } from "../../helpers/cardsList";
import img from "./../../images/imageNotFound.png";
import arrowUp from "./../../images/arrow-up.png";
import arrowDown from "./../../images/arrow-down.png";
import ScrollToTopOnMount from "../../helpers/ScrollToTop";
import { CartItemCount } from "./../../context/CartContext";

const SpecificBook = () => {
  
  const {id} = useParams();
  const book = books[id];
  let singlePrise = book.price;

  const [inputNum, setInputNum] = useState({
    inputNumber: 1,
    totalPrice: book.price
  });

  const increaseButton = () => {
    let enterValue = parseInt(inputNum.inputNumber) || 0;
      enterValue = parseInt(enterValue) + 1;
    if (enterValue > 42) {
      enterValue = 42;
      alert("Sorry, but max quantity is 42.");
    }

    setInputNum({
      inputNumber: enterValue,
      totalPrice: (enterValue * parseFloat(singlePrise)).toFixed(2)
    })        
  };

  const decreaseButton = () => {
    let enterValue = parseInt(inputNum.inputNumber) - 1;
    if (enterValue <= 0) {
        alert("Sorry, but is not possible to buy 0 or less books.");
        enterValue = 1;
    }

    setInputNum ({
      inputNumber: enterValue,
      totalPrice: (enterValue * parseFloat(singlePrise)).toFixed(2)
    })
  };

  function handInput(event) {
    let inpNum = event.target.value;

    if (inpNum > 42) {
      inpNum = 42;
      alert("Sorry, but max quantity is 42");
      }  
      else if (inpNum < 0) {
        inpNum = 1;
      alert("Sorry, but the minimum quantity cannot be less than 1.");
    }
      else if (inpNum == 0) {
        inpNum = inpNum.replace(/^0/, 1);
    }

    setInputNum({
      inputNumber: inpNum,
      totalPrice: (inpNum * parseFloat(singlePrise)).toFixed(2)
    })
  }

  function someKeyDown(event) {
    if ((event.key === ',') || (event.key === '.') || (event.key === '+') || (event.key === 'e') || (event.key === '-')) {
      event.preventDefault()
    }
  }
  
  let imageURL;
  if (book.image) {

    imageURL = book.image;
    } else {
      imageURL = img;
  }

  const { setCart } = useContext(CartItemCount);
  const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingCartItem = existingCart.find((item) => item.id === book.id);

  function handleAddToCart() {
    if (inputNum.inputNumber !== '') {
      const { title, price, image, id } = book;
      const quantity = parseInt(inputNum.inputNumber);
      const totalPrice = parseFloat(inputNum.totalPrice);
      const imageUrl = image ? image : img;

      if (existingCartItem) {
        const itemIndex = existingCart.findIndex((item) => item.id === book.id);
        const itemQuantity = existingCartItem.quantity + quantity;
        existingCart[itemIndex] = {
          ...existingCartItem,
          quantity: itemQuantity > 42 ? 42 : itemQuantity,
          totalPrice: existingCartItem.totalPrice + totalPrice
        };
        localStorage.setItem("cart", JSON.stringify(existingCart));
        setCart(existingCart);
        
        } else {
        const updatedCart = [
          ...existingCart,
          {
            id,
            title,
            quantity: quantity > 42 ? 42 : quantity,
            price,
            totalPrice,
            image: imageUrl,
          },
        ];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCart(updatedCart);
      }
    }
  }

  return ( 
  <>
  <ScrollToTopOnMount />
    <div className="spec__book">

      <figure className="figure">
        <img src={imageURL} width="300px" alt="" className="figure__img__spec" />
      </figure>
    
      <section className="section1">
        <p><span className="book__name">{book.title}</span></p>
        <p><span className="author">{book.author}</span></p>
        <p><span className="book__level">Book level:</span> Beginner</p>
        <p><span className="book__tags">Book tags:</span> core </p>
      </section>
    
      <section className="right__main">

        <section className="section1__media">
          <p><span className="book__name">{book.title}</span></p>
          <p><span className="author">{book.author}</span></p>
          <p><span className="book__level">Book level:</span> Beginner</p>
          <p><span className="book__tags">Book tags:</span> core</p>
        </section>

        <section className="section__price">
    
          <ul type="none" className="countedit">
            <li>
              <span>Prise, $</span>
              <span id="singlePrice" className="singlprice">{singlePrise}</span>
            </li>

            {existingCartItem && (
              <li>
                <span className="section__price__info">Already in the cart: {existingCartItem.quantity} out of 42 possible</span>
              </li>
            )}
            
            <li>
              <section className="choice__count">
                <span className="count">Count</span>

                <div className="data__count">
                  <input type="number" id="input_number" className="input__number"
                  value={inputNum.inputNumber}
                  onChange={handInput} 
                  onKeyDown={someKeyDown}
                  />
                  <div className="count">
                    <img id="arrow_up" className="arrow__up" src={arrowUp} alt="" height="15px" onClick={increaseButton} />
                    <img id="arrow_down" className="arrow__down" src={arrowDown} alt="" height="15px" onClick={decreaseButton} />
                  </div>
                </div>
              </section>
            </li>

            <li>
              <span className="total__price__text">Total price</span>
              <span id="totalPrice" className="totalprice">$ {inputNum.totalPrice}</span>
            </li>

            <li>
              <Link to='/cart' className="price__btn__link" >
              <button type="submit" className="price__btn"  onClick={handleAddToCart}>
                <span>Add to cart</span>
              </button>
              </Link>
            </li>

          </ul>
        </section>
      </section>

      <section className="description">
        <p className="short__description"><span className="description__text">Description:</span> {book.shortDescription}</p>
        <p className="description__content">{book.description}</p>
      </section>
      
    </div>
  </>
  );
}
 
export default SpecificBook;