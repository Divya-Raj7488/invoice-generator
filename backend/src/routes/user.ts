import express from "express";
import { loginHandler,registrationHandler } from "../controller/userController";

const router = express.Router();

router.route('/register').post(registrationHandler)
router.route("/login").post(loginHandler);

export default router