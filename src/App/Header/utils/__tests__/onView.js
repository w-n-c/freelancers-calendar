import { isWeekly, isMonthly, onView } from '../onView'

describe('onView and its helpers', () => {
	describe('onView', () => {
		it('returns a callback correlating to the current view', () => {
			const weeklyCb = jest.fn()
			const monthlyCb = jest.fn()
			const test_onView = onView({ weekly: weeklyCb, monthly: monthlyCb })

			// Returns an empty function if the view doesn't match Weekly or Monthly
			expect(onView('')).toBeInstanceOf(Function)
			expect(onView('anything')).toBeInstanceOf(Function)
			expect(test_onView('weekly')).toBe(weeklyCb)
			expect(test_onView('monthly')).toBe(monthlyCb)
		})
	})
	describe('isWeekly', () => {
		it("returns true if given string is 'weekly'", () => {
			expect(isWeekly('')).toBe(false)
			expect(isWeekly('anything')).toBe(false)
			expect(isWeekly('monthly')).toBe(false)
			expect(isWeekly('weekly')).toBe(true)
		})
	})

	describe('isMonthly', () => {
		it("returns true if given string is 'monthly'", () => {
			expect(isMonthly('')).toBe(false)
			expect(isMonthly('anything')).toBe(false)
			expect(isMonthly('weekly')).toBe(false)
			expect(isMonthly('monthly')).toBe(true)
		})
	})
})
