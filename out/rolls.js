#!/usr/bin/env node

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const regex = /(?:(\d+)\s*X\s*)?(\d*)D(\d*)((?:[+\/*-]\d+)|(?:[+-][LH]))?/i;
/**
 * Rolls a set of dice described in dice notation (AdX+/-B).
 *
 * @param dice The dice to roll.
 */
function roll(dice) {
    console.log(rollDice(parseDice(dice)));
}
/**
 * Parses dice notation and returns a `Roll`.
 *
 * @param dice The dice roll to parse, in dice notation.
 *
 * @throws Will throw an error if the dice notation is invalid.
 * @returns A `Roll` parsed from the dice notation.
 */
function parseDice(dice) {
    dice = strip(dice);
    if (dice[0] == "-") {
        throw new Error(`Invalid dice notation "${dice}".  Cannot roll a negative number of dice.`);
    }
    if (!regex.test(dice)) {
        throw new Error(`Invalid dice notation "${dice}".`);
    }
    dice = dice.replace("-", "+-");
    const [rolls, modifier] = dice.split("+");
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
function rollDice(dice) {
    const rolls = [];
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
function rollDie(sides) {
    return Math.ceil(Math.random() * sides);
}
/**
 * Strips all whitespace from a string.
 *
 * @param str The string to strip.
 *
 * @returns The stripped string.
 */
function strip(str) {
    return str.split(/\s+/).join();
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
function toIntOr(str, fallback) {
    return isNaN(parseInt(str)) ? fallback : parseInt(str);
}
