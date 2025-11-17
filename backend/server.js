import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import bookingRoutes from "./routes/bookings.js";
import ticketRoutes from "./routes/tickets.js";
import paymentRoutes from "./routes/payment.js";

// ★ 1. IMPORT NEW ROUTES
import subscribeRoutes from "./routes/subscribe.js";
import messageRoutes from "./routes/message.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/payment", paymentRoutes);

// ★ 2. USE NEW ROUTES
app.use("/api/subscribe", subscribeRoutes);
app.use("/api/message", messageRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));