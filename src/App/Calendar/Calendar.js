import React from 'react'
import Header from './Header'
import Monthly from './Monthly'
import Weekly from './Weekly'
import Daily from './Daily'
import Event from './Event'

// TODO: callback to weekly to add date info to each th
// TODO: toggle between weekday abbreviations and full name base on window width

export const Calendar = (props) => {
	const view = props.view

	// changing CSS display on table elements wipes their ARIA role
	// so we reapply those roles to various elements
	return [
		<Header key="1" {...props} />,
		<table role="table" key="2" className={view}>
			<thead>
				<tr role="row">
					{view === 'weekly' && <td></td>}
					<th role="columnheader" scope="col">Su</th>
					<th role="columnheader" scope="col">Mo</th>
					<th role="columnheader" scope="col">Tu</th>
					<th role="columnheader" scope="col">We</th>
					<th role="columnheader" scope="col">Th</th>
					<th role="columnheader" scope="col">Fr</th>
					<th role="columnheader" scope="col">Sa</th>
				</tr>
			</thead>
			<tbody>
				{view === 'monthly' ? (
					<Monthly {...props}/>
				) : view === 'weekly' ? (
					<Weekly {...props} />
				) : (
					// Will likely be a refactor of Weekly view with a 1 day length
					// same for any 3 or 4 day views like google cal has
					<Daily />
				)}
			</tbody>
		</table>,
		<Event key="3"/>
	]
}
