import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../actions/productActions";
import ProductCard from "../../Components/ProductCard/ProductCard";

import { Link } from "react-router-dom";
import { userInfo } from "../../service/userService";

const Index = () => {
  const user = userInfo();
  const dispatch = useDispatch();
  const getallproducts = useSelector((state) => state.getAllProductsReducer);

  const { loading, products, error } = getallproducts;

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div>
      <Link to="/product/add">Add a item</Link>
      <Link to={`/product/item/list/${user.uid}`} className="ml-5">
        Item List
      </Link>
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>Something Went Wrong Check for the logs</h1>
      ) : (
        <div className="grid lg:grid-cols-4">
          {products &&
            products.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Index;
