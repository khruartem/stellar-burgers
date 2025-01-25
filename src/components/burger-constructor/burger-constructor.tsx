import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  addOrderIngredients,
  clearAllData,
  getConstructorIngredientsIdSelector,
  getConstructorItemsSelector
} from '../../features/ingredients/ingredientsSlice';
import {
  clearOrderModalData,
  getOrderModalDataSelector,
  getOrderRequestSelector,
  orderBurger
} from '../../features/order/orderSlice';
import { useDispatch, useSelector } from '../../services/store';
import { isAuthCheckedSelector } from '../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(getConstructorItemsSelector);
  const orderRequest = useSelector(getOrderRequestSelector);
  const orderModalData = useSelector(getOrderModalDataSelector);
  const constructorItemsIds = useSelector(getConstructorIngredientsIdSelector);
  const isAuthChecked = useSelector(isAuthCheckedSelector);

  const onOrderClick = () => {
    if (!isAuthChecked) {
      return navigate('/login');
    }
    if (!constructorItems.bun || orderRequest) return;
    dispatch(orderBurger(constructorItemsIds));
    dispatch(
      addOrderIngredients([
        ...constructorItems.ingredients,
        constructorItems.bun
      ])
    );
  };
  const closeOrderModal = () => {
    dispatch(clearOrderModalData());
    dispatch(clearAllData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price! * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  //return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData || null}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
