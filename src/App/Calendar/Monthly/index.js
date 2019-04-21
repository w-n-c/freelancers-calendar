import React from 'react'
import Days from './Days'
import { chunk } from './utils'

// TODO: move date information into a react context and pass in as props
export const getDaysOfMonth = (year, month, day) => {
	const date = new Date(`${year}/${month}/${day}`)
	// sets date to the first sunday that should appear on the calendar
	// will regularly be a day from the previous month
	date.setDate(1)
	date.setDate(1 - date.getDay())

	// Monthly view contains 7 days x 5 weeks, so create an array then
	// map, incrementing the day by one to fill with the correct dates
	const days = Array(7 * 5).fill()
	return days.map(() => {
		const dayNumber = date.getDate()
		date.setDate(dayNumber + 1)
		return dayNumber
	})
}

export default ({year, month, day}) => {
	// split the days into week long arrays to add necessary table row elements
	const days = getDaysOfMonth(year, month, day)
	const weeks = chunk(days, 7)
	return weeks.map((week, i) =>
		<tr key={i}>
			<Days days={week} />
		</tr>
	)
}
