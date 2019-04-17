import React from 'react'
export default ({days}) => {
		return days.map((day, i) => {
			return (
				<td key={i}>
					<h3>{day}</h3>
					<div>list</div>
				</td>
			)
		})
}
