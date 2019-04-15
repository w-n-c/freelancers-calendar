import React from 'react'

export default () => {
	// TODO: move date information into a react context and pass in as props
	const days = (() => {
		const date = new Date()
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
	})()

	// TODO: move generic helper to util file
	const chunk = (arr, len) => {
		const chunks = []
		for (let i = 0; i < arr.length; i += len) {
			chunks.push(arr.slice(i, i + len))
		}
		return chunks
	}

	// TODO: refactor to separate component
	const renderDays = () => {
		return days.map((day, i) => {
			return (
				<td key={i}>
					<h3>{day}</h3>
					<div>list</div>
				</td>
			)
		})
	}

	// chunk the days into week long arrays to add necessary table row elements
	const weeks = chunk(renderDays(), 7)
	return weeks.map(week => <tr>{[...week]}</tr>)
}
