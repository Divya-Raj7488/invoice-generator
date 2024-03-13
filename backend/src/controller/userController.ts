//register function- Name,email, password. regex for amail verification
//login function- validation using email, password
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from "../models/user";
import jwt from "jsonwebtoken";

const loginHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ message: "all field are required" });
  }
  try {
    const existingUser = await userModel.findOne({
      email: email,
    });
    if (!existingUser) {
      return res.status(404).json({ message: "user doesn't exist." });
    }
    const { password: existingPassword, _id } = existingUser;
    const isValidPassword = await bcrypt.compare(password, existingPassword);
    if (!isValidPassword) {
      return res.status(401).json({ message: "unauthorized" });
    }

    const token = jwt.sign(
      { id: _id, email: email },
      process.env.LOGIN_SECRET_TOKEN || "",
      { expiresIn: "1h" }
    );
    return res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 360000,
      })
      .status(200)
      .json({ message: "login successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

const registrationHandler = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(404).json({ message: "all field are necessary" });
  }
  //check if user already exist
  const existingUser = await userModel.findOne({
    email: email,
  });
  if (existingUser) {
    return res
      .status(409)
      .json({ message: "user already exist. please login" });
  }
  const hashedpwd = await bcrypt.hash(password, 10);

  const createNewUser = await userModel.create({
    name: name,
    email: email,
    password: hashedpwd,
  });
  if (!createNewUser) {
    return res.status(500).json({ message: "please try again." });
  }
  return res
    .status(200)
    .json({ message: "user created successfully. please login" });
};

export { loginHandler, registrationHandler };
