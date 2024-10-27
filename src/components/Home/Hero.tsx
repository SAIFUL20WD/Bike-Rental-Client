import { Button } from "flowbite-react";
import banner from "../../assets/images/bike_banner.png";
import { Link } from "react-router-dom";

const Hero = () => {
	return (
		<section className="relative">
			<div className="ml-6 mr-4">
				<img
					src={banner}
					alt="banner"
					className="max-h-[500px] min-w-full rounded-lg"
				/>
			</div>
			<div className="lg:absolute top-32 left-20 lg:text-white max-lg:m-10">
				<h2 className="capitalize font-bold text-[40px]">
					Unlock your next ride <br /> with bikeGo{" "}
					<span className="text-blue-600 capitalize">easily</span>
				</h2>
				<p className="text-xl my-5">
					Whether bike type any ride you <br /> seek, we've got you
					covered. Start <br />
					your journey today.
				</p>
				<Link to="/all-bikes">
					<Button color="blue" className="px-8">
						Rent Now
					</Button>
				</Link>
			</div>
		</section>
	);
};

export default Hero;
