import { Card, Spinner } from "flowbite-react";
import { useGetBikesByTagQuery } from "../../redux/features/bike/bikeApi";
import { TBike } from "../../types";
import { Link } from "react-router-dom";

const Featured = () => {
	const { data } = useGetBikesByTagQuery("featured");

	return (
		<section className="my-16">
			<h3 className="text-center text-3xl capitalize mb-5">
				Featured
				<span className="text-blue-600"> bikes</span>
			</h3>
			<div className="grid grid-cols-12 gap-5">
				{data?.data ? (
					data.data.map((bike: TBike) => {
						return (
							<Card
								key={bike._id}
								className="max-w-sm col-span-4 max-md:col-span-6 max-sm:col-span-12 max-sm:ml-10 sm:mx-5 my-5 hover:scale-105 duration-300"
								imgAlt={bike.name}
								imgSrc={bike.image}
							>
								<h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
									{bike.name}
								</h5>
								<div className="flex items-center">
									<span className="rounded bg-teal-500 px-2.5 py-0.5 text-xs font-semibold text-white dark:bg-primary-700 dark:text-white">
										{bike.brand}
									</span>
								</div>
								<div className="flex items-center justify-start">
									<span className="text-2xl text-blue-600 font-bold dark:text-white">
										${bike.pricePerHour}/Hour
									</span>
								</div>
								<Link
									to={`/bike/${bike._id}`}
									className="rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
								>
									View Detail
								</Link>
							</Card>
						);
					})
				) : (
					<div className="my-10 mx-[600px]">
						<Spinner
							aria-label="Center-aligned spinner example"
							color="purple"
							size="xl"
						/>
					</div>
				)}
			</div>
		</section>
	);
};

export default Featured;
