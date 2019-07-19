import React from 'react'
import Header from './Header'
import Monthly from './Monthly'
import Weekly from './Weekly'
import Event from './Event'

// TODO: callback to weekly to add date info to each th
// TODO: toggle between weekday abbreviations and full name base on window width

export const weekdayNames = ['Su','Mo','Tu','We','Th','Fr','Sa']
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
		return <main>
			<Header key="1" {...this.props} />
			<table role="table" key="2" className={view}>
				<thead>
					<tr role="row">
						{view === 'weekly' && <td></td>}
						{weekdayNames.map((name, i) =>
							<th key={i} role="columnheader" scope="col">{name}</th>
						)}
					</tr>
				</thead>
				<tbody>
					{view === 'monthly' ? (
						<Monthly {...this.props} handleClick={this.handleClick}/>
					) : view === 'weekly' ? (
						<Weekly {...this.props} />
					) : (
						'' // DAILY PLACEHOLDER
						// Will likely be a refactor of Weekly view with a 1 day length
						// same for any 3 or 4 day views like google cal has
					)}
				</tbody>
			</table>
			{this.state.formRendered ? this.renderForm() : '' }
		</main>
	}
}
