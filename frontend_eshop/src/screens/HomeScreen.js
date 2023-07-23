import React from "react";
// import { useEffect, useState } from "react"; //not in use now, using fetching data using redux
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
// import axios from "axios";
import { useGetProductsQuery } from "../slices/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   const fetchProudcts = async () => {
  //     try {
  //       const { data } = await axios.get("http://localhost:8000/api/products");
  //       console.log(data);
  //       setProducts(data);
  //     } catch (error) {
  //       console.log("Error fetching products:", error);
  //     }
  //   };
  //   fetchProudcts();
  // }, []);

  //redux
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data.message || error.error}</Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
