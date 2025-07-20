import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import "./App.css";
import service from "./services/auth";
import { Header } from "./components";
import { login, logout } from "./store/authSlice";

function App() {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		service
			.getCurrentUser()
			.then((userData) => {
				if (userData) {
					dispatch(login({ userData }));
				} else {
					dispatch(logout());
				}
			})
			.catch((error) => {
				console.error("Error fetching current user:", error);
				dispatch(logout());
			})
			.finally(() => setLoading(false));
	}, [dispatch]);

	if (loading) {
		return null;
	}

	return (
		<div className="min-h-screen flex flex-wrap content-between text-white bg-darkblue rounded-t-xl overflow-hidden">
			<div className="w-full block">
				<Header />
				<main>
					<Outlet />
				</main>
			</div>
		</div>
	);
}

export default App;
