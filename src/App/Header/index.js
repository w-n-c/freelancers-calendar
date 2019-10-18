import React from 'react'
import { Link } from '@reach/router'
import { pick, curry } from 'lodash/fp'
import {incWeek, decWeek, incMonth, decMonth, getMonthName} from './utils'

const _url = (eventUrl, view, date) => `/${view}/${date}/${eventUrl}`
export const url = curry(_url)

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const viewToNoun = (s) => s.charAt(0).toUpperCase() + s.slice(1,-2);

export default (props) => {
	const { view, today, '*': eventPath, location: { search }} = props
	const day = pick(['year', 'month', 'date'], props)

	const eventInfo = `${eventPath}${search}`
	const eventUrl = url(eventInfo)

	const viewUrl = eventUrl(view)
	const weeklyUrl = eventUrl('weekly')
	const monthlyUrl = eventUrl('monthly')

	const nextMonthUrl = monthlyUrl(incMonth(day))
	const prevMonthUrl = monthlyUrl(decMonth(day))
	const nextWeekUrl  = weeklyUrl(incWeek(day))
	const prevWeekUrl  = weeklyUrl(decWeek(day))
	const todaysUrl    = viewUrl(today)
	const toWeeklyUrl  = weeklyUrl(today)
	const toMonthlyUrl = monthlyUrl(today)

	// had the idea to remove all the ternaries below but need to consider how to deal with the urls also changing
	// probably need to make another component and pase the title and url as props
	// will do next commit
	const title = {
		noun: viewToNoun(view),
		adjective: capitalize(view)
	}

	console.log(title)
	return (
		<header className="site-header">
			<nav role="navigation" aria-labelledby="calendar-date">
				<ul>
					<h1 id="calendar-date">{getMonthName(day.month)} {day.year}</h1>
					<li>
						<Link title="Return to Today" to={todaysUrl}>Today</Link>
					</li>
					<li>
						{props.view === 'monthly' &&
							<Link title="Previous Month" to={prevMonthUrl}>&lt;</Link>
						}{props.view === 'weekly' &&
							<Link title="Previous Week" to={prevWeekUrl}>&lt;</Link>
						}
					</li>
					<li>
						{props.view === 'monthly' &&
							<Link title="Next Month" to={nextMonthUrl}>&gt;</Link>
						}{props.view === 'weekly' &&
							<Link title="Next Week" to={nextWeekUrl}>&gt;</Link>
						}
					</li>
					<li>
						<button aria-haspopup="true">View</button>
						<ul className="dropdown" aria-label="submenu">
							<li>
								<Link title="Weekly View" to={toWeeklyUrl}>
									Weekly
								</Link>
							</li>
							<li>
								<Link title="Monthly View" to={toMonthlyUrl}>
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
