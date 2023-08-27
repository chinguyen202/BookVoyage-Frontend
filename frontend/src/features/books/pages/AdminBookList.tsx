import { withAdmin } from '../../../HOC';
import { Loading } from '../../../app/layout';
import { Book } from '../../../app/models';
import { useGetBooksQuery } from '../api/bookApi';

const AdminBookList = () => {
  const { data, isLoading } = useGetBooksQuery(null);
  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <div className="table p-5">
          <div className="d-flex align-item-center justify-content-between">
            <h1 className="text-dark">Books list</h1>
            <button className="btn btn-dark">Add new</button>
          </div>
          <div className="p-2">
            <div className="row border">
              <div className="col-1">Image</div>
              <div className="col-2">Name</div>
              <div className="col-2">ISBN</div>
              <div className="col-1">Price</div>
              <div className="col-1">In Stock</div>
              <div className="col-1">Published year</div>
              <div className="col-2">Category</div>
              <div className="col-2">Action</div>
            </div>
            {data.map((book: Book, index: number) => (
              <div className="row border" key={index}>
                <div className="col-1">
                  <img
                    src={book.imageUrl}
                    alt={book.title}
                    style={{ width: '100%', maxWidth: '60px' }}
                  />
                </div>
                <div className="col-2">{book.title}</div>
                <div className="col-2">{book.isbn}</div>
                <div className="col-1">{book.unitPrice}</div>
                <div className="col-1">{book.unitInStock}</div>
                <div className="col-1 text-center">{book.yearOfPublished}</div>
                <div className="col-2">{book.category.name}</div>
                <div className="col-2">
                  <button className="btn btn-success">
                    <i className="bi bi-pencil-fill"></i>
                  </button>
                  <button className="btn btn-danger mx-2">
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default withAdmin(AdminBookList);
