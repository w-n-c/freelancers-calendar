import React from 'react'
import Header from './Header'
import Monthly from './Monthly'
import Weekly from './Weekly'
import Daily from './Daily'

export const Calendar = (props) => {
	const view = props.view
	return [
		<Header key="1" {...props} />,
		<table key="2">
			<thead>
				<tr>
					{view === 'weekly' && <td></td>}
					<th scope="col">Su</th>
					<th scope="col">Mo</th>
					<th scope="col">Tu</th>
					<th scope="col">We</th>
					<th scope="col">Th</th>
					<th scope="col">Fr</th>
					<th scope="col">Sa</th>
				</tr>
			</thead>
			<tbody className={view}>
				{view === 'monthly' ? (
					<Monthly {...props}/>
				) : view === 'weekly' ? (
					<Weekly />
				) : (
					<Daily />
				)}
			</tbody>
		</table>
	]
}
