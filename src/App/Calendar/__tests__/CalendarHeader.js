import React from 'react'
import ReactDOM from 'react-dom'
import CalendarHeader, { weekdayAbbr } from '../CalendarHeader'
import { getWeek } from '../Weekly/utils'

describe('<CalendarHeader />', () => {
	it('renders without crashing', () => {
		const div = document.createElement('div')
		ReactDOM.render(<CalendarHeader />, div)
		ReactDOM.unmountComponentAtNode(div)
	})

	describe('given different views', () => {
		const date = { year: 2019, date: 20, month: 7 }
		const week = getWeek(date)
		const monthly = shallow(<CalendarHeader {...date} route={'monthly'} />)
		const weekly = shallow(<CalendarHeader {...date} route={'weekly'} />)
		it('displays the day of the week for both views', () => {
			monthly.find('SectionHeader').forEach((node, i) => {
				expect(node.children().first().text()).toEqual(weekdayAbbr[i])
			})
			weekly.find('SectionHeader').forEach((node, i) => {
				expect(node.children().first().text()).toEqual(`${weekdayAbbr[i]}${week[i].date}`)
			})
		})

		it('displays the day of the month only for weekly view', () => {
			const week = getWeek(date)
			weekly.find('SectionHeader').forEach((node, i) => {
				expect(node.children().last().text()).toEqual(`${weekdayAbbr[i]}${week[i].date}`)
			})
			monthly.find('SectionHeader').forEach((node, i) => {
				expect(node.children().last().text()).toEqual(`${weekdayAbbr[i]}`)
			})
		})

		it('adds padding elements only for weekly view', () => {
			expect(monthly.find('span')).toHaveLength(0)
			expect(weekly.find('span')).toHaveLength(2)
			expect(weekly.find('.header-group').children().first().type()).toEqual('span')
			expect(weekly.find('.header-group').children().last().type()).toEqual('span')
		})

	})
})
