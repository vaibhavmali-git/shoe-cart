import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addProduct, updateProduct } from "../store/slices/productSlice";

const productSchema = z.object({
  name: z.string().min(2, "Name is required"),
  brand: z.string().min(2, "Brand is required"),
  price: z.string().min(1, "Price is required"),
  image: z.string().url("Must be a valid URL"),
  sizes: z.string().min(1, "At least one size is required"),
  description: z.string().min(5, "Description is required"),
});

type ProductFormData = z.infer<typeof productSchema>;

export function useManageProduct() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const params = useLocalSearchParams();
  const productId = params.id as string | undefined;
  const isEditing = !!productId;

  const products = useAppSelector((state) => state.products.items);
  const existingProduct = products.find((p) => p.id === productId);

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
      sizes: "",
      description: "",
    },
  });

  useEffect(() => {
    if (existingProduct) {
      reset({
        name: existingProduct.name,
        brand: existingProduct.brand,
        price: existingProduct.price.toString(),
        image: existingProduct.image,
        sizes: existingProduct.sizes.join(", "),
        description: existingProduct.description,
      });
    }
  }, [existingProduct, reset]);

  const onSubmit = (data: ProductFormData) => {
    const formattedSizes = data.sizes
      .split(",")
      .map((s) => Number(s.trim()))
      .filter((n) => !isNaN(n));
      
    const parsedPrice = parseFloat(data.price) || 0;

    if (isEditing && productId) {
      dispatch(
        updateProduct({
          id: productId,
          name: data.name,
          brand: data.brand,
          price: parsedPrice,
          image: data.image,
          sizes: formattedSizes,
          description: data.description,
        })
      );
    } else {
      const newProduct = {
        id: `prod-${Date.now()}`,
        name: data.name,
        brand: data.brand,
        price: parsedPrice,
        image: data.image,
        sizes: formattedSizes,
        description: data.description,
      };
      dispatch(addProduct(newProduct));
    }

    router.replace("/(admin)/inventory");
  };

  const handleBack = () => {
    router.replace("/(admin)/inventory");
  };

  return {
    control,
    errors,
    isEditing,
    handleSubmit: handleSubmit(onSubmit),
    handleBack,
  };
}