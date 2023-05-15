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
    > parseArgv()
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

/**
 * Parses the CLI arguments (process.argv), dividing the flags into properties of an object.
 * Multi-word params are divided as "param":"value", while sinle-word params becomes: "param":true.
 * Lost values will be ignored*. So 'node example.js 000 --param1' will turn into: { param1:true } and '000' will be ignored.
 *   * Unless they are defined as aliases for other parameters. So, if mapping is defined as { '000':'param0' },
 *     the result will be { param1:true, param0: true } instead of { param1:true }
 * Aliases in 'mapping' do not take priority over regular double-word parameters
 * 
 * @since 1.2.14
 * 
 * @param {Object} mapping An object mapping the arguments alias. Always take the form of "alias":"originalProperty"
 * @return {Object} An object containing the arguments parsed, and their values
 * 
 * @example <caption>  </caption>
 * // called the script with:
 * // node example.js --param1 --param2 param2value -p 0000
 * parseArgv({
 *   "-p": "param3"
 * })
 * // creates:
 * {
 *   param1: true
 *   param2: param2value
 *   param3: 0000
 * }
 */
namespace.parseArgv = (mapping = {}) => {
    let argv = process.argv.slice(2);
    let acc = [], tmpname = "", nexttempname = "";
    if (!argv || argv.length == 0) return acc;
    for (let i = 0; i < argv.length; i++) {
        if (argv[i].startsWith('--')) argv[i] = argv[i].substring(1);
        if (mapping[argv[i]]) argv[i] = '-'+mapping[argv[i]]
    }
    for (let i = 0; i < argv.length; i++) {
        if (argv[i].startsWith('-')) {
            let TMP = {};
            tmpname = argv[i].substring(1);
            if (argv[i+1] && !argv[i+1].startsWith('-')) {
                nexttempname = argv[i+1];
                TMP[tmpname] = nexttempname;
                acc.push(TMP);
            } else {
                TMP[tmpname] = true;
                acc.push(TMP);
            }
        } else {
            continue;
        }
    }
    return acc;
}

module.exports = namespace;