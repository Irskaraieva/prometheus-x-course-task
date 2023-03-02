import searchIcon from "./../../images/search_icon.svg";
import { useRef, useEffect } from "react";

const Inputs = ({ searchValue, selectedPrice, handleFiltersChange }) => {
  
  const handleSelectChange = (event) => {
    handleFiltersChange(searchValue, event.target.value);
  };

  const handleSearchChange = (event) => {
    handleFiltersChange(event.target.value, selectedPrice);
  };

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <section className="input__section">
      <div className="input">
        <input
          ref={inputRef}
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="Search by book name"
          className="search__input"
        />
        <img id="arrow_up" className="search__icon" src={searchIcon} alt="arrow-up" height="25px" />
      </div>

      <div className="price">
        <select value={selectedPrice} onChange={handleSelectChange} className="choose__price__input">
          <option value="all">All Books</option>
          <option value="low">Price: 0-15</option>
          <option value="medium">Price: 15-30</option>
          <option value="high">Price: 30 +</option>
        </select>
      </div>
    </section>
  );
};
 
export default Inputs;