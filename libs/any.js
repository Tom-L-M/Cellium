/**
 * @namespace
 * @public
 */
const namespace = {}

// Jogar aqui o que não vai pra outros lugares basicamente :/

/*  This implements the following methods and properties:
    > formatUnit()
    > is()
    > isIterable()
    > isDuplexStream()
    > isReadableStream()
    > isWritableStream()
    > isPrimitive()
    > isPromiseLike()
    > isStream()
    > isSymbol()
    > isValidJSON()
    > randomBoolean()
    > randomHexColorCode()
    > xor()
    > requireUncached()
    > luhnCheck()
    > paddedTimeString()
*/

/**
 * Converts a number of bytes to a determined unit in string
 * @since 1.2.5
 * 
 * @param  {Number} bytes The number of bytes to convert
 * @param  {String} unit A unit from the SI/CS unit system
 * @param  {Boolean} SI If the SI units (1kb = 1000b) should be used, instead of the Computer Science (CS) units (1kb = 1024b)
 * @return {String} The byte number, converted to the proper base, and with the unit string
 * 
 * @example <caption> Converting bytes to kilobytes: (CS Units)</caption>
 * // returns "1 kb"
 * formatUnit(1024, "kb", false);
 * @example <caption> Converting bytes to kilobytes: (SI Units)</caption>
 * // returns "1.024 kb"
 * formatUnit(1024, "kb", true);
*/
namespace.formatUnit = (bytes, unit = 'kb', SI = false) => {
    let str = '';
    let CSunits = { //using 1kb = 1024bytes (computer science units)
        b:  0.125,                  // byte*8
        kb: 1024,                   // byte/1024
        mb: 1048576,                // byte/1048576
        gb: (1.07374182*(10**9)),   // byte/(1,07374182*(10**9))
        tb: (109951163*(10**12))    // byte/(109951163*(10**12))
    }
    let SIunits = { //using 1kb = 1000bytes (SI units)
        b:  0.125,          // byte*8
        kb: 1000,           // byte/1000
        mb: 1000000,        // byte/1000000
        gb: 1000000000,     // byte/1000000000
        tb: 1000000000000   // byte/1000000000000
    }
    if (!SIunits[unit]) { str = null; }
    else if (!!SI) str = bytes/(SIunits[unit]);
    else str = bytes/(CSunits[unit]);
    return str ? str+" "+unit : str;
}

/**
 * Checks if the provided value is of the specified type.
 * @since 1.2.8
 * 
 * @param  {(any)} type
 * @param  {(any)} val
 * @return {Boolean}
 * 
 * @example <caption>  </caption>
 * is(Array, [1]); // true
 * is(ArrayBuffer, new ArrayBuffer()); // true
 * is(Map, new Map()); // true
 * is(RegExp, /./g); // true
 * is(Set, new Set()); // true
 * is(WeakMap, new WeakMap()); // true
 * is(WeakSet, new WeakSet()); // true
 * is(String, ''); // true
 * is(String, new String('')); // true
 * is(Number, 1); // true
 * is(Number, new Number(1)); // true
 * is(Boolean, true); // true
 * is(Boolean, new Boolean(true)); // true
*/
namespace.is = (type, val) => ![, null].includes(val) && val.constructor === type;

/**
 * Checks if the provided argument is array-like (i.e. is iterable).
 * @since 1.2.8
 * 
 * @param  {(any)} obj
 * @return {Boolean}
 * 
 * @example <caption>  </caption>
 * isArrayLike([1, 2, 3]); // true
 * isArrayLike(document.querySelectorAll('.className')); // true
 * isArrayLike('abc'); // true
 * isArrayLike(null); // false
*/
namespace.isIterable = obj => obj != null && typeof obj[Symbol.iterator] === 'function';

/**
 * Checks if the given argument is a duplex (readable and writable) stream.
 * @since 1.2.8
 * 
 * @param  {(any)} stream
 * @return {Boolean}
 * 
 * @example <caption>  </caption>
 * const Stream = require('stream');
 * isDuplexStream(new Stream.Duplex()); // true
*/
namespace.isDuplexStream = stream => {
    return stream !== null &&
    typeof stream === 'object' &&
    typeof stream.pipe === 'function' &&
    typeof stream._read === 'function' &&
    typeof stream._readableState === 'object' &&
    typeof stream._write === 'function' &&
    typeof stream._writableState === 'object';
}

/**
 * Checks if the given argument is a readable stream.
 * @since 1.2.8
 * 
 * @param  {(any)} val
 * @return {Boolean}
 * 
 * @example <caption>  </caption>
 * const fs = require('fs');
 * isReadableStream(fs.createReadStream('test.txt')); // true
*/
namespace.isReadableStream = val => {
    return val !== null &&
    typeof val === 'object' &&
    typeof val.pipe === 'function' &&
    typeof val._read === 'function' &&
    typeof val._readableState === 'object';
}

/**
 * Checks if the given argument is a writable stream.
 * @since 1.2.8
 * 
 * @param  {(any)} val
 * @return {Boolean}
 * 
 * @example <caption>  </caption>
 * const fs = require('fs');
 * isWritableStream(fs.createReadStream('test.txt')); // true
*/
namespace.isWritableStream = val => {
    return val !== null &&
    typeof val === 'object' &&
    typeof val.pipe === 'function' &&
    typeof val._write === 'function' &&
    typeof val._writableState === 'object';
}

