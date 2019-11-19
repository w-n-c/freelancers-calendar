import React from 'react'
import { Link } from '@reach/router'
import { pick} from 'lodash/fp'
import { url, incRoute, decRoute, getMonthName } from './utils'


export const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
export const viewToNoun = (s) => s.charAt(0).toUpperCase() + s.slice(1,-2);
export const dayToString = ({year, month, date}) => `${year}/${month}/${date}`

// Header creates all the paths for navigation and displays their links along
// with the month and year of the current calendar view
export const Header = (props) => {
	// today is the current day
	// day is the time the calendar is currently showing
	// when in weekly/monthly view, day determines what
	// month or week is shown on the calendar
	const { view, today, '*': event, location: { search }} = props
	const day = pick(['year', 'month', 'date'], props)

	// Generate the urls for the navigation links

	// Event info holds all the information about the currently selected event (if any)
	// Event info can be added to the path first as the naviagtion links should not close
	// the user's selected event (meaning it does not change across any link)

	const eventInfo = `${event}${search}`
	const eventPath = url(eventInfo)

	// Add the date path information to each link
	const todayPath = eventPath(today)
	const dayPath = eventPath(dayToString(day))

	// next/prev are navigation to adjacent week/months (respective of view)
	const nextPath = eventPath(incRoute(view)(day))
	const prevPath = eventPath(decRoute(view)(day))

	// add the view path information to each link
	// 'view' is the currently displayed view
	const weeklyUrl = dayPath('weekly')
	const monthlyUrl = dayPath('monthly')
	const previousUrl = prevPath(view)
	const nextUrl = nextPath(view)
	const todayUrl = todayPath(view)

	// link titles depend on whether the view is monthly or weekly
	// this uses the 'view' to generate the apprpriate text
	// e.g. monthly => 'Monthly' and 'Month'
	const title = {
		noun: viewToNoun(view),
		adjective: capitalize(view)
	}

	return (
		<header className="site-header">
			<nav role="navigation" aria-labelledby="calendar-date">
				<ul>
					<h1 id="calendar-date">{getMonthName(day.month)} {day.year}</h1>
					<li>
						<Link title="Return to Today" to={todayUrl}>Today</Link>
					</li>
					<li>
						<Link title={`Previous ${title.noun}`} to={previousUrl}>&lt;</Link>
					</li>
					<li>
						<Link title={`Next ${title.noun}`} to={nextUrl}>&gt;</Link>
					</li>
					<li>
						<button aria-haspopup="true">View</button>
						<ul className="dropdown" aria-label="submenu">
							<li>
								<Link title="Weekly View" to={weeklyUrl}>
									Weekly
								</Link>
							</li>
							<li>
								<Link title="Monthly View" to={monthlyUrl}>
									Monthly
								</Link>
							</li>
						</ul>
					</li>
					<li>
						<a href={`/auth/google`}>Login</a>
					</li>
				</ul>
			</nav>
		</header>
	)
}
