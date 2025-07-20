/* eslint-disable @typescript-eslint/no-explicit-any */
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";

export default function Note() {
	const [note, setNote] = useState<any>(null);
	const { slug } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (slug) {
			appwriteService.getNote(slug).then((note) => {
				if (note) setNote(note);
				else navigate("/");
			});
		} else {
			navigate("/");
		}
	}, [slug, navigate]);

	const deleteNote = () => {
		if (!note) return;

		appwriteService.deleteNote(note.$id).then((status) => {
			if (status) {
				if (note.featuredImage) {
					appwriteService.deleteFile(note.featuredImage);
				}
				navigate("/");
			}
		});
	};

	return note ? (
		<div className="py-8 text-white">
			<Container>
				<div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
					{note.featuredImage && (
						<img
							src={appwriteService.getFilePreview(
								note.featuredImage
							)}
							alt={note.title}
							className="rounded-xl"
						/>
					)}

					<div className="absolute right-6 top-6 flex space-x-3">
						<Link to={`/edit-note/${note.$id}`}>
							<Button bgColor="bg-green-500">Edit</Button>
						</Link>
						<Button bgColor="bg-red-500" onClick={deleteNote}>
							Delete
						</Button>
					</div>
				</div>

				<div className="w-full mb-4">
					<h1 className="text-2xl font-bold">{note.title}</h1>
					{note.category && (
						<span className="inline-block mt-2 px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-full">
							{note.category}
						</span>
					)}
				</div>

				<div className="browser-css">{parse(note.content || "")}</div>
			</Container>
		</div>
	) : null;
}
