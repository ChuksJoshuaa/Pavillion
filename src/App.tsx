import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Products, SingleProduct, Error } from "./pages";
import { productData } from "./utils/data";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { setProducts } from "./redux/features/products/productSlice";
import { useEffect } from "react";
import { Navbar, Checkout } from "./components";
import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useAppDispatch();
  const { openCheckout } = useAppSelector((state) => state.product);

  const getData = () => {
    if (productData.length > 0) return dispatch(setProducts(productData));
    return dispatch(setProducts([]));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div style={{ maxWidth: "1500px", width: "90%", margin: "0 auto" }}>
      <Navbar />
      {openCheckout ? <Checkout /> : null}
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/single-product/:id" element={<SingleProduct />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
