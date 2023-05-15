/**
 * @namespace
 * @public
 */
const namespace = {}

/*  This implements the following methods and properties:
    > vID()
    > UUID()
    > randomStringByte()
    > chunk()
    > visualLength()
    > stripBlank()
    > stripEmptyLines()
    > formatPath()
    > getFileExtension()
    > getFileName()
    > stripHTML()
    > slugify()
    > reval()
    > isSparseEqual()
    > decodeFrom()
    > encodeTo()
    > changeEncoding()
    > expandTabs()
    > escapeRegExpString()
    > map()
    > normalizeNewlines()
    > removeNonASCII()
    > replaceLast()
    > reverse()
    > reverseWords()
    > reverseOrder()
    > unescapeHTML()
    > levenshteinDistance()
    > tokenize()
*/

/**
 * Returns a formatted virtual ID string, with the provided model and charset.
 * 
 * @warning This method uses non-cryptographically-secure randomization
 * 
 * @since 1.2.5 
 * 
 * @param  {String} mask
 *  The ID model (mask) to replace the characters. Default is the UUID common format: "########-####-####-####-########"
 * @param  {String} charToReplace
 *  The character that will be globally replaced in the ID mask. Default is '#'
 * @param  {Number} charset
 *  The charset range of the ID replacements. They are the same as the 'radix' parameter in Number.prototype.toString()
 * @return {String} Returns the provided mask, with the selected char replaced by an equivalent in radix from the selected charset
 * 
 * @example <caption> Returning a customized mask, replacing '$' with hexadecimal characters: </caption>
 * vID("$$$.$$-$$$=$$", "$", 16)
 * // returns a set of pseudo-random characters, in the custom format:
 * //  ex: 819.f1-c23=9f
 */
namespace.vID = (mask = '########-####-####-####-########', charToReplace = '#', charset = 16) => {
    return mask.replace(new RegExp(`[${charToReplace}]`, 'gim'), () => Math.random().toString(charset)[6]);
}

/**
 * Returns a formatted virtual ID string, with the provided model and charset.
 * 
 * @warning This method uses non-cryptographically-secure randomization
 * 
 * @since 1.2.8 
 * 
 * @param  {String} mask
 *  The ID model (mask) to replace the characters. Default is the UUID common format: "########-####-####-####-########"
 * @param  {String} charToReplace
 *  The character that will be globally replaced in the ID mask. Default is '#'
 * @param  {Number} charset
 *  The charset range of the ID replacements. They are the same as the 'radix' parameter in Number.prototype.toString()
 * @return {String} Returns the provided mask, with the selected char replaced by an equivalent in radix from the selected charset
 * 
 * @example <caption> Returning a simple pseudo-random UUID by using default function values: </caption>
 * vID()
 * // returns a set of pseudo-random characters, in the UUID default format:
 * //  ex: 34WAS58V-A8LZ-ZWE3-NUJG-8SHZDCZO
 * @example <caption> Returning a customized mask, replacing '$' with hexadecimal characters: </caption>
 * vID("$$$.$$-$$$=$$", "$", 16)
 * // returns a set of pseudo-random characters, in the custom format:
 * //  ex: 819.F1-C23=9F
 */
namespace.UUID = () => '########-####-####-####-############'.replace(new RegExp(`[#]`, 'gim'), () => Math.random().toString(16)[6]);

/**
 * Generates a pair of pseudo-random hexadecimal characters, representing a byte using a string.
 *
 * @warning This method uses non-cryptographically-secure randomization
 * 
 * @since 1.2.5 
 * 
 * @param {} 
 * @return {String} A pair of pseudo-random hexadecimal characters from 00 to FF
 * 
 * @example <caption> Returning the string equivalent of a pseudo-random byte: </caption>
 * randomStringByte()
 * // ex: => "0A"
 */
namespace.randomStringByte = () => Math.random().toString(16).substring(5,7).toUpperCase(); 

/**
 * Splits a string in chunks of N characters.
 * 
 * @since 1.2.5 
 * 
 * @param {String} string The string to divide in chunks
 * @param {Number} chunkSize The size of the chunks to divide the string into
 * @return {String[]} An array with the chunks of N characters 
 * 
 * @example <caption> Dividing the string "0ABF67349C" into chunks of 2 characters </caption>
 * chunk("0ABF67349C", 2)
 * // => ["0A", "BF", "67", "34", "9C"]
 */
