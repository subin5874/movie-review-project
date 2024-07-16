import { createSlice } from '@reduxjs/toolkit';

//슬라이스 정의
let authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
  },
  //관리할 action 정의
  reducers: {
    //로그인 성공시
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    //로그아웃시
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;

//로그아웃
export const logoutAsync = () => async (dispatch) => {
  try {
    dispatch(logout());
  } catch (err) {
    console.error('Failed to logout:', err);
  }
};
