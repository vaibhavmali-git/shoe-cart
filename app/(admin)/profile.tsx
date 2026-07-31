import {
    ChevronRight,
    Layers,
    LogOut,
    Mail,
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
      <View className="px-6 pt-4 pb-8">
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
        <View className="flex-row items-center gap-4 p-6 mb-6 bg-white border shadow-sm rounded-3xl border-neutral-100">
          <View className="items-center justify-center w-16 h-16 bg-neutral-900 rounded-2xl">
            <ShieldCheck size={30} color="#ffffff" />
          </View>
          <View className="flex-1">
            <Text
              style={{ fontFamily: "Inter_700Bold" }}
              className="mb-1 text-xl text-neutral-900"
            >
              Store Administrator
            </Text>
            <View className="flex-row items-center gap-1.5">
              <Mail size={14} color="#a3a3a3" />
              <Text
                style={{ fontFamily: "Inter_400Regular" }}
                className="text-sm text-neutral-500"
              >
                admin@shoecart.com
              </Text>
            </View>
          </View>
        </View>

        <View className="p-3 mb-6 bg-white border shadow-sm rounded-3xl border-neutral-100">
          <TouchableOpacity
            onPress={navigateToOrders}
            className="flex-row items-center justify-between p-4 border-b border-neutral-50"
          >
            <View className="flex-row items-center gap-3">
              <View className="items-center justify-center w-10 h-10 bg-neutral-50 rounded-xl">
                <PackageCheck size={20} color="#171717" />
              </View>
              <Text
                style={{ fontFamily: "Inter_600SemiBold" }}
                className="text-base text-neutral-900"
              >
                Manage Orders Table
              </Text>
            </View>
            <ChevronRight size={18} color="#a3a3a3" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={navigateToShoes}
            className="flex-row items-center justify-between p-4 border-b border-neutral-50"
          >
            <View className="flex-row items-center gap-3">
              <View className="items-center justify-center w-10 h-10 bg-neutral-50 rounded-xl">
                <Layers size={20} color="#171717" />
              </View>
              <Text
                style={{ fontFamily: "Inter_600SemiBold" }}
                className="text-base text-neutral-900"
              >
                Manage Shoe Inventory
              </Text>
            </View>
            <ChevronRight size={18} color="#a3a3a3" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={navigateToCustomerStore}
            className="flex-row items-center justify-between p-4"
          >
            <View className="flex-row items-center gap-3">
              <View className="items-center justify-center w-10 h-10 bg-neutral-50 rounded-xl">
                <ShieldCheck size={20} color="#171717" />
              </View>
              <Text
                style={{ fontFamily: "Inter_600SemiBold" }}
                className="text-base text-neutral-900"
              >
                Switch to Customer Store
              </Text>
            </View>
            <ChevronRight size={18} color="#a3a3a3" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={signOut}
          className="flex-row items-center justify-center gap-2 py-4 mb-12 border border-red-100 shadow-sm bg-red-50 rounded-2xl"
        >
          <LogOut size={18} color="#ef4444" />
          <Text
            style={{ fontFamily: "Inter_600SemiBold" }}
            className="text-base text-red-600"
          >
            Exit Admin Portal
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}