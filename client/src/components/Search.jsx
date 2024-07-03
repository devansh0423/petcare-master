import React from "react";
import Layout from "./layout/Layout";
import { useSearch } from "../context/Search";
import { Avatar, Card } from "antd";
import "./Search.css";
const { Meta } = Card;
const Search = () => {
  const [values, setValues] = useSearch();

  // Check if values or values.results is undefined or null
  if (!values || !values.results) {
    return (
      <Layout>
        <div className="container">
          <div className="text-center">
            <h1>Search Results</h1>
            <h6>No products found</h6>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values.results.length < 1
              ? "No products found"
              : `Found ${values.results.length}`}
          </h6>
          <div className="search-products-card">
            {values.results.map((p) =>
              p.quantity > 0 ? (
                <div className="card">
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
                            p.quantity > 0 ? "btn-blue1" : "btn-blue1 disabled"
                          }`}
                        >
                          Add to cart{" "}
                        </button>
                        <button
                          className={`${
                            p.quantity > 0
                              ? "btn btn-secondary"
                              : "btn btn-secondary disabled"
                          }`}
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
                      title={p.name}
                      description={p.description}
                    />
                    <h5>{`₹${p.price}`}</h5>
                    <h6>
                      {p.quantity > 0 ? (
                        <div className="in-stock">In stock</div>
                      ) : (
                        <div className="out-of-stock">Out of stock</div>
                      )}
                    </h6>
                  </Card>
                </div>
              ) : (
                <div className="card disabled">
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
                      <div className="btn-container-disabled">
                        <button className="btn-blue1 disabled">
                          Add to cart{" "}
                        </button>
                        <button className="btn btn-secondary disabled">
                          Know more
                        </button>
                      </div>,
                    ]}
                  >
                    <Meta
                      avatar={
                        <Avatar src="https://res.cloudinary.com/duu15ts5c/image/upload/v1711284987/GouravProject/assests/Screenshot_2024-03-23_204535_de5tju.png" />
                      }
                      title={p.name}
                      description={p.description}
                    />
                    <h5>{`₹${p.price}`}</h5>
                    <h6>
                      {p.quantity > 0 ? (
                        <div className="in-stock">In stock</div>
                      ) : (
                        <div className="out-of-stock">Out of stock</div>
                      )}
                    </h6>
                  </Card>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
