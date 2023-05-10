import { CartProps } from "../interface";

export const saveDataLocalStorage = (data: CartProps[]) => {
  return localStorage.setItem("cart", JSON.stringify(data));
};

export const getDataFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart") || "[]");
};
