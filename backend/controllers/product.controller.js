import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success: true, data: products});
    } catch (error) {
        console.error("Error in Get products:", error.message);
        res.status(500).json({success: false, message: "Internal server error"});
    }
};

export const createProduct = async (req, res) => {
    const product = req.body;


    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({success: false, message: "Please provide all fields"});
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});
    } catch (error) {
        console.error("Error in Create product:", error.message);
        res.status(500).json({success: false, message: "Internal server error"});
    }
};

export const updateProduct = async (req, res) => {

    const { id } = req.params;
    const product = req.body;


    try{

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({success: false, message: "ProductID not found"});
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.error("Error in Update product:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error in Delete product:", error.message);
        res.status(404).json({ success: false, message: "Product not found" });
    }
};

