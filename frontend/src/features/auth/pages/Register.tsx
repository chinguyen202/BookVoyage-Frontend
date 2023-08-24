import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { decodeJwtToken, inputHelper, toastNotify } from '../../../utility';
import { useRegisterUserMutation } from '../api/authApi';
import { User, UserFormValues } from '../../../app/models/user';
import { setLoggedInUser } from '../../../storage/redux/authSlice';
import { Loading } from '../../../app/layout';

// Register page
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerUser] = useRegisterUserMutation();
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
  });

  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const user: UserFormValues = {
      firstName: userInput.firstName,
      lastName: userInput.lastName,
      userName: userInput.userName,
      email: userInput.email,
      password: userInput.password,
    };
    // Send the request to API
    const response = await registerUser(user);
    if ('data' in response) {
      // If the request is success
      if (response.data.isSuccess) {
        toastNotify('Registration successful!');
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
        // In case of error
        toastNotify(response.data.error, 'error');
      }
    }
    setLoading(false);
  };

  return (
    <div className="container text-center">
      {loading && <Loading />}
      <form method="post" onSubmit={handleSubmit}>
        <h1 className="mt-5"> Register</h1>
        <div className="col-sm-6 offset-sm-3 col-xs-12 ,t-4">
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            name="firstName"
            value={userInput.firstName}
            onChange={handleUserInput}
            required
          />
        </div>
        <div className="col-sm-6 offset-sm-3 col-xs-12 ,t-4">
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            name="lastName"
            value={userInput.lastName}
            onChange={handleUserInput}
            required
          />
        </div>
        <div className="col-sm-6 offset-sm-3 col-xs-12 ,t-4">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            name="userName"
            value={userInput.userName}
            onChange={handleUserInput}
            required
          />
        </div>
        <div className="col-sm-6 offset-sm-3 col-xs-12 ,t-4">
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name="email"
            value={userInput.email}
            onChange={handleUserInput}
            required
          />
        </div>
        <div className="col-sm-6 offset-sm-3 col-xs-12 ,t-4">
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
        <div className="col-sm-6 offset-sm-3 col-xs-12 ,t-4"></div>
        <div className="mt-5">
          <button
            type="submit"
            className="btn btn-dark"
            style={{ width: '200px' }}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
