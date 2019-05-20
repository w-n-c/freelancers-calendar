import {getDaysOfMonth} from '../'

describe('Monthly component renders', function() {
	it('should display 5 weeks with dates', function() {
		const dates = getDaysOfMonth(2019,5,26)
		cy
			.visit('/monthly/2019/5/26')
			.get('tbody > tr').should('have.length', 5)
			.children().should('have.length', 35)
			.each(($td, i) => {
				cy.wrap($td).contains(dates[i].getDate())
			})
	})
	it.skip(`should correctly render user's events`, function() {
		// will wait to set up login before properly testing events
	})
})
