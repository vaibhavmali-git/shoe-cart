import { useRouter } from "expo-router";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "../../src/components/ProductCard";
import { useAppSelector } from "../../src/store/hooks";

export default function CustomerHome() {
  const products = useAppSelector((state) => state.products.items);
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#f5f5f4]">
      <View className="px-6 pt-2 pb-6">
        <Text className="text-4xl font-bold tracking-tight text-neutral-900">
          Discover
        </Text>
        <Text className="mt-2 text-base text-neutral-500">
          Perfect shoes for you
        </Text>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => router.push(`/product/${item.id}`)}
          />
        )}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
