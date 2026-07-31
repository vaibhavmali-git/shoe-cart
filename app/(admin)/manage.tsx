import { zodResolver } from "@hookform/resolvers/zod";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft, Save } from "lucide-react-native";
import { useEffect } from "react";
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
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import { addProduct, editProduct } from "../../src/store/slices/productSlice";

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
      /^[\d,\s\.]+$/,
      "Enter numeric sizes separated by commas (e.g. 8, 9, 10)",
    ),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function ManageProductScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const existingProduct = useAppSelector((state) =>
    state.products.items.find((p) => p.id === id),
  );

  const isEditing = !!id;

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

  useEffect(() => {
    if (isEditing && existingProduct) {
      reset({
        name: existingProduct.name,
        brand: existingProduct.brand,
        price: existingProduct.price.toString(),
        image: existingProduct.image,
        description: existingProduct.description,
        sizes: existingProduct.sizes.join(", "),
      });
    } else {
      reset({
        name: "",
        brand: "",
        price: "",
        image: "",
        description: "",
        sizes: "",
      });
    }
  }, [id, existingProduct, isEditing, reset]);

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

    const productData = {
      id: isEditing ? existingProduct!.id : `PROD-${Date.now()}`,
      name: data.name,
      brand: data.brand.toUpperCase(),
      price: parseFloat(data.price),
      image: data.image,
      description: data.description,
      sizes: sizeArray,
    };

    if (isEditing) {
      dispatch(editProduct(productData));
      Alert.alert("Success", "Product updated successfully!");
    } else {
      dispatch(addProduct(productData));
      Alert.alert("Success", "Product added to catalog!");
    }

    router.navigate("/(admin)/shoes");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f8f9fa]" edges={["top"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-row items-center px-4 pt-2 pb-4 bg-white border-b border-neutral-200">
          <TouchableOpacity
            onPress={() => router.navigate("/(admin)/shoes")}
            className="p-2 mr-2"
          >
            <ChevronLeft size={28} color="#171717" />
          </TouchableOpacity>
          <Text
            style={{ fontFamily: "Inter_700Bold" }}
            className="text-2xl text-neutral-900"
          >
            {isEditing ? "Edit Product" : "Add Product"}
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
            onPress={handleSubmit(onSubmit)}
            className="flex-row items-center justify-center w-full gap-2 py-4 shadow-sm bg-neutral-900 rounded-2xl"
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
