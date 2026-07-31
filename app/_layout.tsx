import {
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    useFonts,
} from "@expo-google-fonts/inter";
import { Stack } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "../global.css";
import { persistor, store } from "../src/store";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View className="flex-1 justify-center items-center bg-[#f8f9fa]">
        <ActivityIndicator size="large" color="#FF5A1F" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <View className="flex-1 items-center justify-center bg-[#f5f5f4]">
            <ActivityIndicator size="large" color="#171717" />
          </View>
        }
        persistor={persistor}
      >
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(customer)" />
          <Stack.Screen name="(admin)" />
        </Stack>
      </PersistGate>
    </Provider>
  );
}