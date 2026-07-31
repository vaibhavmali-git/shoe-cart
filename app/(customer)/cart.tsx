import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react-native";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCart } from "../../src/hooks/useCart";

export default function CartScreen() {
  const {
    cartItems,
    subtotal,
    deliveryFee,
    total,
    handleIncrement,
    handleDecrement,
    handleRemove,
    handleStartShopping,
    handleCheckout,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-[#f8f9fa] items-center justify-center px-6">
        <View className="items-center justify-center w-20 h-20 mb-6 rounded-full bg-neutral-100">
          <ShoppingBag size={32} color="#a3a3a3" />
        </View>
        <Text
          style={{ fontFamily: "Inter_700Bold" }}
          className="mb-2 text-2xl text-neutral-900"
        >
          Your cart is empty
        </Text>
        <Text
          style={{ fontFamily: "Inter_400Regular" }}
          className="mb-8 text-center text-neutral-500"
        >
          Explore our catalog and find your next pair of shoes.
        </Text>
        <TouchableOpacity
          onPress={handleStartShopping}
          className="px-8 py-4 shadow-sm bg-neutral-900 rounded-2xl"
        >
          <Text
            style={{ fontFamily: "Inter_600SemiBold" }}
            className="text-base text-white"
          >
            Start Shopping
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#f8f9fa]">
      <View className="px-6 pt-4 pb-4">
        <Text
          style={{ fontFamily: "Inter_700Bold" }}
          className="text-4xl tracking-tight text-neutral-900"
        >
          My Cart
        </Text>
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View className="flex-row items-center gap-4 p-4 mb-4 bg-white border shadow-sm rounded-3xl border-neutral-100">
            <View className="w-24 h-24 bg-[#f5f5f4] rounded-2xl overflow-hidden border border-neutral-50">
              <Image
                source={{ uri: item.product.image }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>

            <View className="justify-center flex-1">
              <Text
                style={{ fontFamily: "Inter_700Bold" }}
                className="text-base text-neutral-900 mb-0.5"
                numberOfLines={1}
              >
                {item.product.name}
              </Text>
              <Text
                style={{ fontFamily: "Inter_500Medium" }}
                className="mb-2 text-xs text-neutral-400"
              >
                Size: {item.size} • ${item.product.price.toFixed(2)}
              </Text>

              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-3 p-1 bg-neutral-100 rounded-xl">
                  <TouchableOpacity
                    onPress={() => handleDecrement(item.id, item.quantity)}
                    className="items-center justify-center bg-white rounded-lg shadow-sm w-7 h-7"
                  >
                    <Minus size={14} color="#171717" />
                  </TouchableOpacity>

                  <Text
                    style={{ fontFamily: "Inter_600SemiBold" }}
                    className="text-sm text-neutral-900"
                  >
                    {item.quantity}
                  </Text>

                  <TouchableOpacity
                    onPress={() => handleIncrement(item.id, item.quantity)}
                    className="items-center justify-center bg-white rounded-lg shadow-sm w-7 h-7"
                  >
                    <Plus size={14} color="#171717" />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={() => handleRemove(item.id)}
                  className="p-2"
                >
                  <Trash2 size={18} color="#ef4444" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      <View className="px-6 py-6 bg-white border-t shadow-lg border-neutral-100 rounded-t-3xl">
        <View className="gap-2 mb-6">
          <View className="flex-row justify-between">
            <Text
              style={{ fontFamily: "Inter_400Regular" }}
              className="text-sm text-neutral-500"
            >
              Subtotal
            </Text>
            <Text
              style={{ fontFamily: "Inter_600SemiBold" }}
              className="text-sm text-neutral-900"
            >
              ${subtotal.toFixed(2)}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text
              style={{ fontFamily: "Inter_400Regular" }}
              className="text-sm text-neutral-500"
            >
              Delivery Fee
            </Text>
            <Text
              style={{ fontFamily: "Inter_600SemiBold" }}
              className="text-sm text-neutral-900"
            >
              ${deliveryFee.toFixed(2)}
            </Text>
          </View>
          <View className="h-[1px] bg-neutral-100 my-1" />
          <View className="flex-row justify-between">
            <Text
              style={{ fontFamily: "Inter_700Bold" }}
              className="text-base text-neutral-900"
            >
              Total
            </Text>
            <Text
              style={{ fontFamily: "Inter_700Bold" }}
              className="text-xl text-neutral-900"
            >
              ${total.toFixed(2)}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleCheckout}
          className="items-center w-full py-4 shadow-sm bg-neutral-900 rounded-2xl"
        >
          <Text
            style={{ fontFamily: "Inter_600SemiBold" }}
            className="text-base text-white"
          >
            Proceed to Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
