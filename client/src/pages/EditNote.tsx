/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../services/config";
import { Container, NoteForm } from "../components";

function EditNote() {
	const [note, setNote] = useState<any | null>(null);
	const { slug } = useParams<{ slug: string }>();
	const navigate = useNavigate();

	useEffect(() => {
		if (slug) {
			service.getNote(slug).then((note) => {
				if (note) {
					setNote(note);
				} else {
					navigate("/");
				}
			});
		} else {
			navigate("/");
		}
	}, [slug, navigate]);

	return note ? (
		<div className="py-8">
			<Container>
				<NoteForm note={note} />
			</Container>
		</div>
	) : null;
}

export default EditNote;
