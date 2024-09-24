import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle, HiTrash } from "react-icons/hi";
import { useDeleteUserMutation } from "../../../redux/features/user/userApi";
import toast from "react-hot-toast";

type TDeleteUserProps = {
	id: string;
};

const DeleteUserModal = ({ id }: TDeleteUserProps) => {
	const [isOpen, setOpen] = useState(false);
	const [deleteUser] = useDeleteUserMutation();

	const handleDeleteUser = async () => {
		const toastId = toast("Processing...");
		try {
			const res = await deleteUser(id);
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
			<Button color="failure" onClick={() => setOpen(!isOpen)}>
				<HiTrash className="mr-2 text-lg" />
				Delete
			</Button>
			<Modal onClose={() => setOpen(false)} show={isOpen} size="md">
				<Modal.Header className="px-3 pt-3 pb-0">
					<span className="sr-only">Delete</span>
				</Modal.Header>
				<Modal.Body className="px-6 pb-6 pt-0">
					<div className="flex flex-col items-center gap-y-6 text-center">
						<HiOutlineExclamationCircle className="text-7xl text-red-600" />
						<p className="text-lg text-gray-500 dark:text-gray-300">
							Are you sure you want to delete this user?
						</p>
						<div className="flex items-center gap-x-3">
							<Button color="failure" onClick={handleDeleteUser}>
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

export default DeleteUserModal;
