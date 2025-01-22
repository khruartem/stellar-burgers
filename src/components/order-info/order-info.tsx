import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsSelector } from '../../features/ingredients/ingredientsSlice';
import {
  addRequestedOrder,
  getOrderByNumber,
  getOrderRequestSelector,
  getOrderSelector,
  getRequestedOrderSelector
} from '../../features/order/orderSlice';
import { AppDispatch } from '../../services/store';
import { useLocation, useParams } from 'react-router-dom';
import { getOrderByNumberApi } from '@api';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  /** TODO: взять переменные orderData и ingredients из стора */
  const orderData = useSelector(getRequestedOrderSelector);
  const ingredients: TIngredient[] = useSelector(getIngredientsSelector);

  useEffect(() => {
    dispatch(getOrderByNumber(location.state?.orderNumber));
  }, []);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
