import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "../global.css";
import { persistor, store } from "../src/store";

export default function RootLayout() {
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
        </Stack>
      </PersistGate>
    </Provider>
  );
}
