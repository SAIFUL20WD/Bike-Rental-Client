import { Button, Label, Modal, Textarea, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import { useState } from "react";
import { HiUpload } from "react-icons/hi";
import * as Yup from "yup";
import imageUploader from "../../../utils/imageUploder";
import toast from "react-hot-toast";
import { useUpdateBikeMutation } from "../../../redux/features/bike/bikeApi";
import { TBike } from "../../../types";
import { HiOutlinePencilAlt } from "react-icons/hi";

type TEditBikeProps = {
	data: TBike;
};

const EditBikeModal = ({ data }: TEditBikeProps) => {
	const [isOpen, setOpen] = useState(false);
	const [fileName, setFileName] = useState("");

	const [updateBike] = useUpdateBikeMutation();

	const formik = useFormik({
		initialValues: {
			name: data.name,
			model: data.model,
			brand: data.brand,
			year: data.year,
			pricePerHour: data.pricePerHour,
			cc: data.cc,
			description: data.description,
			image: data.image,
		},
		enableReinitialize: true,
		validationSchema: Yup.object({
			name: Yup.string().required("Required"),
			model: Yup.string().required("Required"),
			brand: Yup.string().required("Required"),
			year: Yup.number().required("Required"),
			pricePerHour: Yup.number().required("Required"),
			cc: Yup.number().required("Required"),
			description: Yup.string().required("Required"),
			image: Yup.string().required("Required"),
		}),
		onSubmit: async (values) => {
			setOpen(false);
			const updatedBikeData = { ...values, id: data._id };
			const toastId = toast("Processing...");
			try {
				const res = await updateBike(updatedBikeData);
				if (!res.error) {
					toast.success(res.data.message, {
						id: toastId,
						duration: 2000,
					});
				} else {
					toast.error(res.error.data.message, {
						id: toastId,
						duration: 2000,
					});
				}
			} catch (err) {
				toast.error("Something went wrong!", {
					id: toastId,
					duration: 2000,
				});
			}
		},
	});

	const handleImageUpload = async (e) => {
		const toastId = toast.loading("Uploading");
		try {
			const res = await imageUploader(e);
			if (res.success) {
				formik.setFieldValue("image", res.data.url);
				toast.success("Image uploaded!", {
					id: toastId,
					duration: 2000,
				});
				setFileName(e.target.files[0].name);
			} else {
				toast.error("Image upload failed!", {
					id: toastId,
					duration: 2000,
				});
			}
		} catch (err) {
			toast.error("Something went wrong!", {
				id: toastId,
				duration: 2000,
			});
		}
	};

	return (
		<>
			<Button color="primary" onClick={() => setOpen(!isOpen)}>
				<div className="flex items-center gap-x-2">
					<HiOutlinePencilAlt className="text-lg" />
					Edit
				</div>
			</Button>
			<Modal onClose={() => setOpen(false)} show={isOpen}>
				<form onSubmit={formik.handleSubmit}>
					<Modal.Header className="mt-48 border-b border-gray-200 !p-6 dark:border-gray-700">
						<strong>Edit Bike</strong>
					</Modal.Header>
					<Modal.Body>
						<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
							<div>
								<Label htmlFor="name">Name</Label>
								<TextInput
									id="name"
									name="name"
									defaultValue={data.name}
									className="mt-1"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									helperText={
										formik.touched.name &&
										formik.errors.name ? (
											<span className="text-red-500">
												{formik.errors.name}
											</span>
										) : null
									}
								/>
							</div>
							<div>
								<Label htmlFor="model">Model</Label>
								<TextInput
									id="model"
									name="model"
									defaultValue={data.model}
									className="mt-1"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									helperText={
										formik.touched.model &&
										formik.errors.model ? (
											<span className="text-red-500">
												{formik.errors.model}
											</span>
										) : null
									}
								/>
							</div>
							<div>
								<Label htmlFor="brand">Brand</Label>
								<TextInput
									id="brand"
									name="brand"
									defaultValue={data.brand}
									className="mt-1"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									helperText={
										formik.touched.brand &&
										formik.errors.brand ? (
											<span className="text-red-500">
												{formik.errors.brand}
											</span>
										) : null
									}
								/>
							</div>
							<div>
								<Label htmlFor="year">Year</Label>
								<TextInput
									id="year"
									name="year"
									type="number"
									defaultValue={data.year}
									className="mt-1"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									helperText={
										formik.touched.year &&
										formik.errors.year ? (
											<span className="text-red-500">
												{formik.errors.year}
											</span>
										) : null
									}
								/>
							</div>
							<div>
								<Label htmlFor="pricePerHour">
									Price Per Hour
								</Label>
								<TextInput
									id="pricePerHour"
									name="pricePerHour"
									type="number"
									defaultValue={data.pricePerHour}
									className="mt-1"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									helperText={
										formik.touched.pricePerHour &&
										formik.errors.pricePerHour ? (
											<span className="text-red-500">
												{formik.errors.pricePerHour}
											</span>
										) : null
									}
								/>
							</div>
							<div>
								<Label htmlFor="cc">CC</Label>
								<TextInput
									id="cc"
									name="cc"
									type="number"
									defaultValue={data.cc}
									className="mt-1"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									helperText={
										formik.touched.cc &&
										formik.errors.cc ? (
											<span className="text-red-500">
												{formik.errors.cc}
											</span>
										) : null
									}
								/>
							</div>
							<div className="lg:col-span-2">
								<Label htmlFor="description">
									Bike Description
								</Label>
								<Textarea
									id="description"
									name="description"
									defaultValue={data.description}
									rows={6}
									className="mt-1"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									helperText={
										formik.touched.description &&
										formik.errors.description ? (
											<span className="text-red-500">
												{formik.errors.description}
											</span>
										) : null
									}
								/>
							</div>

							<div className="space-x-5">
								<img
									alt={data.name}
									src={data.image}
									className="h-24"
								/>
							</div>

							<div className="lg:col-span-2">
								<div className="flex w-full items-center justify-center">
									<label className="flex h-32 w-full cursor-pointer flex-col rounded border-2 border-dashed border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-700">
										{fileName ? (
											<div className="flex flex-col items-center justify-center pt-5 pb-6">
												<p className="py-1 text-sm text-gray-600 dark:text-gray-500">
													{fileName}
												</p>
											</div>
										) : (
											<div className="flex flex-col items-center justify-center pt-5 pb-6">
												<HiUpload className="text-4xl text-gray-300" />
												<p className="py-1 text-sm text-gray-600 dark:text-gray-500">
													Upload a file
												</p>
												<p className="text-xs text-gray-500 dark:text-gray-400">
													PNG, JPG, WEBP up to 10MB
												</p>
											</div>
										)}

										<input
											type="file"
											className="hidden"
											accept=".png, .jpg, .jpeg, .webp"
											onChange={handleImageUpload}
										/>
										<span>
											{formik.errors.image ? (
												<span className="text-red-500">
													{formik.errors.image}
												</span>
											) : null}
										</span>
									</label>
								</div>
							</div>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button color="primary" type="submit">
							Update Bike
						</Button>
					</Modal.Footer>
				</form>
			</Modal>
		</>
	);
};

export default EditBikeModal;
