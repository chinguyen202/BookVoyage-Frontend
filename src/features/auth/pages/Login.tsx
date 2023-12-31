import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useLoginUserMutation } from '../api/authApi';
import { decodeJwtToken, inputHelper } from '../../../utility';
import { UserFormValues, User } from '../../../app/models';
import { setLoggedInUser } from '../../../storage/redux/authSlice';
import { Loading } from '../../../app/layout';

// Page for login
const Login = () => {
  const [loginUser] = useLoginUserMutation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
  });

  // Handle user input for login form
  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  // Handle form incase of submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // user input form value
    const user: UserFormValues = {
      email: userInput.email,
      password: userInput.password,
    };
    // Call the login API
    const response = await loginUser(user);
    if ('data' in response) {
      // If response is success
      if (response.data.isSuccess) {
        // Extract the token from response value
        const { token } = response.data.value;
        const loggedInUser: User = decodeJwtToken(token);
        // Save token to local storage
        localStorage.setItem('token', token);
        // Add user info for redux store
        dispatch(setLoggedInUser(loggedInUser));
        // redirect to home
        navigate('/');
      } else {
        setError(response.data.error);
      }
    }
    setLoading(false);
  };

  return (
    <div className="container text-center">
      {loading && <Loading />}
      <form method="post" onSubmit={handleSubmit}>
        <h1 className="mt-5"> Login</h1>
        <div className="mt-5">
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter email"
              name="email"
              value={userInput.email}
              onChange={handleUserInput}
              required
            />
          </div>
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              name="password"
              value={userInput.password}
              onChange={handleUserInput}
              required
            />
          </div>
        </div>
        <div className="mt-2">
          {error && <p className="text-danger">{error}</p>}
          <button
            type="submit"
            className="btn btn-dark"
            style={{ width: '200px' }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
