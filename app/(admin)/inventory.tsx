import { router } from "expo-router";
import { Edit2, Plus } from "lucide-react-native";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector } from "../../src/store/hooks";

export default function AdminInventoryScreen() {
  const products = useAppSelector((state) => state.products.items);

  return (
    <SafeAreaView className="flex-1 bg-[#f8f9fa]" edges={["top"]}>
      <View className="flex-row items-center justify-between px-6 pt-4 pb-8">
        <View>
          <Text
            style={{ fontFamily: "Inter_700Bold" }}
            className="text-4xl tracking-tight text-neutral-900"
          >
            Inventory
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/(admin)/manage")}
          className="items-center justify-center w-12 h-12 rounded-full shadow-sm bg-neutral-900"
        >
          <Plus size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View className="flex-row items-center gap-4 p-4 mb-4 bg-white border shadow-sm rounded-2xl border-neutral-100">
            <View className="w-20 h-20 overflow-hidden bg-neutral-50 rounded-xl">
              <Image
                source={{ uri: item.image }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>

            <View className="justify-center flex-1">
              <Text
                style={{ fontFamily: "Inter_600SemiBold" }}
                className="mb-1 text-base text-neutral-900"
                numberOfLines={1}
              >
                {item.name}
              </Text>
              <Text
                style={{ fontFamily: "Inter_400Regular" }}
                className="mb-1 text-sm text-neutral-500"
              >
                {item.brand} • ${item.price}
              </Text>
              <Text
                style={{ fontFamily: "Inter_400Regular" }}
                className="text-xs text-neutral-400"
                numberOfLines={1}
              >
                Sizes: {item.sizes.join(", ")}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/(admin)/manage",
                  params: { id: item.id },
                })
              }
              className="p-3 rounded-full bg-neutral-100"
            >
              <Edit2 size={18} color="#171717" />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}