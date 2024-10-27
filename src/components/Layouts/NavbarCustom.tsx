import { Button, DarkThemeToggle, Navbar } from "flowbite-react";
import logo from "../../assets/images/logo.png";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import { logOut } from "../../redux/features/auth/authSlice";

const NavbarCustom = () => {
	const [loggedIn, setLoggedIn] = useState(false);

	const handleLogOut = () => {
		localStorage.removeItem("token");
		logOut();
		toast.success("Logged Out");
		setLoggedIn(false);
	};

	return (
		<Navbar
			fluid
			rounded
			onLoad={() => {
				const token = localStorage.getItem("token");
				if (token) {
					setLoggedIn(true);
				}
			}}
		>
			<Navbar.Brand as="div">
				<NavLink to="/">
					<img src={logo} className="w-32 mr-3" alt="Logo" />
				</NavLink>
			</Navbar.Brand>
			<div className="flex md:order-2">
				<div className="mr-5">
					<DarkThemeToggle />
				</div>
				{loggedIn ? (
					<Button
						color="purple"
						className="uppercase"
						onClick={handleLogOut}
					>
						Logout
					</Button>
				) : (
					<NavLink to="/sign-in">
						<Button color="blue" className="uppercase">
							Login
						</Button>
					</NavLink>
				)}
				<Navbar.Toggle />
			</div>
			<Navbar.Collapse className="uppercase">
				<Navbar.Link as="span">
					<NavLink
						to="/"
						className={({ isActive }) =>
							isActive ? "text-blue-600" : ""
						}
					>
						Home
					</NavLink>
				</Navbar.Link>
				{loggedIn ? (
					<Navbar.Link as="span">
						<NavLink
							to="/dashboard"
							className={({ isActive }) =>
								isActive ? "active" : ""
							}
						>
							Dashboard
						</NavLink>
					</Navbar.Link>
				) : (
					""
				)}
				<Navbar.Link as="span">
					<NavLink
						to="/all-bikes"
						className={({ isActive }) =>
							isActive ? "text-blue-600" : ""
						}
					>
						All Bikes
					</NavLink>
				</Navbar.Link>
				<Navbar.Link as="span">
					<NavLink
						to="/about"
						className={({ isActive }) =>
							isActive ? "text-blue-600" : ""
						}
					>
						About
					</NavLink>
				</Navbar.Link>
				<Navbar.Link as="span">
					<NavLink
						to="/contact"
						className={({ isActive }) =>
							isActive ? "text-blue-600" : ""
						}
					>
						Contact
					</NavLink>
				</Navbar.Link>
				<Navbar.Link as="span">
					<NavLink
						to="/compare"
						className={({ isActive }) => (isActive ? "active" : "")}
					>
						Compare
					</NavLink>
				</Navbar.Link>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavbarCustom;
