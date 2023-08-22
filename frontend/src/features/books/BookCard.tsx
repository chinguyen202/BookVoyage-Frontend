import { Book } from '../../app/models';

interface Props {
  book: Book;
}

const BookCard = (props: Props) => {
  return <div>{props.book.title}</div>;
};

export default BookCard;
