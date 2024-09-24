import { useGetAllUserQuery } from "../../redux/features/user/userApi";
import { Toaster } from "react-hot-toast";
import UserTable from "./ManageUsers/UserTable";

const UserList = () => {
	const { data } = useGetAllUserQuery(undefined);

	return (
		<>
			<Toaster />
			<div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
				<div className="mb-1 w-full">
					<div className="mb-4">
						<h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
							All Users
						</h1>
					</div>
				</div>
			</div>
			<div className="flex flex-col">
				<div className="overflow-x-auto">
					<div className="inline-block min-w-full align-middle">
						<div className="overflow-hidden shadow">
							{data?.data ? (
								<UserTable data={data.data} />
							) : (
								<h3 className="text-3xl m-5">No User Found</h3>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserList;
