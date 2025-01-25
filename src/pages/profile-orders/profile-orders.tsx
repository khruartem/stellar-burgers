import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import {
  getOrders,
  getOrdersRequestSelector,
  getOrdersSelector
} from '../../features/order/orderSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getOrdersSelector);
  const isOrderRequest = useSelector(getOrdersRequestSelector);

  return isOrderRequest ? <Preloader /> : <ProfileOrdersUI orders={orders} />;
};
