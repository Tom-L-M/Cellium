/**
 * @namespace
 * @public
 */
const color = {}

/*  This implements the following methods and properties:
    > color.reset
    > color.bg
    > color.fg
    > color.formatMap
    > color.format()
    > color.revertFormat()
    > color.clear()
    > color.print()
    > color.write()
    > color.printSample()
*/

/**
 * The color code for 'reset' code. Resets the color formatting to default black-in-white
 * @property
 * @since 1.2.5
 * @type {String}
 * @public
 */
color.reset = "\x1b[0m";

/**
 * Color codes for background coloring
 * @since 1.2.5
 * @property {String}  bg 
 * @property {String}  bg.black 
 * @property {String}  bg.red  
 * @property {String}  bg.green 
 * @property {String}  bg.yellow 
 * @property {String}  bg.blue
 * @property {String}  bg.magenta  
 * @property {String}  bg.cyan
 * @property {String}  bg.white 
 */
color.bg = {
    empty: "",
    black: "\x1b[40m",
    red: "\x1b[41m",
    green: "\x1b[42m",
    yellow: "\x1b[43m",
    blue: "\x1b[44m",
    magenta: "\x1b[45m",
    cyan: "\x1b[46m",
    white: "\x1b[47m",
}

/**
 * Color codes for foreground coloring
 * @since 1.2.5
 * @property {String}  fg 
 * @property {String}  fg.black 
 * @property {String}  fg.red  
 * @property {String}  fg.green 
 * @property {String}  fg.yellow 
 * @property {String}  fg.blue
 * @property {String}  fg.magenta  
 * @property {String}  fg.cyan
 * @property {String}  fg.white 
 */
color.fg = {
    empty: "",
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
}

/**
 * Color code matching map. 
 * Merges: formatting codes (extended), formatting codes (compressed), and color codes, in arrays
 * @since 1.2.5
 * @property {Array[String[]]}  formatMap 
 */
color.formatMap = [
    /**
     * Color code matching map entry.
     * [ extended_formatting_code, compressed_formatting_code, color_code[fg|bg|reset] ] 
     */
    ['$.reset', '$.RST', color.reset],
    ['$f.black', '$f.BLK', color.fg.black],
    ['$f.red', '$f.RED', color.fg.red],
    ['$f.green', '$f.GRN', color.fg.green],
    ['$f.yellow', '$f.YLW', color.fg.yellow],
    ['$f.blue', '$f.BLU', color.fg.blue],
    ['$f.magenta', '$f.MGT', color.fg.magenta],
    ['$f.cyan', '$f.CYN', color.fg.cyan],
    ['$f.white', '$f.WHT', color.fg.white],
    ['$b.black', '$b.BLK', color.bg.black],
    ['$b.red', '$b.RED', color.bg.red],
    ['$b.green', '$b.GRN', color.bg.green],
    ['$b.yellow', '$b.YLW', color.bg.yellow],
    ['$b.blue', '$b.BLU', color.bg.blue],
    ['$b.magenta', '$b.MGT', color.bg.magenta],
    ['$b.cyan', '$b.CYN', color.bg.cyan],
    ['$b.white', '$b.WHT', color.bg.white],
];

/**
 * Formats a string, replacing formatting codes for color codes, adding colored outputs for strings
 * 
 * @since 1.2.5
 * 
 * @param  {String} string The string with the formatting codes, to replace
 * @return {String} The passed string, formatted to have color codes
 * 
 * @example <caption> Coloring a string (foreground): </caption>
 * // return "\x1b[31m foo \x1b[0m bar \x1b[34m stu \x1b[0m" 
 * //   this string in windows console will have 'foo' in red, 'bar' in regular console color (white), and 'stu' in blue
 * color.format("$f.red foo $.reset bar $f.blue stu $.reset")
 * @example <caption> Coloring a string (foreground) with compressed formatting codes: </caption>
 * // return "\x1b[31m foo \x1b[0m bar \x1b[34m stu \x1b[0m" 
 * //   this string in windows console will have 'foo' in red, 'bar' in regular console color (white), and 'stu' in blue
 * color.format("$f.red foo $.rst bar $f.blu stu $.rst")
*/
color.format = (string = '') => {
    let str = string;
    for (let i = 0; i < color.formatMap.length; i++) {
        str = str.replace(new RegExp(color.formatMap[i][0], 'gim'), color.formatMap[i][2]); // for the full replacement string: ex: $fg.black
        str = str.replace(new RegExp(color.formatMap[i][1], 'gim'), color.formatMap[i][2]); // for the reduced replacement string: ex: $fg.blk
    }
    return str;
}

