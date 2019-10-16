import React from 'react'
import {Link} from '@reach/router'
import { pick } from 'lodash/fp'
import {incWeek, decWeek, incMonth, decMonth, getMonthName} from './utils'

export default (props) => {
	const { view, today } = props
	const day = pick(['year', 'month', 'date'], props)

	const dateString = `${day.year}/${day.month}/${day.date}`
	const nextMonthUrl = `/monthly/${incMonth(day)}/${props['*']}`
	const prevMonthUrl = `/monthly/${decMonth(day)}/${props['*']}`
	const nextWeekUrl  = `/weekly/${incWeek(day)}/${props['*']}`
	const prevWeekUrl  = `/weekly/${decWeek(day)}/${props['*']}`

	return (
		<header className="site-header">
			<nav role="navigation" aria-labelledby="calendar-date">
				<ul>
					<h1 id="calendar-date">{getMonthName(day.month)} {day.year}</h1>
					<li>
						<Link title="Return to Today" to={`/${view}/${today}/${props['*']}${props.location.search}`}>Today</Link>
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
								<Link title="Weekly View" to={`/weekly/${dateString}/${props['*']}${props.location.search}`}>
									Weekly
								</Link>
							</li>
							<li>
								<Link title="Monthly View" to={`/monthly/${dateString}/${props['*']}${props.location.search}`}>
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
