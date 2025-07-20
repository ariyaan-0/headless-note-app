import express from "express";
import {
	createNote,
	deleteNote,
	getNote,
	getNotes,
	updateNote,
} from "../controllers/noteController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.use(protect); 

router.post("/", createNote);
router.get("/", getNotes);
router.get("/:slug", getNote);
router.put("/:slug", updateNote);
router.delete("/:slug", deleteNote);

export default router;
