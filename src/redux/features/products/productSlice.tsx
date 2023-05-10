import { createSlice } from "@reduxjs/toolkit";
import { ProductProps, IIProps, CartProps } from "../../../interface";
import { productData } from "../../../utils/data";
import { saveDataLocalStorage } from "../../../utils/getLocalStorage";

const initialState: ProductProps = {
  isLoading: true,
  products: [],
  singleProduct: {} as IIProps,
  currency: "$",
  cart: [],
  categoryType: "women",
  openCheckout: false,
  sizeType: "xs",
  colorType: "#D3D2D5",
  cartCount: 0,
};

export const productSlice = createSlice({
  name: "product",

  initialState,
  reducers: {
    setLoader: (state, action) => {
      state.isLoading = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setSingleProduct: (state, action) => {
      state.singleProduct = action.payload;
    },

    setCurrency: (state, action) => {
      state.currency = action.payload;
    },

    setCategoryType: (state, action) => {
      state.categoryType = action.payload;
    },

    setOpenCheckout: (state, action) => {
      state.openCheckout = action.payload;
    },

    setSizeType: (state, action) => {
      state.sizeType = action.payload;
    },

    setColorType: (state, action) => {
      state.colorType = action.payload;
    },

    setCart: (state, action) => {
      const { id, price } = action.payload;
      const tempItem = state.cart.find((i) => i.id === id);
      if (tempItem) {
        const tempCart = state.cart.map((cartItem) => {
          if (cartItem.id === id) {
            let newAmount = cartItem.price + price;
            return { ...cartItem, price: newAmount, count: cartItem.count + 1 };
          } else {
            return { ...cartItem };
          }
        });
        state.cart = tempCart as CartProps[];
        saveDataLocalStorage(state.cart);
      } else {
        const findProduct = productData.find((item) => item.id === id);
        const count = 1;
        if (findProduct) {
          const newItem = {
            id: id,
            name: findProduct.name as string,
            price: findProduct.price,
            colors: findProduct.colors,
            size: findProduct.size,
            image: findProduct.image,
            category: findProduct.category,
            stock: findProduct.stock,
            count: count,
          };
          state.cart = [...state.cart, newItem];
          saveDataLocalStorage(state.cart);
        }
        state.cart = [...state.cart];
        saveDataLocalStorage(state.cart);
      }
    },

    setCartCount: (state, action) => {
      state.cartCount = action.payload;
    },

    removeCart: (state, action) => {
      const { id } = action.payload;
      const tempCart = state.cart.filter((item) => item.id !== id);
      state.cart = tempCart as CartProps[];
      saveDataLocalStorage(state.cart);
    },

    toggleCart: (state, action) => {
      const { id, value, price } = action.payload;
      const tempCart = state.cart.map((item) => {
        if (item.id === id) {
          if (value === "inc") {
            let newAmount = item.price + price;
            let newCount = item.count + 1;
            return { ...item, price: newAmount, count: newCount };
          }
          if (value === "dec") {
            let newAmount = price - item.price;
            let newCount = item.count - 1;
            if (newCount < 1) {
              newCount = 1;
            }
            return { ...item, price: newAmount, count: newCount };
          }
        }
        return item;
      });

      state.cart = tempCart as CartProps[];
      saveDataLocalStorage(state.cart);
    },

    clearCart: (state) => {
      state.cart = [];
      saveDataLocalStorage(state.cart);
    },
  },
});

export const {
  setLoader,
  setProducts,
  setSingleProduct,
  setCurrency,
  setCategoryType,
  setOpenCheckout,
  setSizeType,
  setColorType,
  setCart,
  setCartCount,
} = productSlice.actions;

export default productSlice.reducer;
