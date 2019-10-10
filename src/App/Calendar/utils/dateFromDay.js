export const dateFromDay = ({year, month, date, hour}) => {
	const dateObj = new Date(`${year}/${month}/${date}`)
	if (hour)
		dateObj.setHours(hour)
	return dateObj
}
