import { FormEvent, useEffect, useState } from 'react';
import { toastNotify } from '../../../utility';
import {
  useCreateCategoryMutation,
  useGetCategoryByIdQuery,
} from '../api/categoryApi';
import { Loading } from '../../../app/layout';
import { useParams } from 'react-router-dom';

const UpsertCategory = () => {
  const { categoryId } = useParams();
  const [inputName, setInputName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [createCategory] = useCreateCategoryMutation();
  const { data } = useGetCategoryByIdQuery(categoryId);

  useEffect(() => {
    if (data) {
      const tempData = {
        name: data.name,
      };
    }
  }, [data]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      name: inputName,
    };
    const response: any = await createCategory(data);
    if ('data' in response) {
      toastNotify('Create category successfully');
    } else {
      toastNotify('Fail to create category', 'error');
    }
    setIsLoading(false);
  };
  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <div className="container text-center">
          <form method="post" onSubmit={handleSubmit}>
            <h1 className="mt-5"> Add category</h1>
            <div className="col-sm-6 offset-sm-3 col-xs-12 ,t-4">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="name"
                onChange={(e) => setInputName(e.target.value)}
                required
              />
            </div>

            <div className="col-sm-6 offset-sm-3 col-xs-12 ,t-4"></div>
            <div className="mt-5">
              <button
                type="submit"
                className="btn btn-dark"
                style={{ width: '200px' }}
              >
                Add category
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default UpsertCategory;
