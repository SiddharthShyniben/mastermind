import {writeFileSync} from "node:fs";

import {allCombs} from "./data.js"
import {check, matches} from "./check.js"
import {bestGuess} from "./optimize.js"

const DATA = {
	maxGuess: -Infinity,
}

let sum = 0;

function test(word) {
	let stamp = Date.now();

	let possibilities = allCombs;
	let firstGuess = true;

	let guesses = 0;

	while (possibilities.length > 1) {
		const guess = firstGuess ? "RYBG" : bestGuess(possibilities)
		if (firstGuess) firstGuess = false;

		const state = check(guess, word)
		possibilities = possibilities.filter(p => matches(p, guess, state))
		guesses++;
	}

	if (guesses > DATA.maxGuess) DATA.maxGuess = guesses

	sum += guesses
	
	console.log(word, "guessed in", guesses, "tries")
}

console.time("Testing took")
for (const word of allCombs) {
	test(word)
}
console.timeEnd("Testing took")

DATA.averageGuess = sum / allCombs.length
console.log(DATA)
writeFileSync("data.json", JSON.stringify(DATA, null, "\t"))
