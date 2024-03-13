"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const header = req.headers.cookie;
    console.log(req.headers.cookie);
    if (header && process.env.LOGIN_SECRET_KEY) {
        const token = header.split("=")[1];
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.LOGIN_SECRET_KEY);
        req.user = decodedToken;
        next();
    }
    else {
        res.status(400).json({ message: "bad request" });
        console.log("cookie is not in header");
    }
};
exports.default = verifyToken;
//# sourceMappingURL=verifyToken.js.map