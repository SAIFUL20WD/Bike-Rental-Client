import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";
import { Outlet } from "react-router-dom";

const DashboardNavSideBar = () => {
	return (
		<>
			<DashboardNavbar />
			<div className="flex items-start">
				<DashboardSidebar />
				<main className="relative h-full w-full overflow-y-auto bg-gray-50 dark:bg-gray-900">
					<Outlet />
				</main>
			</div>
		</>
	);
};

export default DashboardNavSideBar;
