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
const app = (0, express_1.default)();
const port = process.env.PORT;
(0, dbConfig_1.default)();
app.get("/", (req, res) => {
    res.send("<h1>Hello</h1>");
});
app.listen(port, () => {
    return console.log(`server is running on port ${port}`);
});
mongoose_1.default.connection.on("error", (error) => {
    console.log(error);
});
// )
//# sourceMappingURL=server.js.map