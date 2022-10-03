import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductByUserId } from "../../actions/productActions";
import ProductListCard from "../../Components/ProductListCard/ProductListCard";

const ProductList = () => {
  const params = useParams();

  const dispatch = useDispatch();

  const getproductbyuserid = useSelector(
    (state) => state.getProductByUserIdReducer
  );

  const { loading, error, products } = getproductbyuserid;

  useEffect(() => {
    dispatch(getProductByUserId(params.id));
  }, [dispatch, params.id]);

  return (
    <div className="mt-5">
      {products && (
        <div className="grid lg:grid-cols-3">
          {products.map((product) => (
            <ProductListCard product={product} key={product.title} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
