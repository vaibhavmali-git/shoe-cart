import { ChevronLeft } from "lucide-react-native";
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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCheckout } from "../src/hooks/useCheckout";

export default function CheckoutScreen() {
  const insets = useSafeAreaInsets();
  const { control, errors, onSubmit, handleBack } = useCheckout();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#f5f5f4]"
    >
      <View
        style={{ paddingTop: insets.top }}
        className="flex-row items-center px-4 pb-4 bg-white border-b border-neutral-200"
      >
        <TouchableOpacity onPress={handleBack} className="p-2">
          <ChevronLeft size={28} color="#171717" />
        </TouchableOpacity>
        <Text style={{ fontFamily: "Inter_700Bold" }} className="ml-2 text-xl text-neutral-900">
          Checkout
        </Text>
      </View>

      <ScrollView
        className="flex-1 px-6 pt-6"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{ fontFamily: "Inter_700Bold" }} className="mb-4 text-lg text-neutral-900">
          Shipping Details
        </Text>

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="mb-4">
              <TextInput
                placeholder="Full Name"
                style={{ fontFamily: "Inter_400Regular" }}
                className={`bg-white border rounded-xl px-4 py-4 text-base ${errors.name ? "border-red-500" : "border-neutral-200"}`}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.name && (
                <Text style={{ fontFamily: "Inter_500Medium" }} className="mt-1 ml-1 text-sm text-red-500">
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
                style={{ fontFamily: "Inter_400Regular" }}
                className={`bg-white border rounded-xl px-4 py-4 text-base ${errors.address ? "border-red-500" : "border-neutral-200"}`}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.address && (
                <Text style={{ fontFamily: "Inter_500Medium" }} className="mt-1 ml-1 text-sm text-red-500">
                  {errors.address.message}
                </Text>
              )}
            </View>
          )}
        />

        <Text style={{ fontFamily: "Inter_700Bold" }} className="mb-4 text-lg text-neutral-900">
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
                style={{ fontFamily: "Inter_400Regular" }}
                className={`bg-white border rounded-xl px-4 py-4 text-base ${errors.cardNumber ? "border-red-500" : "border-neutral-200"}`}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.cardNumber && (
                <Text style={{ fontFamily: "Inter_500Medium" }} className="mt-1 ml-1 text-sm text-red-500">
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
                  style={{ fontFamily: "Inter_400Regular" }}
                  className={`bg-white border rounded-xl px-4 py-4 text-base ${errors.expiry ? "border-red-500" : "border-neutral-200"}`}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {errors.expiry && (
                  <Text style={{ fontFamily: "Inter_500Medium" }} className="mt-1 ml-1 text-sm text-red-500">
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
                  style={{ fontFamily: "Inter_400Regular" }}
                  className={`bg-white border rounded-xl px-4 py-4 text-base ${errors.cvv ? "border-red-500" : "border-neutral-200"}`}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {errors.cvv && (
                  <Text style={{ fontFamily: "Inter_500Medium" }} className="mt-1 ml-1 text-sm text-red-500">
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
          className="items-center w-full py-4  bg-neutral-900 rounded-2xl"
          onPress={onSubmit}
        >
          <Text style={{ fontFamily: "Inter_600SemiBold" }} className="text-lg text-white">
            Pay Now
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}