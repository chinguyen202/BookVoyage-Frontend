import React from 'react';

const Register = () => {
  return (
    <div className="container text-center">
      <form method="post">
        <h1 className="mt-5"> Register</h1>
        <div className="col-sm-6 offset-sm-3 col-xs-12 ,t-4">
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            required
          />
        </div>
        <div className="col-sm-6 offset-sm-3 col-xs-12 ,t-4">
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            required
          />
        </div>
        <div className="col-sm-6 offset-sm-3 col-xs-12 ,t-4">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            required
          />
        </div>
        <div className="col-sm-6 offset-sm-3 col-xs-12 ,t-4">
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            required
          />
        </div>
        <div className="col-sm-6 offset-sm-3 col-xs-12 ,t-4">
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
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
