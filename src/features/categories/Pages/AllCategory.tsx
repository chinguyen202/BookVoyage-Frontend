import { useNavigate } from 'react-router-dom';
import { withAdmin } from '../../../HOC';
import { Loading } from '../../../app/layout';
import { Category } from '../../../app/models';
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from '../api/categoryApi';
import { toastNotify } from '../../../utility';
import { useState } from 'react';

const AllCategory = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { data, isLoading } = useGetCategoriesQuery(null);
  const [deleteCategory] = useDeleteCategoryMutation();
  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await deleteCategory(id);
      toastNotify('Delete category success');
      window.location.reload();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <div className="table p-5">
          <div className="d-flex align-item-center justify-content-between">
            <h1 className="text-dark">Category list</h1>
            <button
              className="btn btn-dark"
              onClick={() => navigate('/categories/upsert')}
            >
              Add new
            </button>
          </div>
          <div className="p-2">
            <div className="row border">
              <div className="col-3">Id</div>
              <div className="col-2">Name</div>
              <div className="col-3">Created Date</div>
              <div className="col-3">Modified Date</div>
              <div className="col-1">Action</div>
            </div>
            {data.map((category: Category, index: number) => (
              <div className="row border" key={index}>
                <div className="col-3">{category.id}</div>
                <div className="col-2">{category.name}</div>
                <div className="col-3">
                  {new Date(category.createdAt).toLocaleString()}
                </div>
                <div className="col-3">
                  {new Date(category.modifiedAt).toLocaleString()}
                </div>

                <div className="col-1">
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => handleDelete(category.id)}
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

export default withAdmin(AllCategory);
