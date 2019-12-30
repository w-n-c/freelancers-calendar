import { getMonthName } from '../getMonthName'

describe('getMonthName', () => {
	const months = ['December', 'January','February','March','April','May','June','July','August','September','October','November']
	it('returns the English name of the month (zero indexed)', () => {
		for (let month = -30; month < 30; month++) {
			expect(getMonthName(month)).toEqual(months[month % 12])
		}
	})
})
