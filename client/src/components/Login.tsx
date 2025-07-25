import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import service from "../services/auth";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";

interface LoginFormInputs {
	email: string;
	password: string;
}

function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormInputs>();

	const [error, setError] = useState<string>("");

	const login: SubmitHandler<LoginFormInputs> = async (data) => {
		setError("");
		try {
			const session = await service.login(data);
			if (session) {
				dispatch(authLogin({ userData: session }));
				navigate("/");
			} else {
				setError("Login failed. Please check your credentials.");
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			setError(error.message || "An error occurred during login.");
		}
	};

	return (
		<div className="text-gray-900 flex items-center justify-center w-full">
			<div
				className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
			>
				<div className="mb-2 flex justify-center">
					<span className="inline-block w-full max-w-[100px]">
						<Logo width="100%" />
					</span>
				</div>
				<h2 className="text-center text-2xl font-bold leading-tight">
					Sign in to your account
				</h2>
				<p className="mt-2 text-center text-base text-black/60">
					Don&apos;t have any account?&nbsp;
					<Link
						to="/signup"
						className="font-medium text-primary transition-all duration-200 hover:underline"
					>
						Sign Up
					</Link>
				</p>
				{error && (
					<p className="text-red-600 mt-8 text-center">{error}</p>
				)}
				<form onSubmit={handleSubmit(login)} className="mt-8">
					<div className="space-y-5">
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
							Sign in
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;
