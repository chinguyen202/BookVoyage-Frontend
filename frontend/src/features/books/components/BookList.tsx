import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Book } from '../../../app/models';
import { BookCard } from '../index';

const BookList = () => {
  const [books, setBooks] = useState<Book[]>();

  useEffect(() => {
    axios.get('http://localhost:5000/api/books').then((response) => {
      console.log(response);
      setBooks(response.data);
    });
  }, []);

  return (
    <div className="container row">
      {books != null &&
        books.length > 0 &&
        books?.map((book, index) => <BookCard book={book} key={index} />)}
    </div>
  );
};

export default BookList;
