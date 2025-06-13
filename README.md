# Internship E-commerce Application

A full-featured e-commerce web application built with Next.js 15, TypeScript, Prisma, and MySQL. This project implements a complete authentication system with user account management including dashboard, wishlist, order history, profile management, and viewed products tracking.

## 🚀 Features Implemented

### ✅ Authentication System

- **NextAuth.js** integration with session management
- User registration and login with email/password
- Protected routes with middleware
- Role-based access control (USER/ADMIN)
- Session persistence and automatic logout

### ✅ Account Management System (`/account`)

- **Dashboard** - Overview of user statistics and recent orders
- **Profile Management** - Complete user information management
    - Personal information (name, email, phone)
    - Password change functionality
    - Address management with CRUD operations
- **Wishlist** - Save and manage favorite products
- **Order History** - View all orders with filtering and detail pages
- **Viewed Products** - Track and display recently viewed products

### ✅ Database Integration

- **Prisma ORM** with MySQL database
- Comprehensive schema with proper relationships
- Real-time data fetching (no dummy data)
- Database seeding with sample data

### ✅ UI/UX Enhancements

- **Header Integration** - Shows notifications only for logged-in users
- **Account Layout** - Unified header across all account pages
- **Responsive Design** - Works on all device sizes
- **Loading States** - Proper loading indicators
- **Error Handling** - User-friendly error messages

hish### ✅ API Layer

- RESTful API endpoints for all features
- Authentication middleware
- Input validation and error handling
- Type-safe responses

### ✅ Type Safety

- **Centralized Type System** - All interfaces in `/src/types/index.ts`
- TypeScript throughout the application
- Type-safe API responses and database queries

## 🛠️ Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript
- **Styling:** Tailwind CSS
- **Authentication:** NextAuth.js v4
- **Database:** MySQL with Prisma ORM
- **Icons:** Lucide React
- **Session Management:** Server-side sessions

## 📁 Project Structure

```
src/
├── app/
│   ├── account/                 # User account pages
│   │   ├── layout.tsx          # Account layout with header
│   │   ├── page.tsx            # Dashboard with real data
│   │   ├── profile/            # Profile management
│   │   ├── wishlist/           # Wishlist management
│   │   ├── order/              # Order history & details
│   │   └── view/               # Viewed products
│   ├── api/                    # API routes
│   │   ├── dashboard/          # Dashboard statistics
│   │   ├── profile/            # Profile management
│   │   ├── address/            # Address management
│   │   ├── viewed-products/    # Viewed products tracking
│   │   └── order/              # Order management
│   ├── auth/                   # Authentication pages
│   └── shop/                   # Shopping pages
├── components/                 # Reusable components
├── types/                      # Centralized type definitions
└── lib/                       # Utility functions
```

## 🗄️ Database Schema

### Core Models

- **User** - User accounts with profile information
- **Product** - Product catalog with categories
- **Order** - Order management with items
- **Address** - User delivery addresses
- **Wishlist** - Saved products
- **ViewedProduct** - Product view tracking

## 🔧 Setup & Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd internship-ecom
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment setup**
   Create `.env` file with:

```env
DATABASE_URL="mysql://username:password@localhost:3306/internship"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

4. **Database setup**

```bash
# Apply database schema
npx prisma db push

