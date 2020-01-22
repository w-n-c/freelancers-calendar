import { isInHour } from '../isInHour'

//export const isInHour = hour => time => {
//	const hourStart = new Date(hour)
//	const hourEnd = nextHour(hour)
//	const thisTime = new Date(time)
//
//	return thisTime >= hourStart && thisTime < hourEnd
//}
describe('isInHour', () => {
	const time = (minutes) => new Date(2020, 0, 22, 18, minutes)
	const hour = time(0)
	const inThisHour = isInHour(hour)
	const table = [
		[time(-1), false],
		[time(0), true],
		[time(1), true],
		[time(27), true],
		[time(59), true],
		[time(60), false],
		[time(61), false],
	]
	it.each(table)(
		'returns true if given date,  occurs during given hour',
		(date, expected) => expect(inThisHour(date)).toBe(expected)
	)
})
