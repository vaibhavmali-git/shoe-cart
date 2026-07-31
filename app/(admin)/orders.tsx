import { router } from "expo-router";
import { ClipboardList, LogOut } from "lucide-react-native";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import { clearRole } from "../../src/store/slices/authSlice";
import { updateOrderStatus } from "../../src/store/slices/orderSlice";
import { Order } from "../../src/types";

export default function AdminOrdersScreen() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.orders.history);

  const handleLogout = () => {
    dispatch(clearRole());

    setTimeout(() => {
      router.push("/");
    }, 50);
  };

  const handleCycleStatus = (
    currentId: string,
    currentStatus: Order["status"],
  ) => {
    let nextStatus: Order["status"] = "Processing";
    if (currentStatus === "Processing") nextStatus = "Shipped";
    else if (currentStatus === "Shipped") nextStatus = "Delivered";
    else if (currentStatus === "Delivered") nextStatus = "Processing";

    dispatch(updateOrderStatus({ id: currentId, status: nextStatus }));
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f5f5f4]">
      <View className="flex-row items-center justify-between px-6 pt-2 pb-4 bg-white border-b border-neutral-200">
        <View>
          <Text className="text-3xl font-bold tracking-tight text-neutral-900">
            Admin Dashboard
          </Text>
          <Text className="text-xs font-bold text-neutral-400 uppercase tracking-widest mt-0.5">
            Store Management
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleLogout}
          className="p-3 rounded-full bg-neutral-100"
        >
          <LogOut size={20} color="#171717" />
        </TouchableOpacity>
      </View>

      {orders.length === 0 ? (
        <View className="items-center justify-center flex-1 px-6">
          <View className="items-center justify-center w-20 h-20 mb-6 rounded-full bg-neutral-200">
            <ClipboardList size={32} color="#a3a3a3" />
          </View>
          <Text className="mb-2 text-2xl font-bold text-neutral-900">
            No customer orders yet
          </Text>
          <Text className="text-center text-neutral-500">
            Orders placed by customers will show up here in real-time.
          </Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 24, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View className="p-5 mb-4 bg-white border shadow-sm rounded-2xl border-neutral-100">
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-sm font-bold text-neutral-500">
                  {item.id}
                </Text>

                <TouchableOpacity
                  onPress={() => handleCycleStatus(item.id, item.status)}
                  className={`px-3 py-1.5 rounded-full ${
                    item.status === "Delivered"
                      ? "bg-emerald-100"
                      : item.status === "Shipped"
                        ? "bg-blue-100"
                        : "bg-amber-100"
                  }`}
                >
                  <Text
                    className={`text-xs font-bold uppercase ${
                      item.status === "Delivered"
                        ? "text-emerald-700"
                        : item.status === "Shipped"
                          ? "text-blue-700"
                          : "text-amber-700"
                    }`}
                  >
                    {item.status} (Tap to change)
                  </Text>
                </TouchableOpacity>
              </View>

              <Text className="mb-1 text-base font-bold text-neutral-900">
                Customer: {item.customerName}
              </Text>
              <Text className="mb-4 text-sm text-neutral-500">
                {item.items.length} items • Total: ${item.total}
              </Text>

              <View className="pt-3 border-t border-neutral-100">
                {item.items.map((cartItem, index) => (
                  <Text key={index} className="text-sm text-neutral-600">
                    • {cartItem.product.name} (Size: {cartItem.size}) x{" "}
                    {cartItem.quantity}
                  </Text>
                ))}
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}
