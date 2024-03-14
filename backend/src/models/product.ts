// userId, product name,product quantity, product rate, product total,Product GST= 18% *product total, include timestamp

import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    items: [
      {
        productName: {
          type: String,
          required: true,
        },
        productQuantity: {
          type: String,
          required: true,
        },
        productRate: {
          type: String,
          required: true,
        },
        total: {
          type: Number,
          required: true,
        },
        totalWithGST: {
          type: Number,
          required: true,
        },
      },
    ],
    invoicePath: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model("Product", productSchema);

export default productModel;
