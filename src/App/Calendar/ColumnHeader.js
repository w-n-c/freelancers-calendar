import React from 'react'

const ColumnHeader = ({visualHeader, ariaHeader}) =>
	<h2 role="columnheader" aria-readonly="true" aria-label={ariaHeader}>
		<span className="aria-only">{ariaHeader}</span>
		<span aria-hidden="true">{visualHeader}</span>
	</h2>

export default ColumnHeader
