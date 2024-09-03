/** @format */
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import Product from "./model/Product.js";
import orderRouter from "./routes/orderRoute.js";
import userRouter from "./routes/userRoute.js"; // Ensure this path is correct
import "./db/conn.js";
import User from "./model/User.js";
import { type } from "os";

// Initialize Express app
const app = express();

// Load environment variables
dotenv.config({ path: "./config.env" });

// Validate required environment variables
const { PORT, STRIPE_SECRET_KEY } = process.env;
if (!PORT) throw new Error("PORT is not defined");
if (!STRIPE_SECRET_KEY) throw new Error("STRIPE_SECRET_KEY is not defined");

// Get __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve static files

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Routes
app.use("/mern12", orderRouter); // Assuming '/mern12' is your base route for orders
app.use("/user", userRouter); // Example route for user-related operations

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

app.post("/upload", upload.single("product"), (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }
    res
      .status(200)
      .json({ success: true, image_url: `/uploads/${req.file.filename}` });
  } catch (error) {
    console.error("Error during file upload:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Example routes
app.get("/contact", (req, res) =>
  res.send("hello contact world from the server")
);
app.get("/signin", (req, res) =>
  res.send("hello signin world from the server")
);
app.get("/register", (req, res) =>
  res.send("hello signup world from the server")
);

// User registration
app.post("/register", async (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;

  if (!name || !email || !phone || !password || !cpassword) {
    return res.status(422).json({ error: "Please fill all fields properly" });
  }

  if (password !== cpassword) {
    return res.status(422).json({ error: "Passwords do not match" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      cpassword: hashedPassword, // Consider removing this field if not needed
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// User sign-in
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please fill in all fields" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate a token here (if using JWT) and send it to the client
    res.status(200).json({ message: "User signed in successfully" });
  } catch (error) {
    console.error("Sign-in error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/mern12/orders", async (req, res) => {
  try {
    const newOrder = new orderModel(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error placing order",
    });
  }
});

app.post("/addproduct", async (req, res) => {
  try {
    // Fetch all products, sorted by ID in descending order to get the last product
    const lastProduct = await Product.findOne().sort({ id: -1 });

    // Set the new product ID
    const id = lastProduct ? lastProduct.id + 1 : 1;

    // Create a new product with the generated ID
    const product = new Product({
      id,
      name: req.body.name,
      old_price: req.body.old_price,
      new_price: req.body.new_price,
      category: req.body.category,
      image: req.body.image,
    });

    console.log("New Product: ", product);

    // Save the product to the database
    await product.save();

    console.log("Product Saved");

    // Send a success response
    res.json({
      success: true,
      name: req.body.name,
      message: "Product added successfully",
    });
  } catch (error) {
    console.error("Failed to add product:", error);

    // Handle errors, sending a proper response
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

//create api for remove product
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({
    success: true,
    name: req.body.name,
  });
});

// create api for get all products
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All products Fetched");
  res.send(products);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
