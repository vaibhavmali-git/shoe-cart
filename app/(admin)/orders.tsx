import { Calendar, PackageCheck, RefreshCw } from "lucide-react-native";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import { updateOrderStatus } from "../../src/store/slices/orderSlice";

export default function AdminOrdersScreen() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.orders.history);

  const cycleStatus = (
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

  if (orders.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-[#f8f9fa] items-center justify-center px-6">
        <View className="items-center justify-center w-20 h-20 mb-6 rounded-full bg-neutral-100">
          <PackageCheck size={32} color="#a3a3a3" />
        </View>
        <Text
          style={{ fontFamily: "Inter_700Bold" }}
          className="mb-2 text-2xl text-neutral-900"
        >
          No orders received
        </Text>
        <Text
          style={{ fontFamily: "Inter_400Regular" }}
          className="text-center text-neutral-500"
        >
          Customer orders will appear here for management.
        </Text>
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
          Orders Dashboard
        </Text>
        <Text
          style={{ fontFamily: "Inter_500Medium" }}
          className="mt-1 text-xs tracking-widest uppercase text-neutral-400"
        >
          Store Management
        </Text>
      </View>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
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

              <TouchableOpacity
                onPress={() => cycleStatus(item.status, item.id)}
                className={`flex-row items-center gap-1.5 px-3.5 py-2 rounded-xl ${
                  item.status === "Delivered"
                    ? "bg-emerald-50 border border-emerald-200"
                    : item.status === "Shipped"
                      ? "bg-blue-50 border border-blue-200"
                      : "bg-amber-50 border border-amber-200"
                }`}
              >
                <RefreshCw
                  size={12}
                  color={
                    item.status === "Delivered"
                      ? "#047857"
                      : item.status === "Shipped"
                        ? "#1d4ed8"
                        : "#b45309"
                  }
                />
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
                  {item.status} (Tap)
                </Text>
              </TouchableOpacity>
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
                Total Amount Paid
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
