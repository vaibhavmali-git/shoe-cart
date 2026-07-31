import { Trash2 } from "lucide-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { CartItem } from "../types";

interface Props {
  item: CartItem;
  onRemove: (id: string) => void;
}

export default function CartItemCard({ item, onRemove }: Props) {
  return (
    <View className="flex-row items-center p-3 mb-4 bg-white border  rounded-2xl border-neutral-100">
      <View className="h-24 w-24 rounded-xl overflow-hidden bg-[#f5f5f4] relative">
        <Image
          source={{ uri: item.product.image }}
          className="absolute w-full h-full"
          resizeMode="cover"
        />
      </View>

      <View className="justify-center flex-1 px-4">
        <Text
          className="mb-1 text-base font-bold text-neutral-900"
          numberOfLines={1}
        >
          {item.product.name}
        </Text>
        <Text className="mb-2 text-sm font-medium text-neutral-500">
          Size: {item.size} • Qty: {item.quantity}
        </Text>
        <Text className="text-lg font-bold text-neutral-900">
          ${item.product.price * item.quantity}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => onRemove(item.id)}
        className="p-3 rounded-full bg-red-50"
      >
        <Trash2 size={20} color="#ef4444" />
      </TouchableOpacity>
    </View>
  );
}
