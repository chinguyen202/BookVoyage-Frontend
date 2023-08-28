import { Order } from '../../../app/models';

export default interface OrderListProps {
  isLoading: boolean;
  orderData: Order[];
}
