import { useRouter } from "expo-router";
import { Search, SlidersHorizontal } from "lucide-react-native";
import { useState } from "react";
import {
    FlatList,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "../../src/components/ProductCard";
import { useAppSelector } from "../../src/store/hooks";

export default function CustomerHome() {
  const products = useAppSelector((state) => state.products.items);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <SafeAreaView className="flex-1 bg-[#f8f9fa]">
      <View className="px-6 pt-4 pb-6">
        <Text
          style={{ fontFamily: "Inter_700Bold" }}
          className="text-4xl tracking-tight text-neutral-900"
        >
          Discover
        </Text>

        <View className="flex-row items-center gap-3 mt-6">
          <View className="flex-row items-center flex-1 px-4 bg-white border shadow-sm h-14 rounded-2xl border-neutral-100">
            <Search size={20} color="#a3a3a3" />
            <TextInput
              placeholder="Search shoes, brands..."
              placeholderTextColor="#a3a3a3"
              className="flex-1 ml-3 text-base text-neutral-900"
              style={{ fontFamily: "Inter_400Regular" }}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <TouchableOpacity className="items-center justify-center shadow-sm h-14 w-14 bg-neutral-900 rounded-2xl">
            <SlidersHorizontal size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => router.push(`/product/${item.id}`)}
          />
        )}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View className="items-center justify-center pt-10">
            <Text
              style={{ fontFamily: "Inter_500Medium" }}
              className="text-lg text-neutral-500"
            >
              No shoes found.
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
