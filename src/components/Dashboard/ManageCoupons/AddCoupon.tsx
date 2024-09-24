import { Button, Datepicker, Label, Modal, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useAddCouponMutation } from "../../../redux/features/Coupon/couponApi";

const AddCouponModal = () => {
	const [isOpen, setOpen] = useState(false);
	const [addCoupon] = useAddCouponMutation();

	const handleDateChange = (date: Date, value: string) => {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		const isoString = `${year}-${month}-${day}T00:00:00.000Z`;

		formik.setFieldValue(value, isoString);
	};

	const formik = useFormik({
		initialValues: {
			name: "",
			code: "",
			discountType: "percentage",
			discountValue: "",
			startDate: "",
			endDate: "",
			usageLimit: "",
		},
		validationSchema: Yup.object({
			name: Yup.string().required("Required"),
			code: Yup.string().required("Required"),
			discountType: Yup.string().required("Required"),
			discountValue: Yup.number().required("Required"),
			startDate: Yup.string().required("Required"),
			endDate: Yup.string().required("Required"),
			usageLimit: Yup.number().required("Required"),
		}),
		onSubmit: async (values) => {
			setOpen(false);
			const toastId = toast("Processing...");
			try {
				const res = await addCoupon(values);
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

	return (
		<>
			<Button color="primary" onClick={() => setOpen(!isOpen)}>
				<div className="flex items-center gap-x-2">
					<FaPlus className="" />
					Add Coupon
				</div>
			</Button>
			<Modal onClose={() => setOpen(false)} show={isOpen}>
				<form onSubmit={formik.handleSubmit}>
					<Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
						<strong>Add Coupon</strong>
					</Modal.Header>
					<Modal.Body>
						<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
							<div className="mt-1">
								<Label htmlFor="discountType">
									Discount Type
								</Label>
								<select
									id="discountType"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								>
									<option value="percentage">
										Percentage
									</option>
									<option value="fixed">Fixed</option>
								</select>

								{formik.touched.discountType &&
								formik.errors.discountType ? (
									<span className="text-red-500">
										{formik.errors.discountType}
									</span>
								) : null}
							</div>
							<div>
								<Label htmlFor="discountValue">
									Discount Value
								</Label>
								<TextInput
									type="number"
									id="discountValue"
									name="discountValue"
									placeholder="Discount Value"
									className="mt-1"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									helperText={
										formik.touched.discountValue &&
										formik.errors.discountValue ? (
											<span className="text-red-500">
												{formik.errors.discountValue}
											</span>
										) : null
									}
								/>
							</div>
							<div>
								<Label htmlFor="startDate">Start Date</Label>
								<Datepicker
									id="startDate"
									name="startDate"
									onSelectedDateChanged={(date) =>
										handleDateChange(date, "startDate")
									}
								/>
								{formik.touched.startDate &&
								formik.errors.startDate ? (
									<span className="text-red-500">
										{formik.errors.startDate}
									</span>
								) : null}
							</div>
							<div>
								<Label htmlFor="endDate">End Date</Label>
								<Datepicker
									id="endDate"
									name="endDate"
									onSelectedDateChanged={(date) =>
										handleDateChange(date, "endDate")
									}
								/>
								{formik.touched.endDate &&
								formik.errors.endDate ? (
									<span className="text-red-500">
										{formik.errors.endDate}
									</span>
								) : null}
							</div>
							<div>
								<Label htmlFor="name">Name</Label>
								<TextInput
									id="name"
									name="name"
									placeholder="Coupon Name"
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
								<Label htmlFor="code">Code</Label>
								<TextInput
									id="code"
									name="code"
									placeholder="Coupon Code"
									className="mt-1"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									helperText={
										formik.touched.code &&
										formik.errors.code ? (
											<span className="text-red-500">
												{formik.errors.code}
											</span>
										) : null
									}
								/>
							</div>
							<div>
								<Label htmlFor="usageLimit">Usage Limit</Label>
								<TextInput
									id="usageLimit"
									name="usageLimit"
									type="number"
									placeholder="10"
									className="mt-1"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									helperText={
										formik.touched.usageLimit &&
										formik.errors.usageLimit ? (
											<span className="text-red-500">
												{formik.errors.usageLimit}
											</span>
										) : null
									}
								/>
							</div>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button color="primary" type="submit">
							Add Coupon
						</Button>
					</Modal.Footer>
				</form>
			</Modal>
		</>
	);
};

export default AddCouponModal;
