export const nextHour = date => {
	const next = new Date(date)
	next.setHours(next.getHours() + 1)
	return next
}
