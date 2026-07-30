import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { z } from "zod";
import { useAppDispatch } from "../src/store/hooks";
import { clearCart } from "../src/store/slices/cartSlice";

const checkoutSchema = z.object({
  name: z.string().min(2, "Name is required"),
  address: z.string().min(5, "Full shipping address is required"),
  cardNumber: z.string().length(16, "Card must be exactly 16 digits"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY format"),
  cvv: z.string().length(3, "CVV must be 3 digits"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      address: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    },
  });

  const onSubmit = (data: CheckoutFormData) => {
    dispatch(clearCart());
    Alert.alert(
      "Payment Successful",
      `Thank you for your order, ${data.name}!`,
      [{ text: "Back to Home", onPress: () => router.replace("/(customer)") }],
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#f5f5f4]"
    >
      <View
        style={{ paddingTop: insets.top }}
        className="flex-row items-center px-4 pb-4 bg-white border-b border-neutral-200"
      >
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <ChevronLeft size={28} color="#171717" />
        </TouchableOpacity>
        <Text className="ml-2 text-xl font-bold text-neutral-900">
          Checkout
        </Text>
      </View>

      <ScrollView
        className="flex-1 px-6 pt-6"
        showsVerticalScrollIndicator={false}
      >
        <Text className="mb-4 text-lg font-bold text-neutral-900">
          Shipping Details
        </Text>

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="mb-4">
              <TextInput
                placeholder="Full Name"
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

        <Controller
          control={control}
          name="address"
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="mb-8">
              <TextInput
                placeholder="Full Shipping Address"
                className={`bg-white border rounded-xl px-4 py-4 text-base ${errors.address ? "border-red-500" : "border-neutral-200"}`}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.address && (
                <Text className="mt-1 ml-1 text-sm text-red-500">
                  {errors.address.message}
                </Text>
              )}
            </View>
          )}
        />

        <Text className="mb-4 text-lg font-bold text-neutral-900">
          Payment Information
        </Text>

        <Controller
          control={control}
          name="cardNumber"
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="mb-4">
              <TextInput
                placeholder="Card Number (16 digits)"
                keyboardType="number-pad"
                maxLength={16}
                className={`bg-white border rounded-xl px-4 py-4 text-base ${errors.cardNumber ? "border-red-500" : "border-neutral-200"}`}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.cardNumber && (
                <Text className="mt-1 ml-1 text-sm text-red-500">
                  {errors.cardNumber.message}
                </Text>
              )}
            </View>
          )}
        />

        <View className="flex-row gap-4 mb-10">
          <Controller
            control={control}
            name="expiry"
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="flex-1">
                <TextInput
                  placeholder="MM/YY"
                  maxLength={5}
                  className={`bg-white border rounded-xl px-4 py-4 text-base ${errors.expiry ? "border-red-500" : "border-neutral-200"}`}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {errors.expiry && (
                  <Text className="mt-1 ml-1 text-sm text-red-500">
                    {errors.expiry.message}
                  </Text>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="cvv"
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="flex-1">
                <TextInput
                  placeholder="CVV"
                  keyboardType="number-pad"
                  maxLength={3}
                  className={`bg-white border rounded-xl px-4 py-4 text-base ${errors.cvv ? "border-red-500" : "border-neutral-200"}`}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {errors.cvv && (
                  <Text className="mt-1 ml-1 text-sm text-red-500">
                    {errors.cvv.message}
                  </Text>
                )}
              </View>
            )}
          />
        </View>
      </ScrollView>

      <View
        style={{ paddingBottom: Math.max(insets.bottom, 20) }}
        className="px-6 pt-5 bg-white border-t border-neutral-100"
      >
        <TouchableOpacity
          className="items-center w-full py-4 shadow-sm bg-neutral-900 rounded-2xl"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-lg font-medium text-white">Pay Now</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
