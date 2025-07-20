/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import service from "../services/config";
import type { Note } from "../services/config";
import { Card, Container } from "../components";
import type { RootState } from "../store/store";

function Home() {
	const [notes, setNotes] = useState<Note[]>([]);
	const userData = useSelector((state: RootState) => state.auth.userData);

	useEffect(() => {
        if (userData?._id) {
            service.getNotes().then((notesRes) => {
                if (Array.isArray(notesRes)) {
                    setNotes(notesRes.filter((note) => note.userId === userData._id));
                }
            });
        }
    }, [userData]);


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
						<div key={note._id} className="p-2 w-1/4">
							<Card {...note} />
						</div>
					))}
				</div>
			</Container>
		</div>
	);
}

export default Home;
