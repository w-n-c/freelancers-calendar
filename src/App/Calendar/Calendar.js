import React from 'react'
import Header from './Header'
import Monthly from './Monthly'
import Weekly from './Weekly'
import Daily from './Daily'

// changing CSS display on table elements wipes their ARIA role
// so we reapply those roles to various elements
export const Calendar = (props) => {
	const view = props.view
	return [
		<Header key="1" {...props} />,
		<table role="table" key="2">
			<thead>
				<tr role="row">
					<th role="columnheader" scope="col">Su</th>
					<th role="columnheader" scope="col">Mo</th>
					<th role="columnheader" scope="col">Tu</th>
					<th role="columnheader" scope="col">We</th>
					<th role="columnheader" scope="col">Th</th>
					<th role="columnheader" scope="col">Fr</th>
					<th role="columnheader" scope="col">Sa</th>
				</tr>
			</thead>
			<tbody className={view}>
				{view === 'monthly' ? (
					<Monthly {...props}/>
				) : view === 'weekly' ? (
					<Weekly {...props} />
				) : (
					<Daily />
				)}
			</tbody>
		</table>
	]
}
