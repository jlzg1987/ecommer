import { configureStore } from "@reduxjs/toolkit";
import cartsSlice from "./slices/carts.Slice";
import  isLoadingslice  from "./slices/isLoading.slice";
import  productNewslice  from "./slices/productNew.slice";
import purchasesSlice  from "./slices/purchases.Slice";
import  registertSlice  from "./slices/register.slice";


export default configureStore({
reducer:{
  isLoading:isLoadingslice,
  newProduct: productNewslice,
  purchases:purchasesSlice,
  cart:cartsSlice,
  registerUser: registertSlice
}
})