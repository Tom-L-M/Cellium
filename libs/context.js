/**
 * @namespace
 * @public
 */
let namespace = {}

/*  This implements the following methods and properties:
    > isStrictMode()
    > getCliArgs()
    > isBrowserRuntime()
    > isNodeRuntime()
    > isTravisCIRuntime()
*/

/**
 * Determines if the code is currently running under 'strict mode' or not.
 * Detection is based on the context where it was called (global scope, function scope...),
 * and the principle behind it is that in strict mode, variables declared with 'eval' do not ascend to global scope.
 * 
 * @since 1.2.5
 * 
 * @param {} 
 * @return {Boolean}
 */
namespace.isStrictMode = function () { return (eval("var ___temp = null"), (typeof ___temp === "undefined")) };

/**
 * Returns the arguments used to call the script. 
 * The basic structure usually is: "node script.js [...arguments]".
 * Calling it with 'withScriptCall = true' returns "node script.js" in the arguments list.
 * 
 * @since 1.2.8
 * 
 * @param {Boolean} withScriptCall Defines whether the Node.js engine and script name will be in the returned argumetns list.
 * @return {Array} An array with all the arguments used in the script calling, splitted by spaces.
 */
namespace.getCliArgs = (withScriptCall = false) => (withScriptCall ? process.argv : process.argv.slice(2));

/**
 * Determines if the current runtime environment is a browser, 
 * so that front-end modules can run without throwing errors.
 * 
 * @since 1.2.8
 * 
 * @return {Boolean}
 * @example <caption>  </caption>
 * isBrowserRuntime(); // true (browser)
 * isBrowserRuntime(); // false (Node)
*/
namespace.isBrowserRuntime = () => ![typeof window, typeof document].includes('undefined');

/**
 * Determines if the current runtime environment is Node.js, 
 * so that back-end modules can run without throwing errors.
 * 
 * @since 1.2.8
 * 
 * @return {Boolean}
 * @example <caption>  </caption>
 * isNodeRuntime(); // true (Node)
 * isNodeRuntime(); // false (browser)
*/
namespace.isNodeRuntime = () => ![typeof window, typeof document].includes('undefined');

/**
 * Determines if the current runtime environment is Travis CI.
 * Reference: https://travis-ci.org/
 * 
 * @since 1.2.8
 * 
 * @return {Boolean}
 * @example <caption>  </caption>
 * isTravisCI(); // true (if code is running on Travis CI)
*/
namespace.isTravisCIRuntime = () => 'TRAVIS' in process.env && 'CI' in process.env;

module.exports = namespace;