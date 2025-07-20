/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";
import { Card, Container } from "../components";
import { RootState } from "../store";

interface Note {
	$id: string;
	title: string;
	content: string;
	[key: string]: any; // for other dynamic fields
}

function AllNotes() {
	const [notes, setNotes] = useState<Note[]>([]);
	const userData = useSelector((state: RootState) => state.auth.userData);
	console.log("UserID: ", userData?.$id);
	useEffect(() => {
		if (userData?.$id) {
			appwriteService.getNotes(userData.$id).then((res) => {
				if (res) {
					setNotes(res.documents);
				}
			});
		}
	}, [userData]);

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

export default AllNotes;
