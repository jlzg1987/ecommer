import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getConfig from "../../utils/getConfig";
import { setIsLoading } from "./isLoading.slice";

export const productNewslice = createSlice({
    name: 'newProduct',
    initialState: [],
    reducers: {
        setNewProduct: (state,action) => {
            const newProduct = action.payload
            return newProduct
        }

    }

})
export const getProductThunk = () => (dispatch) => {
    dispatch(setIsLoading(true))
    axios
        .get("https://e-commerce-api-v2.academlo.tech/api/v1/products")
        .then((res) => dispatch(setNewProduct(res.data)))
        .finally(() => dispatch(setIsLoading(false)))

}


export const filterNewsCategoryThunk = (id) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
      .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?title=${id}`)
      .then((res) => dispatch(setNewProduct(res.data)))
      .finally(() => dispatch(setIsLoading(false)));
  };

  
export const filterNewsHeadlineThunk = (newsSearch) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
      .get(
        "https://e-commerce-api-v2.academlo.tech/api/v1/products?title=" +
          newsSearch, getConfig()
      )
      .then((res) => dispatch(getProductThunk(res.data)))
      .finally(() => dispatch(setIsLoading(false)));
  };


export const { setNewProduct } = productNewslice.actions;
export default productNewslice.reducer;