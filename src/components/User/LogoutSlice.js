import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,

};

const logoutSlice = createSlice({
  name: 'logout',
  initialState,
  reducers: {
    clearTokens(state) {
      state.token = null;
    },
  },
});

export const { clearTokens } = logoutSlice.actions;
export default logoutSlice.reducer;