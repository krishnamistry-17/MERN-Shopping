/** @format */
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/User.js"; // Ensure this model exists and is correctly defined

// Register a new user
export const registerUser = async (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;

  // Check if all fields are provided
  if (!name || !email || !phone || !password || !cpassword) {
    return res.status(422).json({ error: "Please fill all fields properly" });
  }

  // Check if passwords match
  if (password !== cpassword) {
    return res.status(422).json({ error: "Passwords do not match" });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Sign in a user
export const signInUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ error: "Please fill in all fields" });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send the token to the client
    res.status(200).json({ token, message: "User signed in successfully" });
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
