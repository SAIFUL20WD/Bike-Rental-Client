import check from "../../assets/images/icons/correct.png";
import quality from "../../assets/images/icons/quality-service.png";
import price from "../../assets/images/icons/saving-money.png";
import support from "../../assets/images/icons/customer-service.png";

const chooseData = [
	{
		image: check,
		heading: "Easy booking",
		detail: "Reserve your vehicle in just a few clicks by using ike Go",
	},
	{
		image: quality,
		heading: "Quality choice",
		detail: "We offer a wide range of high-quality vehicles to your journey",
	},
	{
		image: price,
		heading: "Affordable prices",
		detail: "Our rental rate are highly competitive and affordable",
	},
	{
		image: support,
		heading: "24 hours support",
		detail: "Get support anytime when you have problem",
	},
];

const WhyChooseUs = () => {
	return (
		<section className="my-16 mx-5">
			<h4 className="text-center text-3xl capitalize">
				Why choose <span className="text-blue-600"> us</span>
			</h4>
			<p className="text-center text-lg text-zinc-700 my-2">
				We offer best experience with our rental deals
			</p>
			<div className="grid grid-cols-12 gap-5 mt-10">
				{chooseData.map((item, idx) => {
					return (
						<div
							key={idx}
							className="col-span-3 max-lg:col-span-6 max-sm:col-span-12 flex flex-col justify-center items-center p-10 shadow-md border max-lg:mx-5 hover:scale-105 duration-300"
						>
							<div className="w-20 mx-auto">
								<img src={item.image} alt="icon" />
							</div>
							<div>
								<h6 className="capitalize text-xl text-center mt-5 mb-2">
									{item.heading}
								</h6>
								<p className="text-sm text-center text-zinc-500">
									{item.detail}
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
};

export default WhyChooseUs;
