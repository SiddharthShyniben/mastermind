import memoize from "memoize";

import {matches} from "./check.js";
import {allCombs} from "./data.js";

const possibleStates = [
	[0, 0], [0, 1], [0, 2], [0, 3], [0, 4],
	[1, 0], [1, 1], [1, 2], [1, 3],
	[2, 0], [2, 1], [2, 2],
	[3, 0], [3, 1],
	[4, 0]
].map(([placed, misplaced]) => ({placed, misplaced}))

function _bestGuess(possibilities) {
	let bestGuess = null;
	let bestScore = -Infinity;

	for (const guess of allCombs) {
		let entropy = 0;

		for (const state of possibleStates) {
			const remaining = possibilities.filter(p => matches(p, guess, state));
			const probability = remaining.length / possibilities.length
			const information = -Math.log2(probability)

			if (probability != 0) {
				entropy += information * probability;
			}
		}

		if (entropy > bestScore) {
			bestScore = entropy;
			bestGuess = guess;
		}
	}

	return bestGuess;
}

export const bestGuess = memoize(_bestGuess, {cacheKey: JSON.stringify})
