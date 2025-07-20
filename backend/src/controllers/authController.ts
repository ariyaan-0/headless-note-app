import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export const register = async (req: Request, res: Response) => {
	const { name, email, password } = req.body;

	try {
		const existingUser = await User.findOne({ email });
		if (existingUser) return res.status(400).json({ message: "User already exists" });

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await User.create({ name, email, password: hashedPassword });

		const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

		res.status(201).json({ user: { id: user._id, name: user.name, email: user.email }, token });
	} catch (error) {
		res.status(500).json({ message: "Register failed", error });
	}
};

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ message: "Invalid credentials" });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

		const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

		res.status(200).json({ user: { id: user._id, name: user.name, email: user.email }, token });
	} catch (error) {
		res.status(500).json({ message: "Login failed", error });
	}
};

export const getCurrentUser = async (req: Request, res: Response) => {
	try {
		const user = await User.findById((req as any).user.id).select("-password");
		if (!user) return res.status(404).json({ message: "User not found" });
		res.json(user);
	} catch (error) {
		res.status(500).json({ message: "Fetch user failed", error });
	}
};