namespace.chunk = (string, chunkSize = 1) => string.match(new RegExp(`.{1,${(chunkSize >= 1) ? chunkSize : 1}}`, "gim")) ?? [];

/**
 * Gets the number of literal characters in a string (visual length).
 * 
 * @since 1.2.5 
 * 
 * @param  {String} string The string to get the visual length
 * @return {Number} The visual length (number of literal characters) of a string
 * 
 * @example <caption> Getting the length of a sting containing an Emoji (multi-codepoint character): </caption>
 * Using '.length', returns the number of codepoints:
 * "😀".length                // returns 2
 * Using 'string.visualLength()', returns the number of characters:
 * string.visualLength("😀")   //returns 1
 */
// calling "".length returns the number of code units, not the number of characters.
// By using this function here, the returned number is the number of characters in a string.
// EX: emojis count as 2 characters, so a string with an emoji only will have length = 2,
// but, will have a visualLength() = 1

namespace.visualLength = string => [...string].length;

/**
 * Removes all multi-spaces from a string.
 *
 * @since 1.2.5 
 * 
 * @param  {String} string The string to remove the blanks from
 * @return {String} The string with the multi-spaces removed
 * @example <caption> Removing triple spaces in a string: </caption>
 * // returns "hello world!"
 * // string.stripBlank("hello    world!")
*/
namespace.stripBlank = string => string.split('\n').map(x => x.replace(/\s+/g, ' ')).join('\n');

/**
 * Removes all empty lines from a multi-line string.
 *
 * @since 1.2.10 
 * 
 * @param  {String} string The string to remove the newlines from
 * @return {String} The string with the multi-newlines removed
 * @example <caption> Removing empty lines in a string: </caption>
 * // returns "hello world!\n\n\ndonuts"
 * // string.stripBlank("hello world!\ndonuts")
*/
namespace.stripEmptyLines = string => string.trim().split('\n').filter(x => x).join('\n');

/**
 * Reverses a string.
 * 
 * @since 1.2.5 
 * 
 * @param  {String} string
 * @return {String} The string, with the character order reversed
 * @example <caption> Reversing a string: </caption>
 * // returns "rab oof"
 * // string.reverse("foo bar")
*/
namespace.reverse = string => string.split('').reverse().join('');

/**
 * Reverses the characters of the words in a string, keeping the word order.
 * 
 * @since 1.2.5 
 * 
 * @param  {String} string
 * @return {String} The string, with the character order reversed
 * @example <caption> Reversing a string: </caption>
 * // returns "oof rab"
 * // reverseWords("foo bar")
*/
namespace.reverseWords = string => string.split(' ').map(x => x.split('').reverse().join('')).join(' ');

/**
 * Reverses the the words position in a string.
 * 
 * @since 1.2.5 
 * 
 * @param  {String} string
 * @return {String} The string, with the words order reversed
 * @example <caption> Reversing a string: </caption>
 * // returns "bar foo"
 * reverseOrder("foo bar")
*/
namespace.reverseOrder = string => string.split(' ').reverse().join(' ');

