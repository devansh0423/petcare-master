import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Typography, Row, Col, Card, Button, Divider } from "antd";
import { PlusOutlined, MinusOutlined, DeleteOutlined } from "@ant-design/icons";
import DropIn from "braintree-web-drop-in-react";
import "./CartPage.css";
const { Title, Text } = Typography;

const CartPage = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  // Calculate total price of items in cart
  const totalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  // Remove item from cart
  const removeCartItem = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Item removed successfully");
  };

  // Get Braintree token for payment
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `http://localhost:8080/api/v1/product/braintree/payment`,
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment completed successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  return (
    <Layout>
      <div className="container">
        <Title level={2}>Your Cart</Title>
        <Row gutter={[16, 16]}>
          <Col span={16}>
            {cart.map((product) => (
              <Card key={product._id}>
                <Row gutter={[16, 16]}>
                  <Col span={8}>
                    <img
                      src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                      alt={product.name}
                      style={{ width: "100%" }}
                    />
                  </Col>
                  <Col span={16}>
                    <div className="prd-details">
                      <Title level={5}>{product.name}</Title>
                      <Text>{product.description.substring(0, 30)}</Text>
                      <Text>Price: ₹{product.price}</Text>
                      <Button
                        className="dng"
                        type="danger"
                        onClick={() => removeCartItem(product._id)}
                        icon={<DeleteOutlined />}
                      >
                        Remove
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card>
            ))}
          </Col>
          <Col span={8}>
            <Card>
              <Title level={4}>Cart Summary</Title>
              <Divider />
              <Text strong>Total: ₹{totalPrice()}</Text>
              <Divider />
              {auth?.user?.address ? (
                <>
                  <Text strong>Current Address:</Text>
                  <Text>{auth?.user?.address}</Text>
                </>
              ) : (
                <Button
                  type="primary"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update Address
                </Button>
              )}
            </Card>
            {clientToken && cart.length > 0 && (
              <Card>
                <Title level={4}>Payment</Title>
                <Divider />
                <DropIn
                  options={{
                    authorization: clientToken,
                    paypal: {
                      flow: "vault",
                    },
                  }}
                  onInstance={(instance) => setInstance(instance)}
                />
                <Button
                  type="primary"
                  onClick={handlePayment}
                  loading={loading}
                  disabled={!instance || !auth?.user?.address}
                >
                  {loading ? "Processing..." : "Make Payment"}
                </Button>
              </Card>
            )}
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default CartPage;
