import {
  ChevronRight,
  Layers,
  LogOut,
  PackageCheck,
  ShieldCheck,
} from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAdminProfile } from "../../src/hooks/useAdminProfile";

export default function AdminProfileScreen() {
  const {
    signOut,
    navigateToOrders,
    navigateToShoes,
    navigateToCustomerStore,
  } = useAdminProfile();

  return (
    <SafeAreaView className="flex-1 bg-[#f8f9fa]" edges={["top"]}>
      <View className="px-6 pt-4 pb-6">
        <Text
          style={{ fontFamily: "Inter_700Bold" }}
          className="text-4xl tracking-tight text-neutral-900"
        >
          Admin Profile
        </Text>
      </View>

      <ScrollView
        className="px-6"
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="p-2 mb-6 bg-white border shadow-sm rounded-3xl border-neutral-100">
          <TouchableOpacity
            onPress={navigateToOrders}
            className="flex-row items-center justify-between p-3.5 border-b border-neutral-50"
          >
            <View className="flex-row items-center gap-3.5">
              <View className="items-center justify-center w-10 h-10 rounded-full bg-neutral-100">
                <PackageCheck size={18} color="#171717" />
              </View>
              <Text
                style={{ fontFamily: "Inter_500Medium" }}
                className="text-base text-neutral-900"
              >
                Manage Orders Table
              </Text>
            </View>
            <ChevronRight size={18} color="#a3a3a3" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={navigateToShoes}
            className="flex-row items-center justify-between p-3.5 border-b border-neutral-50"
          >
            <View className="flex-row items-center gap-3.5">
              <View className="items-center justify-center w-10 h-10 rounded-full bg-neutral-100">
                <Layers size={18} color="#171717" />
              </View>
              <Text
                style={{ fontFamily: "Inter_500Medium" }}
                className="text-base text-neutral-900"
              >
                Manage Shoe Inventory
              </Text>
            </View>
            <ChevronRight size={18} color="#a3a3a3" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={navigateToCustomerStore}
            className="flex-row items-center justify-between p-3.5"
          >
            <View className="flex-row items-center gap-3.5">
              <View className="items-center justify-center w-10 h-10 rounded-full bg-neutral-100">
                <ShieldCheck size={18} color="#171717" />
              </View>
              <Text
                style={{ fontFamily: "Inter_500Medium" }}
                className="text-base text-neutral-900"
              >
                Switch to Customer Store
              </Text>
            </View>
            <ChevronRight size={18} color="#a3a3a3" />
          </TouchableOpacity>
        </View>

        <Text
          style={{ fontFamily: "Inter_500Medium" }}
          className="mb-3 text-xs tracking-wider uppercase text-neutral-400"
        >
          Session
        </Text>

        <View className="p-2 mb-8 bg-white border shadow-sm rounded-3xl border-neutral-100">
          <TouchableOpacity
            onPress={signOut}
            className="flex-row items-center justify-between p-3.5"
          >
            <View className="flex-row items-center gap-3.5">
              <View className="items-center justify-center w-10 h-10 rounded-full bg-red-50">
                <LogOut size={18} color="#ef4444" />
              </View>
              <Text
                style={{ fontFamily: "Inter_500Medium" }}
                className="text-base text-red-600"
              >
                Exit Admin Portal
              </Text>
            </View>
            <ChevronRight size={18} color="#a3a3a3" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
