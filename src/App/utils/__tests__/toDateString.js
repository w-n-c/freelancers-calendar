import { toDateString } from '../toDateString'

describe('toDateString', () => {
	it('returns a YYYY/M/D string from a date', () => {
		const testOne = new Date('2019/10/4')
		expect(toDateString(testOne)).toEqual('2019/10/4')
		const testTwo = new Date('2012/1/2')
		expect(toDateString(testTwo)).toEqual('2012/1/2')
		const testThree = new Date('2020/11/28')
		expect(toDateString(testThree)).toEqual('2020/11/28')
	})
})
