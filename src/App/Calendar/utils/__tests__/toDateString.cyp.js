import { toDateString } from '../toDateString'
specify('toDateString takes a JS date object and returns a yyyy/[m]m/[d]d string', function() {
	expect(toDateString(new Date('1990/8/24'))).to.equal('1990/8/24')
	expect(toDateString(new Date('2018/11/1'))).to.equal('2018/11/1')
})
