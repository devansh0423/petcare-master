import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row } from "antd";
import Layout from "../../components/layout/Layout";
import DoctorList from "./DoctorList";
const AllDoctors = () => {
  const [doctors, setDoctors] = useState([]);

  const getAllDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/auth/vets");
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllDoctors();
  }, []);
  return (
    <Layout>
      <h1 className="text-center">All doctors</h1>
      <Row>
        {doctors && doctors.map((doctor) => <DoctorList doctor={doctor} />)}
      </Row>
    </Layout>
  );
};

export default AllDoctors;
