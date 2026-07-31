import { useAppSelector } from "../store/hooks";

export function useOrders() {
  const orders = useAppSelector((state) => state.orders.history);
  return { orders };
}
