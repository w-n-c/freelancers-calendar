export const getDaysOfMonth = ({year, month, date}) => {
	const day = new Date(`${year}/${month}/${date}`)
	// sets date to the first sunday that should appear on the calendar
	// will regularly be a day from the previous month
	day.setDate(1)
	day.setDate(1 - day.getDay())

	// Monthly view contains 7 days x 6 weeks,
	// so create an array of objects containing each date.
	// Later code uses the date to filter which events to add to the object
	const days = Array(7 * 6).fill()
	return days.map(() => {
		const date = day.getDate()
		const month = day.getMonth() + 1
		const year = day.getFullYear()
		// SIDE EFFECT
		day.setDate(date + 1)
		return {
			year,
			month,
			date
		}
	})
}
