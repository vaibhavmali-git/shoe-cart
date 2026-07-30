import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialProducts } from '../../data/mockProducts';
import { Product } from '../../types';

interface ProductState {
  items: Product[];
}

const initialState: ProductState = {
  items: initialProducts,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;