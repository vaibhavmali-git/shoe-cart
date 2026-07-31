import { ChevronLeft, Save } from "lucide-react-native";
import { Controller } from "react-hook-form";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useManageProduct } from "../../src/hooks/useManageProduct";

export default function ManageProductScreen() {
  const { control, errors, isEditing, handleSubmit, handleBack } =
    useManageProduct();

  return (
    <SafeAreaView className="flex-1 bg-[#f8f9fa]" edges={["top"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-row items-center px-6 pt-4 pb-4">
          <TouchableOpacity onPress={handleBack} className="p-2 mr-2 -ml-2">
            <ChevronLeft size={28} color="#171717" />
          </TouchableOpacity>
          <Text
            style={{ fontFamily: "Inter_700Bold" }}
            className="text-3xl text-neutral-900"
          >
            {isEditing ? "Edit Product" : "Add Product"}
          </Text>
        </View>

        <ScrollView
          className="flex-1 px-6 pt-2"
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="mb-4">
                <Text
                  style={{ fontFamily: "Inter_600SemiBold" }}
                  className="mb-2 text-sm text-neutral-700"
                >
                  Product Name
                </Text>
                <TextInput
                  placeholder="e.g. Air Max"
                  className={`bg-white border rounded-xl px-4 py-4 text-base ${errors.name ? "border-red-500" : "border-neutral-200"}`}
                  style={{ fontFamily: "Inter_400Regular" }}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </View>
            )}
          />

          <View className="flex-row gap-4 mb-4">
            <Controller
              control={control}
              name="brand"
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="flex-1">
                  <Text
                    style={{ fontFamily: "Inter_600SemiBold" }}
                    className="mb-2 text-sm text-neutral-700"
                  >
                    Brand
                  </Text>
                  <TextInput
                    placeholder="Nike"
                    className={`bg-white border rounded-xl px-4 py-4 text-base ${errors.brand ? "border-red-500" : "border-neutral-200"}`}
                    style={{ fontFamily: "Inter_400Regular" }}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
              )}
            />

            <Controller
              control={control}
              name="price"
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="flex-1">
                  <Text
                    style={{ fontFamily: "Inter_600SemiBold" }}
                    className="mb-2 text-sm text-neutral-700"
                  >
                    Price ($)
                  </Text>
                  <TextInput
                    placeholder="150.00"
                    keyboardType="decimal-pad"
                    className={`bg-white border rounded-xl px-4 py-4 text-base ${errors.price ? "border-red-500" : "border-neutral-200"}`}
                    style={{ fontFamily: "Inter_400Regular" }}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
              )}
            />
          </View>

          <Controller
            control={control}
            name="image"
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="mb-4">
                <Text
                  style={{ fontFamily: "Inter_600SemiBold" }}
                  className="mb-2 text-sm text-neutral-700"
                >
                  Image URL
                </Text>
                <TextInput
                  placeholder="https://..."
                  autoCapitalize="none"
                  className={`bg-white border rounded-xl px-4 py-4 text-base ${errors.image ? "border-red-500" : "border-neutral-200"}`}
                  style={{ fontFamily: "Inter_400Regular" }}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </View>
            )}
          />

          <Controller
            control={control}
            name="sizes"
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="mb-4">
                <Text
                  style={{ fontFamily: "Inter_600SemiBold" }}
                  className="mb-2 text-sm text-neutral-700"
                >
                  Sizes (comma separated)
                </Text>
                <TextInput
                  placeholder="8, 9, 10"
                  className={`bg-white border rounded-xl px-4 py-4 text-base ${errors.sizes ? "border-red-500" : "border-neutral-200"}`}
                  style={{ fontFamily: "Inter_400Regular" }}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </View>
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="mb-8">
                <Text
                  style={{ fontFamily: "Inter_600SemiBold" }}
                  className="mb-2 text-sm text-neutral-700"
                >
                  Description
                </Text>
                <TextInput
                  placeholder="Enter details..."
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  className={`bg-white border rounded-xl px-4 py-4 text-base min-h-[100px] ${errors.description ? "border-red-500" : "border-neutral-200"}`}
                  style={{ fontFamily: "Inter_400Regular" }}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </View>
            )}
          />
        </ScrollView>

        <View className="px-6 py-5 bg-white border-t border-neutral-100">
          <TouchableOpacity
            onPress={handleSubmit}
            className="flex-row items-center justify-center w-full gap-2 py-4  bg-neutral-900 rounded-2xl"
          >
            <Save size={20} color="#ffffff" />
            <Text
              style={{ fontFamily: "Inter_600SemiBold" }}
              className="text-lg text-white"
            >
              {isEditing ? "Save Changes" : "Add to Catalog"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}