import { useState } from "react";
import {
  setCategoryType,
  setCurrency,
} from "../redux/features/products/productSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { category, currencyData } from "../utils/data";
import { BsCart } from "react-icons/bs";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { categoryType, currency } = useAppSelector((state) => state.product);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flex justify-between items-center px-1 md:px-3 py-3">
      <div className="flex justify-between items-center py-4">
        {category.map((item) => (
          <div key={item.id}>
            <h3
              className={`pb-5 uppercase text-[12px] md:text-[16px] font-[400] leading-[120%] ${
                categoryType === item.id
                  ? "text-[#5ECE7B] border-b-2 border-[#5ECE7B]"
                  : "text-[#1D1F22]"
              } px-1 md:px-5`}
              onClick={() => dispatch(setCategoryType(item.id))}
            >
              {item.name}
            </h3>
          </div>
        ))}
      </div>

      <div className="relative">
        <svg
          className="w-[25px] md:w-[33px] h-[22px] md:h-[30px]"
          viewBox="0 0 33 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M32.0988 28.6014C32.1313 28.9985 31.8211 29.339 31.4268 29.339H1.59438C1.2009 29.339 0.890922 29.0002 0.922082 28.6037L3.06376 1.34718C3.09168 0.992702 3.38426 0.719727 3.73606 0.719727H29.1958C29.5468 0.719727 29.8391 0.991612 29.868 1.34499L32.0988 28.6014Z"
            fill="url(#paint0_linear_150_365)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_150_365"
              x1="25.8733"
              y1="25.3337"
              x2="7.51325"
              y2="3.9008"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#52D67A" />
              <stop offset="1" stop-color="#5AEE87" />
            </linearGradient>
          </defs>
        </svg>

        <svg
          width="15"
          className="absolute top-[30%] left-[20%]"
          height="13"
          viewBox="0 0 15 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.92324 9.69529C4.04024 9.69529 0.881348 5.86314 0.881348 1.15278C0.881348 0.90747 1.07815 0.708496 1.32109 0.708496C1.56403 0.708496 1.76084 0.907334 1.76084 1.15278C1.76084 5.3732 4.52531 8.80672 7.92337 8.80672C11.3214 8.80672 14.0859 5.3732 14.0859 1.15278C14.0859 0.90747 14.2827 0.708496 14.5257 0.708496C14.7686 0.708496 14.9654 0.907334 14.9654 1.15278C14.9653 5.86314 11.8062 9.69529 7.92324 9.69529Z"
            fill="white"
          />
        </svg>
      </div>

      <div className="flex items-center justify-betwen">
        <div
          className="flex items-center"
          onClick={() => setOpenModal(!openModal)}
        >
          <h3 className="text-[18px] leading-[180%] text-[#1D1F22] font-semibold">
            {currency}
          </h3>
          {openModal && (
            <div className="absolute w-[114px] h-[158px] top-[65px] right-[70px] bg-white shadow-xl mt-3 pt-3">
              {currencyData.map((item) => (
                <div
                  key={item.id}
                  className={`${
                    currency === item.icon ? "bg-[#EEEEEE]" : "bg-[#ffffff]"
                  }`}
                >
                  <h3
                    onClick={() => dispatch(setCurrency(item.icon))}
                    className="py-3 px-3 text-gray-900 font-bold"
                  >
                    {item.name}
                  </h3>
                </div>
              ))}
            </div>
          )}
          {!openModal ? (
            <MdKeyboardArrowDown className="text-xl font-bold ml-1" />
          ) : (
            <MdKeyboardArrowUp className="text-xl font-bold ml-1" />
          )}
        </div>
        <div className="relative pl-4">
          <BsCart className="font-bold text-[#1D1F22] text-2xl" />
          <h3 className="absolute top-[-30%] right-[-8px] text-gray-50 bg-[#222] rounded-full h-[18px] w-[18px] text-[12px] text-center font-bold">
            0
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
