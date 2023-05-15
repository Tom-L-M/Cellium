/**
 * @namespace
 * @public
 */
const namespace = {}

/*  This implements the following methods and properties:
    > deepclone()
    > copy()
    > depth()
    > isExactlyEqual()
    > merge()
    > wrap()
    > assertValidKeys()
    > dig() 
    > findKeysWithValue()
    > frequencies()
    > toQueryString()
    > matches()
*/

/**
 * Returns a (deep) clone of the Array or Object provided.
 * The clone does not share memory pointers with the original, and changes done in the clone.
 * are not reflected in the original. This executes deep copying.
 * 
 * @since 1.2.5 
 * 
 * @param {Object} object - The Object or Array to clone
 * @return {Object} Returns a deep copy of the original Object or Array
 */
namespace.deepclone = (object = {}) => JSON.parse(JSON.stringify(object));

/**
 * Returns a (shallow) clone of the Array or Object provided.
 * The clone does not share memory pointers with the original IF IT HAS ONLY ONE DEPTH LEVEL, and changes done in the clone.
 * are not reflected in the original. But, nosted elements will be copied by reference, not value.
 * For full (deep) cloning, use object.deepclone(). Use this function do quicky copy one-level-deep objects and arrays.
 * 
 * @since 1.2.5 
 * 
 * @param  {Object} object - The Object or Array to clone
 * @return {Object} Returns a shallow copy of the original Object or Array
 */
namespace.copy = (object = {}) => ({...object});

/**
 * Returns the total depth of the Array or Object provided: the maximum number of nested objects present,
 * Providing native simple objects (String, Number, ...) as the parameter returns -1. Shallow objects (no nesting) have depth 0.
 * 
 * @since 1.2.5 
 * 
 * @param  {Object} object - The Object or Array to clone
 * @return {Number} Returns the depth of the provided object
 * 
 * @example <caption> Getting the depth of a multilevel object: </caption>
 * let obj = {  sub1 : {  sub2: {}  }  }
 * depth(obj); // => 2
 * @example <caption> Providing a number as parameter: </caption>
 * let obj = 100;
 * depth(obj); // => -1
 * @example <caption> Providing a shallow object as parameter: </caption>
 * let obj = { foo: "0", bar: "1" }
 * depth(obj); // => 0
 */
namespace.depth = (object = {}) => ((Object(object) === object) ? (1 + Math.max(-1, ...Object.values(object).map(object.depth))) : -1);

/**
 * Compares two objects to verify if they have the same properties and values, and in the same order.
 * This function ignores the existance of methods, and consider only properties.
 * 
 * @since 1.2.5 
 * 
 * @param  {Object} obj1 - The Object or Array to compare to
 * @param  {Object} obj2 - The Object or Array to compare with
 * @return {Boolean} 'true' if the two objects are equal, 'false' if they are not 
 */
namespace.isExactlyEqual = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);

/**
 * Merge object b with object a.
 * 
 * @since 1.2.5 
 * 
 * @param  {Object} obj1 - The Object A
 * @param  {Object} obj2 - The Object B
 * @return {Object} Object A, altered to have the properties of A and B
 */
namespace.merge = (obj1, obj2) => { if (obj1 && obj2) { for (var key in obj2) { obj1[key] = obj2[key]; } } return obj1; }

/**
 * Wraps a an object around a passed value, with a named property.
 * 
 * @since 1.2.5 
 * 
 * @param {any} val The value to be wrapped
 * @param {String} name The name of the property on which the object will be wrapped into
 * @return {Object} 
 * 
 * @example <caption>  </caption>
 * wrap([1,2,3], "foo")
 * // => { foo: [1,2,3] }
 * // The same as the literal syntax: {[foo]:[1,2,3]}
 */
namespace.wrap = (val, name = '_') => { let a = {}; a[name] = val; return a; }

