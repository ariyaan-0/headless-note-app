import type { ForwardedRef, InputHTMLAttributes } from "react";
import React, {useId} from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	className?: string;
}

const Input = React.forwardRef(
	(
		{ label, type = "text", className = "", ...props }: InputProps,
		ref: ForwardedRef<HTMLInputElement>
	) => {
		const id = useId();

		return (
			<div className="w-full">
				{label && (
					<label className="inline-block mb-1 pl-1" htmlFor={id}>
						{label}
					</label>
				)}
				<input
					type={type}
					className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
					ref={ref}
					{...props}
					id={id}
				/>
			</div>
		);
	}
);

export default Input;
