import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { getIngredientsSelector } from '../../features/ingredients/ingredientsSlice';
import {
  getOrderByNumber,
  getorderInfoRequestSelector,
  getRequestedOrderSelector
} from '../../features/order/orderSlice';
import { useDispatch, useSelector } from '../../services/store';
import { useLocation, useParams } from 'react-router-dom';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const orderNumber = useParams();

  console.log(location);

  /** TODO: взять переменные orderData и ingredients из стора */
  const orderData = useSelector(getRequestedOrderSelector);
  const ingredients: TIngredient[] = useSelector(getIngredientsSelector);
  const orderInfoRequest = useSelector(getorderInfoRequestSelector);

  useEffect(() => {
    dispatch(
      getOrderByNumber(location.state?.orderNumber || orderNumber.number)
    );
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

  if (!orderInfo || orderInfoRequest) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} location={location} />;
};
