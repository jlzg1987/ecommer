import { createSlice } from "@reduxjs/toolkit";

export const isLoadingslice = createSlice({
  name: 'isLoading',
  initialState: false,
  reducers: {
    setIsLoading: (state, action) => {
      const isLoading = action.payload
      return isLoading
    }

  }
})
export const { setIsLoading } = isLoadingslice.actions;

export default isLoadingslice.reducer;