export const dateFormatter = (date: Date) => {
	const year = date.getFullYear();
	const month = date.getMonth();
	const day = date.getDate();
	return { year, month, day };
};
