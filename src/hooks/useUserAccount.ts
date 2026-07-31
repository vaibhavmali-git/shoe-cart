import AsyncStorage from "@react-native-async-storage/async-storage";
import { Href, router } from "expo-router";

export function useUserAccount() {
  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("@last_portal");
    } catch (e) {
      console.error(e)
    }
    router.replace("/" as Href);
  };

  const navigateToOrders = () => {
    router.push("/(customer)/orders" as Href);
  };

  const navigateToAdminDashboard = async () => {
    try {
      await AsyncStorage.setItem("@last_portal", "admin");
    } catch (e) {
       console.error(e)
    }
    router.replace("/(admin)/orders" as Href);
  };

  return {
    signOut,
    navigateToOrders,
    navigateToAdminDashboard,
  };
}