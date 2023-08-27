import { withAuth } from '../../../HOC';
import { useGetAllOrdersQuery } from '../api/orderApi';
import OrderList from '../components/OrderList';
import { Loading } from '../../../app/layout';

const MyOrders = () => {
  const { data, isLoading } = useGetAllOrdersQuery('Orders');
  console.log('ORDER DATA', data);
  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && <OrderList isLoading={isLoading} orderData={data} />}
    </>
  );
};

export default withAuth(MyOrders);
