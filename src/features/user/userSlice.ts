import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { TUser } from '@utils-types';
import { setCookie } from '../../utils/cookie';

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ email, name, password }: TRegisterData) =>
    registerUserApi({ email, name, password })
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: TLoginData) =>
    loginUserApi({ email, password }).then((data) => {
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data.user;
    })
);

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async ({ email }: { email: string }) => forgotPasswordApi({ email })
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async ({ password, token }: { password: string; token: string }) =>
    resetPasswordApi({ password, token })
);

export const getUser = createAsyncThunk('user/getUser', async () =>
  getUserApi()
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user: Partial<TRegisterData>) => updateUserApi(user)
);

export const logoutUser = createAsyncThunk('user/logout', async () =>
  logoutApi()
);

export interface TUserState {
  isAuthChecked: boolean;
  isLoading: boolean;
  user: TUser | null;
  error: string | unknown | null;
}

const initialState: TUserState = {
  isAuthChecked: false,
  isLoading: false,
  user: null,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    isAuthCheckedSelector: (state) => state.isAuthChecked,
    isAuthCheckingSelector: (state) => state.isLoading,
    userDataSelector: (state) => state.user,
    errorSelector: (state) => state.error
  },
  extraReducers: (builder) => {
    //registerUser
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.isAuthChecked = false;
      state.error = null;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthChecked = false;
      state.error = action.error.message;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isAuthChecked = true;
      state.isLoading = false;
      state.error = null;
      state.user = action.payload.user;
    });
    //loginUser
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.isAuthChecked = false;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthChecked = false;
      state.error = action.error.message;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthChecked = true;
      state.error = null;
      state.user = action.payload;
    });
    //getUser
    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true;
      state.isAuthChecked = false;
      state.error = null;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthChecked = false;
      state.error = action.error.message;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthChecked = true;
      state.error = null;
      state.user = action.payload.user;
    });
    //updateUser
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthChecked = true;
      state.error = null;
      state.user = action.payload.user;
    });
    //logoutUser
    builder.addCase(logoutUser.pending, (state) => {
      state.isLoading = true;
      state.isAuthChecked = false;
      state.error = null;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthChecked = false;
      state.error = action.error.message;
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthChecked = false;
      state.error = null;
      state.user = null;
    });
  }
});

export const reducer = userSlice.reducer;
export const {
  isAuthCheckedSelector,
  userDataSelector,
  isAuthCheckingSelector,
  errorSelector
} = userSlice.selectors;
//export const { authChecked, authUnChecked } = userSlice.actions;
