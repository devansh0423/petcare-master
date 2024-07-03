import React, { useEffect, useState } from "react";
import UserMenu from "../../components/layout/UserMenu";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
const Appointments = () => {
  const [appointments, setAppointments] = useState();
  const getMyAppointments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/auth/my-appointments`
      );
      if (res.data.success) {
        setAppointments(res.data.data);
        toast.success("Your doctor appointments fetched successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while fetching data");
    }
  };

  useEffect(() => {
    getMyAppointments();
  }, []);
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div>My appointments</div>
            {appointments &&
              appointments.map((appointment) => (
                <div>
                  <p>{appointment.date}</p>
                  <p>{appointment.time}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Appointments;
