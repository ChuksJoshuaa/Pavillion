import { createSlice } from "@reduxjs/toolkit";
import { ProductProps, IIProps } from "../../../interface";

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
} = productSlice.actions;

export default productSlice.reducer;
