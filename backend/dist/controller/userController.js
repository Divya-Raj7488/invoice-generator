"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrationHandler = exports.loginHandler = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(401).json({ message: "all field are required" });
    }
    try {
        const existingUser = yield user_1.default.findOne({
            email: email,
        });
        if (!existingUser) {
            return res.status(404).json({ message: "user doesn't exist." });
        }
        const { password: existingPassword, _id } = existingUser;
        const isValidPassword = yield bcrypt_1.default.compare(password, existingPassword);
        if (!isValidPassword) {
            return res.status(401).json({ message: "unauthorized" });
        }
        const token = jsonwebtoken_1.default.sign({ id: _id, email: email }, process.env.LOGIN_SECRET_TOKEN || "", { expiresIn: "1h" });
        return res
            .cookie("access_token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 360000,
        })
            .status(200)
            .json({ message: "login successful" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error" });
    }
});
exports.loginHandler = loginHandler;
const registrationHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(404).json({ message: "all field are necessary" });
    }
    //check if user already exist
    const existingUser = yield user_1.default.findOne({
        email: email,
    });
    if (existingUser) {
        return res
            .status(409)
            .json({ message: "user already exist. please login" });
    }
    const hashedpwd = yield bcrypt_1.default.hash(password, 10);
    const createNewUser = yield user_1.default.create({
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
});
exports.registrationHandler = registrationHandler;
//# sourceMappingURL=userController.js.map