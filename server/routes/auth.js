import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../mongodb/models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user.email }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    console.log(token);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
});
export default router;
