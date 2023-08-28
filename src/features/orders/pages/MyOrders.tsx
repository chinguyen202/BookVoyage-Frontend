import { withAuth } from '../../../HOC';
import { useGetAllOrderByUserQuery } from '../api/orderApi';
import OrderList from '../components/OrderList';
import { Loading } from '../../../app/layout';

const MyOrders = () => {
  const { data, isLoading } = useGetAllOrderByUserQuery('Orders');
  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && <OrderList isLoading={isLoading} orderData={data} />}
    </>
  );
};

export default withAuth(MyOrders);
