import { useNavigate } from 'react-router-dom';
import { withAdmin } from '../../../HOC';
import { Loading } from '../../../app/layout';
import { Author } from '../../../app/models';
import { useDeleteAuthorMutation, useGetAuthorsQuery } from '../api/authorApi';
import { useState } from 'react';
import { toast } from 'react-toastify';

const AllAuthor = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [deleteAuthor] = useDeleteAuthorMutation();
  const { data, isLoading } = useGetAuthorsQuery(null);
  console.log(data);
  const handleDelete = async (id: string) => () => {
    toast.promise(deleteAuthor(id), {
      pending: 'Deleting...',
      success: 'Deleted successfully',
      error: 'Error when deleting',
    });
  };
  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && data && (
        <div className="table p-5">
          <div className="d-flex align-item-center justify-content-between">
            <h1 className="text-dark">Author list</h1>
            <button
              className="btn btn-dark"
              onClick={() => navigate('/authors/upsert')}
            >
              Add new
            </button>
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
                    <i
                      className="bi bi-pencil-fill"
                      onClick={() => navigate('/authors/upsert/' + author.id)}
                    ></i>
                  </button>
                  <button className="btn btn-danger mx-2">
                    <i
                      className="bi bi-trash-fill"
                      onClick={() => handleDelete(author.id)}
                    ></i>
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
