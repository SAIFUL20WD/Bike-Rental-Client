import { DarkThemeToggle, Navbar } from "flowbite-react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo_alternative.png";

const DashboardNavbar = () => {
	return (
		<Navbar
			fluid
			className="fixed z-30 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
		>
			<div className="w-full p-3 lg:px-5 lg:pl-3">
				<div className="flex items-center justify-between">
					<div className="flex items-center">
						<Navbar.Brand as="div">
							<NavLink to="/">
								<img src={logo} className="w-20" alt="logo" />
							</NavLink>
						</Navbar.Brand>
					</div>
					<div className="flex items-center gap-3">
						<DarkThemeToggle />
					</div>
				</div>
			</div>
		</Navbar>
	);
};

export default DashboardNavbar;
