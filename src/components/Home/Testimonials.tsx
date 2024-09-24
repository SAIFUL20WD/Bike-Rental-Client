// @ts-expect-error splide
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useEffect, useState } from "react";

const testimonialsData = [
	{
		name: "Shourab Ahmed",
		quote: "It was an amazing experience renting a bike from these guys. Prices are affordable, Bike condition was good. Store Managers are very helpful.",
	},
	{
		name: "Joy Das",
		quote: "Price are too low from other bike rental agencies and they have branches all over Bangladesh. Best service and bikes are in excellent condition.",
	},
	{
		name: "Towhid Rasel",
		quote: "It is a very good Bike rental agency. The rates are reasonable. The vehicle are serviced before they are provided to you. In case of some problems.",
	},
	{
		name: "Tarek Rahman",
		quote: "I'm renting a bike for past 3 months, one of the finest bike rentals in BD. Store Managers are very helpful. The vehicle are serviced before they are provided to you.",
	},
	{
		name: "Sujata Mim",
		quote: "Easy bike rental services with least troubles. Friendly staff at job who are always ready to help you with the best they can. All the best guys!",
	},
];

const Testimonials = () => {
	const [isMobile, setIsMobile] = useState(false);

	const handleResize = () => {
		if (window.innerWidth < 800) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	};

	useEffect(() => {
		window.addEventListener("resize", handleResize);
	});

	return (
		<section className="my-16">
			<h3 className="text-center text-3xl capitalize mb-5">
				What our users have to
				<span className="text-blue-600"> say</span>
			</h3>
			<Splide
				aria-label="My Favorite Images"
				options={{
					type: "loop",
					perPage: isMobile ? 1 : 3,
					perMove: 1,
				}}
			>
				{testimonialsData.map((testimonial, idx) => {
					return (
						<SplideSlide key={idx}>
							<div className="shadow-xl p-10 m-3 border">
								<h5 className="text-center my-3 text-blue-600">
									{testimonial.name}
								</h5>
								<blockquote>{testimonial.quote}</blockquote>
							</div>
						</SplideSlide>
					);
				})}
			</Splide>
		</section>
	);
};

export default Testimonials;
