import { Href, router } from "expo-router";

export function useAdminProfile() {
  const signOut = () => {
    router.replace("/" as Href);
  };

  const navigateToOrders = () => {
    router.push("/(admin)/orders" as Href);
  };

  const navigateToShoes = () => {
    router.push("/(admin)/inventory" as Href);
  };

  const navigateToCustomerStore = () => {
    router.replace("/(customer)" as Href);
  };

  return {
    signOut,
    navigateToOrders,
    navigateToShoes,
    navigateToCustomerStore,
  };
}
