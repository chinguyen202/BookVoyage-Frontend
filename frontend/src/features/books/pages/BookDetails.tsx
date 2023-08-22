import React from 'react';

const BookDetails = () => {
  return (
    <div className="container pt-4 pt-md-5">
      <div className="row">
        <div className="col-7">
          <h2 className="text-success">NAME</h2>
          <span>
            <span
              className="badge bg-dark"
              pt-2
              style={{ height: '40px', fontSize: '20px' }}
            >
              Category
            </span>
          </span>
          <p style={{ fontSize: '20px' }} className="pt-2">
            Description
          </p>
          <span className="h3">$10</span> &nbsp;&nbsp;&nbsp;
          <span
            className="pb-2 p-3"
            style={{ border: '1px solid #333', borderRadius: '30px' }}
          >
            <i
              className="bi bi-dash p-1"
              style={{ fontSize: '25px', cursor: 'pointer' }}
            ></i>
            <span className="h3 mt-3 px-3">XX</span>
            <i
              className="bi bi-plus p-1"
              style={{ fontSize: '25px', cursor: 'pointer' }}
            ></i>
          </span>
          <div className="row pt-4">
            <div className="col-5">
              <button className="btn btn-success form-control">
                Add to cart
              </button>
            </div>
            <div className="col-5">
              <button className="btn btn-secondary form-control">
                Back to home
              </button>
            </div>
          </div>
        </div>
        <div className="col-5">
          <img src="https://placehold.co/400" width="100%" alt="" />
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
