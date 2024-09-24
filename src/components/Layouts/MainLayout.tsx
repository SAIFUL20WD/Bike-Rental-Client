import { Outlet } from "react-router-dom";
import FooterCustom from "./FooterCustom";
import NavbarCustom from "./NavbarCustom";
import { Flowbite } from "flowbite-react";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
	return (
		<>
			<Flowbite>
				<section className="max-w-7xl mx-auto dark:bg-gray-800 dark:text-white">
					<Toaster />
					<NavbarCustom />
					<Outlet />
					<FooterCustom />
				</section>
			</Flowbite>
		</>
	);
};

export default MainLayout;
