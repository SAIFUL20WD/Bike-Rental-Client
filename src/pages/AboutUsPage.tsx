import MissionStatement from "../components/About/MissionStatement";
import TeamSection from "../components/About/TeamSection";
import HistorySection from "../components/About/HistorySection";
import ContactSection from "../components/About/ContactSection";

const AboutUsPage = () => {
	return (
		<section>
			<MissionStatement />
			<TeamSection />
			<HistorySection />
			<ContactSection />
		</section>
	);
};

export default AboutUsPage;
