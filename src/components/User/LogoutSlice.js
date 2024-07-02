import { createSlice } from '@reduxjs/toolkit';
const logoutSlice = createSlice({
 name: 'logout',
 initialState: {},
 reducers: {
clearTokens() {
 }
 }
});
export const { clearTokens } = logoutSlice.actions;
export default logoutSlice.reducer;