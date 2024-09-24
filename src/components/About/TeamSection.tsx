import { Card } from "flowbite-react";
import team1 from "../../assets/images/team/team1.jpg";
import team2 from "../../assets/images/team/team2.jpg";
import team3 from "../../assets/images/team/team3.jpg";

const teamMembers = [
	{
		name: "John Doe",
		role: "Founder & CEO",
		image: team1,
		bio: "John has a passion for motorbikes and a vision to make bike rental easy and fun.",
	},
	{
		name: "Jane Smith",
		role: "Operations Manager",
		image: team2,
		bio: "Jane ensures that our fleet is in top condition and our operations run smoothly.",
	},
	{
		name: "Alice Johnson",
		role: "Marketing Director",
		image: team3,
		bio: "Alice drives our brand's visibility and engages with our community through innovative marketing strategies.",
	},
];

const TeamSection = () => {
	return (
		<div className="px-4 py-12">
			<h2 className="text-4xl text-center font-bold mb-6">
				Meet the <span className="text-blue-600">Team</span>
			</h2>
			<div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1">
				{teamMembers.map((member, index) => (
					<Card
						key={index}
						className="max-w-sm"
						renderImage={() => (
							<img
								width={500}
								height={500}
								src={member.image}
								alt={member.name}
							/>
						)}
					>
						<h4 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
							{member.name}
						</h4>
						<h3 className="text-lg text-gray-500">{member.role}</h3>
						<p className="font-normal text-gray-700 dark:text-gray-400">
							{member.bio}
						</p>
					</Card>
				))}
			</div>
		</div>
	);
};

export default TeamSection;
