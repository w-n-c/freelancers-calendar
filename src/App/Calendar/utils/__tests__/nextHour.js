import { nextHour } from '../nextHour'
describe('nextHour', () => {
	it('returns a new date with the hour advanced by one', () => {
		const seed = new Date()
		const test = new Date(seed)
		const result = new Date(seed)
		result.setHours(result.getHours() + 1)
		expect(nextHour(test)).toEqual(result)
	})
})
