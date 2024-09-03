/** @format */

import express from "express";
import { placeOrder } from "../controllers/orderController.js";

const router = express.Router();

// POST /order endpoint
router.post("/orders", placeOrder);

export default router;
