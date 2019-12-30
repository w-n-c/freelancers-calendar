import { url } from '../url'

describe('url', () => {
	it('builds the url from event info, date, and the view', () => {
		const view = 'view'
		const date = 'date'
		const event = 'event'
		const correctUrl = `/calendar/${view}/${date}/${event}`

		expect(url(event, date, view)).toEqual(correctUrl)
		expect(url(event)(date)(view)).toEqual(correctUrl)
	})
})
