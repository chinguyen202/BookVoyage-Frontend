import { useNavigate } from 'react-router-dom';
import { Loading } from '../../../app/layout';
import { Order } from '../../../app/models';
import OrderListProps from '../types/orderListType';

const OrderList = ({ isLoading, orderData }: OrderListProps) => {
  const navigate = useNavigate();

  return (
    <>
      {isLoading && <Loading />}

      {!isLoading && (
        <div className="table p-5">
          <h1>Orders list</h1>
          <div className="p-2">
            <div className="row border">
              <div className="col-3">ID</div>
              <div className="col-3">Name</div>
              <div className="col-1">Total</div>
              <div className="col-1">Items</div>
              <div className="col-2">Status</div>
              <div className="col-2"></div>
            </div>
            {orderData?.map((order: Order, index: number) => {
              return (
                <div className="row border" key={index}>
                  <div className="col-3">{order.id}</div>
                  <div className="col-3">{order.shippingAddress.fullName}</div>
                  <div className="col-1">${order.subtotal!.toFixed(2)}</div>
                  <div className="col-1">{order.totalQuantity}</div>
                  <div className="col-2">{order.orderStatus}</div>
                  <div className="col-2">
                    <button
                      className="btn btn-dark rounded-pill"
                      onClick={() => navigate('/order/orderDetail/' + order.id)}
                    >
                      Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default OrderList;
