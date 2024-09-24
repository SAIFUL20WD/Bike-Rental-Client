import DashboardNavbar from "../components/Layouts/DashboardNavbar";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/Layouts/DashboardSidebar";
import { CustomFlowbiteTheme, Flowbite } from "flowbite-react";

const customTheme: CustomFlowbiteTheme = {
	button: {
		color: {
			primary:
				"text-white bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800",
		},
		outline: {
			on: "transition-all duration-75 ease-in group-hover:bg-opacity-0 group-hover:text-inherit",
		},
		size: {
			md: "text-sm px-3 py-2",
		},
	},
	datepicker: {
		popup: {
			footer: {
				button: {
					base: "w-full rounded-lg px-5 py-2 text-center text-sm font-medium focus:ring-4 focus:ring-primary-300",
					today: "bg-primary-700 text-white hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700",
					clear: "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
				},
			},
		},
		views: {
			days: {
				items: {
					item: {
						selected:
							"bg-primary-700 text-white hover:bg-primary-600",
					},
				},
			},
			months: {
				items: {
					item: {
						selected:
							"bg-primary-700 text-white hover:bg-primary-600",
					},
				},
			},
			years: {
				items: {
					item: {
						selected:
							"bg-primary-700 text-white hover:bg-primary-600",
					},
				},
			},
			decades: {
				items: {
					item: {
						selected:
							"bg-primary-700 text-white hover:bg-primary-600",
					},
				},
			},
		},
	},
	dropdown: {
		floating: {
			base: "z-10 w-fit rounded-xl divide-y divide-gray-100 shadow",
			content: "rounded-xl text-sm text-gray-700 dark:text-gray-200",
			target: "w-fit dark:text-white",
		},
		content: "",
	},
	modal: {
		content: {
			inner: "relative rounded-lg bg-white shadow dark:bg-gray-800",
		},
		header: {
			base: "flex items-start justify-between rounded-t px-5 pt-5",
		},
	},
	textarea: {
		base: "block w-full text-sm p-4 rounded-lg border disabled:cursor-not-allowed disabled:opacity-50",
	},
	toggleSwitch: {
		toggle: {
			checked: {
				off: "!border-gray-200 !bg-gray-200 dark:!border-gray-600 dark:!bg-gray-700",
			},
		},
	},
};

const DashboardPage = () => {
	return (
		<>
			<Flowbite theme={{ theme: customTheme }}>
				<DashboardNavbar />
				<div className="flex items-start pt-16">
					<DashboardSidebar />
					<main className="relative min-h-screen w-full overflow-y-auto bg-gray-50 dark:bg-gray-900 lg:ml-64">
						<section className="px-4 pt-6">
							<Outlet />
						</section>
					</main>
				</div>
			</Flowbite>
		</>
	);
};

export default DashboardPage;
