const fileSystem = require("fs");

/**
 * @namespace
 * @public
 */
const namespace = {}

/*  This implements the following methods and properties:
    > fileSize()
    > fileSizeSync()
    > readBytes()
    > readBytesSync()
    > appendBytes()
    > appendBytesSync()
    > removeBytes()
    > removeBytesSync()
    > tryFileSizeSync()
    > tryReadBytesSync()
    > tryAppendBytesSync()
    > tryRemoveBytesSync()
*/

/**
 * Get the file size in bytes (async). Throws an error if fails.
 * Promise-based API, allows use with async-await
 * 
 * @since 1.2.5 
 * 
 * @param {String} file The path to the target file 
 * @return {Number} The file size in bytes 
 */
namespace.fileSize = async function (file) {
    let a;
    try { 
        a = await fileSystem.promises.stat(file).size; 
    } catch (err) { 
        throw new Error (err); 
    }
    return a;
}

/**
 * Get the file size in bytes (synchronically). Throws an error if fails.
 * Promise-based API, allows use with async-await
 * 
 * @since 1.2.5 
 * 
 * @param  {String} file The path to the target file
 * @return {Number} The file size in bytes
 */
namespace.fileSizeSync = file => { 
    let a;
    try { a = fileSystem.statSync(file).size; } 
    catch (err) { throw new Error (err); }
    return a;
}

/**
 * Try to read a file, returns its content if successful, else throws an error.
 * Promise-based API, allows use with async-await
 * 
 * @since 1.2.5 
 * 
 * @param  {String} file      The path to the target file
 * @param  {String} encoding  The encoding mode (defaults to binary mode if not specified). The encoding mode respects the encodings of node::fs.readFileSync.
 * @return {Buffer|String}  The file content encoded. If in binary read mode, returns a buffer, else returns a string
 * 
 * @example <caption> Get a file content in text mode: </caption>
 * // returns "hello" // (the content of the file)
 * fs.readBytesSync("./somefile.txt", "utf8")
 * @example <caption> Get a file content in binary mode: </caption>
 * // returns <Buffer 68 65 6C 6C 6F> // (the content of the file, in a buffer)
 * fs.readBytesSync("./somefile.txt")
*/
namespace.readBytes = async function (file, encoding) {
    let a;
    try { 
        a = await fileSystem.promises.readFile(file, encoding); 
    } catch (err) { 
        throw new Error (err); 
    }
    return a;
}

/**
 * Try to read a file, returns its content if successful, else throws an error.
 * 
 * @since 1.2.5 
 * 
 * @param  {String} file      The path to the target file
 * @param  {String} encoding  The encoding mode (defaults to binary mode if not specified). The encoding mode respects the encodings of node::fs.readFileSync.
 * @return {Buffer|String}  The file content encoded. If in binary read mode, returns a buffer, else returns a string
 * 
 * @example <caption> Get a file content in text mode: </caption>
 * // returns "hello" // (the content of the file)
 * fs.readBytesSync("./somefile.txt", "utf8")
 * @example <caption> Get a file content in binary mode: </caption>
 * // returns <Buffer 68 65 6C 6C 6F> // (the content of the file, in a buffer)
 * fs.readBytesSync("./somefile.txt")
*/
namespace.readBytesSync = (file, encoding) => {
    let a;
    try { a = fileSystem.readFileSync(file, encoding); } 
    catch (err) { throw new Error (err); }
    return a;
}

/**
 * Try to append bytes to a file, returns the new file size if successful, else throws an error.
 * Promise-based API, allows use with async-await
 *
 * @since 1.2.5 
 * 
 * @param  {String} file     The path to the target file
 * @param  {String} chunk    The content to append
 * @param  {String} encoding The encoding mode (defaults to binary mode if not specified)
 * @return {Buffer|String}  The new file size, after appending bytes
 * 
 * @example <caption> Add a set of raw bytes to a file: </caption>
 * // returns the new file length
 * fs.appendBytesSync('./somefile.bin', Buffer.from("foo"))
 * @example <caption> Adds string to a file: </caption>
 * // returns the new file length
 * fs.appendBytesSync('./somefile.bin', "foo", "utf8")
*/
namespace.appendBytesSync = async function (file, chunk, encoding) {
    try { 
        await fileSystem.promises.appendFile(file, chunk, encoding); 
    } catch (err) { 
        throw new Error (err); 
    }
    return fs.fileSizeSync(file);
}

/**
 * Try to append bytes to a file, returns the new file size if successful, else throws an error.
 * 
 * @since 1.2.5 
 * 
 * @param  {String} file     The path to the target file
 * @param  {String} chunk    The content to append
 * @param  {String} encoding The encoding mode (defaults to binary mode if not specified)
 * @return {Buffer|String}  The new file size, after appending bytes
 * 
 * @example <caption> Add a set of raw bytes to a file: </caption>
 * // returns the new file length
 * fs.appendBytesSync('./somefile.bin', Buffer.from("foo"))
 * @example <caption> Adds string to a file: </caption>
 * // returns the new file length
 * fs.appendBytesSync('./somefile.bin', "foo", "utf8")
*/
namespace.appendBytesSync = (file, chunk, encoding) => {
    try { fileSystem.appendFileSync(file, chunk, encoding); } 
    catch (err) { throw new Error (err); }
    return fs.fileSizeSync(file);
}

