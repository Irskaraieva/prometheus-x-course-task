import { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ContextLogin } from "../../helpers/Context";
import { FcReading } from 'react-icons/fc';

const SignIn = () => {

  const { setUserName } = useContext(ContextLogin);  
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    localStorage.clear();
  }, []);
   
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
       
  const handleSubmit = () => {
    if (inputValue.length >= 4 && inputValue.length <= 16) {
      localStorage.setItem('username', inputValue);
      setUserName(inputValue);
    }
  };
  
  return ( 
    <main className="main">
      <div className="main__content">
        <figure className="figure__sign">
          <FcReading className="figure__img" />
        </figure>

        <form action="/" method="post" className="form" onSubmit={handleSubmit}>
    
          <span className="label__for__name">
            Please enter your name to be able to enter the store...
          </span>

          <input
            type="text"
            ref={inputRef}
            id="name"
            name="user_name"
            placeholder="type Username"
            className="input__for__name"
            value={inputValue}
            onChange={handleInputChange}
          />
        
          <Link to='/book-list'>
            <button
              type="submit"
              className={`btn__sign__in ${inputValue.length < 4 || inputValue.length > 16 ? 'inactive' : ''}`}
              disabled={inputValue.length < 4 || inputValue.length > 16} onClick={() => handleSubmit()}
            >
            Sign-In
            </button>
          </Link>
        </form >
      </div>
    </main>
  );
}
 
export default SignIn;