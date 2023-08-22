import axios from 'axios';
import { useEffect, useState } from 'react';
import { Book } from '../models/book';

const App = () => {
  const [books, setBooks] = useState<Book[]>();

  useEffect(() => {
    axios.get('http://localhost:5000/api/books').then((response) => {
      console.log(response);
      setBooks(response.data);
    });
  }, []);

  return (
    <div>
      <ul>
        {books?.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
