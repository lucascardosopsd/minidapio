// Common Types
export type BaseEntity = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

// User Types
export type User = BaseEntity & {
  email: string;
  name: string;
  role: UserRole;
};

export type UserRole = 'ADMIN' | 'USER' | 'RESTAURANT_OWNER';

// Restaurant Types
export type Restaurant = BaseEntity & {
  name: string;
  description: string;
  address: string;
  phone: string;
  ownerId: string;
  isActive: boolean;
};

// Menu Types
export type MenuItem = BaseEntity & {
  name: string;
  description: string;
  price: number;
  category: string;
  restaurantId: string;
  isAvailable: boolean;
};

// Order Types
export type Order = BaseEntity & {
  userId: string;
  restaurantId: string;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
};

export type OrderItem = {
  menuItemId: string;
  quantity: number;
  price: number;
};

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED';

// API Response Types
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// Form Types
export type FormField = {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'textarea';
  required?: boolean;
  placeholder?: string;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}; 