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
const pdfkit_1 = __importDefault(require("pdfkit"));
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const product_1 = __importDefault(require("../models/product"));
const AddProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    console.log(id);
    const invoiceData = req.body;
    // Generate invoice
    const invoiceName = `invoice_${(0, uuid_1.v4)()}.pdf`;
    const pdfPath = path_1.default.join(__dirname, "..", "invoice", invoiceName);
    const doc = new pdfkit_1.default();
    const pdfStream = fs_1.default.createWriteStream(pdfPath);
    pdfStream.on("error", (error) => {
        console.error("Error writing to PDF stream:", error);
        res.status(500).json({
            error: "Failed to generate invoice",
        });
    });
    pdfStream.on("finish", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newInvoice = yield product_1.default.create({
                userId: id,
                items: invoiceData,
                invoicePath: pdfPath,
            });
            res.status(200).json({
                message: "Invoice generated and saved successfully!",
                pdfLocation: pdfPath,
            });
        }
        catch (error) {
            console.error("Error saving invoice to database:", error);
            res.status(500).json({
                error: "Failed to save invoice",
            });
        }
    }));
    // Add data to PDF
    invoiceData.forEach((item) => {
        doc.text(`Product Name: ${item.productName}`);
        doc.text(`Quantity: ${item.productQuantity}`);
        doc.text(`Rate: ${item.productRate}`);
        doc.text(`Total: ${item.total}`);
        doc.text(`Total with GST: ${item.totalWithGST}`);
        doc.moveDown();
    });
    // Finalize PDF
    doc.pipe(pdfStream);
    doc.end();
});
exports.default = AddProduct;
//# sourceMappingURL=products.js.map