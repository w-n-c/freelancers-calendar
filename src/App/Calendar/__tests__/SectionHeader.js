import React from 'react'
import ReactDOM from 'react-dom'
import SectionHeader from '../SectionHeader'

function setup() {
	const baseProps = {
		role: 'columnheader',
		className: 'myClass'
	}
	const ariaOnlyProps = {
		ariaHeader: 'only for aria',
		...baseProps
	}
	const visualOnlyProps = {
		children: [<br key={1} />, <div key={2}>test</div>],
		...baseProps
	}
	const fullProps = {
		...ariaOnlyProps,
		...visualOnlyProps
	}
	const wrapper = (props) => shallow(<SectionHeader {...props} />)
	return { baseProps, ariaOnlyProps, visualOnlyProps, fullProps, wrapper }
}

describe('<SectionHeader />', () => {
	it('renders without crashing', ()=> {
		const div = document.createElement('div')
		ReactDOM.render(<SectionHeader />, div)
	})

	it('applies role and class from props', () => {
		const { wrapper, baseProps } = setup()
		const header = wrapper(baseProps)
		expect(header.hasClass(baseProps.className)).toBe(true)
		expect(header.prop('role')).toBe(baseProps.role)
	})

	describe('builds several header types', () => {
		it('returns aria-only headers', () => {
			const { wrapper, ariaOnlyProps } = setup()
			const header = wrapper(ariaOnlyProps)
			expect(header.find('.aria-only').text()).toEqual(ariaOnlyProps.ariaHeader)
			expect(header.children()).toHaveLength(1)
		})

		it('returns visual-only headers', () => {
			const { wrapper, visualOnlyProps } = setup()
			const header = wrapper(visualOnlyProps)
			expect(header.find('.aria-only')).toHaveLength(0)
			expect(header.find('span').filterWhere(node => node.prop('aria-hidden'))).toHaveLength(1)
			expect(header.find('span').contains(visualOnlyProps.children)).toBe(true)
		})

		it('returns compound aria/visual headers', () => {
			const { wrapper, fullProps } = setup()
			const header = wrapper(fullProps)
			expect(header.children()).toHaveLength(2)
			expect(header.find('.aria-only').text()).toEqual(fullProps.ariaHeader)
			expect(header.find('span').filterWhere(node => node.prop('aria-hidden'))).toHaveLength(1)
			expect(header.find('span').contains(fullProps.children)).toBe(true)
		})
	})
})
