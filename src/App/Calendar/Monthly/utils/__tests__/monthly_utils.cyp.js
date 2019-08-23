import { getDaysOfMonth } from '../'

context('unit test monthly utility functions', function() {
	specify('getDaysOfMonth should return 6 weeks worth of days occurring around the month of the given date', function() {
		let month = [{ year: 2019, month: 6, date: 30 }]
		for (let i = 1; i <= 31; i++) {
			month.push({year: 2019, month: 7, date: i})
		}
		for (let i = 1; i <= 10; i++) {
			month.push({year: 2019, month: 8, date: i})
		}
		expect(getDaysOfMonth(2019, 7, 17)).to.deep.equal(month)
	})

})
