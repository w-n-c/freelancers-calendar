import React from 'react'
import { pick } from 'lodash/fp'
import SectionHeader from './SectionHeader'
import { getWeek } from './Weekly/utils'

// TODO: toggle between weekday abbreviations and full name base on window width
export const weekdayAbbr = ['Su','Mo','Tu','We','Th','Fr','Sa']
export const weekdayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

const CalendarHeader = (props) => {
	const day = pick(['year', 'month', 'date'], props)
	const week = props.route === 'weekly' ? getWeek(day) : undefined
	return (
		<div className="header-group" role="rowgroup">
			{week ? <span key="padding only"></span> : null }
			<header role="row">
				{weekdayNames.map((name, i) =>
					<SectionHeader role="columnheader" ariaHeader={name} key={i}>
						{weekdayAbbr[i]}
						<br />
						{week ? week[i].date : '' }
					</SectionHeader>
				)}
			</header>
			{week ? <span key="padding only"></span> : null }
		</div>
	)
}

export default CalendarHeader
