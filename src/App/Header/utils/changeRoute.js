import { toDateString } from '../../utils'
import { onView } from './onView'
import { changeMonth } from './changeMonth'

export const incWeek = ({year, month, date}) =>
	toDateString(new Date(year, month-1, parseInt(date)+7))
export const decWeek = ({year, month, date}) =>
	toDateString(new Date(year, month-1, date-7))

export const incMonth = (day) => toDateString(changeMonth(day, 'inc'))
export const decMonth = (day) => toDateString(changeMonth(day, 'dec'))

export const incRoute = onView({ weekly: incWeek, monthly: incMonth })
export const decRoute = onView({ weekly: decWeek, monthly: decMonth })
