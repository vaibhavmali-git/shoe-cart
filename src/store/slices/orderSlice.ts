import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "../../types";

interface OrderState {
  history: Order[];
}

const initialState: OrderState = {
  history: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    placeOrder: (state, action: PayloadAction<Order>) => {
      state.history.unshift(action.payload);
    },
    updateOrderStatus: (
      state,
      action: PayloadAction<{ id: string; status: Order["status"] }>,
    ) => {
      const order = state.history.find((o) => o.id === action.payload.id);
      if (order) {
        order.status = action.payload.status;
      }
    },
  },
});

export const { placeOrder, updateOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;
