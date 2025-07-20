import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import type { RootState } from "../../store/store";
import { Container, Logo, LogoutBtn } from "../index";

function Header() {
	const authStatus = useSelector((state: RootState) => state.auth.status);
	const navigate = useNavigate();

	const navItems = [
		{
			name: "Home",
			slug: "/",
			active: true,
		},
		{
			name: "Login",
			slug: "/login",
			active: !authStatus,
		},
		{
			name: "Signup",
			slug: "/signup",
			active: !authStatus,
		},
		{
			name: "Add Note",
			slug: "/add-note",
			active: authStatus,
		},
	];

	return (
		<header className="py-3 shadow bg-rosepink text-white font-bold">
			<Container>
				<nav className="flex">
					<div className="mr-4">
						<Link to="/">
							<Logo width="70px" />
						</Link>
					</div>
					<ul className="flex ml-auto">
						{navItems.map(
							(item) =>
								item.active && (
									<li key={item.name}>
										<button
											onClick={() => navigate(item.slug)}
											className="inline-bock px-6 py-2 duration-200 hover:bg-blue-950 rounded-full"
										>
											{item.name}
										</button>
									</li>
								)
						)}
						{authStatus && (
							<li>
								<LogoutBtn />
							</li>
						)}
					</ul>
				</nav>
			</Container>
		</header>
	);
}

export default Header;
