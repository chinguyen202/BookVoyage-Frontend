import { Book } from './book';

export interface CartItem {
  quantity: number;
  shoppingCartId: string;
  bookId: string;
  book: Book;
  id: string;
}
