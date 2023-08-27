import React, { ChangeEvent, FormEvent, useState } from 'react';
import { inputHelper, toastNotify } from '../../../utility';
import { useCreateAuthorMutation } from '../api/authorApi';
import { Loading } from '../../../app/layout';

const UpsertAuthor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    fullName: '',
    publisher: '',
  });
  const [createAuthor] = useCreateAuthorMutation();

  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const author = {
      fullName: userInput.fullName,
      publisher: userInput.publisher,
    };
    console.log(author);
    // Send the request to API
    const response: any = await createAuthor(author);
    console.log(response);
    if ('data' in response) {
      toastNotify('Author added successfully!');
    } else {
      toastNotify('Fail to create author', 'error');
    }
    setIsLoading(false);
  };
  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <div className="container text-center">
          <form method="post" onSubmit={handleSubmit}>
            <h1 className="mt-5"> Add author</h1>
            <div className="col-sm-6 offset-sm-3 col-xs-12 ,t-4">
              <input
                type="text"
                className="form-control"
                placeholder="Full name"
                name="fullName"
                value={userInput.fullName}
                onChange={handleUserInput}
                required
              />
            </div>
            <div className="col-sm-6 offset-sm-3 col-xs-12 ,t-4">
              <input
                type="text"
                className="form-control"
                placeholder="Publisher"
                name="publisher"
                value={userInput.publisher}
                onChange={handleUserInput}
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
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default UpsertAuthor;
