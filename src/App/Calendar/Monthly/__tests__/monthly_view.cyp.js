import {days as dates } from '../'
describe('Monthly component renders', function() {

	it('should display 5 weeks with dates', function() {
		cy
			.visit('/')
			.get('tbody>tr').should('have.length', 5)
			.children().should('have.length', 35)
			.each(($td, i) => {
				cy.wrap($td).contains(dates[i])
			})
	})
})
