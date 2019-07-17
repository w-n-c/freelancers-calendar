import { toDateString } from './toDateString'
import { formatTime } from './formatTime'

export const isoDateToDateString = (isoDate) => toDateString(new Date(isoDate))

export const isoDateToTimeString = (isoDate) => {
	// we create a new Date to adjust time to local timezone
	const date = new Date(isoDate)
	return formatTime(`${date.getHours()}:${date.getMinutes()}`)
}

export const isoDateToCalStrings = (isoDate) => {
	return [isoDateToDateString(isoDate), isoDateToTimeString(isoDate)]
}
