import { lengthInHours } from '../lengthInHours'

describe('lengthInhours', () => {
	const time = (minutes) => new Date(2020, 0, 23, 16, minutes)
	const table = [
		[time(0), time(0), 0/60],
		[time(0), time(20), 20/60],
		[time(20), time(1230), 1210/60],
		[time(900), time(0), 900/60],
		[time(900), time(60), 840/60]
	]
	it.each(table)(
		'returns the difference between two times in hours',
		(t1, t2, expected) => expect(lengthInHours(t1, t2)).toBe(expected)
	)
})
