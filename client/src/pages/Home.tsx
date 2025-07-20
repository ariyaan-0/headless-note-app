/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";
import { Card, Container } from "../components";
import { RootState } from "../store";

// Define the structure of a note (customize as needed)
interface Note {
	slug: string;
	title: string;
	content: string;
	featuredImage: string;
	category: string;
	$id: string;
	[key: string]: any;
}

function Home() {
	const [notes, setNotes] = useState<Note[]>([]);
	const userData = useSelector((state: RootState) => state.auth.userData);

	useEffect(() => {
		appwriteService.getNotes(userData?.$id).then((notesRes) => {
			if (notesRes && notesRes.documents) {
				setNotes(notesRes.documents);
			}
		});
	}, []);

	if (notes.length === 0) {
		return (
			<div className="w-full py-8 mt-4 text-center">
				<Container>
					<div className="flex flex-wrap">
						<div className="p-2 w-full">
							<h1 className="text-2xl text-white font-bold hover:text-gray-500">
								You have no notes yet.
								<br />
								You may need to log in to add notes.
							</h1>
						</div>
					</div>
				</Container>
			</div>
		);
	}

	return (
		<div className="w-full py-8">
			<Container>
				<div className="flex flex-wrap">
					{notes.map((note) => (
						<div key={note.$id} className="p-2 w-1/4">
							<Card {...note} />
						</div>
					))}
				</div>
			</Container>
		</div>
	);
}

export default Home;
