import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import JWT from "jsonwebtoken";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointment.js";
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer, image } = req.body;

    if (!name || !email || !password || !phone || !address || !answer) {
      return res.send({ error: "All fields are required" });
    }
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "user already exists",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await new userModel({
      name,
      email,
      phone,
      address,
      passsword: hashedPassword,
      answer,
      image: `https://api.dicebear.com/8.x/initials/svg?seed=${name}`,
    }).save();

    res.status(201).send({
      success: true,
      message: "user registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registeration",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    const match = await comparePassword(password, user.passsword);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).send({
      success: true,
      message: "Login successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        image: user.image,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

export const testController = (req, res) => {
  return res.send({ message: `protected routes` });
};

export const forgotpasswordController = async (req, res) => {
  try {
    const { email, answer, newpassword } = req.body;
    if (!email || !answer || !newpassword) {
      res.status(400).send({
        message: "All fields are required",
      });
    }

    const user = await userModel.findOne({ email, answer });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong email or answer",
      });
    }

    const hashed = await hashPassword(newpassword);
    await userModel.findByIdAndUpdate(user._id), { password: hashed };
    res.status(200).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

// to update profile

export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);

    if (password && password.length < 8) {
      return res.json({
        error: "Password cant be less than 8 characters",
      });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        passsword: hashedPassword || user.passsword,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "profile updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while updating profile",
      error,
    });
  }
};

// getting user orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

// get all orders

export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

// to update status of order

export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating order",
      error,
    });
  }
};

// apply doctor controller
export const applyDoctorController = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      website,
      address,
      phone,
      specialization,
      experience,
      feesPerConsultation,
      timings,
    } = req.body;
    const userId = req.user._id;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !address ||
      !specialization ||
      !experience ||
      !feesPerConsultation ||
      !timings ||
      !phone
    ) {
      return res.status(200).send({
        success: false,
        message: "All fields are required",
      });
    }
    const existingDoctor = await doctorModel.findOne({ email });
    if (existingDoctor) {
      return res.status(200).send({
        success: false,
        message: "doctor already exists ",
      });
    }
    await doctorModel({
      firstName,
      lastName,
      email,
      experience,
      timings,
      phone,
      website: website || "No website available",
      address,
      specialization,
      feesPerConsultation,
      userId: userId,
    }).save();

    return res.status(200).send({
      success: true,
      message: "Applied for doctor successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while applying for doctor",
      error,
    });
  }
};

// get all doctors admin wale

export const getAllDoctorController = async (req, res) => {
  try {
    const allDoctors = await doctorModel.find();
    return res.status(200).json({
      success: true,
      message: "All doctors fetched successfully",
      data: allDoctors,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while fetching doctors",
    });
  }
};

// get all users

export const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).send({
      success: true,
      message: "All users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching user data",
      error,
    });
  }
};

// changing account status for user request

export const changeAccountStatusController = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
    const user = await userModel.findOne({ _id: doctor.userId });

    user.isDoctor === "approved" ? true : false;

    await user.save();
    res.status(201).send({
      success: true,
      message: "Account status updated",
      doctor,
    });
  } catch (error) {
    console.log(error);
    res.status().send({
      success: false,
      message: "Error while changing account status",
      error,
    });
  }
};

// get all doctors users

export const getAllApproveDoctorController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({ status: "approved" });
    res.status(200).send({
      success: true,
      message: "All doctors fetched successfully",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while getting doctor",
    });
  }
};

// get doctor by id controller

export const getDoctorByIdController = async (req, res) => {
  try {
    const doctor = await doctorModel.findById({ _id: req.body.doctorId });
    res.status(200).send({
      success: true,
      message: "Single doc info fetched",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while fetching doctor details",
      error,
    });
  }
};

// book doctor appointment controller

export const bookDoctorAppointmentController = async (req, res) => {
  try {
    req.body.status = "pending";
    const newAppointment = new appointmentModel(req.body);
    newAppointment.userId = req.user._id;
    await newAppointment.save();
    res.status(200).send({
      success: true,
      message: "Appointment booked successfully",
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        message: "Error while booking appointment try again later",
        error,
      });
  }
};

// my appointments for user

export const myAppointmentsController = async (req, res) => {
  try {
    const appointment = await appointmentModel.find({
      userId: req.user._id,
    });
    return res.status(200).send({
      success: true,
      message: "Doctor appoitment fetched successfully",
      data: appointment,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error while fetching your appoitments details",
      error,
    });
  }
};