/**
 * Checks if an object contain a specific set of keys
 * 
 * @since 1.2.8 
 * 
 * @param {Object} obj The object to test
 * @param {Array} keys The array of keys that the object must contain
 * @return {Object} 
 * 
 * @example <caption>  </caption>
 * assertValidKeys({id:10,name:'apple'}, ['id','name']); // true
 * assertValidKeys({id:10,name:'apple'}, ['id','type']); // false
 */
namespace.assertValidKeys = (obj, keys) => Object.keys(obj).every(key => keys.includes(key));

/**
 * Checks if an object contain a specific key in a nested object, and returns its value
 * 
 * @since 1.2.8 
 * 
 * @param {Object} obj The object to test
 * @param {Array} key The nested key to get
 * @return {Object} 
 * 
 * @example <caption>  </caption>
 * const data = {
 *   level1: {
 *     level2: {
 *       level3: 'some data'
 *     }
 *   }
 * };
 * dig(data, 'level3'); // 'some data'
 * dig(data, 'level4'); // undefined
 */
namespace.dig = (obj, target) => {
    return target in obj
        ? obj[target]
        : Object.values(obj).reduce((acc, val) => {
            if (acc !== undefined) return acc;
            if (typeof val === 'object') return namespace.dig(val, target);
        }, undefined)
    ;
}

/**
 * Returns the keys whose values are equal to 'value'.
 * 
 * @since 1.2.8 
 * 
 * 
 * @param {(any)} value The value to find
 * @param {Object} obj The object to filter
 * @return {Array} An array containing the names of the properties that contains the provided value
 * 
 * @example <caption>  </caption>
 * const ages = {
 *   Leo: 20,
 *   Zoey: 21,
 *   Jane: 20,
 * };
 * findKeysWithValue(ages, 20); // [ 'Leo', 'Jane' ]
 */
namespace.findKeysWithValue = (value, obj) => Object.keys(obj).filter(key => obj[key] === value);

/**
 * Returns the frequencies of each item in an provided array.
 * 
 * @since 1.2.8 
 * 
 * @param {Array} array The array with the items to calculate the frequencies from.
 * @return {Object} An object containing the items from the array as keys, and their frequencies as values.
 * 
 * @example <caption>  </caption>
 * frequencies(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // { a: 4, b: 2, c: 1 }
 * frequencies([...'ball']); // { b: 1, a: 1, l: 2 }
 */
namespace.frequencies = array => array.reduce((a, v) => { v = JSON.stringify(v); a[v] = (a[v]) ? (a[v]+1) : (1); return a; }, {});

/**
 * Generates a query string from the key-value pairs of the given object.
 * 
 * @since 1.2.8 
 * 
 * @param {Object} queryParameters The object with key-values to be turned into a query string.
 * @return {String} The query string, built from the object's key-values.
 * 
 * @example <caption>  </caption>
 * objectToQueryString({ page: '1', size: '2kg', key: undefined }); 
 * // '?page=1&size=2kg' 
 */
namespace.toQueryString = queryParameters => {
    return queryParameters
        ? Object.entries(queryParameters).reduce(
            (queryString, [key, val], index) => {
                const symbol = queryString.length === 0 ? '?' : '&';
                queryString +=
                typeof val === 'string' ? `${symbol}${key}=${val}` : '';
                return queryString;
            },
            ''
        )
        : ''
    ;
};

/**
 * Checks if two given objects matches, based on a comparison function.
 * 
 * @since 1.2.8 
 * 
 * @param {Object} obj The object to be compared.
 * @param {Object} source The object to compare with.
 * @param {Function} fn The comparison function.
 * @return {Boolean} 
 * 
 * @example <caption>  </caption>
 * const isGreeting = val => /^h(?:i|ello)$/.test(val);
 * matchesWith(
 *   { greeting: 'hello' },
 *   { greeting: 'hi' },
 *   (oV, sV) => isGreeting(oV) && isGreeting(sV)
 * ); // true
 */
namespace.matches = (obj, source, fn) => {
    return Object.keys(source).every(key =>
        obj.hasOwnProperty(key) && fn
            ? fn(obj[key], source[key], key, obj, source)
            : obj[key] == source[key]
    );
}

module.exports = namespace;