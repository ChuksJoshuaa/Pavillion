import { createSlice } from "@reduxjs/toolkit";
import { ProductProps, IIProps, CartProps } from "../../../interface";
import { productData } from "../../../utils/data";
import { saveDataLocalStorage } from "../../../utils/getLocalStorage";
import { getDataFromLocalStorage } from "../../../utils/getLocalStorage";

const initialState: ProductProps = {
  isLoading: true,
  products: [],
  singleProduct: {} as IIProps,
  currency: "$",
  cart: getDataFromLocalStorage(),
  categoryType: "women",
  openCheckout: false,
  sizeType: "xs",
  colorType: "#D3D2D5",
  cartCount: 0,
  cartAmount: 0,
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
      const { id, price, sizeType, colorType } = action.payload;
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
            sizeType: sizeType,
            colorType: colorType,
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
      const findProduct = productData.find((item) => item.id === id);

      const tempCart = state.cart.map((item) => {
        if (item.id === id) {
          if (value === "inc") {
            if (findProduct) {
              let newCount = item.count + 1;
              let newAmount = price + findProduct.price;
              return { ...item, price: newAmount, count: newCount };
            }
          }
          if (value === "dec") {
            if (findProduct) {
              let newCount = item.count - 1;
              let newAmount = price - findProduct.price;
              if (newCount < 1) {
                newCount = 1;
                newAmount = findProduct.price;
              }
              return { ...item, price: newAmount, count: newCount };
            }
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

    changeSize: (state, action) => {
      const { id, size } = action.payload;

      const tempCart = state.cart.map((item) => {
        if (item.id === id) {
          return { ...item, sizeType: size };
        }
        return { ...item };
      });

      state.cart = tempCart as CartProps[];
      saveDataLocalStorage(state.cart);
    },

    changeColor: (state, action) => {
      const { id, color } = action.payload;

      const tempCart = state.cart.map((item) => {
        if (item.id === id) {
          return { ...item, colorType: color };
        }
        return { ...item };
      });

      state.cart = tempCart as CartProps[];
      saveDataLocalStorage(state.cart);
    },

    toggleCartAmount: (state) => {
      let totalPrice = state.cart.reduce((sum, item) => sum + item.price, 0);
      state.cartAmount = totalPrice;
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
  toggleCart,
  clearCart,
  removeCart,
  changeSize,
  changeColor,
  toggleCartAmount,
} = productSlice.actions;

export default productSlice.reducer;
