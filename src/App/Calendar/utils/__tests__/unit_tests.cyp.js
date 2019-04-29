import { getMonthName, incMonth, decMonth, incWeek, decWeek, changeMonth } from '../'
context('unit tests for utility functions', function() {
	specify('getMonthName returns a month name from a 1 indexed month number', function() {
		let result = getMonthName(0)
		expect(result).to.equal('')
		result = getMonthName(1)
		expect(result).to.equal('January')
		result = getMonthName(5)
		expect(result).to.equal('May')
		result = getMonthName(12)
		expect(result).to.equal('December')
		result = getMonthName(13)
		expect(result).to.equal('')
	})
})
