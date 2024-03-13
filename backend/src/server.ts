import { config } from "dotenv";
config();
import express from "express";
import DbConfig from "./config/dbConfig";
import mongoose from "mongoose";
import userRouter from "./routes/user";
import productRouter from "./routes/products";
import cookieParser from "cookie-parser";
import verifyToken from "./middleware/verifyToken";
import cors from "cors"
import corsOptions from "./cors/cors";

const app = express();
const port = process.env.PORT;
DbConfig();

app.use(cors(corsOptions))
app.use(express.json());
app.use(cookieParser());
app.use("/user", userRouter);
app.use("/product", verifyToken, productRouter);

app.listen(port, () => {
  return console.log(`server is running on port ${port}`);
});
mongoose.connection.on("error", (error) => {
  console.log(error);
});
// )
