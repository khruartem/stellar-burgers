import {
  getOrderByNumberApi,
  getFeedsApi,
  orderBurgerApi,
  getOrdersApi
} from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getFeeds = createAsyncThunk('order/getAll', async () =>
  getFeedsApi()
);

export const getOrders = createAsyncThunk('order/orders', async () =>
  getOrdersApi()
);

export const orderBurger = createAsyncThunk(
  'order/create',
  async (data: string[]) => orderBurgerApi(data)
);

export const getOrderByNumber = createAsyncThunk(
  'order/getByNumber',
  async (number: number) =>
    getOrderByNumberApi(number).then((data) => data.orders[0])
);

type TOrderState = {
  feeds: TOrder[];
  orders: TOrder[];
  totalFeeds: number;
  totalTodayFeeds: number;
  createdOrder: TOrder | undefined;
  orderModalData: TOrder | undefined;
  requestedOrder: TOrder | undefined;
  name: string;
  orderRequest: boolean;
  loading: boolean;
  isOrderRequestError: string | null | undefined;
  error: string | null | undefined;
};

const initialState: TOrderState = {
  feeds: [],
  orders: [],
  totalFeeds: 0,
  totalTodayFeeds: 0,
  createdOrder: undefined,
  orderModalData: undefined,
  requestedOrder: undefined,
  name: '',
  orderRequest: false,
  loading: false,
  isOrderRequestError: null,
  error: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderModalData: (state: TOrderState) => {
      state.orderModalData = undefined;
    },
    addRequestedOrder: (state: TOrderState, action: PayloadAction<TOrder>) => {
      state.requestedOrder = action.payload;
    }
  },
  selectors: {
    getFeedsRequestSelector: (state) => state.loading,
    getOrderRequestSelector: (state) => state.orderRequest,
    getOrderSelector: (state) => state.createdOrder,
    getOrderModalDataSelector: (state) => state.orderModalData,
    getCreatedOrderNumberSelector: (state) => state.createdOrder!.number,
    getFeedsSelector: (state) => state.feeds,
    getFeedSelector: (state) => ({
      total: state.totalFeeds,
      totalToday: state.totalTodayFeeds
    }),
    getIsOrderRequestErrorSelector: (state) => state.isOrderRequestError,
    getOrdersSelector: (state) => state.orders,
    getRequestedOrderSelector: (state) => state.requestedOrder
  },
  extraReducers: (builder) => {
    builder
      //getFeeds
      .addCase(getFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.feeds = action.payload.orders;
        state.totalFeeds = action.payload.total;
        state.totalTodayFeeds = action.payload.totalToday;
      })
      //getOrders
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.isOrderRequestError = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.isOrderRequestError = action.error.message;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.isOrderRequestError = null;
        state.orders = action.payload;
      })
      //orderBurgers
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.error = null;
        state.createdOrder = action.payload.order;
        state.name = action.payload.name;
        state.orderModalData = action.payload.order;
      })
      //getOrderByNumber
      .addCase(getOrderByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.requestedOrder = action.payload;
      });
  }
});

export const reducer = orderSlice.reducer;
export const {
  getFeedsRequestSelector,
  getOrderModalDataSelector,
  getOrderRequestSelector,
  getOrderSelector,
  getCreatedOrderNumberSelector,
  getFeedsSelector,
  getFeedSelector,
  getIsOrderRequestErrorSelector,
  getOrdersSelector,
  getRequestedOrderSelector
} = orderSlice.selectors;
export const { clearOrderModalData, addRequestedOrder } = orderSlice.actions;
