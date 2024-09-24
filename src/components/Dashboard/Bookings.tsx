import { Tabs } from "flowbite-react";
import PaidBookings from "./ManageBookings/PaidBookings";
import UnpaidBookings from "./ManageBookings/UnpaidBookings";
import { Toaster } from "react-hot-toast";

const Bookings = () => {
	return (
		<section className="mt-5">
			<Toaster />
			<div className="flex flex-col gap-3">
				<Tabs aria-label="Default tabs" variant="default">
					<Tabs.Item title="Paid">
						<PaidBookings />
					</Tabs.Item>
					<Tabs.Item active title="Unpaid">
						<UnpaidBookings />
					</Tabs.Item>
				</Tabs>
			</div>
		</section>
	);
};

export default Bookings;
