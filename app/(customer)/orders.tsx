import { Package } from "lucide-react-native";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector } from "../../src/store/hooks";

export default function OrdersScreen() {
  const orders = useAppSelector((state) => state.orders.history);

  if (orders.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-[#f8f9fa] items-center justify-center px-6">
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
    <SafeAreaView className="flex-1 bg-[#f8f9fa]">
      <View className="px-6 pt-4 pb-6">
        <Text
          style={{ fontFamily: "Inter_700Bold" }}
          className="text-4xl tracking-tight text-neutral-900"
        >
          My Orders
        </Text>
      </View>

      {/* Table Container */}
      <View className="flex-1 mx-6 mb-6 overflow-hidden bg-white border shadow-sm rounded-2xl border-neutral-100">
        {/* Table Header */}
        <View className="flex-row px-4 py-3 border-b bg-neutral-50 border-neutral-100">
          <Text
            style={{ fontFamily: "Inter_600SemiBold" }}
            className="flex-[1.5] text-xs text-neutral-500 uppercase"
          >
            Order ID
          </Text>
          <Text
            style={{ fontFamily: "Inter_600SemiBold" }}
            className="flex-1 text-xs uppercase text-neutral-500"
          >
            Date
          </Text>
          <Text
            style={{ fontFamily: "Inter_600SemiBold" }}
            className="flex-1 text-xs text-center uppercase text-neutral-500"
          >
            Status
          </Text>
          <Text
            style={{ fontFamily: "Inter_600SemiBold" }}
            className="flex-1 text-xs text-right uppercase text-neutral-500"
          >
            Total
          </Text>
        </View>

        {/* Table Body */}
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View className="flex-row items-center px-4 py-4 border-b border-neutral-50">
              {/* ID Column */}
              <Text
                style={{ fontFamily: "Inter_500Medium" }}
                className="flex-[1.5] text-sm text-neutral-900"
                numberOfLines={1}
              >
                {item.id.replace("ORD-", "#")}
              </Text>

              {/* Date Column */}
              <Text
                style={{ fontFamily: "Inter_400Regular" }}
                className="flex-1 text-sm text-neutral-500"
              >
                {new Date(item.date).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })}
              </Text>

              {/* Status Column */}
              <View className="items-center flex-1">
                <View
                  className={`px-2 py-1 rounded-md ${
                    item.status === "Delivered"
                      ? "bg-emerald-50"
                      : item.status === "Shipped"
                        ? "bg-blue-50"
                        : "bg-amber-50"
                  }`}
                >
                  <Text
                    style={{ fontFamily: "Inter_600SemiBold" }}
                    className={`text-[10px] uppercase ${
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

              {/* Total Column */}
              <Text
                style={{ fontFamily: "Inter_600SemiBold" }}
                className="flex-1 text-sm text-right text-neutral-900"
              >
                ${item.total.toFixed(2)}
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
