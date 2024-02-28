import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userEmail: '',
    userToken: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addAuthData: (state, action) => {
      state.userEmail = action.payload.userEmail;
      state.userToken = action.payload.userToken;
    },
    removeAuthData: (state) => {
      state.userEmail = '';
      state.userToken = '';
    },
  },
});

export const { addAuthData, removeAuthData } = userSlice.actions;

export default userSlice.reducer ;