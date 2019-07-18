import { getWeek, lengthInHours } from '../'
context('unit tests for weekly utility functions', function() {
	specify('getWeek returns the dates of the week containing the given date, starting with sunday', function() {
		const test1 = { year: 2019, month: 5, day: 23 }
		expect(getWeek(test1)).to.deep.equal([19,20,21,22,23,24,25])
		const test2 = { year: '2019', month: '8', day: '1' }
		expect(getWeek(test2)).to.deep.equal([28,29,30,31,1,2,3])
	})

	specify('lengthInHours returns the time gap between two dates in hours', function () {
		const start = new Date('2019/07/17')
		const end = new Date('2019/07/17')
		end.setHours(end.getHours() + 2)
		expect(lengthInHours(start, end)).to.equal(2)
		start.setHours(start.getHours() + 4)
		expect(lengthInHours(start, end)).to.equal(2)
		end.setHours(end.getHours() + 9)
		expect(lengthInHours(start, end)).to.equal(7)
	})
})
