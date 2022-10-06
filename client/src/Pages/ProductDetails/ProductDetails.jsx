import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../actions/productActions";
import ProductComment from "./ProductComment/ProductComment";
import ProductAddComment from "./ProductAddComment/ProductAddComment";

const ProductDetails = () => {
  const { id } = useParams();
  const [showComments, setShowComments] = useState(true);

  const dispatch = useDispatch();

  const getproductbyid = useSelector((state) => state.getProductByIdReducer);
  const getuser = useSelector((state) => state.userInfoReducer);
  const getcomments = useSelector((state) => state.commentListProductReducer);

  const { comments } = getcomments;

  const { currentUser } = getuser;
  const { loading, error, product } = getproductbyid;

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  const date = product && new Date(product.dateCreated).toDateString();

  return (
    <div>
      {error && <div>Something Went Wrong...</div>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        product && (
          <div className="flex shadow-lg bg-gray-700  p-5 ">
            <div className="max-w-sm rounded overflow-hidden mr-5 text-black bg-white">
              <img
                className="w-full object-contain"
                src={product.imageURL}
                alt={product.title}
              />
              <div className="px-6">
                <div className=" py-4">
                  <div className="font-bold text-xl mb-2">{product.title}</div>
                </div>

                <div>
                  <p>Platform Supported: </p>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {product.platform}
                  </span>
                </div>
                <div className="pt-4 pb-2">
                  <p>Game Genre:</p>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {product.gameGenre}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full shadow-lg bg-white rounded p-5">
              <p>Owner: {product.userName}</p>
              <p>Description: {product.description}</p>
              <p>Location: {product.location}</p>
              <p>Item Posted: {date}</p>
              <p>Trade Type: {product.preferTrade}</p>
              <p>Cash: {product.cash}</p>
              <p>Item: {product.item}</p>
              <p>Delivery Method: {product.deliveryType}</p>
              <p>Condition: {product.condition}</p>
              <div className="flex justify-between mt-5">
                <p>0 Favorites</p>
                <p
                  className="cursor-pointer"
                  onClick={() => setShowComments(!showComments)}
                >
                  {product.comments !== undefined && comments.length} comments
                </p>
              </div>
              <hr />
              <div className={showComments ? "block" : "hidden"}>
                {product.comments !== undefined &&
                  comments.map((comment) => (
                    <ProductComment
                      key={comment._id}
                      comment={comment}
                      productId={product._id}
                      ownerId={product.userId}
                      userId={currentUser.uid}
                    />
                  ))}
              </div>

              <ProductAddComment id={id} />
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ProductDetails;
