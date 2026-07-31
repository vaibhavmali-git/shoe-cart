import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { mockProducts as initialProducts } from "../../data/mockProducts";
import { Product } from "../../types";

interface ProductState {
  items: Product[];
}

const initialState: ProductState = {
  items: initialProducts,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.unshift(action.payload);
    },
    editProduct: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
});

export const { addProduct, editProduct } = productSlice.actions;
export const updateProduct = editProduct;
export default productSlice.reducer;