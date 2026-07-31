import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft, Heart } from "lucide-react-native";
import { useState } from "react";
import {
    Alert,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import { addToCart } from "../../src/store/slices/cartSlice";

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const product = useAppSelector((state) =>
    state.products.items.find((p) => p.id === id),
  );

  const [selectedSize, setSelectedSize] = useState<number | null>(
    product?.sizes[0] || null,
  );
  const [isFavorite, setIsFavorite] = useState(false);

  if (!product) {
    return (
      <SafeAreaView className="flex-1 bg-[#f8f9fa] justify-center items-center px-6">
        <Text
          style={{ fontFamily: "Inter_700Bold" }}
          className="mb-2 text-xl text-neutral-900"
        >
          Product not found
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="px-6 py-3 rounded-full bg-neutral-900"
        >
          <Text
            style={{ fontFamily: "Inter_600SemiBold" }}
            className="text-white"
          >
            Go Back
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      Alert.alert("Select Size", "Please choose a size before adding to cart.");
      return;
    }

    dispatch(
      addToCart({
        id: `${product.id}-${selectedSize}`,
        product,
        size: selectedSize,
        quantity: 1,
      }),
    );

    Alert.alert(
      "Added to Cart",
      `${product.name} (Size: ${selectedSize}) has been added to your cart!`,
    );
  };

  const handleToggleFavorite = () => {
    const nextState = !isFavorite;
    setIsFavorite(nextState);
    if (nextState) {
      Alert.alert("Saved", `${product.name} added to your favorites.`);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f8f9fa]" edges={["top"]}>
      {/* Top Header Bar */}
      <View className="px-6 py-3 flex-row justify-between items-center bg-[#f8f9fa] z-10">
        <TouchableOpacity
          onPress={() => router.back()}
          className="items-center justify-center bg-white border rounded-full shadow-sm w-11 h-11 border-neutral-200"
        >
          <ChevronLeft size={22} color="#171717" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleToggleFavorite}
          className="items-center justify-center bg-white border rounded-full shadow-sm w-11 h-11 border-neutral-200"
        >
          <Heart
            size={20}
            color={isFavorite ? "#ef4444" : "#171717"}
            fill={isFavorite ? "#ef4444" : "transparent"}
          />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="mx-6 h-80 bg-[#f5f5f4] rounded-3xl overflow-hidden border border-neutral-100 shadow-sm mb-6">
          <Image
            source={{ uri: product.image }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>

        <View className="p-6 mx-6 mb-6 bg-white border shadow-sm rounded-3xl border-neutral-100">
          <View className="flex-row items-start justify-between mb-2">
            <View className="flex-1 pr-4">
              <Text
                style={{ fontFamily: "Inter_500Medium" }}
                className="mb-1 text-sm tracking-wider uppercase text-neutral-400"
              >
                {product.brand}
              </Text>
              <Text
                style={{ fontFamily: "Inter_700Bold" }}
                className="text-3xl tracking-tight text-neutral-900"
              >
                {product.name}
              </Text>
            </View>
            <Text
              style={{ fontFamily: "Inter_700Bold" }}
              className="text-2xl text-neutral-900"
            >
              ${product.price.toFixed(2)}
            </Text>
          </View>

          <View className="h-[1px] bg-neutral-100 my-4" />

          <Text
            style={{ fontFamily: "Inter_600SemiBold" }}
            className="mb-2 text-sm text-neutral-900"
          >
            Description
          </Text>
          <Text
            style={{ fontFamily: "Inter_400Regular" }}
            className="mb-6 text-sm leading-relaxed text-neutral-500"
          >
            {product.description}
          </Text>

          <Text
            style={{ fontFamily: "Inter_600SemiBold" }}
            className="mb-3 text-sm text-neutral-900"
          >
            Select Size (US)
          </Text>
          <View className="flex-row flex-wrap gap-2.5">
            {product.sizes.map((size) => {
              const isSelected = selectedSize === size;
              return (
                <TouchableOpacity
                  key={size}
                  onPress={() => setSelectedSize(size)}
                  className={`w-14 h-14 rounded-2xl items-center justify-center border ${
                    isSelected
                      ? "bg-neutral-900 border-neutral-900"
                      : "bg-white border-neutral-200"
                  }`}
                >
                  <Text
                    style={{ fontFamily: "Inter_600SemiBold" }}
                    className={`text-sm ${isSelected ? "text-white" : "text-neutral-800"}`}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <View className="flex-row items-center justify-between px-6 py-5 bg-white border-t border-neutral-100">
        <View>
          <Text
            style={{ fontFamily: "Inter_500Medium" }}
            className="text-xs uppercase text-neutral-400"
          >
            Total Price
          </Text>
          <Text
            style={{ fontFamily: "Inter_700Bold" }}
            className="text-2xl text-neutral-900"
          >
            ${product.price.toFixed(2)}
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleAddToCart}
          className="px-8 py-4 shadow-sm bg-neutral-900 rounded-2xl"
        >
          <Text
            style={{ fontFamily: "Inter_600SemiBold" }}
            className="text-base text-white"
          >
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
