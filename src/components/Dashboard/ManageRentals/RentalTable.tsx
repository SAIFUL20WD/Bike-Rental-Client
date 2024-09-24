import { Button, Table } from "flowbite-react";
import { TBooking } from "../../../types";
import RentalCalculateModal from "./RentalCalculateModal";
import { useState } from "react";

type TRentalTableProps = {
	data: TBooking[];
};

const RentalTable = ({ data }: TRentalTableProps) => {
	const [openModal, setOpenModal] = useState(false);

	return (
		<>
			<Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
				<Table.Head className="bg-gray-100 dark:bg-gray-700">
					<Table.HeadCell>No</Table.HeadCell>
					<Table.HeadCell>User</Table.HeadCell>
					<Table.HeadCell>User Email</Table.HeadCell>
					<Table.HeadCell>Bike Name</Table.HeadCell>
					<Table.HeadCell>Start Time</Table.HeadCell>
					<Table.HeadCell>Payment Status</Table.HeadCell>
					<Table.HeadCell>Booking Status</Table.HeadCell>
					<Table.HeadCell>Actions</Table.HeadCell>
				</Table.Head>
				<Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
					{data?.map((booking, idx) => {
						return (
							<Table.Row
								className="hover:bg-gray-100 dark:hover:bg-gray-700"
								key={booking._id}
							>
								<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
									{idx + 1}
								</Table.Cell>
								<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
									{booking.userId.name}
								</Table.Cell>
								<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
									{booking.userId.email}
								</Table.Cell>
								<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
									{booking.bikeId.name}
								</Table.Cell>
								<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
									<p>
										Date:{" "}
										{booking.startTime.substring(0, 10)}
									</p>
									<p>
										Time:{" "}
										{
											booking.startTime
												.split("T")[1]
												.split(".")[0]
										}
									</p>
								</Table.Cell>
								<Table.Cell className="capitalize whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
									{booking.paymentStatus}
								</Table.Cell>
								<Table.Cell className="capitalize whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
									{booking.status === "fail"
										? "Canceled"
										: "Booked"}
								</Table.Cell>
								<Table.Cell className="space-x-2 whitespace-nowrap p-4">
									<div className="flex items-center gap-x-3">
										{booking.paymentStatus === "unpaid" &&
										booking.status === "pass" &&
										booking.returnTime === null ? (
											<Button
												color="success"
												onClick={() =>
													setOpenModal(true)
												}
											>
												Calculate
											</Button>
										) : (
											""
										)}
									</div>
								</Table.Cell>

								<RentalCalculateModal
									openModal={openModal}
									setOpenModal={setOpenModal}
									id={booking._id}
								/>
							</Table.Row>
						);
					})}
				</Table.Body>
			</Table>
		</>
	);
};

export default RentalTable;
