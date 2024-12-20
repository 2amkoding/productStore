import express from 'express';
import dotenv from "dotenv";
import path from 'path';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT

app.use(express.json()); //allows us to accept JSON data in  req.body

app.use("/api/products", productRoutes);





// console.log(process.env.MONGO_URI);

app.listen(PORT, () => {
    connectDB();
    console.log('Server running on ' + PORT);
});

