import AsyncStorage from "@react-native-async-storage/async-storage";
import { Href, router } from "expo-router";

export function useAdminProfile() {
  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("@last_portal");
    } catch (e) {
      console.warn("Failed to clear @last_portal from storage:", e);
    }
    router.replace("/" as Href);
  };

  const navigateToOrders = () => {
    router.push("/(admin)/orders" as Href);
  };

  const navigateToShoes = () => {
    router.push("/(admin)/inventory" as Href);
  };

  const navigateToCustomerStore = async () => {
    try {
      await AsyncStorage.setItem("@last_portal", "customer");
    } catch (e) {
      console.warn("Failed to save @last_portal to storage:", e);
    }
    router.replace("/(customer)" as Href);
  };

  return {
    signOut,
    navigateToOrders,
    navigateToShoes,
    navigateToCustomerStore,
  };
}