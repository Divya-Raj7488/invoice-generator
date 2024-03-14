"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const header = req.headers.cookie;
    console.log(req.headers.cookie);
    console.log(process.env.LOGIN_SECRET_TOKEN);
    if (header !== undefined && process.env.LOGIN_SECRET_TOKEN) {
        try {
            const token = header.split("=")[1];
            const decodedToken = jsonwebtoken_1.default.verify(token, process.env.LOGIN_SECRET_TOKEN);
            req.user = decodedToken;
            next();
        }
        catch (error) {
            res.status(401).json({ message: "Unauthorized" });
        }
    }
    else {
        res.status(401).json({ message: "header is undefined" });
        console.log("cookie is not in header");
    }
};
exports.default = verifyToken;
//# sourceMappingURL=verifyToken.js.map