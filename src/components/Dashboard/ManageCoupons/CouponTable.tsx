import { Table } from "flowbite-react";
import { TCoupon } from "../../../types";
import EditCouponModal from "./EditCoupon";
import DeleteCouponModal from "./DeleteCoupon";

type TCouponTableProps = {
	data: TCoupon[];
};

const CouponTable = ({ data }: TCouponTableProps) => {
	return (
		<Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
			<Table.Head className="bg-gray-100 dark:bg-gray-700">
				<Table.HeadCell>No</Table.HeadCell>
				<Table.HeadCell>Code</Table.HeadCell>
				<Table.HeadCell>Discount</Table.HeadCell>
				<Table.HeadCell>Valid Date</Table.HeadCell>
				<Table.HeadCell>Usage</Table.HeadCell>
				<Table.HeadCell>Actions</Table.HeadCell>
			</Table.Head>
			<Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
				{data.map((item, idx) => {
					return (
						<Table.Row
							className="hover:bg-gray-100 dark:hover:bg-gray-700"
							key={item._id}
						>
							<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
								{idx + 1}
							</Table.Cell>
							<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
								{item.code}
							</Table.Cell>
							<Table.Cell className="capitalize whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
								<p>Type: {item.discountType}</p>
								<p>Value: {item.discountValue}</p>
							</Table.Cell>
							<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
								<p>From: {item.startDate.substring(0, 10)}</p>
								<p>To: {item.endDate.substring(0, 10)}</p>
							</Table.Cell>
							<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
								<p>Limit: {item.usageLimit}</p>
								<p>Used: {item.usedCount}</p>
							</Table.Cell>
							<Table.Cell className="space-x-2 whitespace-nowrap p-4">
								<div className="flex items-center gap-x-3">
									<EditCouponModal data={item} />
									<DeleteCouponModal id={item._id} />
								</div>
							</Table.Cell>
						</Table.Row>
					);
				})}
			</Table.Body>
		</Table>
	);
};
export default CouponTable;
