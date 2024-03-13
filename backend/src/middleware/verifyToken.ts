import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
interface user {
  _id: string;
  email: string;
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.cookie;
  console.log(req.headers.cookie);
  if (header && process.env.LOGIN_SECRET_KEY) {
    const token = header.split("=")[1];
    const decodedToken = jwt.verify(token, process.env.LOGIN_SECRET_KEY);
    req.user = decodedToken as user;
    next();
  } else {
    res.status(400).json({ message: "bad request" });
    console.log("cookie is not in header");
  }
};

export default verifyToken;
