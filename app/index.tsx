import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../src/store";
import { setRole } from "../src/store/slices/authSlice";

export default function RoleSelectionScreen() {
  const dispatch = useDispatch();
  const currentRole = useSelector((state: RootState) => state.auth.role);

  return (
    <View className="flex-1 items-center justify-center bg-[#f5f5f4] px-6">
      <View className="items-center mb-12">
        <Text className="text-4xl font-bold text-neutral-900 tracking-tight">
          Shoe Cart
        </Text>
        <Text className="text-base text-neutral-500 mt-2">
          Choose your experience
        </Text>

        {/* Temporary UI to verify Redux state updates */}
        {currentRole && (
          <Text className="mt-4 text-sm font-medium text-emerald-600">
            Active Role: {currentRole}
          </Text>
        )}
      </View>

      <View className="w-full gap-4">
        <TouchableOpacity
          className="w-full bg-neutral-900 py-4 rounded-2xl items-center shadow-sm"
          onPress={() => dispatch(setRole("customer"))}
        >
          <Text className="text-white font-medium text-lg">
            Continue as Customer
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="w-full bg-white border border-neutral-200 py-4 rounded-2xl items-center shadow-sm"
          onPress={() => dispatch(setRole("admin"))}
        >
          <Text className="text-neutral-900 font-medium text-lg">
            Enter as Admin
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
