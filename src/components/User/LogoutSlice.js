import { createSlice } from '@reduxjs/toolkit';

const logoutSlice = createSlice({
  name: 'logout',
  initialState: {},
  reducers: {
    clearTokens(state, action) {
    }
  }
});

export const { clearTokens } = logoutSlice.actions;
export default logoutSlice.reducer;