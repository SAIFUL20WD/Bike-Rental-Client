export type TCoupon = {
	_id: string;
	name: string;
	code: string;
	discountType: string;
	discountValue: number;
	startDate: string;
	endDate: string;
	usageLimit: number;
	usedCount: number;
	isActive: boolean;
};
