import { changeMonth } from '../changeMonth'

// changeMonth is ancient and translates between a date parsed from the url and the built in js Date object. The code is even more confusing than its declaration, and should be re-written.

// changeMonth's 'month' is 1 indexed, for example January is month 1, August is 8, etc.
describe('changeMonth', () => {
	it('increments and decrements the month', () => {
		const date1 = { year: 2019, month: 5, date: 11 }
		expect(changeMonth(date1, 'inc')).toEqual(new Date('2019/6/11'))
		expect(changeMonth(date1, 'dec')).toEqual(new Date('2019/4/11'))

		const date2 = { year: 2016, month: 11, date: 3 }
		expect(changeMonth(date2, 'inc')).toEqual(new Date('2016/12/3'))
		expect(changeMonth(date2, 'dec')).toEqual(new Date('2016/10/3'))
	})

	it('adjusts the year as necessary', () => {
		const date1 = { year: 2019, month: 12, date: 11 }
		expect(changeMonth(date1, 'inc')).toEqual(new Date('2020/1/11'))
		expect(changeMonth(date1, 'dec')).toEqual(new Date('2019/11/11'))

		const date2 = { year: 2016, month: 1, date: 3 }
		expect(changeMonth(date2, 'inc')).toEqual(new Date('2016/2/3'))
		expect(changeMonth(date2, 'dec')).toEqual(new Date('2015/12/3'))
	})

	it('moves the day to handle changes in month length', () => {
		const date1 = { year: 2020, month: 1, date: 31 }
		expect(changeMonth(date1, 'inc')).toEqual(new Date('2020/2/29'))
		expect(changeMonth(date1, 'dec')).toEqual(new Date('2019/12/31'))

		const date2 = { year: 2017, month: 4, date: 30 }
		expect(changeMonth(date2, 'inc')).toEqual(new Date('2017/5/30'))
		expect(changeMonth(date2, 'dec')).toEqual(new Date('2017/3/30'))
	})

})
