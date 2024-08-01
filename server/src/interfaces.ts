export interface Product {
  id: string;
  images: string[];
  title: string;
  slug: string;
  price: number;
  quantity: number;
  discount: number;
  subcategory: string;
  dateAdded: string;
  param: {
    [key: string]: string | number;
  };
  description: string;
}

export interface Review {
  productId: string;
  userName: string;
  userEmail: string;
  rating: number;
  comment: string;
  date: Date;
  replies?: Reply[];
}

interface Reply {
  userName: string;
  userEmail: string;
  comment: string;
  date: Date;
}

export interface User {
  _id: string;
  name: string;
  surname?: string;
  phone?: string;
  city?: string;
  address?: string;
  email: string;
  isAdmin: boolean;
  favorites: string[];
  basket: ProductInBasket[];
  isActivated: boolean;
  activationLink: string;
  createdAt: Date;
  authType: string;
  matchPassword(password: string): Promise<boolean>;
}

interface ProductInBasket {
  productId: string;
  quantity: number;
}

export interface Orders {
  _id: string;
  orderNumber: number;
  user: object;
  orderItems: [];
  totalPrice: number;
  paymentMethod: string;
  isPaid: boolean;
  deliveryOption: string;
  isDelivered: boolean;
  createdAt: string;
}
