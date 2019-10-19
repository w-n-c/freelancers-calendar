import React from 'react'
import { Link } from '@reach/router'
import { pick} from 'lodash/fp'
import { url, incRoute, decRoute, getMonthName } from './utils'


export const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
export const viewToNoun = (s) => s.charAt(0).toUpperCase() + s.slice(1,-2);
export const dayToString = ({year, month, date}) => `${year}/${month}/${date}`

export const Header = (props) => {
	const { view, today, '*': eventPath, location: { search }} = props
	const day = pick(['year', 'month', 'date'], props)

	const eventInfo = `${eventPath}${search}`
	const eventUrl = url(eventInfo)

	const dayAndEventUrl = eventUrl(dayToString(day))
	const weeklyPath  = dayAndEventUrl('weekly')
	const monthlyPath = dayAndEventUrl('monthly')

	const incEventUrl = eventUrl(incRoute(view)(day))
	const decEventUrl = eventUrl(decRoute(view)(day))
	const previousUrl = decEventUrl(view)
	const nextUrl = incEventUrl(view)

	const todaysUrl = eventUrl(today)(view)

	const title = {
		noun: viewToNoun(view),
		adjective: capitalize(view)
	}

	// had the idea to remove all the ternaries below but need to consider how to deal with the urls also changing
	// probably need to make another component and pase the title and url as props
	// will do next commit

	return (
		<header className="site-header">
			<nav role="navigation" aria-labelledby="calendar-date">
				<ul>
					<h1 id="calendar-date">{getMonthName(day.month)} {day.year}</h1>
					<li>
						<Link title="Return to Today" to={todaysUrl}>Today</Link>
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
								<Link title="Weekly View" to={weeklyPath}>
									Weekly
								</Link>
							</li>
							<li>
								<Link title="Monthly View" to={monthlyPath}>
									Monthly
								</Link>
							</li>
						</ul>
					</li>
				</ul>
			</nav>
		</header>
	)
}
