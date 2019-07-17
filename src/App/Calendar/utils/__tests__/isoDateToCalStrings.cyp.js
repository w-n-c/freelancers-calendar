// I think several of these tests only pass if in same time zone as the author (US-East)
// Should update by creating new date objects and building the yyyy/mm/dd and hh:mm
// strings from those manually rather than just writing the correct value in.

import { isoDateToDateString, isoDateToTimeString, isoDateToCalStrings } from '../isoDateToCalStrings'

context('tests for isoDateToCalStrings and its implementation fns', function() {

	specify('isoDateToDateString returns a yyyy/[m]m/[d]d string when given an ISO 8601 string', function() {
		expect(isoDateToDateString(new Date('1990/8/24').toISOString())).to.equal('1990/8/24')
		expect(isoDateToDateString(new Date('2018/11/1').toISOString())).to.equal('2018/11/1')
	})

	specify('isoDateToTimeString returns a 24hr hh:mm time string when given an ISO 8601 string', function() {
		expect(isoDateToTimeString('2019-07-17T22:05:54.930Z')).to.equal('18:05')
		expect(isoDateToTimeString('2019-07-17T00:00:00.930Z')).to.equal('20:00')
		expect(isoDateToTimeString('2019-07-17T08:25:04.930Z')).to.equal('04:25')
	})

	specify('isoDateToCalStrings returns a length 2 array with a yyyy/[m]m/[d]d string and a hh:mm string', function() {
		expect(isoDateToCalStrings('2019-07-17T22:05:54.930Z'))
			.to.deep.equal(['2019/7/17', '18:05'])
		expect(isoDateToCalStrings('2018-04-03T00:00:00.930Z'))
			.to.deep.equal(['2018/4/2', '20:00'])
		// daylight savings time changes this from same time in isoDateToTimeString
		expect(isoDateToCalStrings('2020-11-30T08:25:04.930Z'))
			.to.deep.equal(['2020/11/30', '03:25'])
	})
})
