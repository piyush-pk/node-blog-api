import mongoose from "mongoose";

const postScheme = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    description: {
      type: String,
      required: true,
    },
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    images: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postScheme);
