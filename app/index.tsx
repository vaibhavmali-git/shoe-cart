import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../src/store";
import { setRole } from "../src/store/slices/authSlice";

export default function RoleSelectionScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const currentRole = useSelector((state: RootState) => state.auth.role);

  useEffect(() => {
    if (currentRole === "customer") {
      router.replace("/(customer)");
    } else if (currentRole === "admin") {
      router.replace("/(admin)/orders");
    }
  }, [currentRole, router]);

  return (
    <View className="flex-1 items-center justify-center bg-[#f5f5f4] px-6">
      <View className="items-center mb-12">
        <Text className="text-4xl font-bold tracking-tight text-neutral-900">
          Shoe Cart
        </Text>
        <Text className="mt-2 text-base text-neutral-500">
          Choose your experience
        </Text>
      </View>

      <View className="w-full gap-4">
        <TouchableOpacity
          className="items-center w-full py-4 shadow-sm bg-neutral-900 rounded-2xl"
          onPress={() => dispatch(setRole("customer"))}
        >
          <Text className="text-lg font-medium text-white">
            Continue as Customer
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="items-center w-full py-4 bg-white border shadow-sm border-neutral-200 rounded-2xl"
          onPress={() => dispatch(setRole("admin"))}
        >
          <Text className="text-lg font-medium text-neutral-900">
            Enter as Admin
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
