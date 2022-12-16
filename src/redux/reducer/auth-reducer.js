import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null,
    userInfo: null,
    registerData: {},
  },
  reducers: {
    setUserInfo: (state, action) => {
      console.log(action, "actionPPPPP")
      state.accessToken = action?.payload?.data?.accessToken ?? null;
      state.user = action?.payload?.data?.user ?? null;
      // return state;
    },

    setRegisterData: (state, action) => {
      state.registerData = action?.payload;
    },

    updateUser: (state, action) => {
      state.user = action?.payload;
    },

    onLogout: (state, action) => {
      state.accessToken = null;
      state.user = null;
      state.registerData = {};
    },
  },
});

export const {setUserInfo, onLogout, setRegisterData, updateUser} =
  authSlice.actions;

export default authSlice.reducer;
