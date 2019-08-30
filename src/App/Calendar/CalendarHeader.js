import React from 'react'
import SectionHeader from './SectionHeader'
import { getWeek } from './Weekly/utils'

// TODO: toggle between weekday abbreviations and full name base on window width
export const weekdayAbbr = ['Su','Mo','Tu','We','Th','Fr','Sa']
export const weekdayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

const CalendarHeader = ({day}) => {
	const week = day ? getWeek(day) : ''
	return (
		<div role="rowgroup">
			<header role="row">
				{weekdayNames.map((name, i) =>
					<SectionHeader role="columnheader" ariaHeader={name} key={i}>
						{weekdayAbbr[i]}
						<br />
						{week ? week[i] : '' }
					</SectionHeader>
				)}
			</header>
		</div>
	)
}

export default CalendarHeader
