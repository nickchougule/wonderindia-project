import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: String,
    description: String,
    status: { type: String, default: "open" },
  },
  { timestamps: true }
);

export default mongoose.model("Ticket", ticketSchema);
