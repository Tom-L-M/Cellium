/**
 * @namespace
 * @public
 */
const namespace = {}

/*  This implements the following methods and properties:
    > randomByte()
    > toStringByteArray()
    > cloneSection()
*/

/**
 * Generates a pair of pseudo-random hexadecimal characters, 
 * representing a byte using a string, and then turns it into a Buffered byte.
 * 
 * @warning This method uses non-cryptographically-secure randomization
 * 
 * @since 1.2.5 
 * 
 * @return {Buffer} A string with a pair of pseudo-random hexadecimal characters from 00 to FF, bufferized
 * 
 * @example <caption> Returning a buffer with one pseudo-random byte: </caption>
 * buffer.randomByte()
 * // Ex: => <Buffer 0A>
 */
namespace.randomByte = () => Buffer.from(["0x"+Math.random().toString(16).substring(5,7).toUpperCase()]);

/**
 * Converts a Buffer to an Array containing string representations of the bytes
 * 
 * @since 1.2.5 
 * 
 * @param  {Buffer} buffer The buffer to convert
 * @return {String[]} An array of uppercase string representations of the bytes
 * 
 * @example <caption> Converting a Buffer to an string byte array </caption>
 * buffer.toStringByteArray(Buffer.from(["0x0a","0x00","0xff"]))
 * // => ["0A", "00", "FF"]
 */
namespace.toStringByteArray = buffer => buffer.toString('hex').toUpperCase().match(/..?/g);

/**
 * Returns a copy of a section of a Buffer. Changes in the copy do not affect the original Buffer
 * 
 * @since 1.2.5 
 * 
 * @param  {Buffer|Array} buffer The array or buffer to slice
 * @param  {Number} start The position in the buffer to start the copy (inclusive)
 * @param  {Number} end The position in the buffer to end the copy (exclusive)
 * @return {Buffer} Returns a new buffer or array containing the selected section of the original
 * 
 * @example <caption> Cloning the section [1,6] of a buffer: </caption>
 * buffer.cloneSection(Buffer.from([00,01,02,03,04,05,06,07]), 1, 6)
 * // => <Buffer 01 02 03 04 05>
 * @example <caption> Cloning the section [1,6] of an array: </caption>
 * buffer.cloneSection([00,01,02,03,04,05,06,07], 1, 6)
 * // => [01, 02, 03, 04, 05]
 */
namespace.cloneSection = (buffer, start = 0, end = buffer.length) => { 
    let tmp = [];
    for (let i = start; i < end; i++) { tmp.push(buffer[i]); }
    if (buffer instanceof Buffer) { return Buffer.from(tmp, 'hex'); } 
    return tmp;
}

module.exports = namespace;