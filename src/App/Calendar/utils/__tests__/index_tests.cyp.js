// 1-4 digit number -> 1:00, 12:00, 01:23, 12:34 as outputs
import { intToTimeString, isoDateToDateString } from '../'
context('unit tests for utility functions', function() {
	specify('intToTimeString returns a 24hr hh:mm time string form a 1-4 digit number', function() {
		expect(intToTimeString(0)).to.equal('00:00')
		expect(intToTimeString(9)).to.equal('09:00')
		expect(intToTimeString(14)).to.equal('14:00')
		expect(intToTimeString(123)).to.equal('01:23')
		expect(intToTimeString(1343)).to.equal('13:43')

		// intToTimeString does not validate the time
		expect(intToTimeString(4596)).to.equal('45:96')
		// numbers longer than 4 digits return an empty string
		expect(intToTimeString(23403)).to.equal('')
	})

	specify('isoDateToDateString returns a yyyy/[m]m/[d]d string when given an ISO 8601 string', function() {
		expect(isoDateToDateString(new Date('1990/8/24').toISOString())).to.equal('1990/8/24')
		expect(isoDateToDateString(new Date('2018/11/1').toISOString())).to.equal('2018/11/1')
	})

})