/**
 * Reverse the formatting of a string, replacing color codes for formatting codes, removing colored outputs from strings
 * (This reverts only the color codes present in color.formatMap, and values are replaced by the extended format codes only, never for compressed codes)
 * 
 * @since 1.2.5
 * 
 * @param  {String} string The string with the color codes, to replace
 * @return {String} The passed string, formatted to have format codes
 * 
 * @example <caption> Remove a string coloring: </caption>
 * // return "$f.red foo $.reset bar $f.blue stu $.reset"
 * color.format("\x1b[31m foo \x1b[0m bar \x1b[34m stu \x1b[0m")
*/
color.revertFormat = (string = '') => {
    let str = string;
    for (let i = 0; i < color.formatMap.length; i++) {
        str = str.replace(new RegExp(color.formatMap[i][2], 'gim'), color.formatMap[i][0]);
    }
    return str;
}

/**
 * Reverse the formatting of a string, removing color codes and formatting codes, removing colored outputs from strings
 * Warning: this does not remove any extra space around codes
 * 
 * @since 1.2.5
 * 
 * @param  {String} string The string with the color or formatting codes, to replace
 * @return {String} The passed string, clean
 * 
 * @example <caption> Remove string codes: </caption>
 * // return "foo  bar  stu"
 * color.format("$f.red foo \x1b[0m bar \x1b[34m stu $.reset")
*/
color.clear = (string = '') => {
    let str = string;
    for (let i = 0; i < color.formatMap.length; i++) {
        str = str.replace(new RegExp(color.formatMap[i][0], 'gim'), ''); // for the full replacement string: ex: $fg.black
        str = str.replace(new RegExp(color.formatMap[i][1], 'gim'), ''); // for the reduced replacement string: ex: $fg.blk
        str = str.replace(new RegExp(color.formatMap[i][2], 'gim'), ''); // for the raw color codes
    }
    return str;
}

/**
 * Writes content wrapped with color codes for `fg`, `bg`, and a `reset` in the end
 * This is a safe way of outputting colored content without affecting the next output in case of an error, 
 *  as this methods adds a `reset` in the end, safely wrapping the string,
 *  Leave `fg` and `bg` empty for just wrapping the content with a `reset` in the end, not affecting any previously applied colors
 * 
 * @since 1.2.5
 * 
 * @param  {String} content The string to write
 * @param  {String} fg The foreground color name to wrap the string (default: empty)
 * @param  {String} bg The background color name to wrap the string (default: empty)
 * @executes Writes the formatted string to process.stdout
 * @return {String} Returns the string wrapped with the chosen color codes and a reset in the end
 * 
 * @example <caption> Wrapping a raw string: </caption>
 * // "\x1b[31m\x1b[44mfoo bar\x1b[0m"
 * // executes: process.stdout.write("\x1b[31m\x1b[44mfoo bar\x1b[0m")
 * // This string will be entirely in red foreground, with blue background
 * color.write("foo bar", "red", "blue")
 * @example <caption> Wrapping a pre-formatted string: </caption>
 * // "\x1b[31m\x1b[44mfoo bar\x1b[0m"
 * // executes: process.stdout.write("\x1b[31m\x1b[44mfoo bar\x1b[0m")
 * // This string with previous blue background will be wrapped with red foreground
 * color.write("\x1b[44mfoo bar\x1b[0m", "red")
 * @example <caption> Safely printing a pre-formatted string (keeping the original colors): </caption>
 * // "\x1b[31mfoo bar // => string in red, but the lack of `reset` format code will cause it to change the next writes to console or stdout
 * // executes: process.stdout.write("\x1b[31mfoo bar\x1b[0m")
 * // This string with previous blue background will be wrapped with no new colors, but it will receive a `reset` format code (if it doesn't have one)
 * color.write("\x1b[44mfoo bar")
*/
color.write = (content, fg = "empty", bg = "empty") => {
    [fg, bg] = [fg, bg].map((a) => a.trim().toLowerCase());
    if (color.fg[fg] === undefined) { fg = "empty"; }
    if (color.bg[bg] === undefined) { bg = "empty"; }
    let formatted = `${color.fg[fg]}${color.bg[bg]}${content}`;
    let check = content.split(color.reset).reverse();
    if (check[0].includes('\x1b[')) { formatted += color.reset} // checks if there is a color code after the last `reset` code
    process.stdout.write(formatted);
    return formatted;
}

