import React from 'react'

export const toTime = (num) => {
	switch (num.toString().length) {
		case 1:
			return `0${num}:00`
		case 2:
			return `${num}:00`
		default:
			console.log(`Err: incorrect time format, expected 1-2 digit number, got: ${num}`)
			return 0
	}
}
export const hours = new Array(24).fill().map((_, i) => toTime(i))

export default () => {
	const days = [1,2,3,4,5,6,7]
	return hours.map((hour, i) =>
		<tr key={i}>
			<th scope="row">{hour}</th>
			{days.map((day, i) => <td key={i}>item</td>)}
		</tr>
	)
}
