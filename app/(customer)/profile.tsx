import { router } from "expo-router";
import { LogOut, User } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch } from "../../src/store/hooks";
import { clearRole } from "../../src/store/slices/authSlice";

export default function ProfileScreen() {
  const dispatch = useAppDispatch();

  const handleSwitchRole = () => {
    dispatch(clearRole());

    setTimeout(() => {
      router.push("/");
    }, 50);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f5f5f4]">
      <View className="px-6 pt-2 pb-4 bg-white border-b border-neutral-200">
        <Text className="text-3xl font-bold tracking-tight text-neutral-900">
          My Profile
        </Text>
      </View>

      <View className="px-6 pt-8">
        <View className="items-center p-6 mb-6 bg-white border shadow-sm rounded-3xl border-neutral-100">
          <View className="items-center justify-center w-20 h-20 mb-4 rounded-full bg-neutral-100">
            <User size={36} color="#171717" />
          </View>
          <Text className="text-xl font-bold text-neutral-900">
            Valued Customer
          </Text>
          <Text className="mt-1 text-sm font-medium tracking-wider uppercase text-neutral-400">
            Customer Role Active
          </Text>
        </View>

        <View className="p-4 bg-white border shadow-sm rounded-3xl border-neutral-100">
          <TouchableOpacity
            onPress={handleSwitchRole}
            className="flex-row items-center justify-between px-4 py-4 rounded-2xl bg-neutral-50"
          >
            <View className="flex-row items-center gap-3">
              <LogOut size={20} color="#171717" />
              <Text className="text-base font-bold text-neutral-900">
                Switch Role / Logout
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
