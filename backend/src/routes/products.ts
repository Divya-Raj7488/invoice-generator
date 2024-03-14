import express from "express";
import AddProduct from "../controller/products";
import verifyToken from "../middleware/verifyToken";

const router = express.Router();

router.route("/").post(verifyToken, AddProduct);

export default router;
