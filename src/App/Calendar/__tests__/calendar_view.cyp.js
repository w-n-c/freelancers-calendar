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
})
