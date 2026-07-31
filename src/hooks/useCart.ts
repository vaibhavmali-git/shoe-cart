import { Href, router } from "expo-router";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { removeFromCart, updateQuantity } from "../store/slices/cartSlice";

export function useCart() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const deliveryFee = cartItems.length > 0 ? 5.0 : 0;
  const total = subtotal + deliveryFee;

  const handleIncrement = (id: string, currentQuantity: number) => {
    dispatch(updateQuantity({ id, quantity: currentQuantity + 1 }));
  };

  const handleDecrement = (id: string, currentQuantity: number) => {
    dispatch(
      updateQuantity({ id, quantity: Math.max(1, currentQuantity - 1) }),
    );
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleStartShopping = () => {
    router.push("/(customer)");
  };

  const handleCheckout = () => {
    router.push("/checkout" as Href);
  };

  return {
    cartItems,
    subtotal,
    deliveryFee,
    total,
    handleIncrement,
    handleDecrement,
    handleRemove,
    handleStartShopping,
    handleCheckout,
  };
}
