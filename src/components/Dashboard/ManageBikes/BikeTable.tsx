import { Table } from "flowbite-react";
import EditBikeModal from "./EditBike";
import DeleteBikeModal from "./DeleteBike";
import { TBike } from "../../../types";

type TBikeTableProps = {
	data: TBike[];
};

const BikeTable = ({ data }: TBikeTableProps) => {
	return (
		<Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
			<Table.Head className="bg-gray-100 dark:bg-gray-700">
				<Table.HeadCell>No</Table.HeadCell>
				<Table.HeadCell>Image</Table.HeadCell>
				<Table.HeadCell>Name</Table.HeadCell>
				<Table.HeadCell>CC</Table.HeadCell>
				<Table.HeadCell>Price per hour</Table.HeadCell>
				<Table.HeadCell>Actions</Table.HeadCell>
			</Table.Head>
			<Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
				{data.map((item, idx) => {
					return (
						<Table.Row
							className="hover:bg-gray-100 dark:hover:bg-gray-700"
							key={item._id}
						>
							<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
								{idx + 1}
							</Table.Cell>
							<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
								<img
									src={item.image}
									alt={item.name}
									className="w-20"
								/>
							</Table.Cell>
							<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
								{item.name}
							</Table.Cell>
							<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
								{item.cc}
							</Table.Cell>
							<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white text-center">
								{item.pricePerHour}
							</Table.Cell>
							<Table.Cell className="space-x-2 whitespace-nowrap p-4">
								<div className="flex items-center gap-x-3">
									<EditBikeModal data={item} />
									<DeleteBikeModal id={item._id} />
								</div>
							</Table.Cell>
						</Table.Row>
					);
				})}
			</Table.Body>
		</Table>
	);
};
export default BikeTable;
