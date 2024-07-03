import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DatePicker, TimePicker } from "antd";
import moment from "moment";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const DoctorAppointmentBooking = () => {
  const navigate = useNavigate();

  const params = useParams();
  const [auth] = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState();

  const handleBooking = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/auth/book-doctorAppointment`,
        {
          doctorId: params.doctorId,
          doctorInfo: doctors,
          userInfo: auth.user,
          date: date,
          time: time,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDocInfo = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/getDoctorById",
        { doctorId: params.doctorId }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDocInfo();
  }, []);
  return (
    <Layout>
      <h1>Booking page</h1>
      <div className="container m-2">
        {doctors && (
          <div>
            <h4>
              {" "}
              Dr. {doctors.firstName} {doctors.lastName}
            </h4>
            <h4>Fees: {doctors.feesPerConsultation}</h4>
            <h4>
              {/* Timings: {doctors.timings[0]} - {doctors.timings[1]} */}
            </h4>
            <div className="d-flex flex-column">
              <DatePicker
                format={"DD-MM-YYYY"}
                onChange={(value) =>
                  setDate(moment(value).format("DD-MM-YYYY"))
                }
              />
              <TimePicker
                format="HH:mm"
                onChange={(value) => setTime(moment(value).format("HH:mm"))}
              />
              <button className="btn btn-primary mt-2">
                Check Availabilty
              </button>
              <button className="btn btn-primary mt-2" onClick={handleBooking}>
                Book now
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DoctorAppointmentBooking;
