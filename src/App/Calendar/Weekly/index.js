import React from 'react'
import { EventConsumer } from '../../EventContext'
import Day from './Day'

export const toTime = (num) => {
	switch (num.toString().length) {
		case 1:
			return `0${num}:00`
		case 2:
			return `${num}:00`
		default:
			console.log(`Err: incorrect time format, expected 1-2 digit number, got: ${num}`)
			return ``
	}
}

export const getWeek = (year, month, day) => {
	// set date to the Sunday (first day) of given week
	const date = new Date(`${year}/${month}/${day}`)
	date.setDate(date.getDate() - date.getDay())
	const week = []
	while (week.length < 7) {
		week.push(date.getDate())
		date.setDate(date.getDate() + 1)
	}
	return week
}

export const hours = new Array(24).fill().map((_, i) => toTime(i))

export default ({year, month, day}) => {
	const days = getWeek(year, month, day)
	return hours.map((hour, i) =>
		<tr role="row" key={i}>
			<th role="rowheader" scope="row">{hour}</th>
				<EventConsumer>{({ filterTodaysEvents }) =>
					days.map((day, i) =>
						<Day key={i} events={filterTodaysEvents(year, month, day)} />
					)}
				</EventConsumer>
		</tr>
	)
}
