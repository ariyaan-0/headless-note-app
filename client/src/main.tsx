import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App";
import { AuthLayout, Login } from "./components";
import "./index.css";

import AddNote from "./pages/AddNote";
import AllNotes from "./pages/AllNotes";
import EditNote from "./pages/EditNote";
import Home from "./pages/Home";
import Note from "./pages/Note";
import Signup from "./pages/Signup";

import store from "./store/store";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/login",
				element: (
					<AuthLayout authentication={false}>
						<Login />
					</AuthLayout>
				),
			},
			{
				path: "/signup",
				element: (
					<AuthLayout authentication={false}>
						<Signup />
					</AuthLayout>
				),
			},
			{
				path: "/all-notes",
				element: (
					<AuthLayout authentication={true}>
						<AllNotes />
					</AuthLayout>
				),
			},
			{
				path: "/add-note",
				element: (
					<AuthLayout authentication={true}>
						<AddNote />
					</AuthLayout>
				),
			},
			{
				path: "/edit-note/:slug",
				element: (
					<AuthLayout authentication={true}>
						<EditNote />
					</AuthLayout>
				),
			},
			{
				path: "/note/:slug",
				element: <Note />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
