import { weekdayNames } from '../Calendar'
describe('Calendar component renders', function() {
	it('should display the days of the week', function() {
		cy
			.visit('/')
			.get('th')
			.each(($th, i) => {
				cy.wrap($th).contains(weekdayNames[i])
			})
	})

	it('should display the calendar header', function() {
		cy
			.visit('/monthly/2019/4/26')
			.get('header').contains('April 2019')
	})

	it('should display different calendar views based on url', function() {
		cy
			.visit('/monthly/2019/4/26')
			.get('.monthly').eq(0)
			.visit('/weekly/2019/4/26')
			.get('.weekly').eq(0)
	})

	it('should allow you to change view in the header', function() {
		cy
			.visit('/monthly/2019/4/26')
			.contains('Weekly')
			.click({force: true})
			.url().should('eq','http://localhost:3000/weekly/2019/4/26')
			.get('header')
			.contains('Monthly')
			.click({force: true})
			.url().should('eq','http://localhost:3000/monthly/2019/4/26')
	})

	it('should navigate between weeks and months depending on view', function() {
		cy
			.visit('/monthly/2019/4/26')
			.contains('>').click()
			.url().should('eq', 'http://localhost:3000/monthly/2019/5/26')
			.get('header').contains('<').click()
			.url().should('eq', 'http://localhost:3000/monthly/2019/4/26')
			.visit('/weekly/2019/4/26')
			.contains('>').click()
			.url().should('eq', 'http://localhost:3000/weekly/2019/5/3')
			.get('header').contains('<').click()
			.url().should('eq', 'http://localhost:3000/weekly/2019/4/26')
	})

	it('should roll over to the next month and year on date change', function() {
		cy
			.visit('/monthly/2019/12/27')
			.contains('>').click()
			.url().should('eq', 'http://localhost:3000/monthly/2020/1/27')
			.get('header').contains('<').click()
			.url().should('eq', 'http://localhost:3000/monthly/2019/12/27')
			.visit('/weekly/2019/12/27')
			.contains('>').click()
			.url().should('eq', 'http://localhost:3000/weekly/2020/1/3')
			.get('header').contains('<').click()
			.url().should('eq', 'http://localhost:3000/weekly/2019/12/27')
	})

	it('should link you back to today with your current view', function() {
		cy
			.clock()
			.visit('/monthly/2019/12/27')
			.contains('Today').click()
			.url().should('eq', 'http://localhost:3000/monthly/1969/12/31')
	})
})
