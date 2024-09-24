import { Button, Label, Textarea, TextInput } from "flowbite-react";
import contact from "../../assets/images/contact_us_alternative.png";
import { useFormik } from "formik";

const ContactUs = () => {
	const formik = useFormik({
		initialValues: { name: "", email: "", message: "" },
		onSubmit: (values) => {
			console.log(values);
		},
	});

	return (
		<section className="my-16">
			<h3 className="text-center text-3xl capitalize mb-5">
				Contact
				<span className="text-blue-600"> us</span>
			</h3>
			<div className="grid grid-cols-12 gap-10 shadow p-10">
				<div className="col-span-6 max-lg:col-span-12">
					<img src={contact} alt="contact" />
				</div>
				<form
					className="col-span-6 max-lg:col-span-12 flex max-w-md flex-col gap-4 mx-5"
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
						/>
					</div>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="message" value="Message" />
						</div>
						<Textarea
							id="message"
							placeholder="Your Message..."
							required
							rows={4}
							onChange={formik.handleChange}
						/>
					</div>
					<Button type="submit" color="blue">
						Submit
					</Button>
				</form>
			</div>
		</section>
	);
};

export default ContactUs;
