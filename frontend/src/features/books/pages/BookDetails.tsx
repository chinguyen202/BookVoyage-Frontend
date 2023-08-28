import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Author } from '../../../app/models';
import { useGetBookByIdQuery } from '../api/bookApi';
import { setBook } from '../../../storage/redux/bookSlice';
import { Loading, MiniLoader, NotFound } from '../../../app/layout';
import { useUpsertShoppingCartMutation } from '../../shoppingCart/api/shoppingCartApi';
import { toastNotify } from '../../../utility';
import { RootState } from '../../../storage/redux/store';

// Display detail information of the book
const BookDetails = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading } = useGetBookByIdQuery(bookId);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [upsertShoppingCart] = useUpsertShoppingCartMutation();
  const currentUser = useSelector((state: RootState) => state.authStore);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setBook(data));
    }
  }, [isLoading, dispatch, data]);

  if (isLoading) return <Loading />;
  if (!data) return <NotFound />;

  // Handle the counter
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

  // Add to cart
  const handleAddToCart = async (bookId: string) => {
    // Check if the user is logged in, if not, redirect to log in page
    if (!currentUser.id) {
      navigate('/login');
      return;
    }
    // If the user login, process to add the item to cart
    setIsAddingToCart(true);
    const payload = {
      buyerId: currentUser.id,
      bookId: bookId,
      quantity: quantity,
    };
    if (payload !== null) {
      const response: any = await upsertShoppingCart(payload);
      if ('data' in response) {
        toastNotify('Added book to cart!');
      } else {
        toastNotify(response, 'error');
      }
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
            {data.authors.map((author: Author, index: number) => (
              <span
                key={index}
                className="badge bg-light text-dark pt-2"
                style={{ height: '40px', fontSize: '20px' }}
              >
                {author.fullName}
              </span>
            ))}
          </span>
          <ul className="list-group">
            <li className="list-group-item">ISBN: {data.isbn}</li>
            {data.authors.map((author: Author, index: number) => (
              <li className="list-group-item" key={index}>
                Publisher: {author.publisher}
              </li>
            ))}
            <li className="list-group-item">
              Published year: {data.yearOfPublished}
            </li>
          </ul>
          <p style={{ fontSize: '20px' }} className="pt-2">
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
          <div className="row pt-4" style={{ marginBottom: '3rem' }}>
            <div className="col-5">
              {isAddingToCart ? (
                <button disabled className="btn btn-success form-control">
                  <MiniLoader size={2} />
                </button>
              ) : (
                <button
                  className="btn btn-dark form-control"
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
          <img
            src={data.imageUrl}
            width="80%"
            style={{ marginLeft: '7rem', marginTop: '5rem' }}
            alt={data.title}
          />
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
