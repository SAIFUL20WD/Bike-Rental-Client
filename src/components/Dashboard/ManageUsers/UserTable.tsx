import { Table } from "flowbite-react";
import MakeAdminModal from "./MakeAdmin";
import DeleteUserModal from "./DeleteUser";
import { TUser } from "../../../types";

type TUserTableProps = {
	data: TUser[];
};

const UserTable = ({ data }: TUserTableProps) => {
	return (
		<Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
			<Table.Head className="bg-gray-100 dark:bg-gray-700">
				<Table.HeadCell>No</Table.HeadCell>
				<Table.HeadCell>Name</Table.HeadCell>
				<Table.HeadCell>Email</Table.HeadCell>
				<Table.HeadCell>Phone</Table.HeadCell>
				<Table.HeadCell>Address</Table.HeadCell>
				<Table.HeadCell>Role</Table.HeadCell>
				<Table.HeadCell>Actions</Table.HeadCell>
			</Table.Head>
			<Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
				{data?.map((user, idx) => {
					return (
						<Table.Row
							className="hover:bg-gray-100 dark:hover:bg-gray-700"
							key={user._id}
						>
							<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
								{idx + 1}
							</Table.Cell>
							<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
								{user.name}
							</Table.Cell>
							<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
								{user.email}
							</Table.Cell>
							<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
								{user.phone}
							</Table.Cell>
							<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
								{user.address}
							</Table.Cell>
							<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white uppercase">
								{user.role}
							</Table.Cell>
							<Table.Cell className="space-x-2 whitespace-nowrap p-4">
								<div className="flex items-center gap-x-3">
									{user.role === "user" ? (
										<>
											<MakeAdminModal id={user._id} />
											<DeleteUserModal id={user._id} />
										</>
									) : null}
								</div>
							</Table.Cell>
						</Table.Row>
					);
				})}
			</Table.Body>
		</Table>
	);
};

export default UserTable;
