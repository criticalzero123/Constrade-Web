import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../actions/productActions";
import ProductComment from "../../Components/ProductDetails/ProductComment/ProductComment";
import ProductAddComment from "../../Components/ProductDetails/ProductAddComment/ProductAddComment";

import ProductDetailsFavoriteCounter from "../../Components/ProductDetails/ProductDetailsFavoritesCounter/ProductDetailsFavoriteCounter";
import { firstLetterUpper } from "../../service/userService";
import { toArrayString } from "../../service/productService";

import { BsFillChatDotsFill } from "react-icons/bs";

const ProductDetails = () => {
  const { id } = useParams();
  const [showComments, setShowComments] = useState(true);

  const dispatch = useDispatch();

  const getproductbyid = useSelector((state) => state.getProductByIdReducer);
  const getcomments = useSelector((state) => state.commentListProductReducer);
  const { currentUser } = useSelector((state) => state.userInfoReducer);

  const { comments } = getcomments;
  const { loading, error, product } = getproductbyid;

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  const date = product && new Date(product.dateCreated).toDateString();

  const gameGenreArray = product && toArrayString(product.gameGenre);
  const platformArray = product && toArrayString(product.platform);

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
                  {platformArray !== undefined &&
                    platformArray.map((platform, index) => (
                      <Link to={`/search/category/${platform}`} key={index}>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                          {platform}
                        </span>
                      </Link>
                    ))}
                </div>
                <div className="pt-4 pb-2">
                  <p>Game Genre:</p>
                  {gameGenreArray !== undefined &&
                    gameGenreArray.map((category, index) => (
                      <Link to={`/search/category/${category}`} key={index}>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                          {category}
                        </span>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
            <div className="w-full shadow-lg bg-white rounded p-5">
              <div className="flex justify-between">
                <p>
                  Owner:{" "}
                  <Link
                    to={`/user/${product.userId}`}
                    className="hover:text-red-500"
                  >
                    {firstLetterUpper(product.userName)}
                  </Link>
                </p>
                {currentUser._id !== product.userId && (
                  <Link to={`/messages/user/${product.userId}`} state={product}>
                    <BsFillChatDotsFill size={20} className="cursor-pointer" />
                  </Link>
                )}
              </div>
              <p>Description: {product.description}</p>
              <p>Location: {product.location}</p>
              <p>Item Posted: {date}</p>
              <p>Trade Type: {product.preferTrade}</p>
              <p>Cash: {product.cash}</p>
              <p>Item: {product.item}</p>
              <p>Delivery Method: {product.deliveryType}</p>
              <p>Condition: {product.condition}</p>
              <div className="flex justify-between mt-5">
                <div>
                  <ProductDetailsFavoriteCounter id={id} product={product} />
                </div>
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
