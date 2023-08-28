import { Author } from './author';
import { Category } from './category';

export interface Book {
  id: string;
  title: string;
  isbn: string;
  unitPrice: number;
  unitInStock: number;
  summary: string;
  yearOfPublished: number;
  imageUrl: string;
  category: Category;
  authors: Author[];
}