/**
 * Formats a provided path, trimming it, and changing all '/' to '\'.
 * 
 * @since 1.2.5 
 * 
 * @param  {String} path 
 * @return {String} The provided path, formatted
 * @example <caption> Formatting a file path: </caption>
 * // returns 'C:\\some\\path\\some.file'
 * formatPath('c:/some\\path/some.file')
*/
namespace.formatPath = path => path.replace(/\//gim, '\\').trim();

/**
 * Gets the extension of a provided file path.
 *
 * @since 1.2.5 
 * 
 * @param  {String} file 
 * @return {String} The file extension
 * @example <caption> Getting a file extension: </caption>
 * // returns 'txt'
 * getFileExtension('c:/some/path/somefile.txt')
*/
namespace.getFileExtension = file => file.split('.').reverse()[0];

/**
 * Gets the name of a provided file path.
 *
 * @since 1.2.10 
 * 
 * @param  {String} file
 * @return {String} The file name
 * @example <caption> Getting a file extension: </caption>
 * // returns 'somefile'
 * getFileExtension('c:/some/path/somefile.txt')
*/
namespace.getFileName = file => {
    let tmp = file.replace(/\//gim, '\\').trim().split('\\').reverse()[0];
        tmp = tmp.substring(0, tmp.lastIndexOf('.'));
    return tmp;
}

/**
 * Remove HTML tags from a string, replacing it for `replacement`.
 * 
 * @since 1.2.5 
 * 
 * @param  {String} string The string containing HTML tags to replace
 * @param  {String} replacement The value to replace the html tags for. Default is ''
 * @return {String}
*/
namespace.stripHTML = (string, replacement = '') => string.replace(/<(?:.|\n)*?>/gm, replacement).replace(/\s+/g, ' ').trim();

/**
 * Formats a string to be  URI-compatible.
 * 
 * @since 1.2.5 
 * 
 * @param  {String} string The string to format
 * @param  {String} replacement Value to use as separator, or replacement for invalid chars. Default is '-'
 * @param  {Boolean} replaceSpaces If set to true, replace spaces in string for the replacement char, else, leaves the spaces as they are. Default is true
 * @return {String} The string formatted to be used as a URI
 * @example <caption> Simple string formatting: </caption>
 * slugify("Hello World My Friend!", '-', true)
 * // returns "Hello-World-My-Friend"
*/
namespace.slugify = (string, replacement = '-', replaceSpaces = true) => {
    return (string
    .replace(/<(?:.|\n)*?>/gm, '')
    .replace(/[!\"#$%&'\(\)\*\+,\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, '')
    .replace((replaceSpaces ? /(\s|\.)/g : /(\.)/g), replacement)
    .replace(/—/g, replacement)
    .replace(/-{2,}/g, replacement));
}

/**
 * Repeats a string multiple times, concatenating the repetitions together
 * Without `evaluate` set as `true`, this method behaves exactly equal to Node built-in method `String.prototype.repeat()`,
 * but, with `evaluate` set as `true`, this methods re-evaluates the expression provided as the `str` parameter on every repetition,
 * allowing methods such as randomization-based ones can be re-run many times.
 * 
 * @since 1.2.5 
 * 
 * @param  {String} string The string, or string-resulting expression, to be repeated
 * @param  {Number} repetitions The number of times to repeat the string (default is 0)
 * @param  {Boolean} evaluate This flag controls whether the string-resulting expression is re-evaluated on each repetition (default is `true`)
 * @return {String} The string, repeated the provided number of times, and concatenated 
 * @example <caption> Repeating a simple string: </caption>
 * // Both string.reval() and String.prototype.repeat() behave exactly equal for simple strings:
 * // returns "hello hello hello "
 * reval("hello ", 3)
 * @example <caption> Repeating a string-returning expression: </caption>
 * // With string.reval():
 * // return example: "095"
 * reval("Math.random().toString()[5]", 3)
 * 
 * // With node.js built-in String.prototype.repeat():
 * // return example: "Math.random().toString()[5]Math.random().toString()[5]Math.random().toString()[5]"
 * "Math.random().toString()[5]".repeat(3)
 * 
 * // With string.reval() and the `evaluate` flag set as `false`:
 * // return example: "Math.random().toString()[5]Math.random().toString()[5]Math.random().toString()[5]"
 * reval(Math.random().toString()[5], 3, false)
*/
namespace.reval = (string, repetitions = 0, evaluate = true) => {
    let str = (evaluate ? eval(string) : string);
    let acc = '';
    for (let i = 0; i < repetitions; i++) {
        acc = acc + (evaluate ? eval(string) : str);
    }
    return acc;
}

/**
 * Compares two strings in 'sparse' mode. Using the wildcards '{*}' and '{?}' to match strings. 
 * Use '{*}' for any number of (any) characters, and {?}' for one (any) character.
 * 
 * @since 1.2.7 
 * 
 * @param  {String} str1 The first string to compare
 * @param  {String} str2 The second string to compare
 * @return {Boolean} If the strings are sparsely equal or not
 * @example <caption> Comparing simple strings: </caption>
 * isSparseEqual("hello", "hello")
 * // => true
 * isSparseEqual("hello", "wello")
 * // => false
 * @example <caption> Comparing complex strings: </caption>
 * isSparseEqual("{?}ello", "hello")
 * // => true
 * isSparseEqual("h*", "hello")
 * // => true
 * isSparseEqual("h{*}e", "hello")
 * // => false
 * isSparseEqual("h{*}e", "helle")
 * // => true
*/
namespace.isSparseEqual = (str1 = '', str2 = '') => {
    const string1 = str1.replace(/{\?}/g, '.').replace(/{\*}/g, '.*');
    const string2 = str2.replace(/{\?}/g, '.').replace(/{\*}/g, '.*');
    const regex = new RegExp(`^${string1}$`);
    return regex.test(string2);
}

/**
 * Decodes a string of data which has been encoded using base-64 encoding.
 * 
 * @since 1.2.8 
 * 
 * @param  {String} base The string base
 * @param  {String} string The string to decode
 * @return {String} The string decoded to the proper base
 * @example <caption> Decoding a base64 encoded string: </caption>
 * decodeFrom('base64', 'Zm9vYmFy'); // 'foobar'
 * @example <caption> Decoding a hex encoded string: </caption>
 * decodeFrom('hex', '666F6F626172'); // 'foobar'
*/
namespace.decodeFrom = (base, string) => Buffer.from(string, base).toString('utf8');

/**
 * Decodes a string of data which has been encoded using base-64 encoding.
 * 
 * @since 1.2.8 
 * 
 * @param  {String} base The string base
 * @param  {String} string The string to encode
 * @return {String} The string encoded to the proper base
 * @example <caption> Encoding a string to base64: </caption>
 * encodeTo('base64', 'foobar'); // 'Zm9vYmFy'
 * @example <caption> Decoding a hex encoded string: </caption>
 * encodeTo('hex', 'foobar'); // '666F6F626172'
*/
namespace.encodeTo = (base, string) => Buffer.from(string, 'utf8').toString(base);

/**
 * Changes the encoding of the provided target string
 * 
 * @since 1.2.8 
 * 
 * @param  {String} base The string current base
 * @param  {String} newBase The new string base
 * @param  {String} string The string to encode
 * @return {String} The string encoded to the proper base
 * @example <caption> Encoding a string from utf8 to base64: </caption>
 * changeEncoding('utf8', 'base64', 'foobar'); // 'Zm9vYmFy'
 * @example <caption> Encoding a string from base64 to hex: </caption>
 * changeEncoding('base64', 'hex', 'Zm9vYmFy'); // '666F6F626172'
*/
namespace.changeEncoding = (base, newBase, string) => Buffer.from(string, base).toString(newBase);

/**
 * Expand tabs to spaces in a string
 * 
 * @since 1.2.8 
 * 
 * @param  {String} string The string containing tabs.
 * @param  {String} spaceCount The number of spaces to replace the tabs for. default is 1.
 * @return {String} 
*/
namespace.expandTabs = (string, spaceCount = 1 ) => string.replace(/\t/gim, ' '.repeat(spaceCount));

/**
 * Escapes the special characters in a regexp string
 * 
 * @since 1.2.8 
 * 
 * @param  {String} bytes The string to escape
 * @return {String} The string, escaped to be used in a RegExp
 * @example <caption> </caption>
 * escapeRegExp('(test)'); // \(test\)
*/
namespace.escapeRegExpString = string => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Creates a new string with the results of calling a provided function on every character in the given string.
 * 
 * @since 1.2.8 
 * 
 * @param  {String} string The string to map.
 * @return {Function} The string, changed by the mapping callback function.
 * @example <caption> </caption>
 * map('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'
*/
namespace.map = (string, func) => string.split('').map((c, i) => func(c, i, string)).join('');

/**
 * Normalizes line endings in a string.
 * 
 * @since 1.2.8 
 * 
 * @param  {String} string The string to normalize.
 * @param  {String} normalized The line ending to define as normalized.
 * @return {String} The string, with the newlines normalized.
 * @example <caption> </caption>
 * normalizeLineEndings('This\r\nis a\nmultiline\nstring.\r\n');
 *  // 'This\r\nis a\r\nmultiline\r\nstring.\r\n'
 * normalizeLineEndings('This\r\nis a\nmultiline\nstring.\r\n', '\n');
 *  // 'This\nis a\nmultiline\nstring.\n'
*/
namespace.normalizeNewlines = (string, normalized = '\r\n') => string.replace(/\r?\n/g, normalized);


/**
 * Removes non-printable ASCII characters.
 * 
 * @since 1.2.8 
 * 
 * @param  {String} string The string to normalize.
 * @return {String} The string, with the non-printable characters removed.
 * @example <caption> </caption>
 * removeNonASCII('äÄçÇéÉêlorem-ipsumöÖÐþúÚ'); // 'lorem-ipsum'
*/
namespace.removeNonASCII = string => string.replace(/[^\x20-\x7E]/g, '');

/**
 * Replaces the last occurrence of a pattern in a string.
 * 
 * @since 1.2.8 
 * 
 * @param  {String} str The string to replace from.
 * @param  {String} pattern The pattern to replace.
 * @param  {String} replacement The value to replace for.
 * @return {String} The string, with the last value of 'pattern' replaced.
 * @example <caption> </caption>
 * replaceLast('abcabdef', 'ab', 'gg'); // 'abcggdef'
 * replaceLast('abcabdef', /ab/, 'gg'); // 'abcggdef'
 * replaceLast('abcabdef', 'ad', 'gg'); // 'abcabdef'
 * replaceLast('abcabdef', /ad/, 'gg'); // 'abcabdef'
*/
namespace.replaceLast = (str, pattern, replacement) => {
    const match = typeof pattern === 'string'
        ? pattern
        : (str.match(new RegExp(pattern.source, 'g')) || []).slice(-1)[0];
    if (!match) return str;
    const last = str.lastIndexOf(match);
    return last !== -1
        ? `${str.slice(0, last)}${replacement}${str.slice(last + match.length)}`
        : str
    ;
};

/**
 * Reverses a string.
 * 
 * @since 1.2.8 
 * 
 * @param  {String} str The string to reverse.
 * @return {String} The string, reversed.
 * @example <caption> </caption>
 * reverseString('foobar'); // 'raboof'
*/ 
namespace.reverse = string => string.split('').reverse().join('');

/**
 * Unescapes escaped HTML characters.
 * 
 * @since 1.2.8 
 * 
 * @param  {String} str The string to unescape.
 * @return {String}
 * @example <caption> </caption>
 * unescapeHTML('&lt;a href=&quot;#&quot;&gt;Me &amp; you&lt;/a&gt;');
 * // '<a href="#">Me & you</a>'
*/ 
namespace.unescapeHTML = str => {
    return str.replace(/&amp;|&lt;|&gt;|&#39;|&quot;/g,
        tag => ({
            '&amp;': '&',
            '&lt;': '<',
            '&gt;': '>',
            '&#39;': "'",
            '&quot;': '"'
        }[tag] || tag)
    );
}

/**
 * Calculates the difference between two strings, using the Levenshtein distance algorithm.
 * Reference: https://en.wikipedia.org/wiki/Levenshtein_distance
 * 
 * @since 1.2.8 
 * 
 * @param  {String} s The first string to compare
 * @param  {String} t The second string to compare
 * @return {String} 
 * @example <caption> </caption>
 * levenshteinDistance('duck', 'dark'); // 2
*/ 
namespace.levenshteinDistance = (s, t) => {
    if (!s.length) return t.length;
    if (!t.length) return s.length;
    const arr = [];
    for (let i = 0; i <= t.length; i++) {
        arr[i] = [i];
        for (let j = 1; j <= s.length; j++) {
            arr[i][j] =
            i === 0
                ? j
                : Math.min(
                    arr[i - 1][j] + 1,
                    arr[i][j - 1] + 1,
                    arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
                );
        }
    }
    return arr[t.length][s.length];
};

/**
 * Divide the string in tokens.
 * 
 * @since 1.2.8 
 * 
 * @param  {String} string The string to split.
 * @return {Array} An array of tokens. 
 * @example <caption> </caption>
 * tokenize('hello world my   friend'); // ['hello', 'world', 'my', 'friend']
*/ 
/**
 * Divide the string in tokens.
 * 
 * @since 1.2.8 
 * 
 * @param  {String} string The string to split.
 * @return {Array} An array of tokens. 
 * @example <caption> </caption>
 * tokenize('hello world my   friend'); // ['hello', 'world', 'my', 'friend']
*/ 
namespace.tokenize = string => {
    return string.replace(/\r?\n/g, '\n').split('\n').filter(x => !!x).map(c => 
        c.split(' ')
        .filter(x => !!x)
    )
}

module.exports = namespace;