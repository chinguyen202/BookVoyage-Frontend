import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Author } from '../../../app/models';
import { useGetBookByIdQuery } from '../api/bookApi';
import { setBook } from '../../../storage/redux/bookSlice';
import { Loading, MiniLoader, NotFound } from '../../../app/layout';
import { useUpsertShoppingCartMutation } from '../../shoppingCart/api/shoppingCartApi';

// USER ID - 858ae18a-fd9e-4125-bc32-5bf2d4c97475
const BookDetails = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading } = useGetBookByIdQuery(bookId);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [upsertShoppingCart] = useUpsertShoppingCartMutation();

  useEffect(() => {
    if (!isLoading) {
      dispatch(setBook(data));
    }
  }, [isLoading]);

  if (isLoading) return <Loading />;
  if (!data) return <NotFound />;

  const handleQuantity = (counter: number) => {
    let newQuantity = quantity + counter;
    if (newQuantity === 0) {
      newQuantity = 1;
    }
    if (newQuantity > data.unitInStock) {
      newQuantity = data.unitInStock;
    }
    setQuantity(newQuantity);
    return;
  };

  const handleAddToCart = async (bookId: string) => {
    setIsAddingToCart(true);
    const payload = {
      buyerId: '858ae18a-fd9e-4125-bc32-5bf2d4c97475',
      bookId: bookId,
      quantity: quantity,
    };
    if (payload !== null) {
      await upsertShoppingCart(payload);
    }
    setIsAddingToCart(false);
  };

  return (
    <div className="container pt-4 pt-md-5">
      <div className="row">
        <div className="col-7">
          <h2 className="text-success">{data.title}</h2>
          <span>
            <span
              className="badge bg-dark pt-2"
              style={{ height: '40px', fontSize: '20px' }}
            >
              {data.category.name}
            </span>
          </span>
          <span>
            {data.authors.map((author: Author) => (
              <span
                key={author.id}
                className="badge bg-light text-dark pt-2"
                style={{ height: '40px', fontSize: '20px' }}
              >
                {data.fullName}
              </span>
            ))}
          </span>
          <ul className="list-group">
            <li className="list-group-item">ISBN: {data.isbn}</li>
            {data.authors.map((author: Author) => (
              <li className="list-group-item" key={author.id}>
                Publisher: {author.publisher}
              </li>
            ))}
            <li className="list-group-item">
              Published year: {data.yearOfPublished}
            </li>
          </ul>
          <p style={{ fontSize: '20px', color: '#344e41' }} className="pt-2">
            Summary
          </p>
          <p style={{ fontSize: '15px' }} className="pt-2">
            {data.summary}
          </p>
          <span className="h3">${data.unitPrice}</span> &nbsp;&nbsp;&nbsp;
          <span
            className="pb-2 p-3"
            style={{ border: '1px solid #333', borderRadius: '30px' }}
          >
            <i
              onClick={() => handleQuantity(-1)}
              className="bi bi-dash p-1"
              style={{ fontSize: '25px', cursor: 'pointer' }}
            ></i>
            <span className="h3 mt-3 px-3">{quantity}</span>
            <i
              onClick={() => handleQuantity(+1)}
              className="bi bi-plus p-1"
              style={{ fontSize: '25px', cursor: 'pointer' }}
            ></i>
          </span>
          <div className="row pt-4">
            <div className="col-5">
              {isAddingToCart ? (
                <button disabled className="btn btn-success form-control">
                  <MiniLoader />
                </button>
              ) : (
                <button
                  className="btn btn-success form-control"
                  onClick={() => handleAddToCart(data.id)}
                >
                  Add to cart
                </button>
              )}
            </div>
            <div className="col-5">
              <button
                className="btn btn-secondary form-control"
                onClick={() => navigate(-1)}
              >
                Back to home
              </button>
            </div>
          </div>
        </div>
        <div className="col-5">
          <img src={data.imageUrl} width="100%" alt={data.title} />
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
