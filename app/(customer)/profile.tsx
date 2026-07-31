import { ChevronRight, LogOut, Package, Shield } from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserAccount } from "../../src/hooks/useUserAccount";

export default function UserProfileScreen() {
  const { signOut, navigateToOrders, navigateToAdminDashboard } =
    useUserAccount();

  return (
    <SafeAreaView className="flex-1 bg-[#f8f9fa]" edges={["top"]}>
      <View className="px-6 pt-4 pb-6">
        <Text
          style={{ fontFamily: "Inter_700Bold" }}
          className="text-4xl tracking-tight text-neutral-900"
        >
          Profile
        </Text>
      </View>

      <ScrollView
        className="px-6"
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="p-2 mb-6 bg-white border  rounded-3xl border-neutral-100">
          <TouchableOpacity
            onPress={navigateToOrders}
            className="flex-row items-center justify-between p-3.5 border-b border-neutral-50"
          >
            <View className="flex-row items-center gap-3.5">
              <View className="items-center justify-center w-10 h-10 rounded-full bg-neutral-100">
                <Package size={18} color="#171717" />
              </View>
              <Text
                style={{ fontFamily: "Inter_500Medium" }}
                className="text-base text-neutral-900"
              >
                My Orders
              </Text>
            </View>
            <ChevronRight size={18} color="#a3a3a3" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={navigateToAdminDashboard}
            className="flex-row items-center justify-between p-3.5"
          >
            <View className="flex-row items-center gap-3.5">
              <View className="items-center justify-center w-10 h-10 rounded-full bg-neutral-100">
                <Shield size={18} color="#171717" />
              </View>
              <Text
                style={{ fontFamily: "Inter_500Medium" }}
                className="text-base text-neutral-900"
              >
                Switch to Admin Portal
              </Text>
            </View>
            <ChevronRight size={18} color="#a3a3a3" />
          </TouchableOpacity>
        </View>

      

       
      </ScrollView>
    </SafeAreaView>
  );
}
