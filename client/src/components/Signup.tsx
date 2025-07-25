/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import service from "../services/auth";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index";

interface SignupFormInputs {
	name: string;
	email: string;
	password: string;
}

function Signup() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignupFormInputs>();

	const [error, setError] = useState<string>("");

	const create: SubmitHandler<SignupFormInputs> = async (data) => {
		setError("");
		try {
			const userData = await service.createAccount(data);
			if (userData) {
				const currentUser = await service.getCurrentUser();
				if (currentUser) {
					dispatch(login({ userData: currentUser }));
					navigate("/");
				}
			}
		} catch (error: any) {
			setError(error.message || "An error occurred during signup.");
		}
	};

	return (
		<div className="flex items-center justify-center text-gray-900">
			<div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
				<div className="mb-2 flex justify-center">
					<span className="inline-block w-full max-w-[100px]">
						<Logo width="100%" />
					</span>
				</div>
				<h2 className="text-center text-2xl font-bold leading-tight">
					Sign up to create account
				</h2>
				<p className="mt-2 text-center text-base text-black/60">
					Already have an account?&nbsp;
					<Link
						to="/login"
						className="font-medium text-primary transition-all duration-200 hover:underline"
					>
						Sign In
					</Link>
				</p>
				{error && (
					<p className="text-red-600 mt-8 text-center">{error}</p>
				)}

				<form onSubmit={handleSubmit(create)}>
					<div className="space-y-5">
						<Input
							label="Full Name: "
							placeholder="Enter your full name"
							{...register("name", {
								required: "Name is required",
							})}
						/>
						{errors.name && (
							<p className="text-red-600 text-sm mt-1">
								{errors.name.message}
							</p>
						)}
						<Input
							label="Email: "
							placeholder="Enter your email"
							type="email"
							{...register("email", {
								required: "Email is required",
								validate: {
									matchPattern: (value) =>
										/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
											value
										) ||
										"Email address must be a valid address",
								},
							})}
						/>
						{errors.email && (
							<p className="text-red-600 text-sm mt-1">
								{errors.email.message}
							</p>
						)}
						<Input
							label="Password: "
							type="password"
							placeholder="Enter your password"
							{...register("password", {
								required: "Password is required",
							})}
						/>
						{errors.password && (
							<p className="text-red-600 text-sm mt-1">
								{errors.password.message}
							</p>
						)}
						<Button type="submit" className="w-full">
							Create Account
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Signup;
