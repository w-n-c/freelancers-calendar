import React from 'react'

export default ({ events, handleClick }) =>
	<ul>
		{events.map(event => event.id ?
			<li
				key={event.id}
				onClick={e => {
					e.stopPropagation()
					handleClick(event.id)
				}}
			>
				{event.title}
			</li>
			: '')}
		</ul>
