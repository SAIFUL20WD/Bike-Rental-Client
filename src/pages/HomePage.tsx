import ContactUs from "../components/Home/ContactUs";
import CouponDiscount from "../components/Home/CouponDiscount";
import Featured from "../components/Home/Featured";
import Hero from "../components/Home/Hero";
import Testimonials from "../components/Home/Testimonials";
import WhyChooseUs from "../components/Home/WhyChooseUs";

const HomePage = () => {
	return (
		<>
			<Hero />
			<Featured />
			<Testimonials />
			<WhyChooseUs />
			<CouponDiscount />
			<ContactUs />
		</>
	);
};

export default HomePage;
