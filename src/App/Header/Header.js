import React from 'react'
import {Link} from '@reach/router'
const getMonthName = (month) => {
	// blank entry to index January to 1
	const months = ['','January','February','March','April','May','June','July','August','September','October','November','December']
	return months[month]
}

export const Header = (props) => {
	const { year, month, day, view } = props
	return (
		<header>
			<button>Hamburger</button>
			<nav>
				<Link to={`/${view}/${props.today}`}>Today</Link>
				{/* TODO: need to properly implement month switching*/}
				<Link to={`/${view}/${year}/${parseInt(month)-1}/${day}`}>&lt;</Link>
				<Link to={`/${view}/${year}/${parseInt(month)+1}/${day}`}>&gt;</Link>
			</nav>
			<h2>
				{getMonthName(month)} {year}
			</h2>
		</header>
	)
}
