import express from "express";
const router = express.Router();
import * as dotenv from "dotenv";
dotenv.config();
import { v2 } from "cloudinary";
v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
router.route("/").post(async (req, res) => {
  try {
    const { image } = req.body;
    const photoUrl = await v2.uploader.upload(image);
    console.log(photoUrl);
    res.status(200).json({
      imageURI: photoUrl.url,
    });
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});
export default router;
