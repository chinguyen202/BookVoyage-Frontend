import { useParams } from 'react-router-dom';
import { useGetOrderDetailQuery } from '../api/orderApi';
const OrderDetail = () => {
  const { orderId } = useParams();
  console.log('ORDER ID:', orderId);
  const { data, isLoading } = useGetOrderDetailQuery(orderId);
  console.log('EACH ORDER: ', data);
  if (!isLoading && data) {
  }

  return (
    <div
      className="container my-5 mx-auto p-5 w-100 text-center"
      style={{ maxWidth: '750px' }}
    >
      <h3>Order Detail</h3>
      <div className="border pb-5 pt-3">
        <div className="card p-3" style={{ background: 'ghostwhite' }}>
          <h5>Shipping address : </h5>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
