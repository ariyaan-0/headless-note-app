import parse from "html-react-parser";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";

interface CardProps {
	$id: string;
	title: string;
	featuredImage?: string;
	content?: string;
}

function Card({ $id, title, featuredImage, content }: CardProps) {
	// Take first 100 characters of content for preview (optional)
	const contentPreview =
		content && content.length > 100
			? content.slice(0, 100) + "..."
			: content;

	return (
		<Link to={`/note/${$id}`}>
			<div className="w-full bg-gray-100 rounded-xl p-4 min-h-[200px] flex flex-col">
				<h2 className="text-xl font-bold mb-3">{title}</h2>
				{featuredImage ? (
					<img
						src={appwriteService.getFilePreview(featuredImage)}
						alt={title}
						className="rounded-xl object-cover max-h-48 w-full"
					/>
				) : contentPreview ? (
					<p className="text-gray-700 whitespace-pre-wrap">
						{parse(contentPreview)}
					</p>
				) : (
					<div className="h-48"></div> // empty space if no image or content
				)}
			</div>
		</Link>
	);
}

export default Card;
