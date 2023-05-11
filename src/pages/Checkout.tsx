import { useEffect } from "react";
import { CartProps } from "../interface";
import {
  changeColor,
  changeSize,
  removeCart,
  setCartCount,
  setTax,
  toggleCart,
  toggleCartAmount,
} from "../redux/features/products/productSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Toast, Toaster } from "../utils/Toast";
import { currencyFormatter } from "../utils/conversions";
import { getDataFromLocalStorage } from "../utils/getLocalStorage";
import { FiMinusSquare, FiPlusSquare } from "react-icons/fi";
import { Link } from "react-router-dom";
import { PaystackButton } from "react-paystack";

const Checkout = () => {
  const cartItems = getDataFromLocalStorage();
  const dispatch = useAppDispatch();
  const { currency, cartAmount, cartCount, tax } = useAppSelector(
    (state) => state.product
  );

  const content = () => {
    dispatch(toggleCartAmount());
    dispatch(setCartCount());
    dispatch(setTax());
  };

  const setSize = (id: number, val: string) => {
    const payload = {
      id: id,
      size: val,
    };
    dispatch(changeSize(payload));
  };

  const setColor = (id: number, val: string) => {
    const payload = {
      id: id,
      color: val,
    };
    dispatch(changeColor(payload));
    content();
  };

  const toggleCartItems = (
    id: number,
    value: string,
    price: number,
    count: number
  ) => {
    const findProduct = cartItems.find((item: CartProps) => item.id === id);
    if (value === "inc") {
      if (findProduct.stock === count) return Toast("Item out of stock");
      const payload = {
        id: id,
        value: value,
        price: price,
      };

      dispatch(toggleCart(payload));
      content();
    } else {
      const newId = {
        id: id,
      };
      if (count <= 1) {
        dispatch(removeCart(newId));
      }
      const payload = {
        id: id,
        value: value,
        price: price,
      };

      dispatch(toggleCart(payload));
      content();
    }
  };

  useEffect(() => {
    content();
  }, []);

  const onSuccess = (reference: any) => {
    console.log(reference);
    Toaster("Payment Successful");
  };

  const onClose = () => {
    console.log("closed");
  };
  return (
    <div>
      <div className="flex items-center justify-between flex-wrap py-5">
        <h3 className="text-[32px] leading-[40px] font-[700] uppercase">
          Cart
        </h3>
        <Link
          to="/"
          className="w-[100px] h-[40px] text-center bg-red-400 text-white font-bold rounded-lg pt-2 cursor-pointer"
        >
          Go back
        </Link>
      </div>
      <div className="py-5">
        {cartItems.length > 0 ? (
          cartItems.map((item: CartProps, index: number) => (
            <div
              className="cart__item pb-5 mb-3 border-t-2 border-gray-200 pt-2"
              key={`${item.id}-${index}`}
            >
              <div className="pb-3">
                <div className="pb-1">
                  <h3 className="pb-0 text-[17px] leading-[27px] font-[400] text-gray-600">
                    {item.name.split(" ")[0]}
                  </h3>
                  <h3 className="pt-0 text-[16px] leading-[27px] font-[300] text-gray-600">
                    {item.name.split(" ")[1]} {item.name.split(" ")[2]}{" "}
                    {item.name.split(" ")[3]}
                  </h3>
                </div>
                <p className="text-[20px] leading-[18px] font-[700] font-bold pb-2">
                  {currencyFormatter(currency, item.price)}
                </p>
                <div className="pb-1">
                  <h3 className="uppercase text-[16px]">Size:</h3>
                  <div className="icon__content">
                    {item.size.map((val, i) => (
                      <div
                        key={i}
                        onClick={() => setSize(item.id, val)}
                        className={`h-[24px] w-[24px] border-[1px] border-[#1D1F22] mr-3 text-center text-[14px] font-[400] leading-[160%] my-2 ${
                          item.sizeType === val
                            ? "text-gray-50 bg-[#222]"
                            : "text-[#1D1F22]"
                        }`}
                      >
                        {val}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pb-1">
                  <h3 className="uppercase text-[16px]">Color:</h3>
                  <div className="icon__content">
                    {item.colors.map((val, i) => (
                      <div
                        key={i}
                        style={{ backgroundColor: val }}
                        onClick={() => setColor(item.id, val)}
                        className={`h-[20px] w-[20px] mr-3 text-center font-[400] leading-[18px] my-2 sm:mt-3 ${
                          item.colorType === val
                            ? "border-[2px] border-[#1D1F]"
                            : "border-[1px] border-[#1D1F22]"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-start">
                <div className="flex flex-col justify-between items-cenetr">
                  <FiPlusSquare
                    className="text-[30px]"
                    onClick={() =>
                      toggleCartItems(item.id, "inc", item.price, item.count)
                    }
                  />
                  <h3 className="px-2 font-normal text-[20px]">{item.count}</h3>
                  <FiMinusSquare
                    className="text-[30px]"
                    onClick={() =>
                      toggleCartItems(item.id, "dec", item.price, item.count)
                    }
                  />
                </div>
                <div
                  className="w-[75%] sm:w-[90%] mx-auto"
                  style={{
                    backgroundImage: `url(${item?.image[0]})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                    marginLeft: "1em",
                    marginRight: "1em",
                  }}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="py-2">
            <h3 className="text-[24px] leading-[28px] font-[400] text-red-500">
              No Items available in the cart
            </h3>
          </div>
        )}
      </div>

      <div className="border-t-2 border-gray-200 pt-5">
        <h3 className="text-[24px] leading-[28px] font-[400]">
          Tax 21%:{" "}
          <span className="font-bold">{currencyFormatter(currency, tax)}</span>
        </h3>
        <h3 className="text-[24px] leading-[28px] font-[400] pt-2">
          Quantity: <span className="font-bold">{cartCount}</span>
        </h3>
        <h3 className="text-[24px] leading-[28px] font-[400] py-2">
          Total:{" "}
          <span className="font-bold">
            {currencyFormatter(currency, cartAmount)}
          </span>
        </h3>
      </div>
      <div>
        {cartItems.length > 0 ? (
          <PaystackButton
            text="Order"
            className="width-[279px] h-[43px] text-center uppercase bg-[#5ECE7B] py-[8px] px-[100px] text-[14px] text-white font-bold leading-[120%] my-3"
            onSuccess={onSuccess}
            onClose={onClose}
            email={import.meta.env.VITE_EMAIL}
            amount={cartAmount * 100}
            publicKey={import.meta.env.VITE_PAYSTACK_PUBLIC_KEY}
          />
        ) : (
          <button
            className={`width-[279px] h-[43px] text-center uppercase bg-[#5ECE7B] py-[8px] px-[100px] text-[14px] text-white font-bold leading-[120%] my-3 ${
              cartItems.length === 0 ? "opacity-50" : ""
            }`}
            disabled={cartItems.length === 0}
          >
            order
          </button>
        )}
      </div>
    </div>
  );
};

export default Checkout;
