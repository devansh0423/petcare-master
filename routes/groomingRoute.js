import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { newGroomingPackageController } from "../controllers/groominController.js";

const router = express.Router();

// to create new grooming package

router.post(
  "/new-grooming-package",
  requireSignIn,
  isAdmin,
  newGroomingPackageController
);

export default router;
