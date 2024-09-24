import { Button } from "flowbite-react";
import notFound from "../assets/images/not-found.png";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
	return (
		<section className="max-w-5xl mx-auto my-10">
			<h3 className="capitalize text-3xl text-center my-3 dark:text-white">
				The page you are looking for does not{" "}
				<span className="text-blue-600">exist!</span>
			</h3>
			<Link to="/" className="flex justify-center">
				<Button color="blue">Go Home</Button>
			</Link>
			<div>
				<img src={notFound} alt="" />
			</div>
		</section>
	);
};

export default NotFoundPage;
