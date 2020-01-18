export const lengthInHours = (t1, t2) =>
	Math.abs(
		(new Date(t1) - new Date(t2))
		/ 3600000
	)
