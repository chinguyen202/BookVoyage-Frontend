import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Book } from '../../../app/models';
import { baseUrl } from '../../../utility/constants';

const BookDetails = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('id :', bookId);
    if (bookId) {
      axios
        .get(`${baseUrl}/books/${bookId}`)
        .then((response) => setBook(response.data))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
  }, [bookId]);

  if (loading) return <h3>Loading ...</h3>;
  if (!book) return <h3>Product not found</h3>;

  return (
    <div className="container pt-4 pt-md-5">
      <div className="row">
        <div className="col-7">
          <h2 className="text-success">{book.title}</h2>
          <span>
            <span
              className="badge bg-dark"
              pt-2
              style={{ height: '40px', fontSize: '20px' }}
            >
              {book.category.name}
            </span>
          </span>
          <span>
            {book.authors.map((author) => (
              <span
                className="badge bg-light text-dark"
                pt-2
                style={{ height: '40px', fontSize: '20px' }}
              >
                {author.fullName}
              </span>
            ))}
          </span>
          <p style={{ fontSize: '20px', color: '#344e41' }} className="pt-2">
            Summary
          </p>
          <p style={{ fontSize: '15px' }} className="pt-2">
            {book.summary}
          </p>
          <span className="h3">$10</span> &nbsp;&nbsp;&nbsp;
          <span
            className="pb-2 p-3"
            style={{ border: '1px solid #333', borderRadius: '30px' }}
          >
            <i
              className="bi bi-dash p-1"
              style={{ fontSize: '25px', cursor: 'pointer' }}
            ></i>
            <span className="h3 mt-3 px-3">XX</span>
            <i
              className="bi bi-plus p-1"
              style={{ fontSize: '25px', cursor: 'pointer' }}
            ></i>
          </span>
          <div className="row pt-4">
            <div className="col-5">
              <button className="btn btn-success form-control">
                Add to cart
              </button>
            </div>
            <div className="col-5">
              <button className="btn btn-secondary form-control">
                Back to home
              </button>
            </div>
          </div>
        </div>
        <div className="col-5">
          <img src={book.imageUrl} width="100%" alt={book.title} />
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
