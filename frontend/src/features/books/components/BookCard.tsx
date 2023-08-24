import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Book } from '../../../app/models';
import { useUpsertShoppingCartMutation } from '../../shoppingCart/api/shoppingCartApi';
import { MiniLoader } from '../../../app/layout';
import { toastNotify } from '../../../utility';
import { RootState } from '../../../storage/redux/store';

interface Props {
  book: Book;
}

// Component to display each book info
const BookCard = (props: Props) => {
  const navigate = useNavigate();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [upsertShoppingCart] = useUpsertShoppingCartMutation();
  const currentUser = useSelector((state: RootState) => state.authStore);

  const handleAddToCart = async (bookId: string) => {
    if (!currentUser.id) {
      navigate('/login');
      return;
    }
    setIsAddingToCart(true);
    const payload = {
      buyerId: currentUser.id,
      bookId: bookId,
      quantity: 1,
    };
    if (payload !== null) {
      const response: any = await upsertShoppingCart(payload);
      if (response) {
        toastNotify('Added book to cart!');
      }
    }
    setIsAddingToCart(false);
  };

  return (
    <div className="col-md-4 col-12 p-4">
      <div className="card" style={{ boxShadow: '0 1px 7px 0 rgb(0 0 0 /50%' }}>
        <div className="card-body pt-2">
          <div className="row col-10 offset-1 p-4">
            {/* book image  */}
            <Link to={`/books/${props.book.id}`}>
              <img
                src={props.book.imageUrl}
                style={{ borderRadius: '5%' }}
                alt={props.book.title}
                className="w-100 mt-5 image-box"
              />
            </Link>
          </div>
          {isAddingToCart ? (
            <div
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
              }}
            >
              <MiniLoader />
            </div>
          ) : (
            <i
              onClick={() => handleAddToCart(props.book.id)}
              className="bi bi-cart-plus btn btn-outline-danger"
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                padding: '5px 10px',
                borderRadius: '3px',
                outline: 'none !important',
                cursor: 'pointer',
              }}
            ></i>
          )}

          <div className="text-center">
            <Link
              to={`/books/${props.book.id}`}
              style={{ textDecoration: 'none', color: '#bc6c25' }}
            >
              <p className="card-title m-0 fs-3">{props.book.title}</p>
            </Link>
            <p className="badge bg-secondary" style={{ fontSize: '12px' }}>
              {props.book.category.name}
            </p>
            <div className="row text-center">
              <h4>${props.book.unitPrice}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
