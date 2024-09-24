import { Timeline } from "flowbite-react";

const milestones = [
	{
		date: "March 2020",
		event: "We procured the 1st license in Bangladesh and decided to change the way Bike rentals worked in Bangladesh. With 5 motorcycles and a pocket full of confidence the journey started.",
	},
	{
		date: "August 2021",
		event: "It was not long before we shifted gears and included mopeds and scooters to our fleet, became the single largest fleet owner of Royal Enfield bikes and introduced the 150 - 220 motorcycle range in the mobility market.",
	},
	{
		date: "January 2023",
		event: "The concept of shared mobility picked up in Bangladesh and so did our brand. We moved from 3 places in Dhaka to 40+ location across Bangladesh. Launched guided tours and marked our presence in a new domain and rewrote the rules riding across Bangladesh.",
	},
	{
		date: "May 2024",
		event: "This year marks our 1st external funding. Angel investors invested in the primary and secondary investment rounds taking the company from a bootstrapped to a funded venture.",
	},
];

const HistorySection = () => {
	return (
		<div className="px-4 py-12">
			<h2 className="text-4xl text-center font-bold mb-6">
				Our <span className="text-blue-600">Journey</span>
			</h2>
			<Timeline>
				{milestones.map((milestone, index) => (
					<Timeline.Item key={index} className="mb-4">
						<Timeline.Point className="text-blue-500">
							{milestone.date}
						</Timeline.Point>
						<Timeline.Content>
							<p className="text-gray-700">{milestone.event}</p>
						</Timeline.Content>
					</Timeline.Item>
				))}
			</Timeline>
		</div>
	);
};
export default HistorySection;
