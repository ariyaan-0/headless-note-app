import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Input, RTE } from "..";
import appwriteService from "../../appwrite/config";
import { RootState } from "../../store";

interface NoteFormProps {
	note?: {
		$id: string;
		title: string;
		content: string;
		category?: string;
		featuredImage?: string;
	};
}

interface FormValues {
	title: string;
	slug: string;
	content: string;
	image?: FileList;
	category?: string;
}

export default function NoteForm({ note }: NoteFormProps) {
	const { register, handleSubmit, watch, setValue, control, getValues } =
		useForm<FormValues>({
			defaultValues: {
				title: note?.title || "",
				slug: note?.slug || "",
				content: note?.content || "",
				category: note?.category || "",
			},
		});

	const navigate = useNavigate();
	const userData = useSelector((state: RootState) => state.auth.userData);

	const slugTransform = useCallback((value: string) => {
		return value
			.trim()
			.toLowerCase()
			.replace(/[^a-zA-Z\d\s]+/g, "-")
			.replace(/\s+/g, "-");
	}, []);

	useEffect(() => {
		const subscription = watch((value, { name }) => {
			if (name === "title") {
				setValue("slug", slugTransform(value.title || ""), {
					shouldValidate: true,
				});
			}
		});

		return () => subscription.unsubscribe();
	}, [watch, slugTransform, setValue]);

	const submit = async (data: FormValues) => {
		let fileId: string | undefined = note?.featuredImage;

		if (data.image?.[0]) {
			const uploadedFile = await appwriteService.uploadFile(
				data.image[0]
			);
			if (uploadedFile) {
				if (note?.featuredImage) {
					await appwriteService.deleteFile(note.featuredImage);
				}
				fileId = uploadedFile.$id;
			}
		}

		const payload = {
			title: data.title,
			slug: data.slug,
			content: data.content,
			category: data.category || "",
			featuredImage: fileId,
		};

		if (note) {
			const updated = await appwriteService.updateNote(note.$id, payload);
			if (updated) {
				navigate(`/note/${updated.$id}`);
			}
		} else {
			const created = await appwriteService.createNote({
				...payload,
				userId: userData.$id,
			});
			if (created) {
				navigate(`/note/${created.$id}`);
			}
		}
	};

	return (
		<form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
			<div className="w-2/3 px-2">
				<Input
					label="Title :"
					placeholder="Title"
					className="mb-4"
					{...register("title", { required: true })}
				/>
				<Input
					label="Slug :"
					placeholder="Slug"
					className="mb-4"
					{...register("slug", { required: true })}
					onInput={(e) =>
						setValue("slug", slugTransform(e.currentTarget.value), {
							shouldValidate: true,
						})
					}
				/>
				<RTE
					label="Content :"
					name="content"
					control={control}
					defaultValue={getValues("content")}
				/>
			</div>
			<div className="w-1/3 px-2">
				<Input
					label="Image (optional):"
					type="file"
					className="mb-4"
					accept="image/*"
					{...register("image")}
				/>
				{note?.featuredImage && (
					<div className="w-full mb-4">
						<img
							src={appwriteService.getFilePreview(
								note.featuredImage
							)}
							alt={note.title}
							className="rounded-lg"
						/>
					</div>
				)}
				<Input
					label="Category (optional):"
					placeholder="Enter category"
					className="mb-4"
					{...register("category")}
				/>
				<Button
					type="submit"
					bgColor={note ? "bg-green-500" : undefined}
					className="w-full"
				>
					{note ? "Update" : "Submit"}
				</Button>
			</div>
		</form>
	);
}
