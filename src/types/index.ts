export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  description: string;
  sizes: number[];
}

export interface CartItem {
  id: string;
  product: Product;
  size: number;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: "Processing" | "Shipped" | "Delivered";
  customerName: string;
}
