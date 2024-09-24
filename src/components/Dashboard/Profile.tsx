import { Card, Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import {
	useGetProfileQuery,
	useUpdateProfileMutation,
} from "../../redux/features/user/userApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

const Profile = () => {
	const [openModal, setOpenModal] = useState(false);
	const { data } = useGetProfileQuery(undefined);
	const [updateProfile] = useUpdateProfileMutation();

	const formik = useFormik({
		initialValues: {
			name: data?.data?.name,
			phone: data?.data?.phone,
			address: data?.data?.address,
		},
		enableReinitialize: true,
		validationSchema: Yup.object({
			name: Yup.string().required("Required"),
			phone: Yup.string()
				.required("Required")
				.min(1, "Minimum 1 characters or more")
				.max(15, "Maximum 15 characters allowed"),
			address: Yup.string()
				.required("Required")
				.max(200, "Maximum 200 characters allowed"),
		}),
		onSubmit: async (values) => {
			const toastId = toast("Processing...");
			try {
				const res = await updateProfile(values);
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
				setOpenModal(false);
			} catch (err) {
				toast.error("Something went wrong!", {
					id: toastId,
					duration: 2000,
				});
			}
		},
	});

	if (data) {
		return (
			<div className="bg-white p-4 dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:flex lg:flex-col">
				<div className="my-5">
					<h4 className="max-w-xl mx-auto text-center text-3xl capitalize my-5 pb-3 border-b-2">
						User
						<span className="text-blue-600"> Information</span>
					</h4>
					<Card className="max-w-lg mx-auto">
						<div className="flex flex-col justify-start pb-5 text-xl text-gray-900 dark:text-white [&>p]:my-2">
							<p>Name: {data.data.name}</p>
							<p>Email: {data.data.email}</p>
							<p>Phone: {data.data.phone}</p>
							<p>Address: {data.data.address}</p>
						</div>
						<Button color="blue" onClick={() => setOpenModal(true)}>
							Update Profile
						</Button>
					</Card>

					<Modal
						show={openModal}
						size="md"
						popup
						onClose={() => setOpenModal(false)}
					>
						<Modal.Header />
						<Modal.Body>
							<div className="space-y-6">
								<form
									className="col-span-6 self-center max-lg:col-span-12 flex max-w-md flex-col gap-4 mx-5"
									onSubmit={formik.handleSubmit}
								>
									<div>
										<div className="mb-2 block">
											<Label
												htmlFor="name"
												value="Name"
											/>
										</div>
										<TextInput
											id="name"
											type="text"
											defaultValue={data.data.name}
											required
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
										<div className="mb-2 block">
											<Label
												htmlFor="phone"
												value="Phone"
											/>
										</div>
										<TextInput
											id="phone"
											type="text"
											defaultValue={data.data.phone}
											required
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											helperText={
												formik.touched.phone &&
												formik.errors.phone ? (
													<span className="text-red-500">
														{formik.errors.phone}
													</span>
												) : null
											}
										/>
									</div>

									<div>
										<div className="mb-2 block">
											<Label
												htmlFor="address"
												value="Address"
											/>
										</div>
										<TextInput
											id="address"
											type="text"
											defaultValue={data.data.address}
											required
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											helperText={
												formik.touched.address &&
												formik.errors.address ? (
													<span className="text-red-500">
														{formik.errors.address}
													</span>
												) : null
											}
										/>
									</div>

									<Button type="submit" color="blue">
										Update
									</Button>
								</form>
							</div>
						</Modal.Body>
					</Modal>
				</div>
			</div>
		);
	}
};

export default Profile;