/**
 * Try to remove bytes from a file, returns the new file size if successful, else throws an error.
 * 
 * @since 1.2.5 
 * 
 * @param  {String} file    The path to the target file
 * @param  {String} len     The number of bytes to delete. Defaults to 1
 * @return {Number}         The new file size, after deleting bytes
 * 
 * @example <caption> Delete 20 bytes from the end of the file: </caption>
 * // returns the new file length
 * removeBytesSync('./somefile.bin', 20)
*/
namespace.removeBytes = async function (file, len = 1) {
    try { await fileSystem.promises.truncate(file, len); } 
    catch (err) { throw new Error (err); }
    return await fs.fileSize(file);
}

/**
 * Try to remove bytes from a file, returns the new file size if successful, else throws an error.
 * 
 * @since 1.2.5 
 * 
 * @param  {String} file    The path to the target file
 * @param  {String} len     The number of bytes to delete. Defaults to 1
 * @return {Number}         The new file size, after deleting bytes
 * 
 * @example <caption> Delete 20 bytes from the end of the file: </caption>
 * // returns the new file length
 * removeBytesSync('./somefile.bin', 20)
*/
namespace.removeBytesSync = (file, len = 1) => {
    try { fileSystem.truncateSync(file, len); } 
    catch (err) { throw new Error (err); }
    return fs.fileSizeSync(file);
}

/**
 * Callback that is executed if there's an error
 * @callback ifErrCallback
 * @param {Error} err The current item in the callback
*/
/**
 * Get the file size in bytes (synchronically). Executes the provided callback if fails. Returns null if fails
 * @param  {String} file The path to the target file
 * @param  {Function} ifErrCallback The callback to execute if theres an error. Receives one parameter: the error object, generated by `try{}catch(err){}`
 * @return {Number|Null} The file size in bytes, or Null if it fails
*/
namespace.tryFileSizeSync = (file, ifErrCallback = () => {}) => { 
    let a;
    try { a = fileSystem.statSync(file).size; } 
    catch (err) { ifErrCallback(err); return null; }
    return a;
}

/**
 * Callback that is executed if there's an error
 * @callback ifErrCallback
 * @param {Error} err The current item in the callback
*/
/**
 * Try to read a file, returns its content if successful, executes the provided callback if fails. Returns null if fails
 * @param  {String} file      The path to the target file
 * @param  {String} encoding  The encoding mode (defaults to binary mode if not specified). The encoding mode respects the encodings of node::fs.readFileSync.
 * @param  {Function} ifErrCallback The callback to execute if theres an error. Receives one parameter: the error object, generated by `try{}catch(err){}`
 * @return {Buffer|String|Null}  The file content encoded. If in binary read mode, returns a buffer, else returns a string, or Null if it fails
 * @example <caption> Get a file content in text mode: </caption>
 * // returns "hello" // (the content of the file) // or console.log(err) if triggers an error
 * fs.tryReadBytesSync("./somefile.txt", "utf8", (err) => console.log(err))
 * @example <caption> Get a file content in binary mode: </caption>
 * // returns <Buffer 68 65 6C 6C 6F> // (the content of the file, in a buffer)// or console.log(err) if triggers an error
 * fs.tryReadBytesSync("./somefile.txt", (err) => console.log(err))
*/
namespace.tryReadBytesSync = (file, encode, ifErrCallback = () => {}) => {
    let a;
    try { a = fileSystem.readFileSync(file, encode); } 
    catch (err) { ifErrCallback(err); return null; }
    return a;
}

/**
 * Callback that is executed if there's an error
 * @callback ifErrCallback
 * @param {Error} err The current item in the callback
*/
/**
 * Try to append bytes to a file, returns the new file size if successful, else executes the provided callback. Returns null if fails
 * @param  {String} file     The path to the target file
 * @param  {String} chunk    The content to append
 * @param  {String} encoding The encoding mode (defaults to binary mode if not specified)
 * @param  {Function} ifErrCallback The callback to execute if theres an error. Receives one parameter: the error object, generated by `try{}catch(err){}`
 * @return {Buffer|String|Null}  The new file size, after appending bytes
 * @example <caption> Add a set of raw bytes to a file: </caption>
 * // returns the new file length, or console.log(err) if triggers an error
 * fs.tryAppendBytesSync('./somefile.bin', Buffer.from("foo"), (err) => console.log(err))
 * @example <caption> Adds string to a file: </caption>
 * // returns the new file length, or console.log(err) if triggers an error
 * fs.tryAppendBytesSync('./somefile.bin', "foo", "utf8", (err) => console.log(err))
*/
namespace.tryAppendBytesSync = (file, chunk, enc = 'utf8', ifErrCallback = () => {}) => {
    try { fileSystem.appendFileSync(file, chunk, enc); } 
    catch (err) { ifErrCallback(err); return null; }
    return 0;
}

/**
 * Callback that is executed if there's an error
 * @callback ifErrCallback
 * @param {Error} err The current item in the callback
*/
/**
 * Try to remove bytes from a file, returns the new file size if successful, else executes the provided callback. Returns null if fails
 * @param  {String} file    The path to the target file
 * @param  {String} len     The number of bytes to delete. Defaults to 1
 * @param  {Function} ifErrCallback The callback to execute if theres an error. Receives one parameter: the error object, generated by `try{}catch(err){}`
 * @return {Number}         The new file size, after deleting bytes
 * @example <caption> Delete 20 bytes from the end of the file: </caption>
 * // returns the new file length, or returns null and executes the callback if fails
 * fs.removeBytesSync('./somefile.bin', 20, err => console.log(err))
*/
namespace.tryRemoveBytesSync = (file, len = 1, ifErrCallback = () => {}) => {
    try { fileSystem.truncateSync(file, len); } 
    catch (err) { ifErrCallback(err); return null; }
    return 0;
}
 
module.exports = namespace;