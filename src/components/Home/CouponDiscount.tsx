import { Card, Timeline } from "flowbite-react";
import Wheel from "./Wheel";
import { useGetAllCouponsQuery } from "../../redux/features/Coupon/couponApi";
import { TCoupon } from "../../types";

const steps = [
	{
		step: "Step 1",
		detail: "Select your bike and proceed to booking. Then book bike with advance payment",
	},
	{
		step: "Step 2",
		detail: "After returning the bike the admin will calculate the cost and you can go to dashboard.",
	},
	{
		step: "Step 3",
		detail: "Select my booking option and on unpaid tab you can click use coupon button to apply coupon",
	},
	{
		step: "Step 4",
		detail: "The discount will be reflected in your total amount.",
	},
];

const months = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

const CouponDiscount = () => {
	const { data } = useGetAllCouponsQuery(undefined);

	return (
		<section className="my-16">
			<h3 className="text-center text-3xl capitalize my-8">
				Coupons &<span className="text-blue-600"> Discounts</span>
			</h3>
			<h2 className="text-2xl font-bold mb-4"></h2>
			<div className="grid grid-cols-12">
				{data?.data?.map((coupon: TCoupon) => (
					<Card
						key={coupon.code}
						className="col-span-3 shadow-md max-sm:col-span-12 max-lg:col-span-6 mx-5 my-3"
					>
						<h3 className="text-lg font-semibold">{coupon.name}</h3>
						<p className="text-gray-600">
							Use code:{" "}
							<strong className="text-blue-600">
								{coupon.code}
							</strong>
						</p>
						<p className="text-gray-500">
							<span>Valid Until </span>
							{
								months[
									new Date(
										coupon.endDate.substring(0, 10)
									).getMonth()
								]
							}
							<span>
								{" "}
								{new Date(
									coupon.endDate.substring(0, 10)
								).getDate() - 1}{" "}
							</span>
							{new Date(
								coupon.endDate.substring(0, 10)
							).getFullYear()}
						</p>
					</Card>
				))}
			</div>
			<div className="px-4 py-12">
				<h3 className="text-xl font-bold mb-6">
					How to Apply <span className="text-blue-600">Coupons</span>
				</h3>
				<Timeline>
					{steps.map((milestone, index) => (
						<Timeline.Item key={index} className="mb-4">
							<Timeline.Point className="text-blue-500">
								{milestone.step}
							</Timeline.Point>
							<Timeline.Content>
								<p className="text-gray-700">
									{milestone.detail}
								</p>
							</Timeline.Content>
						</Timeline.Item>
					))}
				</Timeline>
			</div>
			<Wheel />
		</section>
	);
};

export default CouponDiscount;
