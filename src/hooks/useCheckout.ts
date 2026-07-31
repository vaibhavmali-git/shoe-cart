import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { clearCart } from "../store/slices/cartSlice";
import { placeOrder } from "../store/slices/orderSlice";

const checkoutSchema = z.object({
  name: z.string().min(2, "Name is required"),
  address: z.string().min(5, "Full shipping address is required"),
  cardNumber: z.string().length(16, "Card must be exactly 16 digits"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY format"),
  cvv: z.string().length(3, "CVV must be 3 digits"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export function useCheckout() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      address: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    },
  });

  const onSubmit = (data: CheckoutFormData) => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );

    const newOrder = {
      id: `ORD-${Date.now()}`,
      items: cartItems,
      total,
      date: new Date().toISOString(),
      status: "Processing" as const,
      customerName: data.name,
    };

    dispatch(placeOrder(newOrder));
    dispatch(clearCart());

    Alert.alert(
      "Payment Successful",
      `Thank you for your order, ${data.name}!`,
      [{ text: "Back to Home", onPress: () => router.replace("/(customer)") }],
    );
  };

  const handleBack = () => {
    router.back();
  };

  return {
    control,
    errors,
    onSubmit: handleSubmit(onSubmit),
    handleBack,
  };
}
