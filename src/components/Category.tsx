import { useEffect, useState } from "react";
import { ProductProps } from "../interface";
import { useAppSelector } from "../redux/hooks";
import { currencyFormatter } from "../utils/conversions";
import { BsCart } from "react-icons/bs";

const Category = () => {
  const { products, categoryType, currency } = useAppSelector(
    (state): ProductProps => state.product
  );
  const [showCart, setShowCart] = useState(0);

  const getType = () => {
    const data = products.filter((item) => item.category === categoryType);
    return data;
  };

  useEffect(() => {
    getType();
  }, [categoryType]);

  return (
    <div className="p-3">
      <h3 className="py-8 text-[42px] leading-[160%] font-medium text-center sm:text-start">
        Category name
      </h3>

      <div className="main-container">
        {getType().map((item, index) => (
          <div key={item.id} className="mb-[5em]">
            <div className="relative">
              <img
                src={item.image[0]}
                alt={item.name}
                className="h-[338px] w-full md:w-[400px]"
                onMouseEnter={() => setShowCart(index)}
              />
              {showCart === index && (
                <BsCart className="absolute bottom-[-7%] right-[30%] text-gray-50 bg-[#52D67A] rounded-full h-[52px] w-[52px] text-[12px] p-3 text-center font-bold" />
              )}
            </div>
            <h3 className="text-[18px] font-[300] leading-[180%] pt-3">
              {item.name}
            </h3>
            <h2 className="text-[18px] font-[500] leading-[180%]">
              {currencyFormatter(currency, item.price)}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
