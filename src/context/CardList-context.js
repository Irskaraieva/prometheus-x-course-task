import { createContext, useState, useEffect } from 'react';

export const BookContext = createContext();

const BookContextProvider = (props) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('./books.json');
      const data = await response.json();
      setBooks(data);
    };
    fetchBooks();
  }, []);

  return (
    <BookContext.Provider value={{ books }}>
      {props.children}
    </BookContext.Provider>
  );
};

export default BookContextProvider;