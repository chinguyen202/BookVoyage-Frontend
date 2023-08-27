import { withAdmin } from '../../../HOC';
import { Loading } from '../../../app/layout';
import { Author } from '../../../app/models';
import { useGetAuthorsQuery } from '../api/authorApi';

const AllAuthor = () => {
  const { data, isLoading } = useGetAuthorsQuery(null);
  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <div className="table p-5">
          <div className="d-flex align-item-center justify-content-between">
            <h1 className="text-dark">Author list</h1>
            <button className="btn btn-dark">Add new</button>
          </div>
          <div className="p-2">
            <div className="row border">
              <div className="col-3">Name</div>
              <div className="col-3">Publisher</div>
              <div className="col-3">Action</div>
            </div>
            {data.map((author: Author, index: number) => (
              <div className="row border" key={index}>
                <div className="col-3">{author.fullName}</div>

                <div className="col-3">{author.publisher}</div>
                <div className="col-3">
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

export default withAdmin(AllAuthor);