/**
 *  Writes content wrapped with color codes for `fg`, `bg`, and a `reset` in the end
 * The same as color.write, but with an added '\n' in the end. The same as console.log() compared to process.stdout.write()
 * This is a safe way of outputting colored content without affecting the next output in case of an error, 
 *  as this methods adds a `reset` in the end, safely wrapping the string,
 *  Leave `fg` and `bg` empty for just wrapping the content with a `reset` in the end, not affecting any previously applied colors
 * 
 * @since 1.2.5
 * 
 * @param  {String} content The string to write
 * @param  {String} fg The foreground color name to wrap the string (default: empty)
 * @param  {String} bg The background color name to wrap the string (default: empty)
 * @executes Writes the formatted string to process.stdout
 * @return {String} Returns the string wrapped with the chosen color codes and a reset and a '\n' in the end
 * 
 * @example <caption> Wrapping a raw string: </caption>
 * // "\x1b[31m\x1b[44mfoo bar\x1b[0m"
 * // executes: process.stdout.write("\x1b[31m\x1b[44mfoo bar\x1b[0m" + "\n")
 * // This string will be entirely in red foreground, with blue background
 * color.write("foo bar", "red", "blue")
 * @example <caption> Wrapping a pre-formatted string: </caption>
 * // "\x1b[31m\x1b[44mfoo bar\x1b[0m"
 * // executes: process.stdout.write("\x1b[31m\x1b[44mfoo bar\x1b[0m" + "\n")
 * // This string with previous blue background will be wrapped with red foreground
 * color.write("\x1b[44mfoo bar\x1b[0m", "red")
 * @example <caption> Safely printing a pre-formatted string (keeping the original colors): </caption>
 * // "\x1b[31mfoo bar // => string in red, but the lack of `reset` format code will cause it to change the next writes to stdout
 * // executes: process.stdout.write("\x1b[31mfoo bar\x1b[0m" + "\n")
 * // This string with previous blue background will be wrapped with no new colors, but it will receive a `reset` format code (if it doesn't have one)
 * color.write("\x1b[44mfoo bar")
*/
color.print = (content, fg = "empty", bg = "empty") => {
    let formatted = color.write(content, fg, bg);
    process.stdout.write('\n');
    return formatted + '\n';
}

/**
 * Prints samples of coloring sets for a string (for foreground and background)
 * @since 1.2.5
 * @param  {String} string A string to apply in the samples
 * @executes Writes the formatted string samples to process.stdout
 * @return {undefined} 
*/
color.printSample = (string = 'color') => {
    console.log(`
    \x1b[31m ${string} \x1b[0m
    \x1b[32m ${string} \x1b[0m
    \x1b[33m ${string} \x1b[0m 
    \x1b[34m ${string} \x1b[0m 
    \x1b[35m ${string} \x1b[0m 
    \x1b[36m ${string} \x1b[0m
    \x1b[37m ${string} \x1b[0m
    \x1b[41m\x1b[30m ${string} \x1b[0m
    \x1b[42m\x1b[30m ${string} \x1b[0m
    \x1b[43m\x1b[30m ${string} \x1b[0m 
    \x1b[44m\x1b[30m ${string} \x1b[0m 
    \x1b[45m\x1b[30m ${string} \x1b[0m 
    \x1b[46m\x1b[30m ${string} \x1b[0m
    \x1b[47m\x1b[30m ${string} \x1b[0m
    `);
    return;
}

module.exports = color;