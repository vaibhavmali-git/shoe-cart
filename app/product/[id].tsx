import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useState } from "react";
import {
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../src/store";

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  const product = useSelector((state: RootState) =>
    state.products.items.find((item) => item.id === id),
  );

  if (!product) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-[#f5f5f4]">
        <Text className="text-lg text-neutral-500">Product not found.</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="px-6 py-3 mt-4 bg-neutral-200 rounded-xl"
        >
          <Text className="font-medium text-neutral-900">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <View className="flex-1 bg-[#f5f5f4]">
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View className="w-full h-[450px] bg-neutral-200 relative">
          <Image
            source={{ uri: product.image }}
            className="absolute w-full h-full"
            resizeMode="cover"
          />

          <SafeAreaView className="absolute top-0 left-0 w-full px-6 pt-4">
            <TouchableOpacity
              onPress={() => router.back()}
              className="items-center justify-center w-12 h-12 rounded-full shadow-sm bg-white/90"
            >
              <ChevronLeft size={24} color="#171717" />
            </TouchableOpacity>
          </SafeAreaView>
        </View>

        <View className="px-6 pt-8 pb-32">
          <View className="flex-row items-start justify-between mb-2">
            <View className="flex-1 pr-4">
              <Text className="text-3xl font-bold tracking-tight text-neutral-900">
                {product.name}
              </Text>
              <Text className="mt-1 text-sm font-bold tracking-widest uppercase text-neutral-400">
                {product.brand}
              </Text>
            </View>
            <Text className="text-3xl font-bold text-neutral-900">
              ${product.price}
            </Text>
          </View>

          <Text className="mt-6 text-base leading-relaxed text-neutral-600">
            {product.description}
          </Text>

          <Text className="mt-10 mb-4 text-lg font-bold text-neutral-900">
            Select Size
          </Text>
          <View className="flex-row flex-wrap gap-3">
            {product.sizes.map((size) => (
              <TouchableOpacity
                key={size}
                onPress={() => setSelectedSize(size)}
                activeOpacity={0.7}
                className={`w-14 h-14 rounded-2xl items-center justify-center border ${
                  selectedSize === size
                    ? "bg-neutral-900 border-neutral-900"
                    : "bg-white border-neutral-200"
                }`}
              >
                <Text
                  className={`text-lg font-medium ${
                    selectedSize === size ? "text-white" : "text-neutral-900"
                  }`}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View className="absolute bottom-0 w-full px-6 py-5 pb-10 bg-white border-t border-neutral-100">
        <TouchableOpacity
          className="items-center w-full py-4 shadow-sm bg-neutral-900 rounded-2xl"
          onPress={() => console.log("Added size", selectedSize, "to cart")}
        >
          <Text className="text-lg font-medium text-white">Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
