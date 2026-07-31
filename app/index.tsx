import AsyncStorage from "@react-native-async-storage/async-storage";
import { Href, router } from "expo-router";
import { ShoppingBag } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RoleSelectionScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkLastPortal() {
      try {
        const lastPortal = await AsyncStorage.getItem("@last_portal");
        if (lastPortal === "customer") {
          router.replace("/(customer)" as Href);
          return;
        } else if (lastPortal === "admin") {
          router.replace("/(admin)/orders" as Href);
          return;
        }
      } catch (e) {
 console.error(e)
      } finally {
        setIsLoading(false);
      }
    }
    checkLastPortal();
  }, []);

  const handleSelectCustomer = async () => {
    try {
      await AsyncStorage.setItem("@last_portal", "customer");
    } catch (e) {
      console.error(e);
    }
    router.push("/(customer)" as Href);
  };

  const handleSelectAdmin = async () => {
    try {
      await AsyncStorage.setItem("@last_portal", "admin");
    } catch (e) {
      console.error(e);
    }
    router.push("/(admin)/orders" as Href);
  };

  if (isLoading) {
    return (
      <View className="items-center justify-center flex-1 bg-white">
        <ActivityIndicator size="large" color="#FF5A1F" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 px-6 py-6 bg-white">
      <View className="flex-row items-center pt-2">
        <Text
          style={{ fontFamily: "Inter_700Bold" }}
          className="text-2xl text-neutral-900"
        >
          Shoe
        </Text>
        <Text
          style={{ fontFamily: "Inter_700Bold" }}
          className="text-2xl text-red-500"
        >
          Cart
        </Text>
      </View>

      <View className="items-center justify-center flex-1">
        <View
          className="w-full overflow-hidden bg-neutral-100 rounded-3xl"
          style={{ aspectRatio: 1, maxHeight: 340 }}
        >
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1669671943625-e20799ee5f42?fm=jpg&q=80&w=900&auto=format&fit=crop",
            }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
        </View>
      </View>

      <View className="mb-8">
        <Text
          style={{ fontFamily: "Inter_700Bold" }}
          className="mb-2 text-4xl text-neutral-900"
        >
          Choose Your Portal
        </Text>
        <Text
          style={{ fontFamily: "Inter_400Regular" }}
          className="text-base leading-relaxed text-neutral-500"
        >
          Browse and buy as a customer, or manage inventory and orders from the
          admin dashboard.
        </Text>
      </View>

      <View className="gap-3 mb-2">
        <TouchableOpacity
          onPress={handleSelectCustomer}
          activeOpacity={0.85}
          className="flex-row items-center justify-center gap-2 py-4 rounded-full bg-neutral-700"
        >
          <ShoppingBag size={18} color="#ffffff" />
          <Text
            style={{ fontFamily: "Inter_700Bold" }}
            className="text-base text-white"
          >
            Customer Store
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSelectAdmin}
          activeOpacity={0.85}
          className="items-center justify-center py-4 border rounded-full border-neutral-700"
        >
          <Text
            style={{ fontFamily: "Inter_700Bold" }}
            className="text-base text-neutral-700"
          >
            Admin Dashboard
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
