"use strict";
// userId, product name,product quantity, product rate, product total,Product GST= 18% *product total, include timestamp
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        required: true,
    },
    items: [
        {
            productName: {
                type: String,
                required: true,
            },
            productQuantity: {
                type: String,
                required: true,
            },
            productRate: {
                type: String,
                required: true,
            },
            total: {
                type: Number,
                required: true,
            },
            totalWithGST: {
                type: Number,
                required: true,
            },
        },
    ],
    invoicePath: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const productModel = mongoose_1.default.model("Product", productSchema);
exports.default = productModel;
//# sourceMappingURL=product.js.map