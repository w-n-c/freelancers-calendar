export const getMonthName = (month) => {
	const index = month % 12
	const months = ['December', 'January','February','March','April','May','June','July','August','September','October','November']
	return months[index]
}
