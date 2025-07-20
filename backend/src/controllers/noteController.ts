import { Request, Response } from "express";
import Note from "../models/Note";
import slugify from "slugify";

export const createNote = async (req: Request, res: Response) => {
	const { title, content, featuredImage, category } = req.body;
	const userId = (req as any).user.id;

	try {
		const slug = slugify(title, { lower: true });

		const existing = await Note.findOne({ slug });
		if (existing) return res.status(400).json({ message: "Note with same slug exists" });

		const note = await Note.create({
			title,
			slug,
			content,
			featuredImage,
			category,
			userId,
		});

		res.status(201).json(note);
	} catch (error) {
		res.status(500).json({ message: "Create note failed", error });
	}
};

export const getNotes = async (req: Request, res: Response) => {
	const userId = (req as any).user.id;

	try {
		const notes = await Note.find({ userId }).sort({ createdAt: -1 });
		res.json(notes);
	} catch (error) {
		res.status(500).json({ message: "Get notes failed", error });
	}
};

export const getNote = async (req: Request, res: Response) => {
	const { slug } = req.params;

	try {
		const note = await Note.findOne({ slug });
		if (!note) return res.status(404).json({ message: "Note not found" });
		res.json(note);
	} catch (error) {
		res.status(500).json({ message: "Get note failed", error });
	}
};

export const updateNote = async (req: Request, res: Response) => {
	const { slug } = req.params;
	const { title, content, featuredImage, category } = req.body;

	try {
		const note = await Note.findOneAndUpdate(
			{ slug },
			{ title, content, featuredImage, category },
			{ new: true }
		);
		if (!note) return res.status(404).json({ message: "Note not found" });
		res.json(note);
	} catch (error) {
		res.status(500).json({ message: "Update failed", error });
	}
};

export const deleteNote = async (req: Request, res: Response) => {
	const { slug } = req.params;

	try {
		const note = await Note.findOneAndDelete({ slug });
		if (!note) return res.status(404).json({ message: "Note not found" });
		res.json({ message: "Note deleted" });
	} catch (error) {
		res.status(500).json({ message: "Delete failed", error });
	}
};
