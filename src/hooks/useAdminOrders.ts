import { useAppDispatch, useAppSelector } from "../store/hooks";
import { updateOrderStatus } from "../store/slices/orderSlice";

export function useAdminOrders() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.orders.history);

  const handleCycleStatus = (
    currentStatus: "Processing" | "Shipped" | "Delivered",
    orderId: string,
  ) => {
    const nextStatus =
      currentStatus === "Processing"
        ? "Shipped"
        : currentStatus === "Shipped"
          ? "Delivered"
          : "Processing";

    dispatch(updateOrderStatus({ id: orderId, status: nextStatus }));
  };

  return {
    orders,
    handleCycleStatus,
  };
}
