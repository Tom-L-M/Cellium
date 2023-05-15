/**
 * @namespace
 * @public
 */
const namespace = {}

/* This implements the following methods and properties:
    > identity()
    > noop()
    > isNative()
    > both()
    > wrapTryCatch()
    > flipArguments()
    > isAsync()
    > isGenerator()
*/

/**
 * Returns the value passed as argument
 * 
 * @since 1.2.5
 * 
 * @param {any} any
 * @return {any} Returns the exact same value passed as parameter
 */
namespace.identity = any => any;

/**
 * Returns undefined, independent of the arguments passed
 * 
 * @since 1.2.5
 * 
 * @return {undefined}
 */
namespace.noop = function () {};

/**
 * Returns wether the function `func` is native (instead of user-defined)
 * 
 * @since 1.2.5
 * 
 * @param  {Function} func The function to verify
 * @return {Boolean} Returns true if `func` is a native function, and false if it is user-defined
 */
namespace.isNative = func => func.toString().includes(" [native code] ");

/**
 * Returns a boolean of the result of calling both functionA and functionB.
 * Basically, the same as (funcA() && funcB())
 * 
 * @since 1.2.8
 * 
 * @param  {Function} funcA The first function to run
 * @param  {Function} funcB The second function to run
 * @return {Boolean} Returns true if both funcA and funcB returns true, or false if they don't.
 * @example <caption> Currying a function to apply 'both()': </caption>
 * const isEven = num => num % 2 === 0;
 * const isPositive = num => num > 0;
 * const isPositiveEven = both(isEven, isPositive);
 * isPositiveEven(4); // true
 * isPositiveEven(-2); // false
 */
namespace.both = (funcA, funcB) => (...args) => funcA(...args) && funcB(...args);

/**
 * Returns a boolean of the result of calling both functionA and functionB.
 * Basically, the same as (funcA() || funcB())
 * 
 * @since 1.2.8
 * 
 * @param  {Function} funcA The first function to run
 * @param  {Function} funcB The second function to run
 * @return {Boolean} Returns true if one or more of funcA and funcB return true, or false if none of them don't.
 * @example <caption> Currying a function to apply 'either()': </caption>
 * const isEven = num => num % 2 === 0;
 * const isPositive = num => num > 0;
 * const isPositiveEven = both(isEven, isPositive);
 * isPositiveEven(4);  // true
 * isPositiveEven(-2); // true
 * isPositiveEven(-1); // false
 */
namespace.either = (funcA, funcB) => (...args) => funcA(...args) || funcB(...args);

/**
 * Returns a boolean of the result of calling both functionA and functionB.
 * Basically, the same as (funcA() && funcB())
 * 
 * @since 1.2.8
 * 
 * @param  {Function} func The function to test
 * @param  {(any)} args The arguments to pass to the function that will be tested
 * @return {(any)} The return value of 'func' (if it succeeds), or the error cause, wrapped into an error object
 * @example <caption>  </caption>
 * var elements = attempt(selector => document.querySelectorAll(selector), '>_>');
 * if (elements instanceof Error) elements = []; // elements = []
 */
namespace.wrapTryCatch = (func, ...args) => {
    try {
        return func(...args);
    } catch (e) {
        return (e instanceof Error ? e : new Error(e));
    }
}

/**
 * Flips the first argument with the rest in a function.
 * 
 * @since 1.2.8
 * 
 * @param  {Function} func The function to flip its arguments
 * @return {Function} The function atribution with its argument values flipped 
 * @example <caption>  </caption>
 * let a = { name: 'John Smith' };
 * let b = {};
 * const mergeFrom = flip(Object.assign);
 * let mergePerson = mergeFrom.bind(null, a);
 *  mergePerson(b); // == b
 *  b = {};
 *  Object.assign(b, a); // == b
 */
namespace.flipArguments = func => (first, ...rest) => func(...rest, first);

/**
 * Checks if the given argument is an async function.
 * 
 * @since 1.2.8
 * 
 * @param  {Function} func The function to verify
 * @return {Boolean} Returns true if `func` is an async function, and false if it is user-defined
 */
namespace.isAsync = func => Object.prototype.toString.call(func) === '[object AsyncFunction]';

/**
 * Checks if the given argument is a generator function.
 * 
 * @since 1.2.8
 * 
 * @param  {Function} func The function to verify
 * @return {Boolean} Returns true if `func` is a generator function, and false if it is user-defined
 */
namespace.isGenerator = func => Object.prototype.toString.call(func) === '[object GeneratorFunction]';

module.exports = namespace;