import { withAdmin } from '../../../HOC';
import { useGetAllOrderQuery } from '../api/orderApi';
import OrderList from '../components/OrderList';
import { Loading } from '../../../app/layout';

const AllOrders = () => {
  const { data, isLoading } = useGetAllOrderQuery('Orders');
  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && <OrderList isLoading={isLoading} orderData={data} />}
    </>
  );
};

export default withAdmin(AllOrders);
