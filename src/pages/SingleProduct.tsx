import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Link, useParams } from "react-router-dom";
import { IIProps } from "../interface";
import {
  setColorType,
  setSizeType,
} from "../redux/features/products/productSlice";
import { currencyFormatter } from "../utils/conversions";

const SingleProduct = () => {
  const dispatch = useAppDispatch();
  const { products, sizeType, colorType, currency } = useAppSelector(
    (state) => state.product
  );
  const [imageIndex, setImageIndex] = useState(0);
  const { id } = useParams();

  const findProduct = () => {
    let userId = Number(id);
    const value = products.find((item) => item.id === userId);
    if (value !== undefined) return value;
    return {} as IIProps;
  };

  useEffect(() => {
    findProduct();
  }, [id]);
  return (
    <div className="single__product pt-5">
      <div className="image-top">
        {findProduct().image?.map((item, index) => (
          <div key={index} onClick={() => setImageIndex(index)}>
            <img
              src={item}
              alt="image-logo"
              className="w-[90px] h-[70px] mb-[1em] image-content"
            />
          </div>
        ))}
      </div>
      <div
        className="w-[75%] sm:w-[90%] mx-auto"
        style={{
          backgroundImage: `url(${findProduct()?.image[imageIndex]})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          height: "500px",
          marginLeft: "1em",
          marginRight: "1em",
        }}
      />
      <div className="pb-5 m-2">
        <h3 className="pb-1 text-[30px] leading-[27px] font-[600] text-[#1D1F22]">
          {findProduct().name.split(" ")[0]}
        </h3>
        <h3 className="pb-5 text-[30px] leading-[27px] font-[200] text-gray-600">
          {findProduct().name.split(" ")[1]} {findProduct().name.split(" ")[2]}{" "}
          {findProduct().name.split(" ")[3]}
        </h3>
        <div className="pb-5">
          <h3 className="uppercase pb-2">Size:</h3>
          <div className="icon__content">
            {findProduct().size.map((item, index) => (
              <div
                key={index}
                onClick={() => dispatch(setSizeType(item))}
                className={`h-[45px] w-[63px] border-[1px] border-[#1D1F22] mr-3 text-center text-[16px] font-[400] pt-2 leading-[18px] my-2 ${
                  sizeType === item
                    ? "text-gray-50 bg-[#222]"
                    : "text-[#1D1F22]"
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="py-5 m-2">
          <h3 className="uppercase pb-2">Color:</h3>
          <div className="flex flex-row items-center justify-start flex-wrap">
            {findProduct().colors.map((item, index) => (
              <div
                key={index}
                onClick={() => dispatch(setColorType(item))}
                style={{ backgroundColor: item }}
                className={`h-[26px] w-[26px] sm:h-[36px] sm:w-[36px] mr-3 text-center font-[400] pt-2 leading-[18px] ${
                  colorType === item
                    ? "border-[2px] border-[#1D1F]"
                    : "border-[1px] border-[#1D1F22]"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="py-5 m-2">
          <h3 className="text-[18px] leading-[18px] font-[700] pb-2">Price:</h3>
          <p className="text-[24px] leading-[18px] font-[700] font-bold">
            {currencyFormatter(currency, findProduct().price)}
          </p>
        </div>
        <div className="w-[175px] sm:w-[292px] h-[52px] bg-[#5ECE7B] text-center text-gray-50 cursor-pointer text-lg font-bold pt-3 mt-5 uppercase m-2">
          <p>Add to cart</p>
        </div>
        <div className="w-[292px] py-5 pt-8 m-2">
          <p className="text-[16px] font-[400] leading-[159.96%] w-[80%] sm:w-[100%]">
            {findProduct().description}
          </p>
        </div>
      </div>

      <Link
        to="/"
        className="w-[100px] h-[40px] text-center bg-red-400 text-white font-bold rounded-lg pt-2 cursor-pointer"
      >
        Go back
      </Link>
    </div>
  );
};

export default SingleProduct;
