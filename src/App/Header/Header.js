import React from 'react'
import {Link} from '@reach/router'
const getMonthName = (month) => {
	// blank entry to index January to 1
	const months = ['','January','February','March','April','May','June','July','August','September','October','November','December']
	return months[month]
}

export const Header = (props) => {
	const { year, month, day, view, today } = props
	return (
		<header>
			<button>Hamburger</button>
			<nav role="navigation">
				<ul>
					<li><Link to={`/${view}/${today}`}>Today</Link></li>
					{/* TODO: need to properly implement month switching*/}
					<li><Link to={`/${view}/${year}/${parseInt(month)-1}/${day}`}>&lt;</Link></li>
					<li><Link to={`/${view}/${year}/${parseInt(month)+1}/${day}`}>&gt;</Link></li>
					<li><a href="#" aria-haspopup="true">View</a>
						<ul className="dropdown" aria-label="submenu">
							<li><Link to={`/weekly/${year}/${month}/${day}`}>Weekly</Link></li>
							<li><Link to={`/monthly/${year}/${month}/${day}`}>Monthly</Link></li>
							{/*TODO: daily link*/}
						</ul>
					</li>
				</ul>
			</nav>
			<h2>
				{getMonthName(month)} {year}
			</h2>
		</header>
	)
}
