import { getIngredientsApi } from '../../utils/burger-api';
import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export const getBurgerIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => getIngredientsApi()
);

type TIngredientState = {
  ingredients: TIngredient[];
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderIngredients: TIngredient[];
  constructorItemsIds: string[];
  loading: boolean;
  error: string | null | undefined;
};

export const initialState: TIngredientState = {
  ingredients: [],
  buns: [],
  mains: [],
  sauces: [],
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderIngredients: [],
  constructorItemsIds: [],
  loading: false,
  error: null
};

export const prepareFunction = (ingredient: TIngredient) => {
  const id = nanoid();
  return { payload: { ...ingredient, id } };
};

export const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    addBunToBurger: {
      reducer: (
        state: TIngredientState,
        action: PayloadAction<TConstructorIngredient>
      ) => {
        state.constructorItems.bun = action.payload;
        state.constructorItemsIds.push(action.payload._id);
      },
      prepare: prepareFunction
    },
    addIngredientToBurger: {
      reducer: (
        state: TIngredientState,
        action: PayloadAction<TConstructorIngredient>
      ) => {
        state.constructorItems.ingredients.push(action.payload);
        state.constructorItemsIds.push(action.payload._id);
      },
      prepare: prepareFunction
    },
    moveIngredient: (
      state: TIngredientState,
      action: PayloadAction<{ direction: number; index: number }>
    ) => {
      //direction: 1 - up, direction: 0 - down
      let index = action.payload.index;
      if (!action.payload.direction) {
        const tempIngredient = state.constructorItems.ingredients[index + 1];
        state.constructorItems.ingredients[index + 1] =
          state.constructorItems.ingredients[index];
        state.constructorItems.ingredients[index] = tempIngredient;
      } else {
        const tempIngredient = state.constructorItems.ingredients[index];
        state.constructorItems.ingredients[index] =
          state.constructorItems.ingredients[index - 1];
        state.constructorItems.ingredients[index - 1] = tempIngredient;
      }
    },
    removeIngredientInBurger: (
      state: TIngredientState,
      action: PayloadAction<number>
    ) => {
      state.constructorItems.ingredients.splice(action.payload, 1);
      state.constructorItemsIds.splice(action.payload, 1);
    },
    clearAllData: (state: TIngredientState) => {
      state.constructorItems = {
        bun: null,
        ingredients: []
      };
      state.constructorItemsIds = [];
    },
    addOrderIngredients: (
      state: TIngredientState,
      action: PayloadAction<TConstructorIngredient[]>
    ) => {
      state.orderIngredients = action.payload.map(
        (ingredient) =>
          ({
            _id: ingredient._id,
            name: ingredient.name,
            type: ingredient.type,
            proteins: ingredient.proteins,
            fat: ingredient.fat,
            carbohydrates: ingredient.calories,
            calories: ingredient.calories,
            price: ingredient.price,
            image: ingredient.image,
            image_large: ingredient.image_large,
            image_mobile: ingredient.image_mobile
          }) as TIngredient
      );
    }
  },
  selectors: {
    getIngredientsSelector: (state) => state.ingredients,
    getBunsSelector: (state) => state.buns,
    getMainsSelector: (state) => state.mains,
    getSaucesSelector: (state) => state.sauces,
    getConstructorItemsSelector: (state) => state.constructorItems,
    getConstructorIngredientsIdSelector: (state) => state.constructorItemsIds,
    getOrderIngredientsSelector: (state) => state.orderIngredients,
    getIsIngredientsLoadingSelector: (state) => state.loading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBurgerIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBurgerIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getBurgerIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.ingredients = action.payload;
        state.buns = action.payload.filter(
          (ingredient) => ingredient.type === 'bun'
        );
        state.mains = action.payload.filter(
          (ingredient) => ingredient.type === 'main'
        );
        state.sauces = action.payload.filter(
          (ingredient) => ingredient.type === 'sauce'
        );
      });
  }
});

export const reducer = ingredientSlice.reducer;
export const {
  getIngredientsSelector,
  getBunsSelector,
  getMainsSelector,
  getSaucesSelector,
  getConstructorItemsSelector,
  getConstructorIngredientsIdSelector,
  getOrderIngredientsSelector,
  getIsIngredientsLoadingSelector
} = ingredientSlice.selectors;
export const {
  addBunToBurger,
  addIngredientToBurger,
  removeIngredientInBurger,
  moveIngredient,
  clearAllData,
  addOrderIngredients
} = ingredientSlice.actions;
