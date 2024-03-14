import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
interface user {
  id: string;
  email: string;
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.cookie;
  console.log(req.headers.cookie);
  console.log(process.env.LOGIN_SECRET_TOKEN);
  if (header !== undefined && process.env.LOGIN_SECRET_TOKEN) {
    try {
      const token = header.split("=")[1];
      const decodedToken = jwt.verify(token, process.env.LOGIN_SECRET_TOKEN);
      req.user = decodedToken as user;
      console.log(decodedToken)
      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    res.status(401).json({ message: "header is undefined" });
    console.log("cookie is not in header");
  }
};

export default verifyToken;
