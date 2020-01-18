import { nextHour } from '../../utils'

export const isInHour = hour => time => {
	const hourStart = new Date(hour)
	const hourEnd = nextHour(hour)
	const thisTime = new Date(time)

	return thisTime >= hourStart && thisTime < hourEnd
}
