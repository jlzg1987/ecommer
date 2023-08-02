import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getConfig from "../../utils/getConfig";
import { setIsLoading } from "./isLoading.slice";


export const registertSlice = createSlice({
  name: "registerUser",
  initialState: [],
  reducers: {
    setRegister: (state, action) => {
      const register = action.payload;
      return register;
    }
  }
});

export const getRegisterThunk = () => (dispatch) => {
    dispatch(setIsLoading(true))
    axios
      .get("https://e-commerce-api-v2.academlo.tech/api/v1/users/",getConfig())
      .then((res) => dispatch(setRegister(res.data)))
      .finally(() => dispatch(setIsLoading(false)));
  };
  export const createUsuarioThunk = (data) => (dispatch) => {
  dispatch(setIsLoading(true));
  axios
    .post("https://e-commerce-api-v2.academlo.tech/api/v1/users/", data)
    .then(() => dispatch(getRegisterThunk()))
    .finally(() => dispatch(setIsLoading(false)));
};

export const deleteuserThunk = (id) => (dispatch) => {
  dispatch(setIsLoading(true));
  axios
    .delete(`https://e-commerce-api-v2.academlo.tech/api/v1/users/${id}/`)
    .then(() => dispatch(getRegisterThunk()))
    .finally(() => dispatch(setIsLoading(false)));
};

export const { setRegister } = registertSlice.actions;

export default registertSlice.reducer;