import Helmet from "react-helmet";

const ProductDetailHelmet = ({ title, metaDescription, imageUrl }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="description" key="description" content={metaDescription} />
      <meta name="title" key="title" content={"Constrade: " + title} />
      <meta property="og:title" key="og:title" content={title} />
      <meta property="og:locale" key="og:locale" content="en_US" />
      <meta property="og:type" key="og:type" content="website" />
      <meta
        property="og:description"
        key="og:description"
        content={metaDescription}
      />
      <meta property="og:image" key="og:image" content={imageUrl} />
    </Helmet>
  );
};

export default ProductDetailHelmet;
