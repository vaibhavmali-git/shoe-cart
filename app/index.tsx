import { Text, TouchableOpacity, View } from "react-native";

export default function RoleSelectionScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-[#f5f5f4] px-6">
      <View className="items-center mb-12">
        <Text className="text-4xl font-bold text-neutral-900 tracking-tight">
          Shoe Cart
        </Text>
        <Text className="text-base text-neutral-500 mt-2">
          Choose your experience
        </Text>
      </View>

      <View className="w-full gap-4">
        <TouchableOpacity
          className="w-full bg-neutral-900 py-4 rounded-2xl items-center shadow-sm"
          onPress={() => console.log("Customer selected")}
        >
          <Text className="text-white font-medium text-lg">
            Continue as Customer
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="w-full bg-white border border-neutral-200 py-4 rounded-2xl items-center shadow-sm"
          onPress={() => console.log("Admin selected")}
        >
          <Text className="text-neutral-900 font-medium text-lg">
            Enter as Admin
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
