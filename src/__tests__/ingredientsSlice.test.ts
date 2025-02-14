import { configureStore } from '@reduxjs/toolkit';
import {
  reducer as ingredientReducer,
  removeIngredientInBurger,
  addIngredientToBurger,
  moveIngredient,
  getBurgerIngredients,
  initialState
} from '../features/ingredients/ingredientsSlice';

describe('ingredientsSlice tests', () => {
  const mockStore = configureStore({
    reducer: ingredientReducer
  });

  const main = {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0
  };

  const sauce = {
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
    __v: 0
  };

  const ingredients = [main, sauce];

  it('add ingredient', () => {
    mockStore.dispatch(addIngredientToBurger(main));
    const { id, ...restProps } =
      mockStore.getState().constructorItems.ingredients[0];
    const result = restProps;

    expect(result).toEqual(main);
  });

  it('move ingredient', () => {
    const payload = { direction: 1, index: 1 };

    mockStore.dispatch(addIngredientToBurger(sauce));

    mockStore.dispatch(moveIngredient(payload));

    const result = mockStore
      .getState()
      .constructorItems.ingredients.map(({ id, ...restProps }) => restProps);

    expect(result[0]).toStrictEqual(sauce);
    expect(result[1]).toStrictEqual(main);
  });

  it('delete ingredient', () => {
    mockStore.dispatch(removeIngredientInBurger(0));

    const { id, ...restProps } =
      mockStore.getState().constructorItems.ingredients[0];
    const result = restProps;

    expect(result).toStrictEqual(main);
  });

  it('getBurgerIngredients fulfilled', () => {
    const action = {
      type: getBurgerIngredients.fulfilled.type,
      payload: ingredients
    };
    const state = ingredientReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      ingredients,
      mains: [main],
      sauces: [sauce]
    });
  });

  it('getBurgerIngredients pending', () => {
    const action = {
      type: getBurgerIngredients.pending.type
    };
    const state = ingredientReducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: true, error: null });
  });

  it('getBurgerIngredients rejected', () => {
    const action = {
      type: getBurgerIngredients.rejected.type,
      error: { message: 'Test' }
    };
    const state = ingredientReducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: false, error: 'Test' });
  });
});
