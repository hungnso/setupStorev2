import React from "react";

import { Row, Typography, Carousel, Button } from "antd";

import { getProducts } from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import LoadingCard from "../cards/LoadingCard";
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from "react-icons/bs";

function BestSellers() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  // const [productsCount, setProductsCount] = React.useState(0);
  const currentPage = 1

  React.useEffect(() => {
    loadAllProducts();
  }, []);

  // Lấy danh sách các sản phẩn best Sellers filter ( // sort, order, limit)
  const loadAllProducts = () => {
    setLoading(true);
    getProducts("sold", "desc", currentPage, 8).then((res) => {
      setProducts(res);
      setLoading(false);
    });
  };

  // React.useEffect(() => {
  //   getProductsCount().then((res) => setProductsCount(res.data));
  // }, []);

  return (
    <>
      <Row justify="space-between" align="bottom" style={{ marginBottom: 8 }}>
        <Typography.Title level={3} style={{ marginBottom: 8 }}>
          Best Sellers
        </Typography.Title>
      </Row>
      {loading ? (
        <LoadingCard count={4} />
      ) : (
        <Carousel
          autoplay
          autoplaySpeed={5000}
          dots={false}
          arrows={true}
          prevArrow={
            <Button icon={<BsArrowLeftSquareFill size={32} />}></Button>
          }
          nextArrow={
            <Button icon={<BsArrowRightSquareFill size={32} />}></Button>
          }
        >
          <div>
            <Row
              gutter={[16, 16]}
              wrap={false}
              style={{ padding: "8px 8px 16px 8px" }}
            >
              {products?.slice(0, 4).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </Row>
          </div>
          <div>
            <Row
              gutter={[16, 16]}
              wrap={false}
              style={{ padding: "8px 8px 16px 8px" }}
            >
              {products?.slice(4, 8).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </Row>
          </div>
        </Carousel>
      )}
    </>
  );
}
export default BestSellers;
