import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDb from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import groomingRoutes from "./routes/groomingRoute.js";
import fileUpload from "express-fileupload";
import { connectToCloudinary } from "./config/cloudinary.js";

dotenv.config();

connectDb();
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/grooming", groomingRoutes);
app.get("/", (req, res) => {
  res.send({
    message: "welcome to pet care",
  });
});

const PORT = process.env.PORT;
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
connectToCloudinary();
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
