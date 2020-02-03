import React from 'react'
import { camelCase, kebabCase } from 'lodash/fp'

const FormInput = (props) => {
	const { label, wrapperClass, value, handler, autoFocus, type, error} = props
	const name = camelCase(label)
	const id = kebabCase(label)
	return (
		<div className={`${wrapperClass || id}${ error ? ' error': ''}`}>
			<label>{label}
				<input {...{
					autoFocus,
					name,
					value,
					type,
					onChange: handler
					}}/>
			</label>
			{ error && <span class="error-text">{error} </span>}
		</div>
	)
}

export default FormInput
