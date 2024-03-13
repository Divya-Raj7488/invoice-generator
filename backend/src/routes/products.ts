import express from "express";
import AddProduct from "../controller/products";
import verifyToken from "../middleware/verifyToken";

const router = express.Router();

router.route("/").get(verifyToken, AddProduct);

export default router;
