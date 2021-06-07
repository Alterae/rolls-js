/**
 * Represents the results of a dice roll.
 */
export default interface Results {
	/**
	 * All individual rolls made.
	 */
	rolls: number[];

	/**
	 * The sum of all rolls, before applying the modifier.
	 */
	subtotal: number;

	/**
	 * The sum of all rolls, after applying the modifier.
	 */
	total: number;
}
