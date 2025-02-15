import { FC, useEffect } from 'react';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import {
  getFeeds,
  getFeedsSelector,
  getFeedsRequestSelector,
  getOrders
} from '../../features/order/orderSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getFeedsSelector);
  const isOrdersLoading = useSelector(getFeedsRequestSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeeds());
    //dispatch(getOrders());
  }, []);

  return (
    <>
      {isOrdersLoading ? (
        <Preloader />
      ) : (
        <FeedUI
          orders={orders}
          handleGetFeeds={() => {
            dispatch(getFeeds());
            //dispatch(getOrders());
          }}
        />
      )}
    </>
  );
};
