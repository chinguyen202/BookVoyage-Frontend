import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

let confirmImage = require('../../../assets/images/books.jpg');
const OrderConfirmed = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set a timeout to navigate to home page
    const timeoutId = setTimeout(() => {
      navigate('/');
    }, 5000);
    // Clean up the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <div className="w-100 text-center d-flex justify-content-center align-items-center">
      <div>
        <i
          style={{ fontSize: '7rem' }}
          className="bi bi-check2-circle text-success"
        ></i>
        <div className="pb-5">
          <h2 className="text-success">Ordered has been created!</h2>
          <p>We will send you an email when we ship the order.</p>
          <p>Thank you for using our services!</p>
          <img
            src={confirmImage}
            style={{ width: '30%', borderRadius: '30px' }}
          ></img>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmed;
