import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { Table } from "antd";
import toast from "react-hot-toast";

const AllDoctorsAdmin = () => {
  const [doctors, setDoctors] = useState([]);

  const getDoctors = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/auth/all-doctors`
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  // Function to fetch doctors data when account status changes
  useEffect(() => {
    const interval = setInterval(() => {
      getDoctors();
    }, 5000); // Poll every 5 seconds to check for updates, adjust as needed
    return () => clearInterval(interval);
  }, []);

  // function to change account status
  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/auth/changeAccountStatus`,
        { doctorId: record._id, userId: record.userId, status: status }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        // If the status change is successful, refetch the data to get the updated status
        getDoctors();
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "phone",
      dataIndex: "phone",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button
              className="btn btn-success "
              onClick={() => handleAccountStatus(record, "approved")}
            >
              Approve
            </button>
          ) : (
            <button className="btn btn-danger">Remove</button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div>All Doctors</div>
            <Table columns={columns} dataSource={doctors} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllDoctorsAdmin;
