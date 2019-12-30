import { toDateString } from '../../../utils'
import { onView } from '../onView'
import { changeMonth } from '../changeMonth'

import { incMonth, decMonth, incWeek, decWeek, incRoute, decRoute } from '../changeRoute'

describe('change route url generators', () => {
	const date = { year: 2017, month: 5, date: 31 }
	describe('incMonth/decMonth', () => {
		it('should change the month and return as a date string', () => {
			expect(incMonth(date)).toBe(toDateString(changeMonth(date, 'inc')))
			expect(decMonth(date)).toBe(toDateString(changeMonth(date, 'dec')))
		})
	})
	describe('incWeek/decWeek', () => {
		it('should change the week and return a date sring', () => {
			const decreased = { year: 2017, month: 5, date: 24 }
			const increased = { year: 2017, month: 6, date: 7 }
			const toDateStr = ({year, month, date}) => toDateString(new Date(`${year}/${month}/${date}`))
			expect(incWeek(date)).toBe(toDateStr(increased))
			expect(decWeek(date)).toBe(toDateStr(decreased))
		})
	})
	describe('incRoute/decRoute', () => {
		it('returns a ternary for weekly/monthly callbacks', () => {
			expect(incRoute('weekly')(date)).toEqual(incWeek(date))
			expect(decRoute('weekly')(date)).toEqual(decWeek(date))
			expect(incRoute('monthly')(date)).toEqual(incMonth(date))
			expect(decRoute('monthly')(date)).toEqual(decMonth(date))
		})
	})
})
