export const chunk = (arr, len) => {
	const chunks = []
	for (let i = 0; i < arr.length; i += len) {
		chunks.push(arr.slice(i, i + len))
	}
	return chunks
}
