import { Product } from "../types";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Air Max Pulse",
    brand: "Nike",
    price: 150,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
    description:
      "The Air Max Pulse pulls inspiration from the London music scene, bringing an underground touch to the iconic Air Max line.",
    sizes: [7, 8, 9, 10, 11, 12],
  },
  {
    id: "2",
    name: "Ultraboost Light",
    brand: "Adidas",
    price: 190,
    image:
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1000&auto=format&fit=crop",
    description:
      "Experience epic energy with the new Ultraboost Light, our lightest Ultraboost ever.",
    sizes: [8, 9, 10, 11],
  },
];
