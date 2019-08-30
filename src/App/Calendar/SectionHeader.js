import React from 'react'

const SectionHeader = (props) => {
	const { children, ariaHeader = '', className, role } = props
	return (
		<h2 className={className} role={role} aria-label={ariaHeader}>
			{ariaHeader ? <span className="aria-only">{ariaHeader}</span> : '' }
			{children ? <span aria-hidden="true">{children}</span> : '' }
		</h2>
	)
}

export default SectionHeader
