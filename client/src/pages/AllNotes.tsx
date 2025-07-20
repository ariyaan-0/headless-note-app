/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import service from "../services/config";
import { Card, Container } from "../components";
import type { RootState } from "../store/store";

interface Note {
	_id: string;
	title: string;
	content?: string;
	[key: string]: any; 
}

function AllNotes() {
	const [notes, setNotes] = useState<Note[]>([]);
	const userData = useSelector((state: RootState) => state.auth.userData);

	useEffect(() => {
        if (userData) {
            service.getNotes().then((res) => {
                if (res && Array.isArray(res)) {
                    setNotes(res);
                }
            });
        }
    }, [userData]);


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

export default AllNotes;
