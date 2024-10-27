import { Button, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import signupImg from "../assets/images/sign-up.jpg";
import toast, { Toaster } from "react-hot-toast";
import { useRegisterMutation } from "../redux/features/auth/authApi";

const SignUpPage = () => {
	const [register] = useRegisterMutation();

	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			password: "",
			phone: "",
			address: "",
		},
		validationSchema: Yup.object({
			name: Yup.string().required("Required"),
			email: Yup.string()
				.email("Invalid email address")
				.required("Required"),
			password: Yup.string()
				.min(8, "Minimum 8 characters or more")
				.max(32, "Maximum 32 characters allowed")
				.required("Required"),
			phone: Yup.string()
				.min(1, "Minimum 1 characters or more")
				.max(15, "Maximum 15 characters allowed")
				.required("Required"),
			address: Yup.string()
				.max(200, "Maximum 200 characters allowed")
				.required("Required"),
		}),
		onSubmit: async (values) => {
			const toastId = toast("Processing...");
			try {
				const res = await register(values);
				if (!res.error) {
					toast.success(res.data.message, {
						id: toastId,
						duration: 2000,
					});
					navigate("/sign-in");
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
		<section className="max-w-5xl mx-auto my-16 py-10">
			<Toaster />
			<h5 className="text-center text-3xl text-blue-600 capitalize mb-5">
				Sign up
			</h5>

			<div className="grid grid-cols-12 gap-10 shadow p-10">
				<div className="col-span-6 max-lg:col-span-12">
					<h3 className="text-2xl text-center text-blue-600 font-semibold uppercase">
						Hello! Welcome
					</h3>
					<img src={signupImg} alt="sign-up-illustration" />
					<Link to="/" className="flex justify-center">
						<Button color="blue">Go Home</Button>
					</Link>
				</div>

				<form
					className="col-span-6 self-center max-lg:col-span-12 flex max-w-md flex-col gap-4 mx-5"
					onSubmit={formik.handleSubmit}
				>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="name" value="Name" />
						</div>
						<TextInput
							id="name"
							type="text"
							placeholder="Your Name"
							required
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							helperText={
								formik.touched.name && formik.errors.name ? (
									<span className="text-red-500">
										{formik.errors.name}
									</span>
								) : null
							}
						/>
					</div>

					<div>
						<div className="mb-2 block">
							<Label htmlFor="email" value="Email" />
						</div>
						<TextInput
							id="email"
							type="email"
							placeholder="Your Email"
							required
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							helperText={
								formik.touched.email && formik.errors.email ? (
									<span className="text-red-500">
										{formik.errors.email}
									</span>
								) : null
							}
						/>
					</div>

					<div>
						<div className="mb-2 block">
							<Label htmlFor="password" value="Password" />
						</div>
						<TextInput
							id="password"
							type="password"
							placeholder="Your Password"
							required
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							helperText={
								formik.touched.password &&
								formik.errors.password ? (
									<span className="text-red-500">
										{formik.errors.password}
									</span>
								) : null
							}
						/>
					</div>

					<div>
						<div className="mb-2 block">
							<Label htmlFor="phone" value="Phone" />
						</div>
						<TextInput
							id="phone"
							type="text"
							placeholder="Your Phone"
							required
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							helperText={
								formik.touched.phone && formik.errors.phone ? (
									<span className="text-red-500">
										{formik.errors.phone}
									</span>
								) : null
							}
						/>
					</div>

					<div>
						<div className="mb-2 block">
							<Label htmlFor="address" value="Address" />
						</div>
						<TextInput
							id="address"
							type="text"
							placeholder="Your Address"
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
						Sign Up
					</Button>

					<p>
						Already have an account?{" "}
						<Link
							to="/sign-in"
							className="cursor-pointer underline"
						>
							Sign In Now
						</Link>
					</p>
				</form>
			</div>
		</section>
	);
};

export default SignUpPage;
