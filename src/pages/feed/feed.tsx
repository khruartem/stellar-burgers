import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFeeds,
  getFeedsSelector,
  getFeedsRequestSelector,
  getOrders
} from '../../features/order/orderSlice';
import { AppDispatch } from '../../services/store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getFeedsSelector);
  const isOrdersLoading = useSelector(getFeedsRequestSelector);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getFeeds());
    dispatch(getOrders());
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
            dispatch(getOrders());
          }}
        />
      )}
    </>
  );
};
