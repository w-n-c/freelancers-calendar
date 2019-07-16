import { getMonthName, incMonth, decMonth, incWeek, decWeek, changeMonth } from '../'
context('unit tests for utility functions', function() {
	specify('getMonthName returns a month name from a 1 indexed month number', function() {
		expect(getMonthName(0)).to.equal('December')
		expect(getMonthName(1)).to.equal('January')
		expect(getMonthName(5)).to.equal('May')
		expect(getMonthName(12)).to.equal('December')
		expect(getMonthName(13)).to.equal('January')
	})

	specify('changeMonth return a new date object moved 1 month', function() {
		expect(changeMonth(2019, 4, 24, 'inc'))
			.to.deep.equal(new Date('2019/5/24'))
		expect(changeMonth(2019, 4, 24, 'dec'))
			.to.deep.equal(new Date('2019/3/24'))
	})

	specify('changeMonth should handle differing month lengths', function() {
		/*
		 * If the returned month is shorter than given, move to last day of new month
		*/
		// increment to shorter month
		expect(changeMonth(2019, 3, 31, 'inc'))
			.to.deep.equal(new Date('2019/4/30'))
		// decrement to shorter month
		expect(changeMonth(2019, 3, 31, 'dec'))
			.to.deep.equal(new Date('2019/2/28'))
		// decrement to Feb on leap year
		expect(changeMonth(2020, 3, 31, 'dec'))
			.to.deep.equal(new Date('2020/2/29'))
		// July <-> August stays 31 <-> 31
		expect(changeMonth(2019, 7, 31, 'inc'))
			.to.deep.equal(new Date('2019/8/31'))
		expect(changeMonth(2019, 8, 31, 'dec'))
			.to.deep.equal(new Date('2019/7/31'))
	})

	specify('incMonth returns a yyyy/m[m]/d[d] string with month incremented', function() {
		expect(incMonth(2019, 4, 5)).to.equal('2019/5/5')
		expect(incMonth(2019, 10, 31)).to.equal('2019/11/30')
		expect(incMonth(2019, 12, 31)).to.equal('2020/1/31')
	})
	specify('decMonth returns a yyyy/m[m]/d[d] string with month decremented', function() {
		expect(decMonth(2019, 4, 5)).to.equal('2019/3/5')
		expect(decMonth(2019, 10, 31)).to.equal('2019/9/30')
		expect(decMonth(2019, 1, 31)).to.equal('2018/12/31')
	})
	specify('incWeek returns a yyyy/m[m]/d[d] string with a week incremented', function() {
		expect(incWeek(2019, 4, 5)).to.equal('2019/4/12')
		expect(incWeek(2019, 10, 30)).to.equal('2019/11/6')
		expect(incWeek(2019, 12, 31)).to.equal('2020/1/7')
	})
	specify('decWeek returns a yyyy/m[m]/d[d] string with a week decremented', function() {
		expect(decWeek(2019, 4, 5)).to.equal('2019/3/29')
		expect(decWeek(2019, 10, 31)).to.equal('2019/10/24')
		expect(decWeek(2019, 1, 3)).to.equal('2018/12/27')
	})
})
