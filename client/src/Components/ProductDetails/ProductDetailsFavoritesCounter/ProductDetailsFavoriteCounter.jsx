import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { AiFillHeart } from "react-icons/ai";
import { addToFavorite } from "../../../actions/userActions";

const ProductDetailsFavoriteCounter = ({ id, product }) => {
  const dispatch = useDispatch();

  const getuser = useSelector((state) => state.userInfoReducer);

  const { currentUser } = getuser;

  const userFavoriteProduct = currentUser.favorites.some(
    (favorite) => favorite.productId === id
  );

  const [favoriteCount, setFavoriteCount] = useState(
    product ? product.favoritesCount : 0
  );

  const [select, setSelected] = useState(userFavoriteProduct);

  const favoriteOnClick = () => {
    dispatch(addToFavorite(product._id));
    setSelected(!select);
    setFavoriteCount(select ? favoriteCount - 1 : favoriteCount + 1);
  };

  return (
    <div className="flex place-items-center">
      <AiFillHeart
        size={20}
        className={`${
          select && "text-red-500 hover:text-black"
        } mr-1 hover:cursor-pointer `}
        onClick={favoriteOnClick}
      />{" "}
      {favoriteCount} Favorites
    </div>
  );
};

export default ProductDetailsFavoriteCounter;
