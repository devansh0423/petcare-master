import mongoose from "mongoose";

const groomingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // image: {
    //   type: String,
    //   required: true,
    // },
    price: {
      type: Number,
      requierd: true,
    },
    description: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: true,
      enum: ["Small", "Medium", "Large"],
    },
    facilities: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Grooming", groomingSchema);
