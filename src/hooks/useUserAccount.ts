import { Href, router } from "expo-router";

export function useUserAccount() {
  const signOut = () => {
    router.replace("/" as Href);
  };

  const navigateToOrders = () => {
    router.push("/(customer)/orders" as Href);
  };

  const navigateToAdminDashboard = () => {
    router.replace("/(admin)/orders" as Href);
  };

  return {
    signOut,
    navigateToOrders,
    navigateToAdminDashboard,
  };
}
