export const newEventQuery = (date) =>
	`new
		?year=${date.getFullYear()}
		&month=${date.getMonth() + 1}
		&date=${date.getDate()}
		&hour=${date.getHours()}
	`
