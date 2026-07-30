import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { clearRole } from "../../src/store/slices/authSlice";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleReset = () => {
    dispatch(clearRole());
    router.replace("/");
  };

  return (
    <View className="flex-1 items-center justify-center bg-[#f5f5f4]">
      <Text className="text-2xl font-bold text-neutral-900">
        Admin Dashboard
      </Text>

      <TouchableOpacity
        onPress={handleReset}
        className="mt-8 px-6 py-3 bg-neutral-200 rounded-xl"
      >
        <Text className="text-neutral-700 font-medium">Reset Role</Text>
      </TouchableOpacity>
    </View>
  );
}
