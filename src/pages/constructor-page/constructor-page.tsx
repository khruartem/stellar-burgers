import { AppDispatch } from '../../services/store';

import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import {
  getBurgerIngredients,
  getIsIngredientsLoadingSelector
} from '../../features/ingredients/ingredientsSlice';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const ConstructorPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getBurgerIngredients());
    //console.log(1);
  }, []);

  /** TODO: взять переменную из стора */
  const isIngredientsLoading = useSelector(getIsIngredientsLoadingSelector);

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
