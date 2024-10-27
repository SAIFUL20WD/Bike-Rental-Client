import { Footer } from "flowbite-react";
import {
	BsDribbble,
	BsFacebook,
	BsGithub,
	BsInstagram,
	BsTwitter,
} from "react-icons/bs";

const FooterCustom = () => {
	return (
		<Footer bgDark className="rounded-none">
			<div className="w-full">
				<div className="max-w-7xl mx-auto grid grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4">
					<div>
						<Footer.Title title="Company" />
						<Footer.LinkGroup col>
							<Footer.Link href="#">About</Footer.Link>
							<Footer.Link href="#">Careers</Footer.Link>
							<Footer.Link href="#">Brand Center</Footer.Link>
							<Footer.Link href="#">Blog</Footer.Link>
						</Footer.LinkGroup>
					</div>
					<div>
						<Footer.Title title="help center" />
						<Footer.LinkGroup col>
							<Footer.Link href="#">Discord Server</Footer.Link>
							<Footer.Link href="#">Twitter</Footer.Link>
							<Footer.Link href="#">Facebook</Footer.Link>
							<Footer.Link href="#">Contact Us</Footer.Link>
						</Footer.LinkGroup>
					</div>
					<div>
						<Footer.Title title="legal" />
						<Footer.LinkGroup col>
							<Footer.Link href="#">Privacy Policy</Footer.Link>
							<Footer.Link href="#">Licensing</Footer.Link>
							<Footer.Link href="#">
								Terms &amp; Conditions
							</Footer.Link>
						</Footer.LinkGroup>
					</div>
					<div>
						<Footer.Title title="download" />
						<Footer.LinkGroup col>
							<Footer.Link href="#">iOS</Footer.Link>
							<Footer.Link href="#">Android</Footer.Link>
							<Footer.Link href="#">Windows</Footer.Link>
							<Footer.Link href="#">MacOS</Footer.Link>
						</Footer.LinkGroup>
					</div>
				</div>
				<div className="bg-gray-700 px-4 py-6">
					<div className="max-w-7xl mx-auto sm:flex sm:items-center sm:justify-center gap-10">
						<Footer.Copyright
							href="#"
							by="BikeGo™"
							year={new Date().getFullYear()}
						/>
						<div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
							<Footer.Icon href="#" icon={BsFacebook} />
							<Footer.Icon href="#" icon={BsInstagram} />
							<Footer.Icon href="#" icon={BsTwitter} />
							<Footer.Icon href="#" icon={BsGithub} />
							<Footer.Icon href="#" icon={BsDribbble} />
						</div>
					</div>
				</div>
			</div>
		</Footer>
	);
};

export default FooterCustom;
