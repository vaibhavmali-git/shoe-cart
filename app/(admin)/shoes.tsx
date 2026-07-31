import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";
import { useAppDispatch } from "../../src/store/hooks";
import { addProduct } from "../../src/store/slices/productSlice";

const productSchema = z.object({
  name: z.string().min(2, "Product name is required"),
  brand: z.string().min(2, "Brand is required"),
  price: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Enter a valid price (e.g. 150 or 150.99)"),
  image: z.string().url("Must be a valid image URL"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  sizes: z
    .string()
    .regex(
      /^[\d,\s]+$/,
      "Enter numeric sizes separated by commas (e.g. 8, 9, 10)",
    ),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function AdminShoesScreen() {
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      brand: "",
      price: "",
      image: "",
      description: "",
      sizes: "",
    },
  });

  const onSubmit = (data: ProductFormData) => {
    const sizeArray = data.sizes
      .split(",")
      .map((size) => parseFloat(size.trim()))
      .filter((size) => !isNaN(size));

    if (sizeArray.length === 0) {
      Alert.alert(
        "Invalid Sizes",
        "Please provide at least one valid numeric size.",
      );
      return;
    }

    const newProduct = {
      id: `PROD-${Date.now()}`,
      name: data.name,
      brand: data.brand.toUpperCase(),
      price: parseFloat(data.price),
      image: data.image,
      description: data.description,
      sizes: sizeArray,
    };

    dispatch(addProduct(newProduct));

    Alert.alert("Success", `${data.name} has been added to the catalog!`);
    reset();
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f5f5f4]" edges={["top"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="px-6 pt-2 pb-4 bg-white border-b border-neutral-200">
          <Text className="text-3xl font-bold tracking-tight text-neutral-900">
            Add Product
          </Text>
          <Text className="text-xs font-bold text-neutral-400 uppercase tracking-widest mt-0.5">
            Inventory Management
          </Text>
        </View>

        <ScrollView
          className="flex-1 px-6 pt-6"
          showsVerticalScrollIndicator={false}
        >
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="mb-4">
                <Text className="mb-2 text-sm font-bold text-neutral-700">
                  Product Name
                </Text>
                <TextInput
                  placeholder="e.g. Air Jordan 1"
                  className={`bg-white border rounded-xl px-4 py-4 text-base ${errors.name ? "border-red-500" : "border-neutral-200"}`}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {errors.name && (
                  <Text className="mt-1 ml-1 text-sm text-red-500">
                    {errors.name.message}
                  </Text>
                )}
              </View>
            )}
          />

          <View className="flex-row gap-4 mb-4">
            <Controller
              control={control}
              name="brand"
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="flex-1">
                  <Text className="mb-2 text-sm font-bold text-neutral-700">
                    Brand
                  </Text>
                  <TextInput
                    placeholder="Nike"
                    className={`bg-white border rounded-xl px-4 py-4 text-base ${errors.brand ? "border-red-500" : "border-neutral-200"}`}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                  {errors.brand && (
                    <Text className="mt-1 ml-1 text-sm text-red-500">
                      {errors.brand.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="price"
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="flex-1">
                  <Text className="mb-2 text-sm font-bold text-neutral-700">
                    Price ($)
                  </Text>
                  <TextInput
                    placeholder="199.99"
                    keyboardType="decimal-pad"
                    className={`bg-white border rounded-xl px-4 py-4 text-base ${errors.price ? "border-red-500" : "border-neutral-200"}`}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                  {errors.price && (
                    <Text className="mt-1 ml-1 text-sm text-red-500">
                      {errors.price.message}
                    </Text>
                  )}
                </View>
              )}
            />
          </View>

          <Controller
            control={control}
            name="image"
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="mb-4">
                <Text className="mb-2 text-sm font-bold text-neutral-700">
                  Image URL
                </Text>
                <TextInput
                  placeholder="https://example.com/shoe.jpg"
                  autoCapitalize="none"
                  className={`bg-white border rounded-xl px-4 py-4 text-base ${errors.image ? "border-red-500" : "border-neutral-200"}`}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {errors.image && (
                  <Text className="mt-1 ml-1 text-sm text-red-500">
                    {errors.image.message}
                  </Text>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="sizes"
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="mb-4">
                <Text className="mb-2 text-sm font-bold text-neutral-700">
                  Available Sizes
                </Text>
                <TextInput
                  placeholder="7, 8, 8.5, 9, 10"
                  className={`bg-white border rounded-xl px-4 py-4 text-base ${errors.sizes ? "border-red-500" : "border-neutral-200"}`}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {errors.sizes && (
                  <Text className="mt-1 ml-1 text-sm text-red-500">
                    {errors.sizes.message}
                  </Text>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="mb-8">
                <Text className="mb-2 text-sm font-bold text-neutral-700">
                  Description
                </Text>
                <TextInput
                  placeholder="Enter product details..."
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  className={`bg-white border rounded-xl px-4 py-4 text-base min-h-[100px] ${errors.description ? "border-red-500" : "border-neutral-200"}`}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {errors.description && (
                  <Text className="mt-1 ml-1 text-sm text-red-500">
                    {errors.description.message}
                  </Text>
                )}
              </View>
            )}
          />
        </ScrollView>

        <View className="px-6 py-5 bg-white border-t border-neutral-100">
          <TouchableOpacity
            className="flex-row items-center justify-center w-full gap-2 py-4 shadow-sm bg-neutral-900 rounded-2xl"
            onPress={handleSubmit(onSubmit)}
          >
            <PlusCircle size={20} color="#ffffff" />
            <Text className="text-lg font-medium text-white">
              Add to Catalog
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