# Seed sample data
npm run seed
```

5. **Start development server**

```bash
npm run dev
```

## 👥 Default Users

After seeding, you can login with:

**Admin Account:**

- Email: `admin@test.mn`
- Password: `admin123`

**Test User:**

- Email: `user@example.com`
- Password: `user123`

## 🔐 Authentication Features

### Session Management

- Server-side session handling
- Automatic session validation
- Protected route middleware

### User Roles

- **USER**: Access to account features, shopping
- **ADMIN**: Full system access including admin panel

### Account Features

- Profile information management
- Password change with validation
- Multiple delivery addresses
- Order history with details
- Wishlist management
- Viewed products tracking

## 📊 Dashboard Features

### Statistics Cards

- Total orders count
- Total amount spent
- Wishlist items count
- Viewed products count

### Recent Orders

- Last 5 orders display
- Direct links to order details
- Order status indicators

## 🛒 E-commerce Features

### Product Management

- Real product data from database
- Category-based organization
- Stock management
- Product view tracking

### Order System

- Complete order history
- Order status tracking (PENDING/DELIVERED)
- Detailed order information
- Order item management

### Wishlist System

- Add/remove products
- Real-time updates
- Product availability checking

## 🔧 API Endpoints

### Profile Management

- `GET/PUT /api/profile` - User profile operations
- `POST /api/profile/change-password` - Password change

### Address Management

- `GET/POST /api/address` - Address operations
- `PUT/DELETE /api/address/[id]` - Specific address operations

### Dashboard

- `GET /api/dashboard` - Dashboard statistics

### Order Management

- `GET /api/order` - User orders
- `GET /api/order/detail/[id]` - Order details

### Product Tracking

- `GET/POST /api/viewed-products` - Viewed products tracking

## 🎨 UI Components

### Reusable Components

- **ProductCard** - Product display with wishlist integration
- **SideMenu** - Account navigation
- **Profile** - Complete profile management
- **Quantity** - Product quantity selector
- **ProductImages** - Product image gallery

### Layout Components

- **Header** - Navigation with user menu
- **AccountLayout** - Unified account page layout

## 🔍 Development Status

### ✅ Completed Features

1. **Authentication System** - Complete with NextAuth.js
2. **Database Schema** - All models with relationships
3. **Account Dashboard** - Real data integration
4. **Profile Management** - Full CRUD operations
5. **Address Management** - Multiple addresses support
6. **Order System** - History and details
7. **Wishlist** - Add/remove functionality
8. **Viewed Products** - Automatic tracking
9. **Type System** - Centralized and comprehensive
10. **API Layer** - RESTful endpoints
11. **UI/UX** - Responsive and user-friendly

### 🔄 System Highlights

- **No Dummy Data** - All features use real database data
- **Type Safety** - Full TypeScript implementation
- **Error Handling** - Comprehensive error management
- **Loading States** - Proper user feedback
- **Responsive Design** - Mobile-friendly interface
- **Session Security** - Secure authentication flow

## 🚀 Next Steps

Future enhancements could include:

- Cart functionality completion
- Payment system integration
- Admin panel features
- Product reviews and ratings
- Email notifications
- Advanced search and filtering

## 📝 Notes

This application demonstrates a complete e-commerce account management system with modern web development practices, focusing on user experience, type safety, and real-time data integration.

## 📘 TypeScript Integration

### TypeScript Advantages in this Project

#### 🔍 Type Safety & Error Prevention

- **Compile-time error detection** - Catches bugs before runtime
- **Intelligent code completion** - Enhanced developer experience with IntelliSense
- **Refactoring safety** - Automatic updates across the codebase when types change
- **API contract enforcement** - Ensures frontend-backend data consistency

#### 🚀 Developer Experience

- **Better IDE support** - Rich editing experience with VS Code
- **Self-documenting code** - Types serve as inline documentation
- **Easier debugging** - Clear error messages with exact locations
- **Team collaboration** - Consistent data structures across team members

#### 🏗️ Architectural Benefits

- **Centralized type definitions** - All interfaces in `/src/types/index.ts`
- **Database type safety** - Prisma generates types automatically
- **API response validation** - Type-safe API calls and responses
- **Component prop validation** - React components with strict typing

### Usage Examples

#### Centralized Type System

```typescript
// src/types/index.ts
export interface User {
    id: number;
    name: string;
    email: string;
    role: 'USER' | 'ADMIN';
}

export interface Product {
    id: number;
    name: string;
    price: number;
    category: Category;
}
```

#### Type-Safe API Calls

```typescript
// Type-safe API response
const fetchOrders = async (): Promise<Order[]> => {
    const response = await fetch('/api/order');
    const orders: Order[] = await response.json();
    return orders;
};
```

#### Component Props with Types

```typescript
interface ProductCardProps {
    product: Product;
    onAddToCart: (productId: number) => void;
    showWishlist?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
    product,
    onAddToCart,
    showWishlist = true,
}) => {
    // Component implementation
};
```

#### Database Integration with Prisma

```typescript
// Prisma automatically generates types
const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
        orders: {
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        },
    },
});
// TypeScript knows exact shape of 'user' object
```

### Type Safety in Practice

#### Form Handling

```typescript
interface LoginFormData {
    email: string;
    password: string;
}

const handleSubmit = (data: LoginFormData) => {
    // TypeScript ensures data has correct shape
    signIn('credentials', data);
};
```

#### State Management

```typescript
const [orders, setOrders] = useState<Order[]>([]);
const [loading, setLoading] = useState<boolean>(false);
const [error, setError] = useState<string | null>(null);
```

### Benefits Realized in This Project

- **Zero runtime type errors** - All data flows are type-checked
- **Seamless refactoring** - Rename interfaces and see all usages update
- **Enhanced API documentation** - Types explain expected data structures
- **Improved team productivity** - Less time debugging, more time building features
- **Scalable architecture** - Easy to add new features with confidence
