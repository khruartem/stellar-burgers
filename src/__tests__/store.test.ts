import { rootReducer } from '../services/store';

describe('rootReducer initialization test', () => {
  test('should return the initial state', () => {
    const initialState = {
      ingredients: {
        buns: [],
        constructorItems: { bun: null, ingredients: [] },
        constructorItemsIds: [],
        error: null,
        ingredients: [],
        loading: false,
        mains: [],
        orderIngredients: [],
        sauces: []
      },
      order: {
        createdOrder: undefined,
        error: null,
        feeds: [],
        isOrderRequestError: null,
        loading: false,
        name: '',
        orderInfoRequest: false,
        orderModalData: undefined,
        orderRequest: false,
        orders: [],
        ordersRequest: false,
        requestedOrder: undefined,
        totalFeeds: 0,
        totalTodayFeeds: 0
      },
      user: { error: null, isAuthChecked: false, isLoading: false, user: null }
    };

    expect(rootReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });
});
