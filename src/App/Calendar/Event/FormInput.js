import React from 'react'
import { camelCase, kebabCase } from 'lodash/fp'

const FormInput = (props) => {
	const { label, wrapperClass, value, handler, autoFocus } = props
	const name = camelCase(label)
	const id = kebabCase(label)
	return (
		<div className={wrapperClass || id}>
			<label htmlFor={id}>{label}</label>
			<input
				autoFocus={autoFocus}
				name={name}
				type="text"
				id={id}
				onChange={handler}
				value={value}
			/>
		</div>
	)
}

export default FormInput
