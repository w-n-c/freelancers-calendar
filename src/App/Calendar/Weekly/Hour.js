import React from 'react'

export default ({events}) =>
	<td role="cell">
		{events.map((event, i) => <div key={i}>{event.title}</div>)}
	</td>
