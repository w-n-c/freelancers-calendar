import { isoDateToDateString, isoDateToTimeString, isoDateToCalStrings } from '../isoDateToCalStrings'

describe('isoDateToCalStrings and its helpers', () => {
	const date = new Date('2019/10/4')
	const example = date.toISOString()

	const timeDate = new Date('2018/4/16')
	timeDate.setHours(14)
	timeDate.setMinutes(24)
	const timeExample = timeDate.toISOString()

	describe('isoDateToDateString', () => {
		it('should return a formatted date', () => {
			expect(isoDateToDateString(example)).toBe('2019/10/4')
			expect(isoDateToDateString(timeExample)).toBe('2018/4/16')
		})
	})

	describe('isoDateToTimeString', () => {
		it('should return a formatted time', () => {
			expect(isoDateToTimeString(example)).toBe('00:00')
			expect(isoDateToTimeString(timeExample)).toBe('14:24')
		})
	})

	describe('isoDateToCalStrings', () => {
		it('should return an array with formatted date and time', () => {
			expect(isoDateToCalStrings(example)[0]).toBe('2019/10/4')
			expect(isoDateToCalStrings(example)[1]).toBe('00:00')
			expect(isoDateToCalStrings(timeExample)[0]).toBe('2018/4/16')
			expect(isoDateToCalStrings(timeExample)[1]).toBe('14:24')
		})
	})
})
