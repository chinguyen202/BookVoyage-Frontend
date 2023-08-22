import { Book } from '../../app/models';

interface Props {
  book: Book;
}

// Component to display each book info
const BookCard = (props: Props) => {
  return (
    <div className="col-md-4 col-12 p-4">
      <div className="card" style={{ boxShadow: '0 1px 7px 0 rgb(0 0 0 /50%' }}>
        <div className="card-body pt-2">
          <div className="row col-10 offset-1 p-4">
            {/* book image  */}
            <img
              src={props.book.imageUrl}
              style={{ borderRadius: '5%' }}
              alt={props.book.title}
              className="w-100 mt-5 image-box"
            />
          </div>

          <i
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

          <div className="text-center">
            <p className="card-title m-0 text-success fs-3">
              {props.book.title}
            </p>
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
