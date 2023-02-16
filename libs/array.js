/**
 * @namespace
 * @public
 */
const namespace = {}

/*  This implements the following methods and properties:
    > randomItem()
    > samples()
    > unique()
    > stripFalsy()
    > segregate()
    > remove()
    > last()
    > average()
    > fromRange()
    > shuffle()
    > allUnique()
    > allUniqueBy()
    > allEqual()
    > allEqualBy()
    > propertySort()
    > chunk()
    > mapToFlags()
    > filledList()
    > hasDuplicates()
    > haveSameContents()
    > intersection()
    > intersects()
    > without()
*/

/**
 * Returns a pseudo-random item (of any type) from an array. 
 * The randomization is based on generating a pseudo-random integer between 0 and the array length,
 * and then returning the item in that position.
 * 
 * @warning This method uses non-cryptographically-secure randomization
 * 
 * @since 1.2.5
 * 
 * @param {Array} array The array to select an item from
 * @return {any} A pseudo-random item from the array
 * 
 * @example <caption> Using randomItem() in a array containing only primitive items:</caption>
 * randomItem([1,2,3])
 * // => 1 OR 2 OR 3
 * @example <caption> Using randomItem() in a array containing primitive and complex items:</caption>
 * randomItem([['a','b'], 8, 'foo'])
 * // => ['a','b'] OR 8 OR 'foo'
 * @example <caption> Using randomItem() in an empty array:</caption>
 * randomItem([])
 * // => undefined
 */
namespace.randomItem = array => array[Math.floor(Math.random()*array.length)];

/**
 * Gets n random elements at unique keys from an array up to the size of the array.
 * @warning This method uses non-cryptographically-secure randomization
 * 
 * @since 1.2.8
 * 
 * @param {Array} arr The array to select the items from.
 * @param {Array} sampleSize The number of items to select. Defaults to 1.
 * @return {any} A pseudo-random item from the array
 * 
 * @example <caption> Using randomItem() in a array containing only primitive items:</caption>
 * randomItem([1,2,3])
 * // => 1 OR 2 OR 3
 */
