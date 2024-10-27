import { Link, useParams } from "react-router-dom";
import { useGetBikeByIdQuery } from "../redux/features/bike/bikeApi";
import { useState } from "react";
import PaymentModal from "../components/PaymentModal";
import { Button, Spinner } from "flowbite-react";

const BikeDetailPage = () => {
	const token = localStorage.getItem("token");
	const [openModal, setOpenModal] = useState(false);
	const { id } = useParams();

	const { data } = useGetBikeByIdQuery(id);

	if (data) {
		const {
			_id,
			image,
			name,
			brand,
			model,
			year,
			pricePerHour,
			cc,
			isAvailable,
			description,
		} = data.data;

		return (
			<section className="max-w-5xl mx-auto my-10 shadow p-10">
				<div className="grid grid-cols-2 max-md:grid-cols-1">
					<div className="col-span-1 max-md:mx-5 lg:mr-5">
						<img src={image} alt="bike image" className="rounded" />
					</div>
					<div className="col-span-1 max-md:mx-5">
						<div className="pb-5 border-b border-zinc-200">
							<h3 className="text-lg font-bold">{brand}</h3>
							<h2 className="text-3xl font-semibold my-3">
								{name}
							</h2>
							<p className="text-3xl text-[#6b68e7] font-bold">
								${pricePerHour}/hour
							</p>
						</div>
						<div className="py-5 border-b border-zinc-200">
							<p>
								Availability:{" "}
								{isAvailable ? (
									<span className="text-orange-500">
										Available
									</span>
								) : (
									<span className="text-red-500">
										Not Available
									</span>
								)}
							</p>
							<p>Model: {model} </p>
						</div>
						<div className="my-5">
							<p>CC: {cc}</p>
							<p>Year: {year}</p>
						</div>

						{token ? (
							<button
								className={`uppercase flex w-full justify-center rounded p-3 font-medium hover:bg-opacity-90 ${
									isAvailable
										? "bg-blue-700 text-white"
										: "bg-slate-200 cursor-not-allowed"
								}`}
								onClick={() => setOpenModal(true)}
								disabled={!isAvailable}
							>
								Book Now
							</button>
						) : (
							<Link to="/sign-in">
								<Button
									color="warning"
									className="uppercase text-white flex w-full justify-center rounded p-3 font-medium bg-yellow-400"
								>
									Please Login To Book This Bike
								</Button>
							</Link>
						)}
					</div>
				</div>
				<div className="bg-slate-100 py-5 px-10 my-10">
					<h4 className="text-2xl my-1">Description</h4>
					<p>{description}</p>
				</div>

				<PaymentModal
					openModal={openModal}
					setOpenModal={setOpenModal}
					name={name}
					id={_id}
				/>
			</section>
		);
	} else {
		return (
			<div className="flex flex-wrap justify-center gap-2 my-10">
				<Spinner
					aria-label="Center-aligned spinner example"
					color="purple"
					size="xl"
				/>
			</div>
		);
	}
};

export default BikeDetailPage;
