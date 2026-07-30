import { Package } from "lucide-react-native";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector } from "../../src/store/hooks";

export default function OrdersScreen() {
  const orders = useAppSelector((state) => state.orders.history);

  if (orders.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-[#f5f5f4] items-center justify-center px-6">
        <View className="items-center justify-center w-20 h-20 mb-6 rounded-full bg-neutral-200">
          <Package size={32} color="#a3a3a3" />
        </View>
        <Text className="mb-2 text-2xl font-bold text-neutral-900">
          No orders yet
        </Text>
        <Text className="text-center text-neutral-500">
          When you make a purchase, it will appear here.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#f5f5f4]">
      <View className="px-6 pt-2 pb-4 border-b border-neutral-200">
        <Text className="text-3xl font-bold tracking-tight text-neutral-900">
          My Orders
        </Text>
      </View>

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
              <View className="px-3 py-1 rounded-full bg-neutral-100">
                <Text className="text-xs font-bold uppercase text-neutral-900">
                  {item.status}
                </Text>
              </View>
            </View>

            <Text className="mb-1 text-lg font-bold text-neutral-900">
              {item.items.length} {item.items.length === 1 ? "Item" : "Items"}
            </Text>
            <Text className="mb-4 text-sm text-neutral-500">
              Placed on {new Date(item.date).toLocaleDateString()}
            </Text>

            <View className="flex-row items-center justify-between pt-4 border-t border-neutral-100">
              <Text className="text-base font-medium text-neutral-500">
                Total Amount
              </Text>
              <Text className="text-xl font-bold text-neutral-900">
                ${item.total}
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
