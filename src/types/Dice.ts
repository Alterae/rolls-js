/**
 * Represents a set of dice to be rolled.
 */
export default interface Dice {
	/**
	 * The number of dice in the roll.
	 */
	num: number;

	/**
	 * The number of sides on each die.
	 */
	sides: number;

	/**
	 * A modifier to be added after all dice are rolled.
	 */
	modifier: number;
}
