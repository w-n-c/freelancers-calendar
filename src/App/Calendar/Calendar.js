import React from 'react'
import Monthly from './Monthly'
import Weekly from './Weekly'
import Daily from './Daily'

export const Calendar = ({match: {params: {view}}}) => (
	<table>
		<thead>
			<tr>
				{view === 'weekly' ? <td></td> : null}
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
			{view === 'monthly' ? (
				<Monthly />
			) : view === 'weekly' ? (
				<Weekly />
			) : (
				<Daily />
			)}
		</tbody>
	</table>
)
