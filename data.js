export const codes = {
	Red: 'R',
	Yellow: 'Y',
	Blue: 'B',
	Green: 'G',
	Purple: 'P',
	Orange: 'O',
}

const colors = Object.keys(codes);
const codesArr = Object.values(codes);

export function generatePossibilities() {
	const output = []

	for (let i = 0; i < codesArr.length; i++) {
		for (let j = 0; j < codesArr.length; j++) {
			for (let k = 0; k < codesArr.length; k++) {
				for (let l = 0; l < codesArr.length; l++) {
					output.push([i, j, k, l].map(x => codesArr[x]).join(""));
				}
			}
		}
	}

	return output
}

export const allCombs = generatePossibilities()
