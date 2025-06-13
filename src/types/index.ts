// Common types for the entire application

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: "USER" | "ADMIN";
  createdAt?: Date | string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  categoryId: number;
  category: Category;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Category {
  id: number;
  name: string;
  products?: Product[];
}

export interface Order {
  id: number;
  userId: number;
  user?: User;
  items: OrderItem[];
  total: number;
  status: "PENDING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  createdAt: Date | string;
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  product: Product;
  quantity: number;
  price: number;
}

export interface Address {
  id: number;
  userId: number;
  title: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  district?: string;
  isDefault: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Wishlist {
  id: number;
  userId: number;
  productId: number;
  product: Product;
  addedAt: Date | string;
}

export interface ViewedProduct {
  id: number;
  userId: number;
  productId: number;
  product: Product;
  viewedAt: Date | string;
}

export interface CartItem {
  id: number;
  userId: number;
  productId: number;
  product: Product;
  quantity: number;
}

export interface Notification {
  id: number;
  userId: number;
  message: string;
  createdAt: Date | string;
}

// Dashboard stats
export interface DashboardStats {
  totalOrders: number;
  totalSpent: number;
  wishlistCount: number;
  viewedProductsCount: number;
  recentOrders: Order[];
}

// API Response types
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}
