export const isToday = ({ year, month, date }, today) => {
	if (`${year}/${month}/${date}` === today) {
		return { today: 'today' }
	}
	return false
}
