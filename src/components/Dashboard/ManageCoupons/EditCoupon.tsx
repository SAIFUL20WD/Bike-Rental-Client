import { Button, Datepicker, Label, Modal, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { TCoupon } from "../../../types";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useUpdateCouponMutation } from "../../../redux/features/Coupon/couponApi";

type TEditCouponProps = {
	data: TCoupon;
};

const EditCouponModal = ({ data }: TEditCouponProps) => {
	const [isOpen, setOpen] = useState(false);
	const [updateCoupon] = useUpdateCouponMutation();

	const handleDateChange = (date: Date, value: string) => {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		const isoString = `${year}-${month}-${day}T00:00:00.000Z`;

		formik.setFieldValue(value, isoString);
	};

	const formik = useFormik({
		initialValues: {
			name: data.name,
			code: data.code,
			discountType: data.discountType,
			discountValue: data.discountValue,
			startDate: data.startDate,
			endDate: data.endDate,
			usageLimit: data.usageLimit,
			usedCount: data.usedCount,
		},
		enableReinitialize: true,
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
			const updatedCouponData = { ...values, id: data._id };
			const toastId = toast("Processing...");
			try {
				const res = await updateCoupon(updatedCouponData);
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
					<HiOutlinePencilAlt className="text-lg" />
					Edit
				</div>
			</Button>
			<Modal onClose={() => setOpen(false)} show={isOpen}>
				<form onSubmit={formik.handleSubmit}>
					<Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
						<strong>Edit Coupon</strong>
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
									defaultValue={data.discountType}
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
									defaultValue={data.discountValue}
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
									defaultDate={
										new Date(
											data.startDate.substring(0, 10)
										)
									}
								/>
							</div>
							<div>
								<Label htmlFor="endDate">End Date</Label>
								<Datepicker
									id="endDate"
									name="endDate"
									onSelectedDateChanged={(date) =>
										handleDateChange(date, "endDate")
									}
									defaultDate={
										new Date(data.endDate.substring(0, 10))
									}
								/>
							</div>
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
								<Label htmlFor="code">Code</Label>
								<TextInput
									id="code"
									name="code"
									defaultValue={data.code}
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
									defaultValue={data.usageLimit}
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
							Update Coupon
						</Button>
					</Modal.Footer>
				</form>
			</Modal>
		</>
	);
};

export default EditCouponModal;
