import { curry } from 'lodash/fp'

export const isWeekly = (view) => view === 'weekly'
export const isMonthly = (view) => view === 'monthly'

// Returns the callback correlating to the given view
const _onView = ({weekly, monthly}, view) =>
	isWeekly(view) ? weekly :
		isMonthly(view) ? monthly :
		()=>{}

export const onView = curry(_onView)
