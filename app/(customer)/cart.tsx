import { useRouter } from "expo-router";
import { ShoppingBag } from "lucide-react-native";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CartItemCard from "../../src/components/CartItemCard";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import { removeFromCart } from "../../src/store/slices/cartSlice";

export default function CartScreen() {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const router = useRouter();
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    router.push("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <View
        style={{ paddingTop: insets.top }}
        className="flex-1 bg-[#f5f5f4] items-center justify-center px-6"
      >
        <View className="items-center justify-center w-20 h-20 mb-6 rounded-full bg-neutral-200">
          <ShoppingBag size={32} color="#a3a3a3" />
        </View>
        <Text className="mb-2 text-2xl font-bold text-neutral-900">
          Your cart is empty
        </Text>
        <Text className="text-center text-neutral-500">
          Looks like you haven&apos;t added any shoes to your cart yet.
        </Text>
      </View>
    );
  }

  return (
    <View style={{ paddingTop: insets.top }} className="flex-1 bg-[#f5f5f4]">
      <View className="px-6 pt-2 pb-4 border-b border-neutral-200">
        <Text className="text-3xl font-bold tracking-tight text-neutral-900">
          Your Cart
        </Text>
        <Text className="mt-1 text-sm font-medium text-neutral-500">
          {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
        </Text>
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CartItemCard
            item={item}
            onRemove={(id) => dispatch(removeFromCart(id))}
          />
        )}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 24,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      />

      <View className="px-6 py-5 bg-white border-t border-neutral-100">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-lg font-medium text-neutral-500">Total</Text>
          <Text className="text-2xl font-bold text-neutral-900">
            ${cartTotal}
          </Text>
        </View>

        <TouchableOpacity
          className="items-center w-full py-4 shadow-sm bg-neutral-900 rounded-2xl"
          onPress={handleCheckout}
        >
          <Text className="text-lg font-medium text-white">
            Proceed to Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
