import { Image, Text, TouchableOpacity, View } from "react-native";
import { Product } from "../types";

interface Props {
  product: Product;
  onPress?: () => void;
}

export default function ProductCard({ product, onPress }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      className="bg-white rounded-[32px] p-4 mb-6 shadow-sm border border-neutral-100"
    >
      <View className="h-64 w-full rounded-2xl overflow-hidden bg-[#f5f5f4] mb-5 relative">
        <Image
          source={{ uri: product.image }}
          className="absolute w-full h-full"
          resizeMode="cover"
        />
      </View>

      <View className="px-2 pb-2">
        <View className="flex-row items-start justify-between mb-1">
          <Text className="text-xl font-bold text-neutral-900">
            {product.name}
          </Text>
          <Text className="text-lg font-bold text-neutral-900">
            ${product.price}
          </Text>
        </View>
        <Text className="text-xs font-medium tracking-wider uppercase text-neutral-500">
          {product.brand}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
