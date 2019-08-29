import React from 'react'

const handleClick = (event) => console.log(event)

export default ({ events }) =>
	<ul>
		{events.map(event => event.id ?
			<li
				key={event.id}
				onClick={e => {
					e.stopPropagation()
					handleClick(event)
				}}
			>
				{event.title}
			</li>
		: '')}
	</ul>
