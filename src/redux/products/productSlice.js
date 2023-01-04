import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { getProducts, createProduct, updateProduct } from "../../api/products";

// Introduce `createEntityAdapter` to normalize data in order to fix data loop performance issue
const productsAdapter = createEntityAdapter();

// `getInitialState` returns an empty {ids: [], entities: {}} normalized state object
const initialState = productsAdapter.getInitialState({
  getProductsStatus: "idle",
  submitFormStatus: "ready",
  error: null,
});

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  // Asynchronous data fetch reducers come in here
  extraReducers(builder) {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.getProductsStatus = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.getProductsStatus = "succeeded";
        // Add any fetched posts to the array
        // Use the `upsertMany` reducer as a mutating update utility
        productsAdapter.upsertMany(state, action.payload);
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.getProductsStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(createProduct.pending, (state, action) => {
        state.submitFormStatus = "loading";
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.submitFormStatus = "ready";
        // addOne: accepts a single entity, and adds it if it's not already present.
        productsAdapter.addOne(state, action.payload);
      })
      .addCase(updateProduct.pending, (state, action) => {
        state.submitFormStatus = "loading";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        console.log("updateOne payload", action.payload);
        state.submitFormStatus = "ready";
        // updateOne: accepts an "update object" containing an entity ID and an object containing one or more new field values to update inside a changes field, and performs a shallow update on the corresponding entity.
        productsAdapter.updateOne(state, action.payload);
      })
  },
});

// Export actions for useDispatch module in components
export const { productAdded, productUpdated } = productSlice.actions;

export default productSlice.reducer;

// Export reusable functions for useSelector module in components
export const selectProducts = (state) => state.products; // Returns a new entity state object like {entities: {...}, error: "", ids: [...], getProductsStatus: "loading"}

// Export the customized selectors for this adapter using "getSelectors"
export const {
  selectAll: selectProductList, // Maps over the state.ids array, and returns an array of entities in the same order
  selectById: selectProductById, // Given the state and an entity ID, returns the entity with that ID or undefined
  selectIds: selectProductIds, // Returns the state.ids array
} = productsAdapter.getSelectors((state) => state.products);
