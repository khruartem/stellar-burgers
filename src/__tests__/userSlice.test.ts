import {
  getUser,
  loginUser,
  logoutUser,
  updateUser,
  reducer as userReducer
} from '../features/user/userSlice';
import { registerUser, initialState } from '../features/user/userSlice';

describe('userSlice test', () => {
  const refreshToken =
    '4ee969347c3ac36d6d687e49d822b781b13cd1cbc5a6b314da3361867b50eb283244c39671f1ac3a';
  const accessToken =
    'Bearer%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OGZmNGFmMTMzYWNkMDAxYmU0YmRlNCIsImlhdCI6MTczOTQ3NDkwOCwiZXhwIjoxNzM5NDc2MTA4fQ.sPxMvb1gKUi4BC_B_55_ttJzkV1L-fKEjedAz1ZIdPc';
  const user = {
    email: 'test@test.ru',
    name: 'Test Testovich'
  };

  describe('registerUser test', () => {
    it('registerUser fulfilled', () => {
      const action = {
        type: registerUser.fulfilled.type,
        payload: {
          success: true,
          refreshToken,
          accessToken,
          user
        }
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isAuthChecked: true,
        isLoading: false,
        error: null,
        user
      });
    });

    it('registerUser pending', () => {
      const action = {
        type: registerUser.pending.type
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isLoading: true,
        isAuthChecked: false,
        error: null
      });
    });

    it('registerUser rejected', () => {
      const action = {
        type: registerUser.rejected.type,
        error: { message: 'Test' }
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        isAuthChecked: false,
        error: 'Test'
      });
    });
  });

  describe('loginUser test', () => {
    it('loginUser fulfilled', () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: user
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isAuthChecked: true,
        isLoading: false,
        error: null,
        user
      });
    });

    it('loginUser pending', () => {
      const action = {
        type: loginUser.pending.type
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isLoading: true,
        isAuthChecked: false,
        error: null
      });
    });

    it('loginUser rejected', () => {
      const action = {
        type: loginUser.rejected.type,
        error: { message: 'Test' }
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        isAuthChecked: false,
        error: 'Test'
      });
    });
  });

  describe('getUser test', () => {
    it('getUser fulfilled', () => {
      const action = {
        type: getUser.fulfilled.type,
        payload: {
          success: true,
          user
        }
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isAuthChecked: true,
        isLoading: false,
        error: null,
        user
      });
    });

    it('getUser pending', () => {
      const action = {
        type: getUser.pending.type
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isLoading: true,
        isAuthChecked: false,
        error: null
      });
    });

    it('getUser rejected', () => {
      const action = {
        type: getUser.rejected.type,
        error: { message: 'Test' }
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        isAuthChecked: false,
        error: 'Test'
      });
    });
  });

  describe('updateUser test', () => {
    it('updateUser fulfilled', () => {
      const action = {
        type: updateUser.fulfilled.type,
        payload: {
          success: true,
          user
        }
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isAuthChecked: true,
        isLoading: false,
        error: null,
        user
      });
    });

    it('updateUser pending', () => {
      const action = {
        type: updateUser.pending.type
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isLoading: true,
        error: null
      });
    });

    it('updateUser rejected', () => {
      const action = {
        type: updateUser.rejected.type,
        error: { message: 'Test' }
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        error: 'Test'
      });
    });
  });

  describe('logoutUser test', () => {
    it('logoutUser fulfilled', () => {
      const action = {
        type: logoutUser.fulfilled.type
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isAuthChecked: false,
        isLoading: false,
        error: null,
        user: null
      });
    });

    it('logoutUser pending', () => {
      const action = {
        type: logoutUser.pending.type
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isLoading: true,
        isAuthChecked: false,
        error: null
      });
    });

    it('logoutUser rejected', () => {
      const action = {
        type: logoutUser.rejected.type,
        error: { message: 'Test' }
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        isAuthChecked: false,
        error: 'Test'
      });
    });
  });
});
