import express from "express";
import Ticket from "../models/Ticket.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const ticket = await Ticket.create({ ...req.body, user: req.user.id });
    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user.id });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
