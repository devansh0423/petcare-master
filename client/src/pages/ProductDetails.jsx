import React, { useState, useEffect } from "react";
import axios from "axios";
import { Avatar, Card } from "antd";
import Layout from "../components/layout/Layout";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./productdetails.css";
const { Meta } = Card;
const ProductDetails = () => {
  const params = useParams();
  const [product, setProducts] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product/${params.slug}`
      );
      setProducts(data?.product);
      getSimilarProducts(data?.product._id, data?.product?.category?._id);
    } catch (error) {
      console.log(error);
    }
  };

  //   get similar items
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/related-products/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // useeffect to fetch details of single product
  useEffect(() => {
    if (params.slug) getProduct();
  }, [params?.slug]);

  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
          {product._id ? (
            <img
              src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
              className="card-img-top"
              alt={product.name}
              height={300}
              width={300}
            />
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div className="col-md-6 text-center">
          <h1 className="product-name">Product Details</h1>
          <h6 className="product-name">Name: {product?.name || ""}</h6>
          <h6 className="product-price">Price: ₹{product?.price || ""}</h6>
          <h6 className="product-category">
            Category: {product.category ? product.category.name : ""}
          </h6>
          <h6 className="product-description">
            Description: {product?.description || ""}
          </h6>
          <button className="btn-blue1 add-to-cart-button">Add to cart</button>
        </div>
      </div>
      <div className="row">
        <h1>Similar Products</h1>
        {relatedProducts?.length > 0 ? (
          <div className="similar-products">
            {relatedProducts?.map((p) => (
              <div className="product-card" key={p._id}>
                <Card
                  style={{ width: 300 }}
                  cover={
                    <img
                      alt="example"
                      src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                      height={"216.2px"}
                      width={"300.4px"}
                    />
                  }
                  actions={[
                    <div className="btn-container">
                      <button
                        className={`${
                          p?.quantity > 0 ? "btn-blue1" : "btn-blue1 disabled"
                        }`}
                      >
                        Add to cart
                      </button>
                      <button
                        className={`${
                          p?.quantity > 0 ? "btn-sec1" : "btn-sec1 disabled"
                        }`}
                        onClick={() => navigate(`/products/${p.slug}`)}
                      >
                        Know more
                      </button>
                    </div>,
                  ]}
                >
                  <Meta
                    avatar={
                      <Avatar src="https://res.cloudinary.com/duu15ts5c/image/upload/v1711284987/GouravProject/assests/Screenshot_2024-03-23_204535_de5tju.png" />
                    }
                    title={p?.name}
                    description={p?.description}
                  />
                  <h5>{`₹${p?.price}`}</h5>
                  <h6>
                    <div
                      className={p?.quantity > 0 ? "in-stock" : "out-of-stock"}
                    >
                      {p?.quantity > 0 ? "In stock" : "Out of stock"}
                    </div>
                  </h6>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <h3>No similar products</h3>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetails;
