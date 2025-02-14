import {
  getOrderByNumber,
  getOrders,
  orderBurger,
  reducer as orderReducer
} from '../features/order/orderSlice';
import { getFeeds, initialState } from '../features/order/orderSlice';

describe('orderSlice tests', () => {
  const doneOrder = {
    _id: '67afa413133acd001be50e08',
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa0940',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093c'
    ],
    status: 'done',
    name: 'Краторный люминесцентный метеоритный бургер',
    createdAt: '2025-02-14T20:14:11.684Z',
    updatedAt: '2025-02-14T20:14:13.092Z',
    number: 68425
  };

  const pendingOrder = {
    _id: '67afa413133acd001be50e07',
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa0940',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093c'
    ],
    status: 'pending',
    name: 'Краторный люминесцентный метеоритный бургер',
    createdAt: '2025-02-14T20:14:11.600Z',
    updatedAt: '2025-02-14T20:14:12.995Z',
    number: 68424
  };

  const createdOrder = {
    ingredients: [
      {
        _id: '643d69a5c3f7b9001cfa093d',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
        __v: 0
      }
    ],
    _id: '67afa887133acd001be50e10',
    owner: {
      name: 'Артем Хрусталев',
      email: 'khru-artem@yandex.ru',
      createdAt: '2025-01-21T19:25:35.578Z',
      updatedAt: '2025-01-22T11:44:45.473Z'
    },
    status: 'done',
    name: 'Флюоресцентный бургер',
    createdAt: '2025-02-14T20:33:11.238Z',
    updatedAt: '2025-02-14T20:33:11.920Z',
    number: 68426,
    price: 988
  };

  const total = 68051;
  const totalToday = 35;

  describe('getFeeds test', () => {
    it('getFeeds fulfilled', () => {
      const action = {
        type: getFeeds.fulfilled.type,
        payload: {
          orders: [doneOrder, pendingOrder],
          total,
          totalToday
        }
      };
      const state = orderReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        feeds: [doneOrder, pendingOrder],
        totalFeeds: total,
        totalTodayFeeds: totalToday
      });
    });

    it('getFeeds pending', () => {
      const action = {
        type: getFeeds.pending.type
      };
      const state = orderReducer(initialState, action);
      expect(state).toEqual({ ...initialState, loading: true, error: null });
    });

    it('getFeeds rejected', () => {
      const action = {
        type: getFeeds.rejected.type,
        error: { message: 'Test' }
      };
      const state = orderReducer(initialState, action);
      expect(state).toEqual({ ...initialState, loading: false, error: 'Test' });
    });
  });

  describe('getOrders test', () => {
    it('getOrders fulfilled', () => {
      const action = {
        type: getOrders.fulfilled.type,
        payload: [doneOrder, pendingOrder]
      };
      const state = orderReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        orderRequest: false,
        isOrderRequestError: null,
        orders: [doneOrder, pendingOrder]
      });
    });

    it('getOrders pending', () => {
      const action = {
        type: getOrders.pending.type
      };
      const state = orderReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        ordersRequest: true,
        isOrderRequestError: null
      });
    });

    it('getOrders rejected', () => {
      const action = {
        type: getOrders.rejected.type,
        error: { message: 'Test' }
      };
      const state = orderReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        ordersRequest: false,
        isOrderRequestError: 'Test'
      });
    });
  });

  describe('orderBurger test', () => {
    it('orderBurger fulfilled', () => {
      const action = {
        type: orderBurger.fulfilled.type,
        payload: {
          order: createdOrder,
          name: createdOrder.name
        }
      };
      const state = orderReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        orderRequest: false,
        error: null,
        createdOrder: createdOrder,
        name: createdOrder.name,
        orderModalData: createdOrder
      });
    });

    it('orderBurger pending', () => {
      const action = {
        type: orderBurger.pending.type
      };
      const state = orderReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        orderRequest: true,
        error: null
      });
    });

    it('orderBurger rejected', () => {
      const action = {
        type: orderBurger.rejected.type,
        error: { message: 'Test' }
      };
      const state = orderReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        orderRequest: false,
        error: 'Test'
      });
    });
  });

  describe('getOrderByNumber test', () => {
    it('getOrderByNumber fulfilled', () => {
      const action = {
        type: getOrderByNumber.fulfilled.type,
        payload: doneOrder
      };
      const state = orderReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        orderInfoRequest: false,
        error: null,
        requestedOrder: doneOrder
      });
    });

    it('getOrderByNumber pending', () => {
      const action = {
        type: getOrderByNumber.pending.type
      };
      const state = orderReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        orderInfoRequest: true,
        error: null
      });
    });

    it('getOrderByNumber rejected', () => {
      const action = {
        type: getOrderByNumber.rejected.type,
        error: { message: 'Test' }
      };
      const state = orderReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        orderInfoRequest: false,
        error: 'Test'
      });
    });
  });
});
