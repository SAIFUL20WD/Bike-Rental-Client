import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiHome, HiUsers } from "react-icons/hi";
import { FaMotorcycle } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { TbBrandBooking } from "react-icons/tb";
import { MdManageHistory } from "react-icons/md";
import { RiCoupon3Fill } from "react-icons/ri";
import { useGetProfileQuery } from "../../redux/features/user/userApi";

const sideBarItemsAdmin = [
	{ path: "/dashboard", icon: HiHome, name: "Home" },
	{ path: "/dashboard/profile", icon: FaUser, name: "Profile" },
	{ path: "/dashboard/bikes", icon: FaMotorcycle, name: "Manage Bikes" },
	{ path: "/dashboard/users", icon: HiUsers, name: "Manage Users" },
	{ path: "/dashboard/bookings", icon: TbBrandBooking, name: "My Bookings" },
	{
		path: "/dashboard/rentals",
		icon: MdManageHistory,
		name: "Manage Rentals",
	},
	{ path: "/dashboard/coupons", icon: RiCoupon3Fill, name: "Manage Coupons" },
];

const sideBarItemsUser = [
	{ path: "/dashboard", icon: HiHome, name: "Home" },
	{ path: "/dashboard/profile", icon: FaUser, name: "Profile" },
	{ path: "/dashboard/bookings", icon: TbBrandBooking, name: "My Bookings" },
];

const DashboardSidebar = () => {
	const { data } = useGetProfileQuery(undefined);

	const [currentPage, setCurrentPage] = useState("");
	const naviagte = useNavigate();

	const handleSidebarNaviagtion = (e: any, url: string) => {
		e.preventDefault();
		naviagte(url);
		setCurrentPage(url);
	};

	useEffect(() => {
		const newPage = window.location.pathname;
		setCurrentPage(newPage);
	}, [currentPage]);

	if (data) {
		return (
			<Sidebar
				aria-label="Sidebar with multi-level dropdown example"
				className="flex fixed top-0 left-0 z-20 flex-col flex-shrink-0 pt-20 h-full duration-75 border-r border-gray-200 lg:flex transition-width dark:border-gray-700"
			>
				<div className="flex h-full flex-col justify-between py-2">
					<div>
						<Sidebar.Items>
							<Sidebar.ItemGroup>
								{data.data.role === "admin"
									? sideBarItemsAdmin.map((item) => {
											return (
												<Sidebar.Item
													key={item.name}
													href={item.path}
													icon={item.icon}
													onClick={(e: any) =>
														handleSidebarNaviagtion(
															e,
															item.path
														)
													}
													className={
														item.path ===
														currentPage
															? "bg-gray-100 dark:bg-gray-700"
															: ""
													}
												>
													{item.name}
												</Sidebar.Item>
											);
									  })
									: sideBarItemsUser.map((item) => {
											return (
												<Sidebar.Item
													key={item.name}
													href={item.path}
													icon={item.icon}
													onClick={(e: any) =>
														handleSidebarNaviagtion(
															e,
															item.path
														)
													}
													className={
														item.path ===
														currentPage
															? "bg-gray-100 dark:bg-gray-700"
															: ""
													}
												>
													{item.name}
												</Sidebar.Item>
											);
									  })}
							</Sidebar.ItemGroup>
						</Sidebar.Items>
					</div>
				</div>
			</Sidebar>
		);
	}
};

export default DashboardSidebar;
