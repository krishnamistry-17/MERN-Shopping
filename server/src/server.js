/** @format */

// src/server.js
import express from "express";
import mongoose from "mongoose";
import orderModel from "../model/orderModel"; // Adjust the path if necessary

console.log(orderModel);

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/mern12", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.use(express.json());

// Add the route handler here
app.post("/mern12/orders", async (req, res) => {
  try {
    const newOrder = new orderModel(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    if (error.name === "ValidationError") {
      res
        .status(400)
        .json({ message: "Validation Error", error: error.message });
    } else {
      console.error("Error placing order:", error.message, error.stack);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
