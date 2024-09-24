import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useApplyCouponMutation } from "../../../redux/features/Coupon/couponApi";

type TCouponModalProps = {
	id: string;
};

const CouponModal = ({ id }: TCouponModalProps) => {
	const [isOpen, setOpen] = useState(false);
	const [applyCoupon] = useApplyCouponMutation();

	const formik = useFormik({
		initialValues: {
			couponCode: "",
		},
		validationSchema: Yup.object({
			couponCode: Yup.string().required("Required"),
		}),
		onSubmit: async (values) => {
			const toastId = toast("Processing...");
			try {
				const data = { couponCode: values.couponCode, id: id };
				const res = await applyCoupon(data);
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
			setOpen(false);
		},
	});

	return (
		<>
			<Button color="success" onClick={() => setOpen(!isOpen)} size="sm">
				<div className="flex items-center gap-x-2">Use Coupon</div>
			</Button>
			<Modal onClose={() => setOpen(false)} show={isOpen} size="sm">
				<form onSubmit={formik.handleSubmit}>
					<Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
						<strong>Use Coupon</strong>
					</Modal.Header>
					<Modal.Body>
						<div className="grid grid-cols-1 gap-6 lg:grid-cols-1">
							<div>
								<Label htmlFor="couponCode">Coupon Code</Label>
								<TextInput
									id="couponCode"
									name="couponCode"
									placeholder="Coupon Code"
									className="mt-1"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									helperText={
										formik.touched.couponCode &&
										formik.errors.couponCode ? (
											<span className="text-red-500">
												{formik.errors.couponCode}
											</span>
										) : null
									}
								/>
							</div>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button color="primary" type="submit">
							Use Coupon
						</Button>
					</Modal.Footer>
				</form>
			</Modal>
		</>
	);
};

export default CouponModal;
