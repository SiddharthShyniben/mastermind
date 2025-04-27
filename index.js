import readline from "node:readline";
import process from "node:process";

import {allCombs} from "./data.js";
import {matches} from "./check.js";
import {bestGuess} from "./optimize.js";

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})

const question = (q) => new Promise(resolve => rl.question(q, answer => resolve(answer)))

let possibilities = allCombs
let firstGuess = true;

while (possibilities.length > 1) {
	console.log(possibilities.length, "possibilities")

	const guess = firstGuess ? "RYBG" : bestGuess(possibilities)
	if (firstGuess) firstGuess = false;

	console.log("My guess:", guess)

	const input = await question("Input? ")

	const state = {placed: 0, misplaced: 0}
	for (let char of input) {
		if (char == "R") state.placed++
		else if (char == "W") state.misplaced++
	}

	possibilities = possibilities.filter(p => matches(p, guess, state))
}

if (possibilities.length) console.log("Answer:", possibilities[0])
else console.log("No solution found!")

rl.close()
