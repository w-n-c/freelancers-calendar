import { chunk, getDaysOfMonth } from '../'

context('unit test monthly utility functions', function() {
	context('array chunking', function() {
		const input = new Array(10).fill().map((_, i) => i)
		const result = chunk(input, 5)

		specify('chunk splits an array on the given interval', () => {
			const solution = [[0,1,2,3,4],[5,6,7,8,9]]
			expect(result).to.deep.eq(solution)
		})

		specify('chunk should not modify the original array', () => {
			expect(result).to.not.equal(input)
		})

	})
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
