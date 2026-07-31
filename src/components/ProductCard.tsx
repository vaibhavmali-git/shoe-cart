import { Image, Text, TouchableOpacity, View } from "react-native";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

export default function ProductCard({ product, onPress }: ProductCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-row items-center gap-5 p-4 mb-4 bg-white border shadow-sm rounded-3xl border-neutral-100"
    >
      <View className="w-28 h-28 bg-[#f5f5f4] rounded-2xl overflow-hidden border border-neutral-100">
        <Image
          source={{ uri: product.image }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      <View className="justify-center flex-1 py-2">
        <Text
          style={{ fontFamily: "Inter_700Bold" }}
          className="mb-1 text-lg tracking-tight text-neutral-900"
          numberOfLines={1}
        >
          {product.name}
        </Text>

        <Text
          style={{ fontFamily: "Inter_500Medium" }}
          className="mb-3 text-sm text-neutral-500"
        >
          {product.brand}
        </Text>

        <View className="flex-row items-center justify-between">
          <Text
            style={{ fontFamily: "Inter_700Bold" }}
            className="text-lg text-neutral-900"
          >
            ${product.price.toFixed(2)}
          </Text>

          <View className="bg-neutral-900 px-4 py-1.5 rounded-full">
            <Text
              style={{ fontFamily: "Inter_600SemiBold" }}
              className="text-xs text-white"
            >
              View
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
