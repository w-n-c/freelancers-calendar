import { chunk } from '../'
context('arrays', function() {
	const input = new Array(10).fill().map((_, i) => i)
	const result = chunk(input, 5)

	specify('chunk splits an array on the given interval', () => {
		const solution = [[0,1,2,3,4],[5,6,7,8,9]]
		expect(result).to.deep.eq(solution)
	})

	specify('chunk should not modify the original array', () => {
		expect(result).to.not.equal(input)
	})

})
