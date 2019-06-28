export const lengthInHours = (t1, t2) =>
	Math.abs(
		(new Date(t1) - new Date(t2))
		/ 3600000
	)

export const toTimeString = (num) => {
	let c = ''
	switch (num.toString().length) {
		case 1:
			return `0${num}:00`
		case 2:
			return `${num}:00`
		case 3:
			c = num.toString().split('')
			return `0${c[0]}:${c[1]}${c[2]}`
		case 4:
			c = num.toString().split('')
			return `${c[0]}${c[1]}:${c[2]}${c[3]}`
		default:
			console.log(`Err: incorrect time format, expected 1-2 digit number, got: ${num}`)
			return ``
	}
}

export const isoDateToTimeString = (isoDate) => {
	const date = new Date(isoDate)
	return toTimeString(`${date.getHours()}${date.getMinutes()}`)
}
