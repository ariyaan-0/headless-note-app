import { useDispatch } from "react-redux";
import service from "../../services/auth";
import { logout } from "../../store/authSlice";
import type { AppDispatch } from "../../store/store";

function LogoutBtn() {
	const dispatch = useDispatch<AppDispatch>();

	const logoutHandler = () => {
		service.logout().then(() => {
			dispatch(logout());
		});
	};

	return (
		<button
			className="inline-block px-6 py-2 duration-200 hover:bg-blue-950 rounded-full"
			onClick={logoutHandler}
		>
			Logout
		</button>
	);
}

export default LogoutBtn;
