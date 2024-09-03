/** @format */

import { Stripe } from "stripe";

const stripeClient = new Stripe("MY_WORK_IS_MERN_STACKDEVLOPER"); // Replace with your actual Stripe secret key

export const placeOrder = async (req, res) => {
  console.log("Place Order Route Hit"); // Log route hit

  const fronted_url = "http://localhost:3000";

  try {
    // Extract userId from request body
    const { userId, items, amount, address } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "userId is required" });
    }

    // Create a new order
    const newOrder = new orders({
      userId,
      items,
      amount,
      address,
    });
    await newOrder.save();

    // Process payment and create checkout session
    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 80,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100 * 80,
      },
      quantity: 1,
    });

    const session = await stripeClient.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${fronted_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${fronted_url}/verify?success=false&orderId=${newOrder._id}`,
    });
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error placing order",
    });
  }
};
