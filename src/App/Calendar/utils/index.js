import { toDateString } from './toDateString'

export const intToTimeString = (num) => {
	let time = num.toString()
	switch (time.length) {
		case 1:
			return `0${time}:00`
		case 2:
			return `${time}:00`
		case 3:
			time = time.split('')
			return `0${time[0]}:${time[1]}${time[2]}`
		case 4:
			time = time.split('')
			return `${time[0]}${time[1]}:${time[2]}${time[3]}`
		default:
			console.log(`Err: incorrect time format, expected 1-4 digit number, got: ${num}`)
			return ``
	}
}

export const isoDateToTimeString = (isoDate) => {
	// we create a new Date to adjust time to local timezone
	const date = new Date(isoDate)
	return intToTimeString(`${date.getHours()}${date.getMinutes()}`)
}

export const ymdToIsoDate = (year, month, day) =>
	new Date(`${year}/${month}/${day}`).toISOString()

export const isoDateToCalStrings = (isoDate) => {
	return [toDateString(new Date(isoDate)), isoDateToTimeString(isoDate)]
}
