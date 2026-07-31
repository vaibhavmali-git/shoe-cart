import { useRouter } from "expo-router";
import { useState } from "react";
import { useAppSelector } from "../store/hooks";

export function useProductSearch() {
  const products = useAppSelector((state) => state.products.items);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const navigateToProductDetails = (id: string) => {
    router.push(`/product/${id}`);
  };

  return {
    searchQuery,
    setSearchQuery,
    filteredProducts,
    navigateToProductDetails,
  };
}
