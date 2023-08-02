import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getConfig from "../../utils/getConfig";
import { setIsLoading } from "./isLoading.slice";

export const cartsSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setcart: (state, action) => {
            const purchaseCart = action.payload
            return purchaseCart
        }
    }
})
export const getCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true))
    axios
        .get("https://e-commerce-api-v2.academlo.tech/api/v1/cart", getConfig())
        .then((res) => dispatch(setcart(res.data)))
        .finally(() => dispatch(setIsLoading(false)))

}

export const filterAddProductThunk = (cart) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
        .post("https://e-commerce-api-v2.academlo.tech/api/v1/cart", cart, getConfig())
        .then((res) => dispatch(getCartThunk(res.data)))
        .catch(() => alert("Enter User or Register User"))
        .finally(() => dispatch(setIsLoading(false)));

};

export const postPurchasesThunk = () => (dispatch) => {
   axios
        .post("https://e-commerce-api-v2.academlo.tech/api/v1/purchases", {}, getConfig())
        .then((res) => dispatch(setcart([])))

}
export const { setcart } = cartsSlice.actions;
export default cartsSlice.reducer;