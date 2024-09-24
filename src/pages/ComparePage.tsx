import { Button } from "flowbite-react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { TBike } from "../types";
import { removeFromCompare } from "../redux/features/bike/bikeSlice";

const ComparePage = () => {
	const bike = useAppSelector((state) => state.bike.bike);
	const dispatch = useAppDispatch();

	const handleRemoveFromCompare = (id: string) => {
		dispatch(removeFromCompare(id));
	};
	console.log(bike);
	return (
		<section className="">
			<h3 className="text-center text-3xl">
				Bike <span className="text-blue-600">Comparison</span>
			</h3>
			<div className="flex justify-center my-10">
				{bike.length > 0 && (
					<div className="[&>p]:border [&>p]:p-5">
						<p>Name</p>
						<p>Price/hour</p>
						<p>Brand</p>
						<p>Model</p>
						<p>CC</p>
						<p>Year</p>
						<p className="h-20">Action</p>
					</div>
				)}

				{bike.length > 0 ? (
					bike.map((bike: TBike) => {
						return (
							<div className="[&>p]:border [&>p]:p-5">
								<p className="text-purple-500">{bike.name}</p>
								<p className="text-green-500">
									{bike.pricePerHour}
								</p>
								<p className="text-teal-500">{bike.brand}</p>
								<p className="text-pink-500">{bike.model}</p>
								<p className="text-blue-600">{bike.cc}</p>
								<p className="text-gray-700">{bike.year}</p>
								<p className="h-20">
									<Button
										color="failure"
										onClick={() =>
											handleRemoveFromCompare(bike._id)
										}
									>
										Remove
									</Button>
								</p>
							</div>
						);
					})
				) : (
					<h3 className="text-3xl col-span-12 text-center my-10">
						No bike in comparison
					</h3>
				)}
			</div>
		</section>
	);
};

export default ComparePage;
