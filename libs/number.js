/**
 * @namespace
 * @public
 */
const namespace = {}

/*  This implements the following methods and properties:
    > randomInt()
    > randomFloat()
    > toHexOffset()
    > almostEqual()
    > factorial()
    > fibonacci()
    > nthRoot()
    > preciseRound()
*/

/**
 * Generates a pseudo-random integer between min and max
 * 
 * @since 1.2.5
 * 
 * @param {Number} min The minimum number for the randomization range (default is 0)
 * @param {Number} max - The maximum number for the randomization range (default is 100)
 * @return {Number} Returns a pseudo-random integer in the range: [min, max]
 */
namespace.randomInt = (min = 0, max = 100) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);

/**
 * Generates a pseudo-random floating-point number between min and max
 * 
 * @since 1.2.5
 * 
 * @param {Number} min The minimum number for the randomization range (default is 0)
 * @param {Number} max - The maximum number for the randomization range (default is 1)
 * @return {Number} Returns a pseudo-random floating-point number in the range: [min, max]
 */
namespace.randomFloat = (min = 0, max = 1) => (Math.random() * (max - min)) + min;

/**
 * Turns a number (in any base) into a string representation of a hex offset equivalent to that number 
 * 
 * @since 1.2.5
 * 
 * @param {Number} num The number to convert into the hex offset
 * @return {String} A hex-offset representing the provided number, padded to have 8 valid digits and starting with '0x'
 * 
 * @example <caption> Converting a number into a hex offset: </caption>
 * toHexOffset(10000)
 * // => "0x00002710"
 */
namespace.toHexOffset = num => '0x' + num.toString(16).padStart(8,'0').toUpperCase();

/**
 * Checks if numA is almost equal numB, using 'epsilon' as the difference basis
 * 
 * @since 1.2.8
 * 
 * @param {Number} numA The first number to compare
 * @param {Number} numB The second number to compare
 * @param {Number} epsilon The difference index
 * @return {String} A hex-offset representing the provided number, padded to have 8 valid digits and starting with '0x'
 * 
 * @example <caption> Converting a number into a hex offset: </caption>
 * almostEqual(10000.0001, 10000.0010)
 * // => true
 * almostEqual(10000, 10001, 1)
 * // => true
 * almostEqual(10000, 10001, 0.1)
 * // => false
 */
namespace.almostEqual = (numA, numB, epsilon = 0.01) => Math.abs(numA - numB) < epsilon;

/**
 * Returns the factorial of the privided number
 * 
 * @since 1.2.8
 * 
 * @param {Number} number The number to get the factorial of.
 * @return {Number} The factorial of the number provided.
 * 
 * @example <caption>  </caption>
 * factorial(6); // 720
 */
namespace.factorial = (number) => {
    return number < 0
    ? (() => { throw new TypeError('Negative numbers are not allowed!'); })()
    : number <= 1
        ? 1 
        : number * namespace.factorial(number - 1)
    ;
}

/**
 * Returns an array containing the Fibonacci sequence, up to the N-term.
 * 
 * @since 1.2.8
 * 
 * @param {Number} maxTerm The limit to the Fibonacci generator.
 * @return {Number} The Fibonacci sequence up to maxTerm.
 * 
 * @example <caption>  </caption>
 * fibonacci(6); // [0, 1, 1, 2, 3, 5]
 */
namespace.fibonacci = maxTerm => {
    return Array.from({ length: maxTerm }).reduce(
        (acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
        []
    );
}

/**
 * Calculates the Hamming distance (population count) between two values.
 * The 'popcount' instruction is used in Assembly, and counts the number of 0's and 1's in a binary number.
 * 
 * @since 1.2.8
 * 
 * @param {Number} num1 The limit to the Fibonacci generator.
 * @param {Number} num2 The limit to the Fibonacci generator.
 * @return {Number} The Hamming distance (population count) between two values.
 * 
 * @example <caption> </caption>
 * popcountll(2, 3); // 1
 * popcountll(10010011, 10000000); // 3
 */
namespace.popcountll = (num1, num2) => ((num1 ^ num2).toString(2).match(/1/g) || '').length;

/**
 * Checks if the first numeric argument is divisible by the second one
 * 
 * @since 1.2.8
 * 
 * @param {Number} dividend
 * @param {Number} divisor
 * @return {Boolean}
 * 
 * @example <caption> </caption>
 * isDivisible(6, 3); // true
 * isDivisible(7, 3); // false
 */
namespace.isDivisible = (dividend, divisor) => dividend % divisor === 0;

/**
 * Calculates the nth root of a given number.
 * 
 * @since 1.2.8
 * 
 * @param {Number} number
 * @param {Number} base
 * @return {Boolean}
 * 
 * @example <caption> </caption>
 * nthRoot(32, 5); // 2
 */
namespace.nthRoot = (number, base) => Math.pow(number, 1 / base);

/**
 * Rounds a number to a specified amount of digits.
 * 
 * @since 1.2.8
 * 
 * @param {Number} number The number to round.
 * @param {Number} decimals The number of decimals to keep and round the number.
 * @return {Boolean}
 * 
 * @example <caption> </caption>
 * preciseRound(1.005, 2); // 1.01
 */
namespace.preciseRound = (number, decimals) =>  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

module.exports = namespace;