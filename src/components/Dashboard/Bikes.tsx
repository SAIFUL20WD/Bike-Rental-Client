import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import AddBikeModal from "./ManageBikes/AddBike";
import {
	useGetAllBikesQuery,
	useGetAllBrandsQuery,
	useGetAllModelsQuery,
} from "../../redux/features/bike/bikeApi";
import BikeTable from "./ManageBikes/BikeTable";
import { Toaster } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";

const BikeList = () => {
	const [isOpen, setOpen] = useState(false);
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
			<Toaster />

			<div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
				<div className="mb-1 w-full">
					<div className="mb-4">
						<h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
							All Bikes
						</h1>
					</div>
					<div className="flex">
						<TextInput
							id="seacrh"
							placeholder="Enter Bike Name"
							ref={searchRef}
							className="min-w-60 mr-3"
						/>
						<Button
							color="primary"
							onClick={() => setSearch(searchRef.current.value)}
						>
							Search
						</Button>

						<div className="flex w-full items-center sm:justify-end gap-5">
							<Button
								color="primary"
								onClick={() => setOpen(!isOpen)}
							>
								Filter
							</Button>
							<Button color="failure" onClick={handleClearFilter}>
								Clear Filter
							</Button>
							<AddBikeModal />
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col">
				<div className="overflow-x-auto">
					<div className="inline-block min-w-full align-middle">
						<div className="overflow-hidden shadow">
							{data?.data ? (
								<BikeTable data={data.data} />
							) : (
								<h3 className="text-3xl m-5">No Bike Found</h3>
							)}
						</div>
					</div>
				</div>
			</div>

			<Modal onClose={() => setOpen(false)} show={isOpen}>
				<Modal.Header className="lg:mt-96 max-md:mt-10 border-b border-gray-200 !p-6 dark:border-gray-700">
					<strong>Filter</strong>
				</Modal.Header>
				<Modal.Body>
					<section className="grid grid-cols-3 gap-5">
						<div className="col-span-1">
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
									onChange={() =>
										setAvailable("notAvailable")
									}
								/>
								<Label htmlFor="available">Not Available</Label>
							</div>
						</div>
						<div className="col-span-1">
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
						<div className="col-span-1">
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
					</section>
				</Modal.Body>
				<Modal.Footer>
					<Button color="primary" onClick={() => setOpen(false)}>
						Close
					</Button>
					<Button color="failure" onClick={handleClearFilter}>
						Clear Filter
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default BikeList;
