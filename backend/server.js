import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import Product from "./models/product.model.js";

dotenv.config();

const app = express();

app.use(express.json()); //allows us to accept JSON data in  req.body

// app.use("/api/products", productRoutes);

app.post("/api/products", async (req, res) => {
    const product = req.body;


    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newProduct = new Product(product);

    try  {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error in Create product:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
})

// console.log(process.env.MONGO_URI);

app.listen(5001, () => {
    connectDB();
    console.log('Server running on port 5001');
});

