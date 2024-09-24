import { Button, Table } from "flowbite-react";
import { TBooking } from "../../../types";
import { useMakeBookingPaymentMutation } from "../../../redux/features/booking/booking.api";
import toast from "react-hot-toast";
import CouponModal from "./CouponModal";

type TBookingTableProps = {
	data: TBooking[];
};

const BookingTable = ({ data }: TBookingTableProps) => {
	const [makeBookingPayment] = useMakeBookingPaymentMutation();

	const handlePayment = async (id) => {
		toast.loading("Please wait...", { duration: 2000 });
		try {
			const res = await makeBookingPayment(id).unwrap();
			if (res.success) {
				// console.log(res);
				window.location.href = res.data.payment_url;
			} else {
				toast.error("Something went wrong!");
			}
		} catch (err) {
			toast.error("Something went wrong!");
		}
	};

	if (data.length === 0) {
		return <h3 className="text-3xl m-5">No Booking Found</h3>;
	} else {
		return (
			<Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
				<Table.Head className="bg-gray-100 dark:bg-gray-700">
					<Table.HeadCell>No</Table.HeadCell>
					<Table.HeadCell>Bike Name</Table.HeadCell>
					<Table.HeadCell>Start Time</Table.HeadCell>
					<Table.HeadCell>Return Time</Table.HeadCell>
					<Table.HeadCell>Total Cost</Table.HeadCell>
					<Table.HeadCell>Action</Table.HeadCell>
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
									{item.bikeId.name}
								</Table.Cell>
								<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
									<p>
										Date: {item.startTime.substring(0, 10)}
									</p>
									<p>
										Time:{" "}
										{
											item.startTime
												.split("T")[1]
												.split(".")[0]
										}
									</p>
								</Table.Cell>
								<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
									{item.returnTime ? (
										<>
											<p>
												Date:{" "}
												{item.returnTime.substring(
													0,
													10
												)}
											</p>
											<p>
												Time:{" "}
												{
													item.returnTime
														.split("T")[1]
														.split(".")[0]
												}
											</p>
										</>
									) : (
										"N/A"
									)}
								</Table.Cell>
								<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
									{item.totalCost}
								</Table.Cell>
								<Table.Cell className="space-x-2 whitespace-nowrap p-4">
									<div className="flex items-center gap-x-3">
										{item.paymentStatus === "unpaid" &&
										item.returnTime ? (
											<Button
												color="primary"
												onClick={() =>
													handlePayment(item._id)
												}
											>
												Pay
											</Button>
										) : null}
										{item.couponUsed === false &&
										item.paymentStatus === "unpaid" &&
										item.returnTime ? (
											<CouponModal id={item._id} />
										) : null}
									</div>
								</Table.Cell>
							</Table.Row>
						);
					})}
				</Table.Body>
			</Table>
		);
	}
};
export default BookingTable;
