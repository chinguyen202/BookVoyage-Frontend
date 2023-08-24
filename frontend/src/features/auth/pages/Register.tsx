import React, { ChangeEvent, FormEvent, useState } from 'react';
import { inputHelper } from '../../../utility';
import { useRegisterUserMutation } from '../api/authApi';
import { UserFormValues } from '../../../app/models/user';

const Register = () => {
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
    const response = await registerUser(user);
    console.log('REGISTER DATA: ', user);
    if (response) {
      console.log('REGISTER RESPONSE:', response);
    } else {
      console.log('REGISTER ERROR:', response);
    }

    setLoading(false);
  };

  return (
    <div className="container text-center">
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
