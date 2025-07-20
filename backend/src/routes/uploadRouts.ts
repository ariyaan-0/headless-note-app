import express from "express";
import fs from "fs";
import path from "path";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.use(protect); 

// DELETE /api/notes/upload/:filename
router.delete("/upload/:filename", (req, res) => {
  const { filename } = req.params;
  // Folder where files are saved (adjust if needed)
  const filePath = path.join(__dirname, "../../uploads", filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("File delete error:", err);
      return res.status(500).json({ message: "File deletion failed" });
    }
    res.json({ message: "File deleted successfully" });
  });
});

export default router;
