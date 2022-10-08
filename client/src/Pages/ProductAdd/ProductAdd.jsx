import React, { useState } from "react";
import ProductAddDropZone from "../../Components/ProductAdd/ProductAddDropZone";
import ProductAddInput from "../../Components/ProductAdd/ProductAddInput";
import ProductAddSelect from "../../Components/ProductAdd/ProductAddSelect";
import ProductAddTextArea from "../../Components/ProductAdd/ProductAddTextArea";

import ProductCardDetails from "../../Components/ProductAdd/ProductCardDetails.jsx/ProductCardDetails";

// For the Options
import {
  categoryOptions,
  conditionOptions,
  meetupPreferenceOptions,
  platformOptions,
  preferTradeOptions,
} from "../../service/productService";
import { useDispatch } from "react-redux";
import { addProduct } from "../../actions/productActions";
import { userInfo } from "../../service/userService";
import { saveImageStorage } from "../../firebase/storageImages";

const ProductAdd = () => {
  const user = userInfo();
  //   Select
  const [category, setCategory] = useState(categoryOptions[0]);
  const [platform, setPlatform] = useState(platformOptions[0]);
  const [condition, setCondition] = useState(conditionOptions[0]);
  const [prefer, setPrefer] = useState(preferTradeOptions[0]);
  const [meetup, setMeetup] = useState(meetupPreferenceOptions[0]);
  //   TextInput
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [cash, setCash] = useState(0);
  const [item, setItem] = useState("");
  const [modelNumber, setModelNumber] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  //   Textarea
  const [description, setDescription] = useState("");
  //   dropzone
  const [imageUpload, setImageUpload] = useState(null);

  const dispatch = useDispatch();

  const cashPreferInput = (e) => {
    if (e.target.value >= 0) {
      setCash(e.target.value);
    }
  };

  const productAddRequest = async (e) => {
    e.preventDefault();

    if (imageUpload == null) return;

    await saveImageStorage(imageUpload, title, user, productUploadCallBack);
  };

  const productUploadCallBack = (image) => {
    if (image) {
      const product = {
        userId: user._id,
        name: user.name,
        title: title,
        description: description,
        location: location,
        category: category,
        modelNumber: modelNumber,
        serialNumber: serialNumber,
        platform: platform,
        condition: condition,
        imageURL: image,
        preferTrade: prefer,
        cash: parseInt(cash),
        item: item,
        deliveryType: meetup,
      };

      dispatch(addProduct(product));

      alert("Item Added");
    } else {
      alert("Something Went wrong");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 pt-7">
      <div className=" ">
        <form onSubmit={productAddRequest}>
          <aside className="overflow-y-hidden hover:overflow-y-auto h-[45rem] ">
            <ProductAddInput
              labeltext="Title"
              placeholdertext="title..."
              value={title}
              fortext="title"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <br />
            <ProductAddSelect
              items={categoryOptions}
              labeltext="Category"
              width="w-40"
              onChange={(e) => setCategory(e.target.value)}
            />
            <br />
            <ProductAddSelect
              items={platformOptions}
              labeltext="Platform Supported"
              width="w-40"
              onChange={(e) => setPlatform(e.target.value)}
            />
            <br />
            <ProductAddInput
              labeltext="Model Number"
              placeholdertext="xxx-xxx"
              value={modelNumber}
              fortext="modelnumber"
              onChange={(e) => setModelNumber(e.target.value)}
              required
            />
            <br />
            <ProductAddInput
              labeltext="Serial Number"
              placeholdertext="xxx-xxxx"
              value={serialNumber}
              fortext="serialnumber"
              onChange={(e) => setSerialNumber(e.target.value)}
              required
            />
            <br />
            <ProductAddSelect
              items={conditionOptions}
              labeltext="Condition"
              width="w-40"
              onChange={(e) => setCondition(e.target.value)}
            />
            <br />
            <ProductAddTextArea
              labeltext="Description"
              fortext="description"
              placeholdertext="Describe the item (Dents or Defects)"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <br />
            <ProductAddInput
              labeltext="Location"
              placeholdertext="Cebu City..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              fortext="location"
            />
            <br />
            <ProductAddDropZone
              labeltext="Picture"
              onChange={(e) => {
                setImageUpload(e.target.files[0]);
              }}
              required
            />
            <br />
            {/* <img src={imageUpload && window.URL.createObjectURL(imageUpload)} /> */}
            <ProductAddSelect
              labeltext="Prefer Trade"
              fortext="trade"
              items={preferTradeOptions}
              width="w-40"
              onChange={(e) => setPrefer(e.target.value)}
            />
            <br />
            <ProductAddInput
              labeltext="Cash Prefer"
              fortext="cash"
              placeholdertext="0"
              onChange={cashPreferInput}
              value={cash}
              hidden={prefer === "Swapping" ? true : false}
              number={true}
              required
            />
            <ProductAddInput
              labeltext="Item Prefer"
              fortext="Item"
              placeholdertext="something..."
              value={item}
              onChange={(e) => setItem(e.target.value)}
              hidden={prefer === "Selling" ? true : false}
              required
            />
            <br />
            <ProductAddSelect
              labeltext="Mode of Transaction"
              items={meetupPreferenceOptions}
              width="w-42"
              onChange={(e) => setMeetup(e.target.value)}
            />
            <br />
            <br />
          </aside>
          <button className="z-10">Add</button>
        </form>
      </div>
      <div className="lg:col-span-2 ">
        <ProductCardDetails
          title={title}
          description={description}
          condition={condition}
          category={category}
          location={location}
          platform={platform}
          preferTrade={prefer}
          cash={cash}
          modelNumber={modelNumber}
          serialNumber={serialNumber}
          item={item}
          meetup={meetup}
          image={imageUpload && window.URL.createObjectURL(imageUpload)}
          userPhoto={user.imagePhotoURL}
          userName={user.name}
        />
      </div>
    </div>
  );
};

export default ProductAdd;
