import React from 'react'
import Monthly from './Monthly'
import Weekly from './Weekly'
import Daily from './Daily'

const props = {
	view: 'monthly',
}

export const Calendar = () =>
	props.view === 'monthly' ? (
		<Monthly />
	) : props.view === 'weekly' ? (
		<Weekly />
	) : (
		<Daily />
	)
