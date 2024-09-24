import { TBike } from "./bike.type";
import { TUser } from "./user.type";

export type TBooking = {
	advancePayment: {
		amount: number;
		status: boolean;
		transactionId: string;
		_id: string;
	};
	_id: string;
	userId: TUser;
	bikeId: TBike;
	startTime: string;
	returnTime: string | null;
	paymentStatus: "paid" | "unpaid";
	totalCost: number;
	status: "pass" | "fail";
	isReturned: boolean;
	couponUsed: boolean;
};
