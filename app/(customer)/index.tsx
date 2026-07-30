import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../src/store";
import { clearRole } from "../../src/store/slices/authSlice";

export default function CustomerHome() {
  const dispatch = useDispatch();
  const router = useRouter();

  const products = useSelector((state: RootState) => state.products.items);

  const handleReset = () => {
    dispatch(clearRole());
    router.replace("/");
  };

  return (
    <View className="flex-1 items-center justify-center bg-[#f5f5f4]">
      <Text className="text-2xl font-bold text-neutral-900">Customer Home</Text>

      <Text className="mt-4 text-emerald-600 font-medium">
        {products.length} shoes loaded in database
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
