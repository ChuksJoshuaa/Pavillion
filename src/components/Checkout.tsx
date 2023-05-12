import { CartProps } from "../interface";
import {
  changeColor,
  changeSize,
  removeCart,
  setOpenCheckout,
  toggleCart,
  toggleCartAmount,
} from "../redux/features/products/productSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Toast } from "../utils/Toast";
import { currencyFormatter, handleScrollToTop } from "../utils/conversions";
import { getDataFromLocalStorage } from "../utils/getLocalStorage";
import { FiMinusSquare, FiPlusSquare } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";

const Checkout = () => {
  const cartItems = getDataFromLocalStorage();
  const dispatch = useAppDispatch();

  const { currency, cartAmount } = useAppSelector((state) => state.product);

  const handleClick = () => {
    dispatch(toggleCartAmount());
    dispatch(setOpenCheckout(false));
    handleScrollToTop();
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
      dispatch(toggleCartAmount());
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
      dispatch(toggleCartAmount());
    }
  };
  return (
    <div className="relative sm:absolute right-0 sm:right-[6rem] w-full sm:w-[32rem] bg-white z-50 mx-0 shadow-lg rounded-lg border-[1px] border-gray-100">
      <div className="p-2">
        <div className="flex justify-between items-center pt-1 pb-3">
          <h3 className="font-[700] text-[16px] leading-[160%] text-[#1D1F22] py-3">
            My Bag,{" "}
            <span className="font-normal">
              {cartItems.length} {cartItems.length > 1 ? "Items" : "Item"}
            </span>
          </h3>
          <MdClose
            className="text-red-900 text-3xl cursor-pointer"
            onClick={() => dispatch(setOpenCheckout(false))}
          />
        </div>

        <div
          className={`${
            cartItems.length === 0 ? "h-[6rem]" : "h-[30rem]"
          } overflow-y-auto pt-3`}
        >
          {cartItems.length > 0 ? (
            cartItems.map((item: CartProps, index: number) => (
              <div className="cart__item pb-5 mb-3" key={`${item.id}-${index}`}>
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
                    <h3 className="px-2 font-normal text-[20px]">
                      {item.count}
                    </h3>
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
              <h3 className="text-[17px] leading-[28px] font-[400] text-red-500">
                No Items available in the cart
              </h3>
            </div>
          )}
        </div>

        {cartItems.length > 0 ? (
          <div className="border-t-2 border-gray-100">
            <div className="flex flex-row flex-wrap justify-between items-center py-2">
              <h3 className="text-[25px] leading-[27px] font-bold text-gray-600">
                Total
              </h3>
              <h3 className="text-[25px] leading-[27px] font-bold text-gray-600">
                {currencyFormatter(currency, cartAmount)}
              </h3>
            </div>
            <div className="flex flex-row flex-wrap justify-between items-center py-5">
              <button className="w-[140px] h-[43px] border-[1px] border-[#1D1F22] bg-[#FFFFFF] text-center text-gray-900 text-lg font-bold uppercase mb-2 sm:mb-0">
                View bag
              </button>
              <Link to="/checkout" onClickCapture={handleClick}>
                <button className="w-[140px] h-[43px] border-[1px] border-gray-50 bg-[#5ECE7B] text-center text-gray-50 text-lg font-bold uppercase">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Checkout;
