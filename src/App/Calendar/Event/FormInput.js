import React from 'react'
import { camelCase, kebabCase } from 'lodash/fp'

const FormInput = (props) => {
	const { label, wrapperClass, value, handler, autoFocus, type } = props
	const name = camelCase(label)
	const id = kebabCase(label)
	return (
		<div className={wrapperClass || id}>
			<label>{label}
				<input {...{
					autoFocus,
					name,
					value,
					type,
					onChange: handler
					}}/>
			</label>
		</div>
	)
}

export default FormInput
