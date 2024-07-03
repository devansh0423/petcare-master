import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { Checkbox, Radio } from "antd";
import { Avatar, Card } from "antd";
import axios from "axios";
import "./ProductPage.css";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart";
import toast from "react-hot-toast";
const { Meta } = Card;

const ProductPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data.category);
        console.log(categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // get all products
  const getAllProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
      console.log(products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c != id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, []);

  useEffect(() => {
    if (checked.length || radio.length) filterproduct();
  }, [checked, radio]);

  // get total counts

  const getTotal = async (req, res) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // load more function

  const loadMore = async (req, res) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // get filtered products
  const filterproduct = async (req, res) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/product/product-filters",
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row">
        {/* filter  div */}
        <div className="col-md-3 filter-div">
          {/* filter by category  */}

          <div>
            <h4 className="text-center">Filter by category</h4>
            <div className="categories">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c?.name}
                </Checkbox>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-center">Filter by price</h4>
            <div className="categories">
              {/* price filter */}
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
          </div>
          <div className="categories">
            {/* reset al filters */}
            <button
              className="btn-blue1 "
              onClick={() => window.location.reload()}
            >
              Reset filter
            </button>
          </div>
        </div>

        <div className="col-md-9 products">
          <h1 className="text-center">All products</h1>

          {/* product cards */}

          <div className="d-flex flex-wrap">
            {products?.map((p) =>
              p?.quantity > 0 ? (
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
                          className="btn-blue1"
                          onClick={() => {
                            setCart([...cart, p]);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify([...cart, p])
                            );
                            toast.success("Item added to cart");
                          }}
                        >
                          Add to cart{" "}
                        </button>
                        <button
                          className="btn-sec1"
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
                      <div className="in-stock">In stock</div>
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
                        <button className="btn-sec1 disabled">Know more</button>
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
                      <div className="out-of-stock">Out of stock</div>
                    </h6>
                  </Card>
                </div>
              )
            )}
          </div>
          <div>
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Loadmore..."}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
