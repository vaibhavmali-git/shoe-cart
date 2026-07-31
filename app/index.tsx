import { Href, router } from "expo-router";
import { ShieldCheck, ShoppingBag } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RoleSelectionScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#f8f9fa] justify-between px-8 py-12">
      <View className="pt-8">
        <Text
          style={{ fontFamily: "Inter_700Bold" }}
          className="mb-3 text-5xl tracking-tight text-neutral-900"
        >
          Shoe Cart.
        </Text>
        <Text
          style={{ fontFamily: "Inter_400Regular" }}
          className="text-base leading-relaxed text-neutral-500"
        >
          Select your portal to experience the ultimate footwear shopping and
          inventory platform.
        </Text>
      </View>

      <View className="gap-4 my-auto">
        <TouchableOpacity
          onPress={() => router.push("/(customer)" as Href)}
          activeOpacity={0.8}
          className="flex-row items-center justify-between p-6 shadow-sm bg-neutral-900 rounded-3xl"
        >
          <View className="flex-row items-center gap-4">
            <View className="items-center justify-center w-12 h-12 bg-neutral-800 rounded-2xl">
              <ShoppingBag size={22} color="#ffffff" />
            </View>
            <View>
              <Text
                style={{ fontFamily: "Inter_700Bold" }}
                className="text-white text-lg mb-0.5"
              >
                Customer Store
              </Text>
              <Text
                style={{ fontFamily: "Inter_400Regular" }}
                className="text-xs text-neutral-400"
              >
                Browse shoes, add to cart & buy
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(admin)/orders" as Href)}
          activeOpacity={0.8}
          className="flex-row items-center justify-between p-6 bg-white border shadow-sm rounded-3xl border-neutral-200"
        >
          <View className="flex-row items-center gap-4">
            <View className="items-center justify-center w-12 h-12 bg-neutral-100 rounded-2xl">
              <ShieldCheck size={22} color="#171717" />
            </View>
            <View>
              <Text
                style={{ fontFamily: "Inter_700Bold" }}
                className="text-neutral-900 text-lg mb-0.5"
              >
                Admin Dashboard
              </Text>
              <Text
                style={{ fontFamily: "Inter_400Regular" }}
                className="text-xs text-neutral-500"
              >
                Manage inventory & view orders
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View className="items-center">
        <Text
          style={{ fontFamily: "Inter_500Medium" }}
          className="text-xs tracking-widest uppercase text-neutral-400"
        >
          React Native Assessment App
        </Text>
      </View>
    </SafeAreaView>
  );
}