namespace.samples = ([...arr], sampleSize = 1) => {
    let m = arr.length;
    while (m) {
        const i = Math.floor(Math.random() * m--);
        [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr.slice(0, sampleSize);
}

/**
 * Returns a (shallow) copy of the passed array, with duplicate values removed.
 * For multi-depth arrays, use array.deepclone to wrap array.unique, 
 * in order to avoid conflicts (array.deepclone(array.unique([...]))).
 * 
 * @since 1.2.5
 * 
 * @param  {Array} array - The Array to clone
 * @return {Array} A shallow copy of the original Array, with duplicate values removed
 */
//unique = (arr = []) => [...new Set(arr)]; // Set based - unstable
namespace.unique = array => array.sort().filter(function(item, pos, ary) { return !pos || item != ary[pos - 1]; });

/**
 * Returns the array with all the falsy values removed.
 * 
 * @since 1.2.5
 * 
 * @param {Array} array
 * @return {Array}
 * 
 * @example
 * stripFalsy([1, '', 0, null, , 'foo', undefined, {}])
 * // => [1, 'foo', {}]
 */
namespace.stripFalsy = array => array.filter(x => !!x);

/**
 * Determines if the item will be moved to the truthy or falsy subarray.
 * @since 1.2.5
 * @callback segregateCallback
 * @param {any} item - The current item in the callback 
 * @param {Number} index - The index of the item in the array
 * @param {Array} c_arr - The own array
 * @return {Boolean} The result of an expression
 */
/**
 * Executes a callback function for every item in the passed array. 
 * It generates a results array, cantaining two subarrays: the first for true values, and the second for false values.
 * If the callback result for an element is true, that element is copied to the true subarray, else it is copied to the false one.
 * The return is the results array, with the results from mapping the Array with the callback function.
 * 
 * @since 1.2.5
 * 
 * @param {Array} array The array to apply the callback to
 * @param {Function} segregateCallback The callback to apply to all items. Receives three parameters: (item, index, array)
 * @return {Array} An array containing two subarrays
 * 
 * @example <caption> Moving all values with indexes higher than 2: </caption>
 * segregate(["a", "b", "c", "d", "e"], (item,index) => index < 2);
 * // => [["a", "b", "c"], ["d", "e"]]
 * @example <caption> Moving falsy values from the array: </caption>
 * // The default value for the callback function is an identity function: {(x) => x}
 * segregate(["foo", 0, null, "bar", ""]);
 * // => [["foo", "bar"], [0, null, ""]]
 */
namespace.segregate = (array = [], callback = (item, /*index, c_arr*/) => item) => {
    let results = [ /* Falsy values */[], /* Truthy values */[] ];
    for (let i = 0; i < array.length; i++) {
        let callbackResult = callback(array[i], i, array);
        if (!callbackResult) {
            results[1].push(array[i]);
        } else {
            results[0].push(array[i]);
        }
    }
    return results;
}

/**
 * Removes `number` items from `arr`, starting at index `i`.
 * 
 * @warning this changes the original array.
 * 
 * @since 1.2.5
 * 
 * @param  {Array} array The array to remove the item from
 * @param  {Number} index The index of the array to remove the item. Defaults to the first item (0), behaving like [].shift()
 * @param  {Number} number The number of items to delete starting from `index`. Defaults to 1
 * @return {Array} The array passed, but with items deleted
 * 
 * @example <caption> Deleting the item at position 2: </caption>
 * remove(["a", "b", "c", "d"], 2)
 * // => ["a", "b", "d"]
 * @example <caption> Deleting 3 items at positions 2, 3 and 4: </caption>
 * remove(["a", "b", "c", "d", "e"], 2, 3)
 * // => ["a", "b"]
*/
namespace.remove = (array, index = 0, num = 1) => array.splice(index, num);

/**
 * Returns the last item from an array
 * 
 * @since 1.2.5
 * 
 * @param {Array} array The array to select an item from
 * @return {any} The last item of the passed array
 */
namespace.last = array => array[array.length-1];

/**
 * Returns average from an array of numbers.
 * 
 * @since 1.2.5
 * 
 * @param  {Number[]} array
 * @return {Number} The average of the array of numbers
 * 
 * @example
 * average([1,2,3])
 * // => 2
 */
namespace.average = array => {
    if (array.length === 0) { return 0; }
    return (Number(array.reduce((a,b)=>a+b)) / array.length);
}

/**
 * Creates an array from a range of numbers.
 * 
 * @since 1.2.5
 * 
 * @param  {Number} min The minimum number of the range (inclusive). Defaults to 0
 * @param  {Number} max The maximum number of the range (exclusive). Defaults to 1
 * @param  {Number} step The step in the range. Defaults to 1
 * @return {Array}
 * 
 * @example
 * fromRange(1, 5) // => the same as fromRange(1, 5, 1)
 * // => [1, 2, 3, 4]
 * 
 * fromRange(0, 8, 2)
 * // => [0, 2, 4, 6]
 */
namespace.fromRange = (end, start = 0, step = 1) => Array.from(
    { length: Math.ceil((end - start + 1) / step) },
    (_, i) => i * step + start
);

/**
 * Shuffles an array, reordering all elements in a random order
 * 
 * @since 1.2.7
 * 
 * @param  {Array} array The array to shuffle
 * @return {Array} The array passed, but with items reordered
 * 
 * @example <caption> Shuffling the array: </caption>
 * shuffle(["a", "b", "c", "d"])
 * // ex: => ["c", "a", "d", "b"]
*/
namespace.shuffle = array => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/**
 * Tests if all the items in an array are different
 * 
 * @since 1.2.8
 * 
 * @param  {Array} array The array to test
 * @return {Boolean} Returns whether all the items in the array are unique
 * 
 * @example <caption> Testing the array: </caption>
 * allUnique(["a", "b", "c", "d"])
 * // true
 * allUnique([1, 1, 2, 3])
 * // false
*/
namespace.allUnique = array => array.length === new Set(array).size;

/**
 * Tests if all the items in an array return different results from calling the provided function
 * 
 * @since 1.2.8
 * 
 * @param  {Array} array The array to test
 * @param  {Function} func The function to apply to all items before testing
 * @return {Boolean} Returns whether all the items in the array are unique after applying the function
 * 
 * @example <caption> Testing the array: </caption>
 * allUniqueBy([1.2, 2.4, 2.9], Math.round); // true
 * allUniqueBy([1.2, 2.3, 2.4], Math.round); // false
*/
namespace.allUniqueBy = (array, func) => array.length === new Set(array.map(func)).size;

/**
 * Tests if all the items in an array are equal
 * 
 * @since 1.2.8
 * 
 * @param  {Array} array The array to test
 * @return {Boolean} Returns whether all the items in the array are equal
 * 
 * @example <caption> Testing the array: </caption>
 * allEqual(["a", "b", "c", "d"])
 * // false
 * allEqual([1, 1, 1, 1])
 * // true
*/
namespace.allEqual = array => array.every(val => val === array[0]);

/**
 * Tests if all the items in an array return equal results from calling the provided function
 * 
 * @since 1.2.8
 * 
 * @param  {Array} array The array to test
 * @param  {Function} func The function to apply to all items before testing
 * @return {Boolean} Returns whether all the items in the array are equal after applying the function
 * 
 * @example <caption> Testing the array: </caption>
 * allEqualBy([1.2, 2.4, 2.9], Math.round); // false
 * allEqualBy([1.1, 1.2, 1.3], Math.round); // true
*/
namespace.allEqualBy = (array, func) => array.length === new Set(array.map(func)).size;

/**
 * Sorts an array of objects alphabetically based on one property
 * 
 * @since 1.2.8
 * 
 * @param  {Array} array The array to sort
 * @return {Array} Returns a shallow copy of the array, sorted
 * 
 * @example <caption> Sorting the array: </caption>
 * const people = [ { name: 'John' }, { name: 'Adam' }, { name: 'Mary' } ];
 * propertySort(people, g => g.name);
 * // [ { name: 'Adam' }, { name: 'John' }, { name: 'Mary' } ]
*/
namespace.propertySort = (array, getter) => array.sort((a, b) => getter(a).localeCompare(getter(b)));

/**
 * Generates an object of specified properties, all mapped to a default value.
 * 
 * @since 1.2.8
 * 
 * @param  {Array} array The array of keys to create.
 * @param  {(any)} defaultValue The value to link to all keys.
 * @return {Object} Returns an object containing all the keys in 'array', with the value of 'defaultValue'.
*/
namespace.mapToFlags = (array, defaultValue) => array.reduce((acc, str) => ({...acc, [str]: defaultValue }), {});

/**
 * Generates an array with the given amount of items, using the given function.
 * 
 * @since 1.2.8
 * 
 * @param  {Number} len The length of the array to be created.
 * @param  {Function} func The function to apply to all items in the array.
 * @return {Array} Returns an array, filled with the number of items selected and with the function applied.
 * 
 * @example <caption>  </caption>
 * filledList(10, Math.random);
 * // ~[0.21, 0.08, 0.40, 0.96, 0.96, 0.24, 0.19, 0.96, 0.42, 0.70]
*/
namespace.filledList = (len, func) => Array.from({ length: len }, (_, i) => func(i));

/**
 * Checks if there are duplicate values in a flat array.
 * 
 * @since 1.2.8
 * 
 * @param  {Array} array The array to check.
 * @return {Boolean}
 * 
 * @example <caption>  </caption>
 * hasDuplicates([0, 1, 1, 2]); // true
 * hasDuplicates([0, 1, 2, 3]); // false
*/
namespace.hasDuplicates = array => new Set(array).size !== array.length;

/**
 * Checks if two arrays contain the same elements regardless of order.
 * 
 * @since 1.2.8
 * 
 * @param  {Array} array1 The first array to compare.
 * @param  {Array} array2 The second array to compare.
 * @return {Boolean}
 * 
 * @example <caption>  </caption>
 * haveSameContents([1, 2, 4], [2, 4, 1]); // true
*/
namespace.haveSameContents = (array1, array2) => {
    for (const v of new Set([...array1, ...array2]))
        if (array1.filter(e => e === v).length !== array2.filter(e => e === v).length) return false;
    return true;
};

/**
 * Returns the elements that exist in both arrays, filtering duplicate values.
 * 
 * @since 1.2.8
 * 
 * @param  {Array} array1 The first array to compare.
 * @param  {Array} array2 The second array to compare.
 * @return {Array}
 * 
 * @example <caption>  </caption>
 * intersection([1, 2, 3], [4, 3, 2]); // [2, 3]
*/
namespace.intersection = (a, b) => {
    const s = new Set(b);
    return [...new Set(a)].filter(x => s.has(x));
};

/**
 * Determines if two arrays have a common item.
 * 
 * @since 1.2.8
 * 
 * @param  {Array} array1 The first array to compare.
 * @param  {Array} array2 The second array to compare.
 * @return {Boolean}
 * 
 * @example <caption>  </caption>
 * intersects([1, 2, 3], [4, 3, 2]); // true
 * intersects([1, 2, 3], [4, 5, 6]); // false
*/
namespace.intersects = (a, b) => {
    const s = new Set(b);
    return [...new Set(a)].some(x => s.has(x));
};

/**
 * Filters out the elements of an array that have one of the specified values.
 * 
 * @since 1.2.8
 * 
 * @param  {Array} array1 The array remove items from.
 * @param  {Array} array2 The items to be removed.
 * @return {Boolean}
 * 
 * @example <caption>  </caption>
 * without([2, 1, 2, 3], 1, 2); // [3]
*/
namespace.without = (arr, ...args) => arr.filter(v => !args.includes(v));

module.exports = namespace;