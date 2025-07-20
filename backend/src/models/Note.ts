import mongoose, { Schema, Document } from "mongoose";

export interface INote extends Document {
	title: string;
	slug: string;
	content?: string;
	featuredImage?: string;
	category?: string;
	userId: mongoose.Types.ObjectId;
}

const NoteSchema: Schema = new Schema(
	{
		title: { type: String, required: true },
		slug: { type: String, required: true, unique: true },
		content: { type: String },
		featuredImage: { type: String },
		category: { type: String },
		userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
	},
	{ timestamps: true }
);

export default mongoose.model<INote>("Note", NoteSchema);
