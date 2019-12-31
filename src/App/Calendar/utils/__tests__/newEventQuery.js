import { newEventQuery } from '../newEventQuery'
describe('newEventQuery', () => {
	it('builds a url query string from a js Date object', () => {
		const dateOne = new Date('2019/12/31')
		dateOne.setHours(16)
		const dateTwo = new Date('2012/1/7')
		dateTwo.setHours(3)

		const strOne = 'new?year=2019&month=12&date=31&hour=16'
		const strTwo = 'new?year=2012&month=1&date=7&hour=3'
		expect(newEventQuery(dateOne)).toEqual(strOne)
		expect(newEventQuery(dateTwo)).toEqual(strTwo)
	})
})
