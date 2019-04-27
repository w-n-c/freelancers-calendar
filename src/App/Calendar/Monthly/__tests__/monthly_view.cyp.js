import {getDaysOfMonth} from '../'
describe('Monthly component renders', function() {
	it('should display 5 weeks with dates', function() {
		const dates = getDaysOfMonth(2019,4,26)
		cy
			.visit('/monthly/2019/4/26')
			.get('tbody > tr').should('have.length', 5)
			.children().should('have.length', 35)
			.each(($td, i) => {
				cy.wrap($td).contains(dates[i])
			})
	})
})
