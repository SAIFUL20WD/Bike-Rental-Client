import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { GiUpgrade } from "react-icons/gi";
import toast from "react-hot-toast";
import { useUpdateUserByIdMutation } from "../../../redux/features/user/userApi";

type TMakeAdminProps = {
	id: string;
};

const MakeAdminModal = ({ id }: TMakeAdminProps) => {
	const [isOpen, setOpen] = useState(false);
	const [updateUserById] = useUpdateUserByIdMutation();

	const handleMakeAdmin = async () => {
		const toastId = toast("Processing...");
		try {
			const userData = { id: id, role: "admin" };
			const res = await updateUserById(userData);
			if (!res.error) {
				toast.success(res.data.message, {
					id: toastId,
					duration: 2000,
				});
			} else {
				toast.error(res.error.data.message, {
					id: toastId,
					duration: 2000,
				});
			}
		} catch (err) {
			toast.error("Something went wrong!", {
				id: toastId,
				duration: 2000,
			});
		}
		setOpen(false);
	};

	return (
		<>
			<Button color="warning" onClick={() => setOpen(!isOpen)}>
				<GiUpgrade className="mr-2 text-lg" />
				Make Admin
			</Button>
			<Modal onClose={() => setOpen(false)} show={isOpen} size="md">
				<Modal.Header className="px-3 pt-3 pb-0">
					<span className="sr-only">Make Admin</span>
				</Modal.Header>
				<Modal.Body className="px-6 pb-6 pt-0">
					<div className="flex flex-col items-center gap-y-6 text-center">
						<HiOutlineExclamationCircle className="text-7xl text-red-600" />
						<p className="text-lg text-gray-500 dark:text-gray-300">
							Are you sure you want to make this user admin?
						</p>
						<div className="flex items-center gap-x-3">
							<Button color="failure" onClick={handleMakeAdmin}>
								Yes, I'm sure
							</Button>
							<Button color="gray" onClick={() => setOpen(false)}>
								No, cancel
							</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default MakeAdminModal;
