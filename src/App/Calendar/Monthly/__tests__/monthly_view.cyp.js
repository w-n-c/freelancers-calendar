import {getDaysOfMonth} from '../utils'

describe('Monthly component renders', function() {
	it('should display 6 weeks with dates', function() {
		const weekCount = 6
		const dates = getDaysOfMonth(2019,5,26)
		cy
			.visit('/monthly/2019/5/26')
			.get('tbody > tr').should('have.length', weekCount)
			.children().should('have.length', weekCount*7)
			.each(($td, i) => {
				cy.wrap($td).contains(dates[i].date)
			})
	})
	it.skip(`should correctly render user's events`, function() {
		// will wait to set up login before properly testing events
	})
})
