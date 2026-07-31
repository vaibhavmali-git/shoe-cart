import { zodResolver } from "@hookform/resolvers/zod";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addProduct, editProduct } from "../store/slices/productSlice";

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

export type ProductFormData = z.infer<typeof productSchema>;

export function useManageProduct() {
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

  const handleBack = () => {
    router.navigate("/(admin)/shoes");
  };

  return {
    control,
    errors,
    isEditing,
    handleSubmit: handleSubmit(onSubmit),
    handleBack,
  };
}
