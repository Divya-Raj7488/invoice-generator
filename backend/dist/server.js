"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const express_1 = __importDefault(require("express"));
const dbConfig_1 = __importDefault(require("./config/dbConfig"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./routes/user"));
const products_1 = __importDefault(require("./routes/products"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const verifyToken_1 = __importDefault(require("./middleware/verifyToken"));
const cors_1 = __importDefault(require("cors"));
const cors_2 = __importDefault(require("./cors/cors"));
const app = (0, express_1.default)();
const port = process.env.PORT;
(0, dbConfig_1.default)();
app.use((0, cors_1.default)(cors_2.default));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/user", user_1.default);
app.use("/product", verifyToken_1.default, products_1.default);
app.listen(port, () => {
    return console.log(`server is running on port ${port}`);
});
mongoose_1.default.connection.on("error", (error) => {
    console.log(error);
});
//# sourceMappingURL=server.js.map