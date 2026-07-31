import { useRouter } from "expo-router";
import { Search, SlidersHorizontal, X } from "lucide-react-native";
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
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBrand = selectedBrand
      ? product.brand.toLowerCase() === selectedBrand.toLowerCase()
      : true;

    return matchesSearch && matchesBrand;
  });

  const handleFilterPress = () => {
    if (selectedBrand === null) setSelectedBrand("NIKE");
    else if (selectedBrand === "NIKE") setSelectedBrand("ADIDAS");
    else setSelectedBrand(null);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f8f9fa]">
      <View className="px-6 pt-4 pb-4">
        <View className="flex-row items-center justify-between">
          <Text
            style={{ fontFamily: "Inter_700Bold" }}
            className="text-4xl tracking-tight text-neutral-900"
          >
            Discover
          </Text>
          {selectedBrand && (
            <TouchableOpacity
              onPress={() => setSelectedBrand(null)}
              className="flex-row items-center bg-neutral-200 px-3 py-1.5 rounded-full gap-1"
            >
              <Text
                style={{ fontFamily: "Inter_500Medium" }}
                className="text-xs uppercase text-neutral-800"
              >
                {selectedBrand}
              </Text>
              <X size={14} color="#262626" />
            </TouchableOpacity>
          )}
        </View>

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

          <TouchableOpacity
            onPress={handleFilterPress}
            className={`h-14 w-14 rounded-2xl items-center justify-center shadow-sm ${selectedBrand ? "bg-neutral-900" : "bg-white border border-neutral-100"}`}
          >
            <SlidersHorizontal
              size={20}
              color={selectedBrand ? "#ffffff" : "#171717"}
            />
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
          <View className="items-center justify-center pt-12">
            <Text
              style={{ fontFamily: "Inter_500Medium" }}
              className="text-base text-neutral-400"
            >
              No matching shoes found.
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