/**
 * Checks if the given argument is a primitive value.
 * @since 1.2.8
 * 
 * @param  {(any)} val
 * @return {Boolean}
 * 
 * @example <caption>  </caption>
 * isPrimitive(null); // true
 * isPrimitive(undefined); // true
 * isPrimitive(50); // true
 * isPrimitive('Hello!'); // true
 * isPrimitive(false); // true
 * isPrimitive(Symbol()); // true
 * isPrimitive([]); // false
 * isPrimitive({}); // false
*/
namespace.isPrimitive = val => Object(val) !== val;

/**
 * Checks if an object looks like a Promise.
 * @since 1.2.8
 * 
 * @param  {(any)} obj
 * @return {Boolean}
 * 
 * @example <caption>  </caption>
 * isPromiseLike({ then: function() { return ''; } }); // true
 * isPromiseLike(null); // false
 * isPromiseLike({}); // false
*/
namespace.isPromiseLike = obj => {
    return obj !== null &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function';
}

/**
 * Checks if the given argument is a stream.
 * @since 1.2.8
 * 
 * @param  {(any)} val
 * @return {Boolean}
 * 
 * @example <caption>  </caption>
 * const fs = require('fs');
 * isStream(fs.createReadStream('test.txt')); // true
*/
namespace.isStream = val =>  val !== null && typeof val === 'object' && typeof val.pipe === 'function';

/**
 * Checks if the given argument is a symbol.
 * @since 1.2.8
 * 
 * @param  {(any)} val
 * @return {Boolean}
 * 
 * @example <caption>  </caption>
 * isSymbol(Symbol('x')); // true
*/
namespace.isSymbol = val => typeof val === 'symbol';

/**
 * Checks if the given argument is valid JSON.
 * @since 1.2.8
 * 
 * @param  {(any)} val
 * @return {Boolean}
 * 
 * @example <caption>  </caption>
 * isValidJSON('{"name":"Adam","age":20}'); // true
 * isValidJSON('{"name":"Adam",age:"20"}'); // false
 * isValidJSON(null); // true
*/
namespace.isValidJSON = val => {
    try {
        JSON.parse(val);
        return true;
    } catch (e) {
        return false;
    }
};

/**
 * Generates a random boolean value.
 * @since 1.2.8
 * @return {Boolean}
*/
namespace.randomBoolean = () => Math.random() >= 0.5;

/**
 * Generates a random hexadecimal color code.
 * @since 1.2.8
 * 
 * @return {String} Returns a random hex color code in a string.
 * 
 * @example <caption>  </caption>
 * randomHexColorCode(); // ex: '#e34155'
*/
namespace.randomHexColorCode = () => `#${(Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6)}`;

/**
 * Checks if only one of the arguments is true.
 * @since 1.2.8
 * 
 * @param  {(any)} a
 * @param  {(any)} b
 * @return {Boolean}
 * 
 * @example <caption>  </caption>
 * xor(true, true); // false
 * xor(true, false); // true
 * xor(false, true); // true
 * xor(false, false); // false
*/
namespace.xor = (a, b) => (( a || b ) && !( a && b ));

/**
 * Loads a module again (fresh require) after removing it from the cache (if exists).
 * @since 1.2.8
 * 
 * @param  {String} module The module name
 * @return {(any)} Module's contents
 * 
 * @example <caption>  </caption>
 * const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time
*/
namespace.requireUncached = module => { delete require.cache[require.resolve(module)]; return require(module); };

/**
 * Implements the Luhn Algorithm used to validate a variety of identification numbers.
 * Reference: https://en.wikipedia.org/wiki/Luhn_algorithm
 * @since 1.2.8
 * 
 * @param  {Number|String} num The number (or number wrapped with '') to validate.
 * @return {Boolean} 
 * 
 * @example <caption>  </caption>
 * luhnCheck('4485275742308327');   // true
 * luhnCheck(6011329933655299);     // true
 * luhnCheck(123456789);            // false
*/
namespace.luhnCheck = num => {
    const arr = (num + '')
        .split('')
        .reverse()
        .map(x => parseInt(x));
    const lastDigit = arr.shift();
    let sum = arr.reduce(
        (acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val *= 2) > 9 ? val - 9 : val)),
        0
    );
    sum += lastDigit;
    return sum % 10 === 0;
};

/**
 * Retrieves and transforms a milisseconds date into a hexadecimal X-char padded string.
 * @since 1.2.11
 * 
 * @param  {Number} size The of the padded string. Defaults to 64.
 * @return {Boolean} 
 * 
 * @example <caption>  </caption>
 * paddedTimeString(64);   // ex:     '00000000000000000000000000000000000010004c002b0006002b0011000200'
*/
namespace.paddedTimeString = (size=64) => {
    return (''+Date.now()).split(/(..?)/gim)
        .map(x=>Number(x).toString(16).padStart(2,'0'))
        .join('').padStart(size,'0'); // transform a Date into a hex array
}

module.exports = namespace;