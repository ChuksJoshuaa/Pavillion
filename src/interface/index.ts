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

export interface ProductProps {
  isLoading: boolean;
  products: IIProps[];
  singleProduct: IIProps;
  currency: string;
  cart: IIProps[];
  categoryType: string;
  openCheckout: boolean;
  sizeType: string;
  colorType: string;
}
