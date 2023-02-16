import React from "react";
import { Link } from "react-router-dom";
import { Row, Typography, Result } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";

import { getProducts, getProductsCount } from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import LoadingCard from "../cards/LoadingCard";
import { AiOutlineSmile } from "react-icons/ai";

function NewArrivals() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  // const [hasMore, setHasMore] = React.useState(true);
  const [productsCount, setProductsCount] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(2);

  React.useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res));
  }, []);

  React.useEffect(() => {
    const loadFirstProducts = () => {
      setLoading(true);
      // sort, order, page
      getProducts("createdAt", "desc", 1, 4).then((res) => {
        setProducts(res);
        setLoading(false);
      });
    };
    loadFirstProducts();
  }, []);

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    if (productsCount > 0) {
      getProducts("createdAt", "desc", currentPage, 4).then((res) => {
        setProducts([...products, ...res]);
        setLoading(false);
        console.log(products);
      });
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <Row style={{ marginBottom: 8 }}>
        <Typography.Title level={3} style={{ marginBottom: 8 }}>
          New Arrivals
        </Typography.Title>
      </Row>
      <InfiniteScroll
        dataLength={products?.length}
        next={loadMoreData}
        hasMore={!loading && products?.length < productsCount}
        loader={
          <div style={{ margin: "16px 0" }}>
            <LoadingCard count={4} />
          </div>
        }
        endMessage={
          <Result
            icon={<AiOutlineSmile size={48} />}
            title="Great, You have seen it all!"
            extra={<Link to={"/store"}>Start shopping now</Link>}
          />
        }
      >
        <Row gutter={[16, 16]} style={{ paddingTop: 8, margin: "0 -8px" }}>
          {products?.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </Row>
      </InfiniteScroll>
    </>
  );
}
export default NewArrivals;
