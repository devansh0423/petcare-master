import React, { useState, useEffect } from "react";
import axios from "axios";
import UserMenu from "../../components/layout/UserMenu";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/auth";
import { Table, Tag } from "antd";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Delivered" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Buyer",
      dataIndex: "buyer",
      key: "buyer",
      render: (buyer) => buyer.name,
    },
    {
      title: "Payment",
      dataIndex: "payment",
      key: "payment",
      render: (payment) => (
        <Tag color={payment.success ? "green" : "red"}>
          {payment.success ? "Success" : "Failed"}
        </Tag>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
  ];

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/auth/orders"
      );
      const formattedOrders = data.map((order, index) => ({
        key: order._id,
        index: index + 1,
        status: order.status,
        buyer: {
          name: order.buyer.name,
        },
        payment: {
          success: order.payment.success,
        },
        quantity: order.products.length,
        products: order.products,
      }));
      setOrders(formattedOrders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) fetchData();
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <div className="container-flui p-3 m-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            <div className="border shadow orders-table-container">
              <Table
                columns={columns}
                dataSource={orders}
                pagination={{ pageSize: 10 }}
                className="orders-table"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
