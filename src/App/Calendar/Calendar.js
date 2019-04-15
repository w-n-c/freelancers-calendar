import React from 'react'
import Monthly from './Monthly'
import Weekly from './Weekly'
import Daily from './Daily'

const props = {
	view: 'monthly',
}

export const Calendar = () => (
	<table>
		<thead>
			<tr>
				<th>S</th>
				<th>M</th>
				<th>Ty</th>
				<th>Wday</th>
				<th>Tay</th>
				<th>F</th>
				<th>Say</th>
			</tr>
		</thead>
		<tbody>
			{props.view === 'monthly' ? (
				<Monthly />
			) : props.view === 'weekly' ? (
				<Weekly />
			) : (
				<Daily />
			)}
		</tbody>
	</table>
)
