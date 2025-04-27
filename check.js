export function check(answer, guess) {
	answer = [...answer];
	guess = [...guess]

	const out = {placed: 0, misplaced: 0}

	for (let i = 0; i < answer.length; i++) {
		if (answer[i] == guess[i] && answer[i] != ".") {
			out.placed++
			answer[i] = guess[i] = "."
		} 
	}

	for (let i = 0; i < answer.length; i++) {
		if (answer.includes(guess[i]) && guess[i] != ".") {
			out.misplaced++
			answer[answer.indexOf(guess[i])]  = guess[i] = "."
		}
	}

	return out;
}

export function matches(answer, guess, out) {
	const otherOut = check(answer, guess)
	return otherOut.placed == out.placed && otherOut.misplaced == out.misplaced
}
