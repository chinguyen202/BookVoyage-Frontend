import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Book } from '../../../app/models';
import { BookCard } from '../index';
import { useGetBooksQuery } from '../api/bookApi';
import { setBook } from '../../../storage/redux/bookSlice';
import { Loading } from '../../../app/layout';
import { RootState } from '../../../storage/redux/store';

const BookList = () => {
  const dispatch = useDispatch();
  const [books, setBooks] = useState<Book[]>();
  const { data, isLoading } = useGetBooksQuery(null);
  // Get search value
  const searchValue = useSelector((state: RootState) => state.bookStore.search);

  useEffect(() => {
    if (data) {
      const tempArray = handleFilters(searchValue);
      setBooks(tempArray);
    }
  }, [searchValue]);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setBook(data));
      setBooks(data);
    }
  }, [isLoading]);

  const handleFilters = (search: string) => {
    let tempBooks = [...data];

    // search
    if (search) {
      const tempSearchBooks = [...tempBooks];
      tempBooks = tempSearchBooks.filter((item: Book) =>
        item.title.toUpperCase().includes(search.toUpperCase())
      );
    }

    return tempBooks;
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container row">
      {books != null &&
        books.length > 0 &&
        books?.map((book: Book, index: number) => (
          <BookCard book={book} key={index} />
        ))}
    </div>
  );
};

export default BookList;
