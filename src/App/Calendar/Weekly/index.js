import React from 'react'

export const hours = new Array(24).fill().map((_, i) => i)

export default () => {
	const days = [1,2,3,4,5,6,7]
	return hours.map((hour, i) =>
		<tr key={i}>
			<th scope="row">{hour}</th>
			{days.map((day, i) => <td key={i}>item</td>)}
		</tr>
	)

}
