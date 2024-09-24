import {
	Button,
	Card,
	Checkbox,
	Label,
	Spinner,
	TextInput,
} from "flowbite-react";
import {
	useGetAllBikesQuery,
	useGetAllBrandsQuery,
	useGetAllModelsQuery,
} from "../redux/features/bike/bikeApi";
import { TBike } from "../types";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useAppDispatch } from "../redux/hooks";
import { addToCompare } from "../redux/features/bike/bikeSlice";
import { Toaster } from "react-hot-toast";

const AllBikesPage = () => {
	const dispatch = useAppDispatch();
	const searchRef = useRef<HTMLInputElement>(null);
	const [query, setQuery] = useState("");

	const [search, setSearch] = useState("");
	const [available, setAvailable] = useState<string>("");
	const [brands, setbrands] = useState<string[]>([]);
	const [models, setModels] = useState<string[]>([]);

	const { data, refetch } = useGetAllBikesQuery(query, {
		pollingInterval: 30000,
	});

	const { data: brandsData } = useGetAllBrandsQuery(undefined);
	const { data: modelsData } = useGetAllModelsQuery(undefined);

	const handleBrandChange = (e, brand: string) => {
		const duplicate = brands.find((ele) => ele === brand);
		if (duplicate) {
			const newBrands = brands.filter((ele) => ele !== brand);
			setbrands(newBrands);
		} else {
			setbrands([...brands, brand]);
		}
	};

	const handleModelChange = (e, mdl: string) => {
		const duplicate = models.find((model) => model === mdl);
		if (duplicate) {
			const newModels = models.filter((ele) => ele !== mdl);
			setModels(newModels);
		} else {
			setModels([...models, mdl]);
		}
	};

	const handleClearFilter = () => {
		setSearch("");
		setAvailable("");
		setbrands([]);
		setModels([]);
		const checkInputs = document.querySelectorAll('input[type="checkbox"]');
		checkInputs.forEach((input) => {
			input.checked = false;
		});
	};

	const handleAddToCompare = (bike: TBike) => {
		dispatch(addToCompare(bike));
	};

	useEffect(() => {
		const brandList = brands?.join(",");
		const modelList = models?.join(",");
		const customQuery = `name=${search}&brands=${brandList}&models=${modelList}&availabilty=${available}`;
		setQuery(customQuery);
		if (query) {
			refetch();
		}
	}, [search, brands, models, available, refetch, query]);

	return (
		<>
			<div className="my-5 relative">
				<TextInput
					id="seacrh"
					placeholder="Enter Bike Name"
					ref={searchRef}
					className="max-w-80"
				/>
				<FaSearch
					className="absolute top-3 left-72 cursor-pointer text-xl"
					onClick={() => setSearch(searchRef.current.value)}
				/>
			</div>
			<Toaster />
			<section className="flex my-10">
				<aside className="w-80 border-r-2 border-gray-200 bg-gray-50 p-5 mr-10 dark:bg-gray-800">
					<div className="flex justify-between">
						<h3 className="text-xl font-bold p-2">Filters</h3>
						<Button color="failure" onClick={handleClearFilter}>
							Clear Filter
						</Button>
					</div>
					<div className="my-3">
						<h4 className="text-xl font-semibold p-3 border-b">
							Availability
						</h4>
						<div className="flex items-center gap-2 my-2">
							<Checkbox
								id="available"
								onChange={() => setAvailable("available")}
							/>
							<Label htmlFor="available">Available</Label>
						</div>
						<div className="flex items-center gap-2 my-2">
							<Checkbox
								id="available"
								onChange={() => setAvailable("notAvailable")}
							/>
							<Label htmlFor="available">Not Available</Label>
						</div>
					</div>
					<div className="my-3">
						<h4 className="text-xl font-semibold p-3 border-b">
							Brands
						</h4>
						{brandsData?.data?.map((item: string) => {
							return (
								<div
									className="flex items-center gap-2 my-2"
									key={item}
								>
									<Checkbox
										id={item}
										onChange={(e) =>
											handleBrandChange(e, item)
										}
									/>
									<Label htmlFor={item}>{item}</Label>
								</div>
							);
						})}
					</div>
					<div className="my-3">
						<h4 className="text-xl font-semibold p-3 border-b">
							Models
						</h4>
						<div className="flex items-center gap-2"></div>
						{modelsData?.data?.map((item: string) => {
							return (
								<div
									className="flex items-center gap-2 my-2"
									key={item}
								>
									<Checkbox
										id={item}
										onChange={(e) =>
											handleModelChange(e, item)
										}
									/>
									<Label htmlFor={item}>{item}</Label>
								</div>
							);
						})}
					</div>
				</aside>

				<div className="grid grid-cols-12 gap-5">
					{data?.data ? (
						data.data.map((bike: TBike) => {
							return (
								<Card
									key={bike._id}
									className="max-w-sm max-h-[500px] col-span-4 max-sm:col-span-12 max-lg:col-span-6 my-2 hover:scale-105 duration-300 mr-5"
									imgAlt={bike.name}
									imgSrc={bike.image}
								>
									<h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
										{bike.name}
									</h5>
									<div className="flex items-center justify-between">
										<span className="rounded bg-teal-200 px-2.5 py-0.5 text-xs font-semibold text-teal-500 dark:bg-blue-500 dark:text-white">
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
									<Button
										color="purple"
										onClick={() => handleAddToCompare(bike)}
									>
										Add To Comapre
									</Button>
								</Card>
							);
						})
					) : (
						<div className="flex flex-wrap gap-2">
							<Spinner
								aria-label="Center-aligned spinner example"
								color="purple"
								size="xl"
							/>
						</div>
					)}
				</div>
			</section>
		</>
	);
};

export default AllBikesPage;
