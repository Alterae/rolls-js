import Results from "./types/Results";
import Dice from "./types/Dice";

/**
 * Dice notation regex.
 */
const regex = /(?:(\d+)\s*X\s*)?(\d*)D(\d*)((?:[+\/*-]\d+)|(?:[+-][LH]))?/i;

/**
 * Rolls a set of dice described in dice notation (AdX+/-B).  If multiple rolls
 * are provided, will curl up in a ball and die.
 *
 * @param dice The dice to roll.
 */
function roll(dice: string): void {
	console.log(rollDice(parseDice(dice)));
}

/**
 * Parses dice notation and returns a `Roll`.  Modifier can be negative, but
 * both the number of dice to roll and the number of sides must be non-negative
 * if specified.
 *
 * @param dice The dice roll to parse, in dice notation (AdX+/-B).
 *
 * @throws Will throw an error if the dice notation is invalid.
 * @returns A `Roll` parsed from the dice notation.
 */
function parseDice(dice: string): Dice {
	if (/\s+/.test(dice)) {
		throw new Error(
			`Invalid dice notation "${dice}".` +
				"Can only parse one roll at a time."
		);
	}

	dice = dice.replace("-", "+-");
	if (hasMultiplePlusses(dice)) {
		throw new Error(
			`Invalid dice notation "${dice}." ` +
				"Cannot roll a negative number of dice, nor dice with a \
				negative number of sides."
		);
	}

	const match = dice.match(regex)?.[0] ?? "";
	if (match === "") {
		throw new Error(`Invalid dice notation: ${dice}.`);
	}

	const [rolls, modifier] = match.split("+");

	const [num, sides] = rolls.split("d");

	return {
		num: toIntOr(num, 1),
		sides: toIntOr(sides, 6),
		modifier: toIntOr(modifier, 0),
	};
}

/**
 * Rolls the provided Dice, and returns the Results.
 *
 * @param dice The Dice to roll.
 *
 * @returns The Results of the roll.
 */
function rollDice(dice: Dice): Results {
	const rolls: number[] = [];
	for (let i = 0; i < dice.num; i++) {
		rolls.push(rollDie(dice.sides));
	}

	const subtotal = dice.num > 0 ? rolls.reduce((a, b) => a + b) : 0;
	return {
		rolls,
		subtotal,
		total: subtotal + dice.modifier,
	};
}

/**
 * Returns the value of the roll of a single die.
 *
 * @param sides The number of sides on the die.
 *
 * @returns The result of the roll.
 */
function rollDie(sides: number): number {
	return Math.ceil(Math.random() * sides);
}

/**
 * Attempts to parse its input to an integer, and returns the fallback value if
 * parsing is not possible.
 *
 * @param str The string to parse.
 * @param fallback The number to fall back to to.
 *
 * @returns `str` parsed to a number, or `fallback` if `str` cannot be parsed.
 */
function toIntOr(str: string, fallback: number): number {
	return isNaN(parseInt(str)) ? fallback : parseInt(str);
}

/**
 * Check if the given string has more than one plus sign (`+`) in it.
 *
 * @param str The string to check.
 *
 * @returns `False` if the number of plus signs in the string is 0 or 1, `True`
 * otherwise.
 */
function hasMultiplePlusses(str: string): boolean {
	return (str.match(/\+/g) ?? []).length > 1;
}
