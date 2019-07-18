export const chunk = (arr, len) => {
	const chunks = []
	for (let i = 0; i < arr.length; i += len) {
		chunks.push(arr.slice(i, i + len))
	}
	return chunks
}

export const getDaysOfMonth = (year, month, day) => {
	const date = new Date(`${year}/${month}/${day}`)
	// sets date to the first sunday that should appear on the calendar
	// will regularly be a day from the previous month
	date.setDate(1)
	date.setDate(1 - date.getDay())

	// Monthly view contains 7 days x 6 weeks,
	// so create an array of objects containing each date.
	// Later code uses the date to filter which events to add to the object
	const days = Array(7 * 6).fill()
	return days.map(() => {
		const today = date.getDate()
		const thisMonth = date.getMonth() + 1
		const thisYear = date.getFullYear()
		date.setDate(today + 1)
		return {
			year: thisYear,
			month: thisMonth,
			date: today
		}
	})
}
