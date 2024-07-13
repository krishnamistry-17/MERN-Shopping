/** @format */
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

dotenv.config({ path: "./config.env" });
require("./db/conn");

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

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

app.use(express.static(path.join(__dirname, "uploads")));

app.get("/contact", (req, res) => {
  res.send(`hello contact world from the server`);
});

app.get("/signin", (req, res) => {
  res.send(`hello signin world from the server`);
});

app.get("/register", (req, res) => {
  res.send(`hello signup world from the server`);
});

app.post("/register", (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;

  if (!name || !email || !phone || !password || !cpassword) {
    return res.status(422).json({ error: "Please fill all fields properly" });
  }

  // Add your user registration logic here (e.g., save to database)
  // For example, you could save the user to a database

  res.status(201).json({ message: "User registered successfully" });
});

// Define the POST /signin endpoint
app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please fill in all fields" });
  }

  // Add your user authentication logic here
  // For example, you could check the user against a database

  res.status(200).json({ message: "User signed in successfully" });
});

// Sample products data
// const products = [
//   {
//     name: "Product 1",
//     old_price: 100,
//     new_price: 80,
//     category: "Category 1",
//     image: "url1",
//   },
//   {
//     name: "Product 2",
//     old_price: 200,
//     new_price: 150,
//     category: "Category 2",
//     image: "url2",
//   },
// ];

app.get("/allproducts", (req, res) => {
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
