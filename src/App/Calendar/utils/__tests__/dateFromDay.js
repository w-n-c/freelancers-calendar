import { dateFromDay } from '../'

	// const dateFromDay = ({year, month, date, hour}) => {
	// 	const dateObj = new Date(`${year}/${month}/${date}`)
	// 	if (hour)
	// 		dateObj.setHours(hour)
	// 	return dateObj
	// }

describe('dateFromDay', ()=> {
	it('returns a javascript Date object from a day object', () => {
		const example = {
			year: '2019',
			month: '11',
			date: '21',
		}
		const hourExample = {
			year: '2024',
			month: '2',
			date: '7',
			hour: '11'
		}

		const expected = new Date('2019/11/21')
		const hourExpected = new Date('2024/2/7')
		hourExpected.setHours('11')

		expect(dateFromDay(example)).toEqual(expected)
		expect(dateFromDay(hourExample)).toEqual(hourExpected)
	})
})
