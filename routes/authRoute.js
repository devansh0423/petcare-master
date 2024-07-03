import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotpasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
  applyDoctorController,
  getAllDoctorController,
  getAllUsersController,
  changeAccountStatusController,
  getAllApproveDoctorController,
  getDoctorByIdController,
  bookDoctorAppointmentController,
  myAppointmentsController,
} from "../controllers/authController.js";

import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/forgot-password", forgotpasswordController);
router.get("/test", requireSignIn, isAdmin, testController);

// apply doctor
router.post("/apply-doctor", requireSignIn, applyDoctorController);

// get all doctors admin wala non approve bhi hain
router.get("/all-doctors", requireSignIn, isAdmin, getAllDoctorController);

// get all users
router.get("/all-users", requireSignIn, isAdmin, getAllUsersController);

// user routes
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// admin routes
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// update profile
router.put("/profile", requireSignIn, updateProfileController);

// orders
router.get("/orders", requireSignIn, getOrdersController);

// ADMIN ORDERS
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

// changing request for doctors

router.post(
  "/changeAccountStatus",
  requireSignIn,
  isAdmin,
  changeAccountStatusController
);

// doctor list for user
router.get("/vets", requireSignIn, getAllApproveDoctorController);

// getting single dog info
router.post("/getDoctorById", requireSignIn, getDoctorByIdController);

// book doctor appointment
router.post(
  "/book-doctorAppointment",
  requireSignIn,
  bookDoctorAppointmentController
);

// get user appointments
router.get("/my-appointments", requireSignIn, myAppointmentsController);

export default router;
