import { createAsyncThunk } from "@reduxjs/toolkit";

const runGoogleScript = (serverFunctionName, data = null) => {
  return new Promise((resolve, reject) => {
    google.script.run
      .withSuccessHandler((data) => {
        resolve(data);
      })
      .withFailureHandler((err) => {
        reject(err);
      })
      [serverFunctionName](data);
  });
};

// Fetch data asynchronously
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const response = await runGoogleScript("getProducts");
    const titles = response.shift();
    const products = [];
    response.forEach((row) => {
      const result = {};
      row.forEach((col, i) => {
        result[titles[i]] = col;
      });
      products.push(result);
    });
    // Output example: [
    //  { id: 1, name: "汝釉", price: 20, quantity: 1000 },
    //  { id: 2, name: "青花瓷", price: 10, quantity: 2000 },
    //  { id: 3, name: "杯托", price: 25, quantity: 3000 },
    // ]
    return products;
  }
);

// Create data asynchronously
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (data) => {
    await runGoogleScript("createProduct", Object.values(data));
    return data;
  }
);

// Update data asynchronously
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (data) => {
    await runGoogleScript("updateProduct", Object.values(data));
    return { id: data.id, changes: data };
  }
);