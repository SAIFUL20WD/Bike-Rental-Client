import { useGetUserRentalsQuery } from "../../../redux/features/booking/booking.api";
import BookingTable from "./BookingTable";

const UnpaidBookings = () => {
	const { data } = useGetUserRentalsQuery("unpaid");

	return (
		<>
			<div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
				<div className="mb-1 w-full">
					<div className="mb-4">
						<h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
							All Unpaid Bookings
						</h1>
					</div>
				</div>
			</div>
			<div className="flex flex-col">
				<div className="overflow-x-auto">
					<div className="inline-block min-w-full align-middle">
						<div className="overflow-hidden shadow">
							{data?.data ? (
								<BookingTable data={data.data} />
							) : null}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default UnpaidBookings;