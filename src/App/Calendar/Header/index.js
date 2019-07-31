import React from 'react'
import {Link} from '@reach/router'
import {incWeek, decWeek, incMonth, decMonth, getMonthName} from './utils'

export default (props) => {
	const { year, month, day, view, today } = props

	// TODO: write ALL the tests (including util fns)
	const getNextMonthUrl = () => {
		return `/${view}/${incMonth(year, month, day)}`
	}
	const getPrevMonthUrl = () => {
		return `/${view}/${decMonth(year, month, day)}`
	}
	const getNextWeekUrl = () => {
		return `/${view}/${incWeek(year, month, day)}`
	}
	const getPrevWeekUrl = () => {
		return `/${view}/${decWeek(year, month, day)}`
	}

	return (
		<header>
			<nav role="navigation" aria-labelledby="calendar-date">
				<ul>
					<h1 id="calendar-date">{getMonthName(month)} {year}</h1>
					<li>
						<Link title="Return to Today" to={`/${view}/${today}`}>Today</Link>
					</li>
					<li>
						{props.view === 'monthly' &&
							<Link title="Previous Month" to={getPrevMonthUrl()}>&lt;</Link>
						}{props.view === 'weekly' &&
							<Link title="Previous Week" to={getPrevWeekUrl()}>&lt;</Link>
						}
					</li>
					<li>
						{props.view === 'monthly' &&
							<Link title="Next Month" to={getNextMonthUrl()}>&gt;</Link>
						}{props.view === 'weekly' &&
							<Link title="Next Week" to={getNextWeekUrl()}>&gt;</Link>
						}
					</li>
					<li>
						<button aria-haspopup="true">View</button>
						<ul className="dropdown" aria-label="submenu">
							<li>
								<Link title="Weekly View" to={`/weekly/${year}/${month}/${day}`}>
									Weekly
								</Link>
							</li>
							<li>
								<Link title="Monthly View" to={`/monthly/${year}/${month}/${day}`}>
									Monthly
								</Link>
							</li>
							{/*TODO: daily link*/}
						</ul>
					</li>
				</ul>
			</nav>
		</header>
	)
}