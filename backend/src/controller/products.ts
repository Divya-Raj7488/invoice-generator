import mongoose from "mongoose";
import { Request, Response } from "express";
import pdfDocument from "pdfkit";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
import productModel from "../models/product";

interface Product {
  productName: string;
  productQuantity: string;
  productRate: string;
  total: number;
  totalWithGST: number;
}

const AddProduct = async (req: Request, res: Response) => {
  const { id } = req.user;
  console.log(id)
  const invoiceData: Product[] = req.body;

  // Generate invoice
  const invoiceName = `invoice_${uuidv4()}.pdf`;
  const pdfPath = path.join(__dirname, "..", "invoice", invoiceName);
  const doc = new pdfDocument();
  const pdfStream = fs.createWriteStream(pdfPath);

  pdfStream.on("error", (error) => {
    console.error("Error writing to PDF stream:", error);
    res.status(500).json({
      error: "Failed to generate invoice",
    });
  });

  pdfStream.on("finish", async () => {
    try {
      const newInvoice = await productModel.create({
        userId: id,
        items: invoiceData,
        invoicePath: pdfPath,
      });
      res.status(200).json({
        message: "Invoice generated and saved successfully!",
        pdfLocation: pdfPath,
      });
    } catch (error) {
      console.error("Error saving invoice to database:", error);
      res.status(500).json({
        error: "Failed to save invoice",
      });
    }
  });

  // Add data to PDF
  invoiceData.forEach((item: Product) => {
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
};

export default AddProduct;
