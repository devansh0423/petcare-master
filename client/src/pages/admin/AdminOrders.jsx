import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/auth";
import { Select, Table } from "antd";
import { Pie } from "@ant-design/charts";

const { Option } = Select;

const AdminOrders = () => {
  const [statusOptions] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/auth/all-orders"
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token]);

  useEffect(() => {
    const orderStatusData = orders.reduce((acc, order) => {
      acc[order.status] = acc[order.status] ? acc[order.status] + 1 : 1;
      return acc;
    }, {});

    const pieData = Object.entries(orderStatusData).map(([status, count]) => ({
      type: status,
      value: count,
    }));

    // Configuration for the pie chart
    const pieConfig = {
      appendPadding: 10,
      data: pieData,
      angleField: "value",
      colorField: "type",
      radius: 0.8,
      label: {
        formatter: (datum) => {
          if (datum && typeof datum === "object" && datum.type && datum.value) {
            return `${datum.type}: ${datum.value}`;
          }
          return "";
        },
      },
      interactions: [{ type: "element-active" }],
    };

    return () => {
      // Cleanup code here if needed
    };
  }, [orders, auth]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/auth/order-status/${orderId}`,
        {
          status: value,
        }
      );
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (_, record, index) => index + 1,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (orderStatus, record) => (
        <Select
          bordered={false}
          onChange={(value) => handleChange(record._id, value)}
          defaultValue={orderStatus}
        >
          {statusOptions.map((s, i) => (
            <Option key={i} value={s}>
              {s}
            </Option>
          ))}
        </Select>
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
      render: (payment) => (payment.success ? "Success" : "Failed"),
    },
    {
      title: "Quantity",
      dataIndex: "products",
      key: "products",
      render: (products) => products.length,
    },
  ];

  return (
    <Layout>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Orders</h1>
          {/* Pie chart component */}
          <PieChart orders={orders} />
          {/* Table component */}
          <Table
            dataSource={orders}
            columns={columns}
            rowKey={(record) => record._id}
            pagination={{ pageSize: 5 }}
          />
        </div>
      </div>
    </Layout>
  );
};

// Separate PieChart component
const PieChart = ({ orders }) => {
  const orderStatusData = orders.reduce((acc, order) => {
    acc[order.status] = acc[order.status] ? acc[order.status] + 1 : 1;
    return acc;
  }, {});

  const pieData = Object.entries(orderStatusData).map(([status, count]) => ({
    type: status,
    value: count,
  }));

  const pieConfig = {
    appendPadding: 10,
    data: pieData,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      formatter: (datum) => {
        if (datum && typeof datum === "object" && datum.type && datum.value) {
          return `${datum.type}: ${datum.value}`;
        }
        return "";
      },
    },
    interactions: [{ type: "element-active" }],
  };

  return <Pie {...pieConfig} />;
};

export default AdminOrders;
