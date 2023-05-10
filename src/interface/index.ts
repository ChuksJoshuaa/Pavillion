export interface IIProps {
  name: string;
  image: string[];
  colors: string[];
  id: number;
  shipping: boolean;
  description: string;
  price: number;
  category: string;
  size: string[];
  stock: number;
}

export interface CartProps {
  name: string;
  image: string[];
  colors: string[];
  id: number;
  size: string[];
  category: string;
  stock: number;
  price: number;
  count: number;
  colorType: string;
  sizeType: string;
}

export interface ProductProps {
  isLoading: boolean;
  products: IIProps[];
  singleProduct: IIProps;
  currency: string;
  cart: CartProps[];
  categoryType: string;
  openCheckout: boolean;
  sizeType: string;
  colorType: string;
  cartCount: number;
  cartAmount: number;
  tax: number;
}
