// Common types for the entire application

export interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;
    role: 'USER' | 'ADMIN';
    createdAt?: Date | string;
    totalSpent?: number;
    _count?: {
        orders: number;
        cartItems: number;
        wishlist: number;
    };
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
    images?: ProductImage[];
    categoryId: number;
    category: Category;
    _count?: {
        orderItems: number;
    };
    createdAt: Date | string;
    updatedAt: Date | string;
}

export interface ProductImage {
    id: number;
    productId?: number;
    imageUrl: string;
    alt?: string;
    isPrimary: boolean;
    createdAt?: Date | string;
}

export interface Category {
    id: number;
    name: string;
    description?: string | null;
    imageUrl?: string | null;
    featured?: boolean;
    products?: Product[];
    _count?: {
        products: number;
    };
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export interface Order {
    id: number;
    userId: number;
    user?: User;
    items: OrderItem[];
    total: number;
    status: 'PENDING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
    createdAt: Date | string;
    updatedAt?: Date | string;
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

// Slider/Banner types
export interface Slider {
    id: number;
    title: string;
    description?: string;
    imageUrl: string;
    linkUrl?: string;
    isActive: boolean;
    order: number;
    createdAt: Date | string;
    updatedAt: Date | string;
}

// Admin response types
export interface UsersResponse {
    users: User[];
    pagination: PaginationInfo;
}

export interface OrdersResponse {
    orders: Order[];
    pagination: PaginationInfo;
}

export interface ProductsResponse {
    products: Product[];
    pagination: PaginationInfo;
}

export interface PaginationInfo {
    page: number;
    limit: number;
    total: number;
    pages: number;
}

// Dashboard stats
export interface DashboardStats {
    totalProducts: number;
    totalOrders: number;
    totalUsers: number;
    newOrders: number;
    shippedOrders: number;
    deliveredOrders: number;
    usersWithOrders: number;
    usersWithoutOrders: number;
    topProducts: Array<{
        product: Product;
        totalSold: number;
    }>;
    categoryBreakdown: Array<{
        category: Category;
        productCount: number;
    }>;
}

export interface UserDashboardStats {
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
    success?: boolean;
}

// Filter and search types
export interface ProductFilters {
    category?: number;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
    search?: string;
    sortBy?: 'name' | 'price' | 'createdAt' | 'popularity';
    sortOrder?: 'asc' | 'desc';
}

// Upload response
export interface UploadResponse {
    success: boolean;
    files: Array<{
        fileName: string;
        url: string;
    }>;
    url?: string;
}
