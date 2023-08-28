import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { withAdmin } from '../../../HOC';
import { Loading } from '../../../app/layout';
import { Author } from '../../../app/models';
import { useDeleteAuthorMutation, useGetAuthorsQuery } from '../api/authorApi';
import { toastNotify } from '../../../utility';

const AllAuthor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [deleteAuthor] = useDeleteAuthorMutation();
  const { data, isLoading } = useGetAuthorsQuery(null);

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await deleteAuthor(id);
      toastNotify('Delete author success');
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
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
              <div className="col-4">Name</div>
              <div className="col-4">Publisher</div>
              <div className="col-3">Action</div>
            </div>
            {data.map((author: Author, index: number) => (
              <div className="row border" key={index}>
                <div className="col-4">{author.fullName}</div>

                <div className="col-4">{author.publisher}</div>
                <div className="col-3">
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => handleDelete(author.id)}
                  >
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
