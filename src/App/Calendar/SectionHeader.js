import React from 'react'

const SectionHeader = (props) => {
	const { visualHeader, ariaHeader = '', className, role } = props
	return (
		<h2 className={className} role={role} aria-label={ariaHeader}>
			{ariaHeader ? <span className="aria-only">{ariaHeader}</span> : '' }
			{visualHeader ? <span aria-hidden="true">{visualHeader}</span> : '' }
		</h2>
	)
}

export default SectionHeader
