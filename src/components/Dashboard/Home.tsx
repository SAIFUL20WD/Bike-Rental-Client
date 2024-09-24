import { Spinner } from "flowbite-react";
import { useGetProfileQuery } from "../../redux/features/user/userApi";

const Home = () => {
	const { data } = useGetProfileQuery(undefined);
	if (data) {
		return (
			<div className="flex flex-col items-center justify-between bg-white p-4 dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:flex-row">
				<div>
					<h3 className="text-center text-black text-3xl capitalize my-5 dark:text-white">
						Welcome back,{" "}
						<span className="text-blue-600">{data.data.name}</span>
					</h3>
					<p className="text-xl text-gray-800 dark:text-white">
						We're excited to have you back on the road with us.
						Whether you're gearing up for your next adventure or
						checking in on your current motorbike rentals, we're
						here to make sure everything runs smoothly. Feel free to
						browse profile or manage your bookings, and let us know
						if there's anything we can assist you with. Enjoy the
						ride! 🏍️
					</p>
				</div>
			</div>
		);
	} else {
		return (
			<div className="flex flex-wrap items-center gap-2">
				<Spinner aria-label="Extra large spinner example" size="xl" />
			</div>
		);
	}
};

export default Home;
