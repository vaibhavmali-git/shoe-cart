import { Calendar, Package } from "lucide-react-native";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useOrders } from "../../src/hooks/useOrders";

export default function CustomerOrdersScreen() {
  const { orders } = useOrders();

  if (orders.length === 0) {
    return (
      <SafeAreaView
        className="flex-1 bg-[#f8f9fa] items-center justify-center px-6"
        edges={["top"]}
      >
        <View className="items-center justify-center w-20 h-20 mb-6 rounded-full bg-neutral-100">
          <Package size={32} color="#a3a3a3" />
        </View>
        <Text
          style={{ fontFamily: "Inter_700Bold" }}
          className="mb-2 text-2xl text-neutral-900"
        >
          No orders yet
        </Text>
        <Text
          style={{ fontFamily: "Inter_400Regular" }}
          className="text-center text-neutral-500"
        >
          When you make a purchase, it will appear here.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#f8f9fa]" edges={["top"]}>
      <View className="px-6 pt-4 pb-8">
        <Text
          style={{ fontFamily: "Inter_700Bold" }}
          className="text-4xl tracking-tight text-neutral-900"
        >
          My Orders
        </Text>
        
      </View>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View className="p-5 mb-4 bg-white border shadow-sm rounded-3xl border-neutral-100">
            <View className="flex-row items-center justify-between pb-3 mb-4 border-b border-neutral-100">
              <View>
                <Text
                  style={{ fontFamily: "Inter_700Bold" }}
                  className="text-base text-neutral-900"
                >
                  {item.id}
                </Text>
                <View className="flex-row items-center gap-1 mt-0.5">
                  <Calendar size={12} color="#a3a3a3" />
                  <Text
                    style={{ fontFamily: "Inter_400Regular" }}
                    className="text-xs text-neutral-400"
                  >
                    {new Date(item.date).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </Text>
                </View>
              </View>

              <View
                className={`px-3 py-1.5 rounded-xl ${
                  item.status === "Delivered"
                    ? "bg-emerald-50 border border-emerald-200"
                    : item.status === "Shipped"
                      ? "bg-blue-50 border border-blue-200"
                      : "bg-amber-50 border border-amber-200"
                }`}
              >
                <Text
                  style={{ fontFamily: "Inter_600SemiBold" }}
                  className={`text-xs uppercase ${
                    item.status === "Delivered"
                      ? "text-emerald-700"
                      : item.status === "Shipped"
                        ? "text-blue-700"
                        : "text-amber-700"
                  }`}
                >
                  {item.status}
                </Text>
              </View>
            </View>

            <View className="gap-3 mb-4">
              {item.items.map((cartItem, index) => (
                <View
                  key={index}
                  className="flex-row items-center gap-3 bg-[#f8f9fa] p-2.5 rounded-2xl"
                >
                  <View className="w-12 h-12 overflow-hidden bg-white border rounded-xl border-neutral-200">
                    <Image
                      source={{ uri: cartItem.product.image }}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  </View>
                  <View className="flex-1">
                    <Text
                      style={{ fontFamily: "Inter_600SemiBold" }}
                      className="text-sm text-neutral-900"
                      numberOfLines={1}
                    >
                      {cartItem.product.name}
                    </Text>
                    <Text
                      style={{ fontFamily: "Inter_500Medium" }}
                      className="text-xs text-neutral-500"
                    >
                      Size: {cartItem.size} • Qty: {cartItem.quantity}
                    </Text>
                  </View>
                  <Text
                    style={{ fontFamily: "Inter_700Bold" }}
                    className="text-sm text-neutral-900"
                  >
                    ${(cartItem.product.price * cartItem.quantity).toFixed(2)}
                  </Text>
                </View>
              ))}
            </View>

            <View className="flex-row items-center justify-between pt-3 border-t border-neutral-100">
              <Text
                style={{ fontFamily: "Inter_500Medium" }}
                className="text-xs tracking-wider uppercase text-neutral-400"
              >
                Total Paid
              </Text>
              <Text
                style={{ fontFamily: "Inter_700Bold" }}
                className="text-lg text-neutral-900"
              >
                ${item.total.toFixed(2)}
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}