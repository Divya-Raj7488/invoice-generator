import mongoose from "mongoose";
import { Request, Response } from "express";

const AddProduct = (req: Request, res: Response) => {
  // const { user } = req;
  res.status(200).json({ message: "heyy!! auth successful" });
};

export default AddProduct;
