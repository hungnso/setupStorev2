import React from "react";
import { useSelector } from "react-redux";

import { Layout, Typography, Row, Divider, Empty } from "antd";
import { getProduct, getRelated, productStar } from "../functions/product";

// import Loader from "../components/loader/Loader";
import SingleProduct from "../components/cards/SingleProduct";
import ProductCard from "../components/cards/ProductCard";

function Product({ match }) {
  const [product, setProduct] = React.useState({});
  const [related, setRelated] = React.useState([]);
  // const [loading, setLoading] = React.useState(false);
  const [star, setStar] = React.useState(0);

  const { user } = useSelector((state) => ({ ...state }));

  const { slug } = match.params;

  React.useEffect(() => {
    getProduct(slug)
      .then((res) => {
        // setLoading(false);
        setProduct(res);
        getRelated(res._id).then((res) => setRelated(res));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [slug]);

  React.useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star); // current user's star
    }
  }, [user, product.ratings]);

  // const loadSingleProduct = () => {
  //   // setLoading(true);
  //   getProduct(slug)
  //     .then((res) => {
  //       // setLoading(false);
  //       setProduct(res);
  //       getRelated(res._id).then((res) => setRelated(res));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    console.table(newRating, name);
    productStar(name, newRating, user.token).then((res) => {
      console.log("rating clicked", res.data);
      loadSingleProduct(); // if you want to show updated rating in real time
    });
  };

  return (
    <Layout.Content>
      <SingleProduct product={product} onStarClick={onStarClick} star={star} />
      <Divider orientation="left">
        <Typography.Link>Related Products</Typography.Link>
      </Divider>
      <Row gutter={[16, 16]}>
        {related.length ? (
          related.map((r) => <ProductCard key={r._id} product={r} />)
        ) : (
          <Empty />
        )}
      </Row>
    </Layout.Content>
  );
}

export default Product;
