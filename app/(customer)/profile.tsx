import {
    ChevronRight,
    LogOut,
    Mail,
    Package,
    Shield,
    User,
} from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserAccount } from "../../src/hooks/useUserAccount";

export default function UserProfileScreen() {
  const { signOut, navigateToOrders, navigateToAdminDashboard } =
    useUserAccount();

  return (
    <SafeAreaView className="flex-1 bg-[#f8f9fa]">
      <View className="px-6 pt-4 pb-6">
        <Text
          style={{ fontFamily: "Inter_700Bold" }}
          className="text-4xl tracking-tight text-neutral-900"
        >
          Profile
        </Text>
      </View>

      <ScrollView className="px-6" showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center gap-4 p-6 mb-6 bg-white border shadow-sm rounded-3xl border-neutral-100">
          <View className="items-center justify-center w-16 h-16 bg-neutral-900 rounded-2xl">
            <User size={30} color="#ffffff" />
          </View>
          <View className="flex-1">
            <Text
              style={{ fontFamily: "Inter_700Bold" }}
              className="mb-1 text-xl text-neutral-900"
            >
              Vaibhav Mali
            </Text>
            <View className="flex-row items-center gap-1.5">
              <Mail size={14} color="#a3a3a3" />
              <Text
                style={{ fontFamily: "Inter_400Regular" }}
                className="text-sm text-neutral-500"
              >
                vaibhav@shoecart.com
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
                <Package size={20} color="#171717" />
              </View>
              <Text
                style={{ fontFamily: "Inter_600SemiBold" }}
                className="text-base text-neutral-900"
              >
                My Orders
              </Text>
            </View>
            <ChevronRight size={18} color="#a3a3a3" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={navigateToAdminDashboard}
            className="flex-row items-center justify-between p-4"
          >
            <View className="flex-row items-center gap-3">
              <View className="items-center justify-center w-10 h-10 bg-neutral-50 rounded-xl">
                <Shield size={20} color="#171717" />
              </View>
              <Text
                style={{ fontFamily: "Inter_600SemiBold" }}
                className="text-base text-neutral-900"
              >
                Switch to Admin Portal
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
            Sign Out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
