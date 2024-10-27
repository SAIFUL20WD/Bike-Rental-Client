import { Button, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import signinImg from "../assets/images/sign-in.png";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { verifyToken } from "../utils/verifyToken";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import toast, { Toaster } from "react-hot-toast";

const SignInPage = () => {
	const [login] = useLoginMutation();
	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: { email: "", password: "" },
		validationSchema: Yup.object({
			email: Yup.string()
				.email("Invalid email address")
				.required("Required"),
			password: Yup.string()
				.min(8, "Minimum 8 characters or more")
				.max(32, "Maximum 32 characters allowed")
				.required("Required"),
		}),
		onSubmit: async (values) => {
			const toastId = toast("Processing...");
			try {
				const res = await login(values);
				if (!res.error) {
					const user = verifyToken(res.data.token);
					dispatch(setUser({ user: user, token: res.data.token }));
					localStorage.setItem("token", res.data.token);

					toast.success(res.data.message, {
						id: toastId,
						duration: 2000,
					});
					navigate("/dashboard");
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

	const handleFillAdminCredential = () => {
		formik.setValues({
			email: "rasel@email.com",
			password: "Rasel123",
		});
	};

	const handleFillUserCredential = () => {
		formik.setValues({
			email: "tarek@email.com",
			password: "Tarek123",
		});
	};

	return (
		<section className="max-w-5xl mx-auto my-16 py-10">
			<Toaster />
			<h5 className="text-center text-3xl text-blue-600 capitalize mb-5">
				Sign in
			</h5>

			<div className="grid grid-cols-12 gap-10 shadow p-10">
				<div className="col-span-6 max-lg:col-span-12">
					<h3 className="text-2xl text-center text-blue-600 font-semibold uppercase">
						Good to see you again!
					</h3>
					<img src={signinImg} alt="sign-in-illustration" />
					<Link to="/" className="flex justify-center">
						<Button color="blue">Go Home</Button>
					</Link>
				</div>
				<form
					className="col-span-6 self-center max-lg:col-span-12 flex max-w-md flex-col gap-4 mx-5"
					onSubmit={formik.handleSubmit}
				>
					<p className="text-primary-600">
						Use Below Option To Use Demo Credential
					</p>
					<div className="flex gap-5">
						<Button
							color="blue"
							onClick={handleFillAdminCredential}
						>
							Fill Admin Credential
						</Button>
						<Button color="blue" onClick={handleFillUserCredential}>
							Fill User Credential
						</Button>
					</div>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="email" value="Email" />
						</div>
						<TextInput
							id="email"
							type="email"
							placeholder="Your Email"
							value={formik.values.email}
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
							value={formik.values.password}
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
					<Button type="submit" color="blue">
						Sign In
					</Button>
					<p>
						Don't have an account?{" "}
						<Link
							to="/sign-up"
							className="cursor-pointer underline"
						>
							Sign Up Now
						</Link>
					</p>
				</form>
			</div>
		</section>
	);
};

export default SignInPage;
