/* eslint-disable @typescript-eslint/no-explicit-any */
import { Editor } from "@tinymce/tinymce-react";
import { Control, Controller } from "react-hook-form";

interface RTEProps {
	name?: string;
	control: Control<any>;
	label?: string;
	defaultValue?: string;
}

export default function RTE({
	name = "content",
	control,
	label,
	defaultValue = "",
}: RTEProps) {
	return (
		<div className="w-full">
			{label && <label className="inline-block mb-1 pl-1">{label}</label>}

			<Controller
				name={name}
				control={control}
				render={({ field: { onChange, value } }) => (
					<Editor
						initialValue={defaultValue}
						value={value}
						apiKey="b1o4l5u1d6x1dmuprunawwc3e4n6eiy5i84h70rwmx6m2m06"
						init={{
							height: 500,
							menubar: true,
							plugins: [
								"image",
								"advlist",
								"autolink",
								"lists",
								"link",
								"charmap",
								"preview",
								"anchor",
								"searchreplace",
								"visualblocks",
								"code",
								"fullscreen",
								"insertdatetime",
								"media",
								"table",
								"help",
								"wordcount",
							],
							toolbar:
								"undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
							content_style:
								"body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
						}}
						onEditorChange={onChange}
					/>
				)}
			/>
		</div>
	);
}
