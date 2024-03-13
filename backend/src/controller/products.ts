import mongoose from "mongoose";
import { Request, Response } from "express";

const AddProduct = (req: Request, res: Response) => {
  const { _id } = req.user;
  res.status(200).json({ message: "heyy!! auth successful" });
};

export default AddProduct;
