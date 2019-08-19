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
		const today = day.getDate()
		const thisMonth = day.getMonth() + 1
		const thisYear = day.getFullYear()
		// SIDE EFFECT
		day.setDate(today + 1)
		return {
			year: thisYear,
			month: thisMonth,
			date: today
		}
	})
}
