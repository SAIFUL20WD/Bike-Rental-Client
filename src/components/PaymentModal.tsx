import {
	Button,
	CustomFlowbiteTheme,
	Datepicker,
	Flowbite,
	Modal,
} from "flowbite-react";
import { dateFormatter } from "../utils/dateFormatter";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCreateBookingMutation } from "../redux/features/booking/booking.api";
import toast from "react-hot-toast";

const customTheme: CustomFlowbiteTheme = {
	datepicker: {
		popup: {
			footer: {
				button: {
					base: "w-full rounded-lg px-5 py-2 text-center text-sm font-medium focus:ring-4 focus:ring-primary-300",
					today: "bg-primary-700 text-white hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700",
					clear: "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
				},
			},
		},
		views: {
			days: {
				items: {
					item: {
						selected:
							"bg-primary-700 text-white hover:bg-primary-600",
					},
				},
			},
			months: {
				items: {
					item: {
						selected:
							"bg-primary-700 text-white hover:bg-primary-600",
					},
				},
			},
			years: {
				items: {
					item: {
						selected:
							"bg-primary-700 text-white hover:bg-primary-600",
					},
				},
			},
			decades: {
				items: {
					item: {
						selected:
							"bg-primary-700 text-white hover:bg-primary-600",
					},
				},
			},
		},
	},
};

type TPaymentModalProps = {
	openModal: boolean;
	setOpenModal: (state: boolean) => void;
	name: string;
	id: string;
};

type TFormikValue = {
	startDate: Date;
	startTime: string;
};

const PaymentModal = ({
	openModal,
	setOpenModal,
	name,
	id,
}: TPaymentModalProps) => {
	const date = dateFormatter(new Date());
	const [hour, minute] = new Date().toTimeString().split(" ")[0].split(":");

	const [createBooking] = useCreateBookingMutation();

	const handleDateChange = (date: Date) => {
		formik.setFieldValue("startDate", date);
	};

	const formik = useFormik({
		initialValues: {
			startDate: new Date(),
			startTime: `${hour}:${minute}`,
		},
		validationSchema: Yup.object({
			startDate: Yup.date().required("Required"),
			startTime: Yup.string().required("Required"),
		}),
		onSubmit: async (values: TFormikValue) => {
			const startDate = values.startDate;
			const startTime = values.startTime;

			const year = startDate.getFullYear();
			const month = String(startDate.getMonth() + 1).padStart(2, "0");
			const day = String(startDate.getDate()).padStart(2, "0");

			const [hours, minutes] = startTime.split(":");

			const isoString = `${year}-${month}-${day}T${hours}:${minutes}:00.000Z`;

			try {
				toast.loading("Please wait...", { duration: 2000 });
				const res = await createBooking({
					bikeId: id,
					startTime: isoString,
				}).unwrap();
				if (res.success) {
					// console.log(res);
					window.location.href = res.data.payment_url;
				} else {
					toast.error(res.message);
				}
			} catch (err) {
				toast.error("Something went wrong!");
			}
		},
	});

	return (
		<>
			<Modal
				show={openModal}
				size="md"
				onClose={() => setOpenModal(false)}
				popup
			>
				<Modal.Header />
				<Modal.Body>
					<Flowbite theme={{ theme: customTheme }}>
						<div className="space-y-6">
							<form onSubmit={formik.handleSubmit}>
								<h3 className="text-xl text-center font-medium border-b pb-3 text-gray-900 dark:text-white">
									Booking
								</h3>
								<div className="my-3">
									<label
										htmlFor="startDate"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Start Date:
									</label>
									<Datepicker
										minDate={
											new Date(
												date.year,
												date.month,
												date.day
											)
										}
										id="startDate"
										name="startDate"
										onSelectedDateChanged={handleDateChange}
									/>
									{/* {formik.errors.startDate ? (
										<span className="text-red-500">
											{formik.errors.startDate}
										</span>
									) : null} */}
								</div>
								<div>
									<small className="flex justify-center text-blue-500">
										Click on the clock icon to select time
									</small>
									<label
										htmlFor="startTime"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Start Time:
									</label>
									<div className="relative">
										<div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
											<svg
												className="w-5 h-5 text-gray-500 dark:text-gray-400"
												aria-hidden="true"
												xmlns="http://www.w3.org/2000/svg"
												fill="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													fillRule="evenodd"
													d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
													clipRule="evenodd"
												/>
											</svg>
										</div>
										<input
											type="time"
											id="startTime"
											name="startTime"
											className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											defaultValue={`${hour}:${minute}`}
											required
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
										/>
									</div>
									{/* {formik.errors.startTime ? (
										<span className="text-red-500">
											{formik.errors.startTime}
										</span>
									) : null} */}
								</div>
								<div className="pb-5 border-b border-zinc-200">
									<h2 className="text-3xl font-semibold my-3">
										{name}
									</h2>
									<p className="text-2xl font-bold">
										Advance Payment:{" "}
										<span className="text-primary-500">
											$100
										</span>
									</p>
								</div>
								<Button
									color="blue"
									className="w-full"
									type="submit"
								>
									Pay
								</Button>
							</form>
						</div>
					</Flowbite>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default PaymentModal;
