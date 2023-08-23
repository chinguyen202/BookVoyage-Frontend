import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Book } from '../../../app/models';
import { BookCard } from '../index';
import { useGetBooksQuery } from '../api/bookApi';
import { setBook } from '../../../storage/redux/bookSlice';
import { Loading } from '../../../app/layout';

const BookList = () => {
  const { data, isLoading } = useGetBooksQuery(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isLoading) {
      dispatch(setBook(data));
    }
  }, [isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container row">
      {data != null &&
        data.length > 0 &&
        data?.map((book: Book, index: number) => (
          <BookCard book={book} key={index} />
        ))}
    </div>
  );
};

export default BookList;
