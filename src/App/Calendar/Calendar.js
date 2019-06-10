import React from 'react'
import Header from './Header'
import Monthly from './Monthly'
import Weekly from './Weekly'
import Daily from './Daily'
import Event from './Event'

// TODO: callback to weekly to add date info to each th
// TODO: toggle between weekday abbreviations and full name base on window width

export class Calendar extends React.Component {
	state = {
		formRendered: false,
		selectedEvent: {}
	}

	handleClick = (event) => {
		this.setState({
			formRendered: true,
			selectedEvent: event
		})
	}

	// eventually Event will process a promise and return
	// a different result depending on submission success
	handleFormSubmission = (success) => {
		this.setState({
			formRendered: !success,
			selectedEvent: {}
		})
	}

	renderForm() {
		return <Event
			event={this.state.selectedEvent}
			handleFormSubmission={this.handleFormSubmission}
		/>
	}

	render() {
		// changing CSS display on table elements wipes their ARIA role
		// so we reapply those roles to various elements
		const view = this.props.view
		return <div>
			<Header key="1" {...this.props} />
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
						<Monthly {...this.props} handleClick={this.handleClick}/>
					) : view === 'weekly' ? (
						<Weekly {...this.props} />
					) : (
						// Will likely be a refactor of Weekly view with a 1 day length
						// same for any 3 or 4 day views like google cal has
						<Daily />
					)}
				</tbody>
			</table>
			{this.state.formRendered ? this.renderForm() : '' }
		</div>
	}
}
