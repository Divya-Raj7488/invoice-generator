"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AddProduct = (req, res) => {
    const { _id } = req.user;
    res.status(200).json({ message: "heyy!! auth successful" });
};
exports.default = AddProduct;
//# sourceMappingURL=products.js.map