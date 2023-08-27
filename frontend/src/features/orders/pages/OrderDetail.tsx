import { useNavigate, useParams } from 'react-router-dom';

import { useGetOrderDetailQuery } from '../api/orderApi';
import { Loading } from '../../../app/layout';
import { OrderItem } from '../../../app/models';

// Order detail page
const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetOrderDetailQuery(orderId);
  const orderItems = data?.orderItems;

  return (
    <>
      {isLoading && <Loading />}
      {data && (
        <div className="container my-5 mx-auto p-5 w-100">
          <h2 className="text-center mb-3">Order</h2>
          <h5> No. {data.id}</h5>
          <h5>
            {' '}
            Total amount: <span style={{ color: 'red' }}>${data.subtotal}</span>
          </h5>
          <h5>
            {' '}
            Status: <span style={{ color: 'red' }}>{data.orderStatus}</span>
          </h5>
          <div className="d-flex justify-content-space-between mt-3">
            {' '}
            {/* Use flexbox */}
            <div
              className="border p-3"
              style={{ background: 'ghostwhite', flex: 1, marginRight: '30px' }}
            >
              <div className="table p-5">
                <h5 className="text-center">Shipping address</h5>
                <div className="p-2">
                  <div className="row border">
                    <div className="col-5">Name</div>
                    <div className="col-7">{data.shippingAddress.fullName}</div>
                  </div>
                  <div className="row border">
                    <div className="col-5">Address</div>
                    <div className="col-7">{data.shippingAddress.street}</div>
                  </div>
                  <div className="row border">
                    <div className="col-5"></div>
                    <div className="col-7">
                      {data.shippingAddress.postCode +
                        ' ' +
                        data.shippingAddress.state +
                        ',' +
                        data.shippingAddress.country}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="border p-3"
              style={{ background: 'ghostwhite', flex: 1, marginLeft: '30px' }}
            >
              <h5 className="text-center">Order detail </h5>
              {/* Display order details  */}
              {orderItems.map((orderItem: OrderItem, index: number) => (
                <div
                  key={index}
                  className="d-flex flex-sm-row flex-column align-items-center custom-card-shadow rounded m-3"
                  style={{ background: 'ghostwhite' }}
                >
                  <div className="p-5">
                    <img src={orderItem.imageUrl} alt={orderItem.bookName} />
                  </div>
                  <div className="p-5 mx-6" style={{ width: '70%' }}>
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 style={{ fontWeight: 300 }}>{orderItem.bookName}</h5>
                      <h5>{orderItem.quantity}</h5>
                    </div>
                    <div className="flex-fill">
                      <h6 className="text-danger">${orderItem.price}</h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-5">
            <button
              className="btn btn-dark form-control"
              onClick={() => navigate('/')}
            >
              Back to home
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetail;
