import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./products/productSlice";
import orderReducer from "./orders/orderSlice";

export default configureStore({
  reducer: {
    products: productReducer,
    orders: orderReducer,
  },
});
