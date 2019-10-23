export const zeroPad = string => `0${string}`

export const padIfLenOne = string => string.toString().length === 1 ? zeroPad(string) : `${string}`

export const formatTime = (time) => {
	const [hours, minutes] = time.split(':')
	return `${padIfLenOne(hours)}:${padIfLenOne(minutes)}`
}

