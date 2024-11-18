import express from "express";
import Quiz from "../mongodb/models/Post.js";
import jwt from "jsonwebtoken";
const router = express.Router();
router.get("/quizzes", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.userId; // Assuming userId is the email

    // Fetch quizzes for the authenticated user
    const quizzes = await Quiz.find({ ownerEmail: email });
    console.log(quizzes);
    res.json(quizzes);
  } catch (error) {
    console.error("Failed to authenticate token:", error);
    res.status(403).json({ error: "Failed to authenticate token" });
  }
});

export default router;
