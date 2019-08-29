import React from 'react'
import SectionHeader from './SectionHeader'

// TODO: toggle between weekday abbreviations and full name base on window width
export const weekdayAbbr = ['Su','Mo','Tu','We','Th','Fr','Sa']
export const weekdayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

const CalendarHeader = () =>
	<div role="rowgroup">
		<header role="row">
			{weekdayNames.map((name, i) => {
				return (
					<SectionHeader
						role="columnheader"
						ariaHeader={name}
						visualHeader={weekdayAbbr[i]}
						key={i}
					/>
				)
			})}
		</header>
	</div>

export default CalendarHeader
