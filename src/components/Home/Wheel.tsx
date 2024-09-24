import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import WheelComponent from "./WheelComponent/WheelComponent";
import toast, { Toaster } from "react-hot-toast";
import { useGetAllCouponsQuery } from "../../redux/features/Coupon/couponApi";

const Wheel = () => {
	const [openModal, setOpenModal] = useState(false);
	const [couponCode, setCouponCode] = useState("");

	const { data } = useGetAllCouponsQuery(undefined);

	const segments = ["10%", "20%", "30%"];
	const segColors = [
		"#EE4040",
		"#F0CF50",
		"#815CD1",
		"#3DA5E0",
		"#34A24F",
		"#F9AA1F",
		"#EC3F3F",
		"#FF9000",
		"#F0CF50",
		"#815CD1",
		"#3DA5E0",
		"#34A24F",
		"#F9AA1F",
		"#EC3F3F",
		"#FF9000",
	];
	const onFinished = (discount) => {
		setOpenModal(true);
		setCouponCode(discount);
	};

	return (
		<>
			<Toaster />
			<div className="flex flex-col justify-center items-center">
				<h3 className="mb-5 text-lg text-center font-normal dark:text-white my-5">
					Spin to get <span className="text-blue-600">Discount</span>
				</h3>
				{data?.data ? (
					<WheelComponent
						segments={data.data.map((item) => item.code)}
						segColors={segColors}
						winningSegment={
							segments[
								Math.floor(Math.random() * segments.length)
							]
						}
						onFinished={(winner) => onFinished(winner)}
						primaryColor="black"
						contrastColor="white"
						buttonText="Spin"
						isOnlyOnce={false}
						size={200}
						upDuration={100}
						downDuration={1000}
					/>
				) : (
					""
				)}
			</div>

			<Modal
				show={openModal}
				size="sm"
				onClose={() => setOpenModal(false)}
				popup
			>
				<Modal.Header />
				<Modal.Body>
					<div className="flex flex-col justify-center items-center dark:text-white">
						<h4 className="text-blue-500 mt-3">Congratulations!</h4>
						<p>You won a discount!</p>
						<p>
							Your coupon code is:{" "}
							<strong className="text-blue-500">
								{couponCode}
							</strong>
						</p>
						<Button
							color="blue"
							onClick={() => {
								navigator.clipboard.writeText(couponCode);
								toast.success("Copied To Clipboard");
							}}
							className="mt-5"
						>
							Copy Code
						</Button>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default Wheel;
