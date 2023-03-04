import Inputs from "../inputs/Inputs";
import Card from "./Card";
import { books } from "../../helpers/cardsList";
import imageDefault from "./../../images/imageNotFound.png";
import ScrollToTopOnMount from "../../helpers/ScrollToTop";
import { useState } from "react";

const CardList = () => {
  const [displayedBooks, setDisplayedBooks] = useState(books);
  const [searchValue, setSearchValue] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('all');

  const handleFiltersChange = (newSearchValue, newSelectedPrice) => {
    setSearchValue(newSearchValue);
    setSelectedPrice(newSelectedPrice);

  const filteredBooks = books.filter((book) => {
    const nameMatch = book.title.toLowerCase().includes(newSearchValue.toLowerCase());
    const priceMatch = newSelectedPrice === 'all' ||
      (newSelectedPrice === 'low' && book.price > 0 && book.price <= 15) ||
      (newSelectedPrice === 'medium' && book.price > 15 && book.price <= 30) ||
      (newSelectedPrice === 'high' && book.price > 30);
    return nameMatch && priceMatch;
  });

  setDisplayedBooks(filteredBooks);
  };

  const hasBooks = displayedBooks.length > 0;

  return (
    <>
      <ScrollToTopOnMount />
      <Inputs
        searchValue={searchValue}
        selectedPrice={selectedPrice}
        handleFiltersChange={handleFiltersChange}
      />
      <section className="cards__catalog" id="cardsCatalog">
        {hasBooks ? (
          displayedBooks.map((book) => {
            let imageURL;
            if (book.image) {
              imageURL = book.image;
            } else {
              imageURL = imageDefault;
            }

            return (
              <Card
                key={book.id}
                id={book.id}
                title={book.title}
                img={imageURL}
                author={book.author}
                price={book.price}
              />
            );
          })
        ) : (
          <div className="is__not__found">No books found with the selected criteria.</div>
        )}
      </section>
    </>
  );
};
 
export default CardList;