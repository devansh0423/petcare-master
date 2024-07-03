import groomingModel from "../models/groomingModel.js";
import { v2 as cloudinary } from "cloudinary";
export const newGroomingPackageController = async (req, res) => {
  try {
    const { name, price, description, breed, facilities } = req.body;
    // const image = req.files.image;
    if (!name || !price || !description || !breed || !facilities) {
      return res.status(200).send({
        success: false,
        message: "All fields are required",
      });
    }
    // cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
    //   console.log(result);
    // });

    const newPackage = await groomingModel({
      name,
      price,
      description,
      // image: cloudinaryImage.secure_url,
      breed,
      facilities,
    }).save();

    return res.status(200).send({
      success: true,
      message: "Package created successfully",
      newPackage,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while creating package",
      error: error.message,
    });
  }
};
