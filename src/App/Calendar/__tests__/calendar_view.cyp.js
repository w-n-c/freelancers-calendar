describe('Calendar component renders', function() {
	it('should display the days of the week', function() {
		const days = ['S', 'M', 'Ty', 'Wday', 'Tay', 'F', 'Say']
		cy
			.visit('/')
			.get('th')
			.each(($th, i) => {
				cy.wrap($th).contains(days[i])
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
			.get('nav')
			.contains('View')
			.trigger('mouseover')
			.get('.dropdown')
			.contains('Weekly')
			.click()
			.url().should('eq','/weekly/2019/4/26')
	})

	it.skip('should navigate between weeks and months depending on view', function() {
	})

	it.skip('should roll over to the next month and year on date change', function() {
	})

	it.skip('should link you back to today with your current view', function() {
	})

	it.skip('', function() {
	})

})
