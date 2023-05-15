const osys = require('os');

/**
 * @namespace
 * @public
 */
const namespace = {}

/*  This implements the following methods and properties:
    > localIP()
    > randomIPv4()
    > randomIPv6()
    > randomMAC()
    > getTildePath()
*/

/**
 * Returns the local machine IP. This method is higly unstable, don't recommend depending on it.
 * @unstable
 * @since 1.2.5
 * 
 * @param {} 
 * @return {String} Returns the local machine IP (or undefined if not working properly)  
 */
namespace.localIP = () => Object.values(osys.networkInterfaces()).flat().filter(({ family, internal }) => family === 4 && !internal).map(({ address }) => address)[0];


/**
 * Generates a pseudo-random IPv4 address string
 * 
 * @since 1.2.5
 * 
 * @param  {Number|String} set0 First IPv4 number group, (leave blank or provide `null` to randomize)
 * @param  {Number|String} set1 Second IPv4 number group, (leave blank or provide `null` to randomize)
 * @param  {Number|String} set2 Third IPv4 number group, (leave blank or provide `null` to randomize)
 * @param  {Number|String} set3 Fourth IPv4 number group, (leave blank or provide `null` to randomize)
 * 
 * @return {String} 
 * 
 * @example <caption> Generates a random local (192.168.?.?) IPv4 address: </caption>
 * // example return:   "192.168.132.435"
 * os.randomIPv4(192,168)
*/
namespace.randomIPv4 = (set0, set1, set2, set3) => {
    const r = () => Math.floor(Math.random() * 253) + 1;
    return `${set0||r()}.${set1||r()}.${set2||r()}.${set3||r()}`;
}

/**
 * Generates a pseudo-random IPv6 address string (in uppercase)
 * 
 * @since 1.2.5
 * 
 * @param  {Number|String} set0 First IPv6 number group, (leave blank or provide `null` to randomize)
 * @param  {Number|String} set1 Second IPv6 number group, (leave blank or provide `null` to randomize)
 * @param  {Number|String} set2 Third IPv6 number group, (leave blank or provide `null` to randomize)
 * @param  {Number|String} set3 Fourth IPv6 number group, (leave blank or provide `null` to randomize)
 * @param  {Number|String} set4 Fifth IPv6 number group, (leave blank or provide `null` to randomize)
 * @param  {Number|String} set5 Sixth IPv6 number group, (leave blank or provide `null` to randomize)
 * 
 * @return {String} 
 * 
 * @example <caption> Generates a random IPv6 address: </caption>
 * // example return:   "D130:52F4:A876:8B51:49E6:25E9"
 * os.randomIPv6()
 * @example <caption> Generates a random IPv6 address with a fixed first set: </caption>
 * // example return:   "AAAA:7C34:DCC5:9491:C364:4DB8"
 * os.randomIPv6("AAAA")
*/
namespace.randomIPv6 = (set0, set1, set2, set3, set4, set5) => {
    const r = () => Math.random().toString(16).substring(5,7)+Math.random().toString(16).substring(5,7);
    return `${set0||r()}:${set1||r()}:${set2||r()}:${set3||r()}:${set4||r()}:${set5||r()}`.toUpperCase();
}

/**
 * Generates a pseudo-random MAC address string (in uppercase)
 * 
 * @since 1.2.5
 * 
 * @param  {String} set0 First MAC number group, (leave blank or provide `null` to randomize)
 * @param  {String} set1 Second MAC number group, (leave blank or provide `null` to randomize)
 * @param  {String} set2 Third MAC number group, (leave blank or provide `null` to randomize)
 * @param  {String} set3 Fourth MAC number group, (leave blank or provide `null` to randomize)
 * @param  {String} set4 Fifth MAC number group, (leave blank or provide `null` to randomize)
 * @param  {String} set5 Sixth MAC number group, (leave blank or provide `null` to randomize)
 * 
 * @return {String}
 * 
 * @example <caption> Generates a random IPv6 address: </caption>
 * // example return:   "30:54:A8:B1:9E:A9"
 * os.randomMAC()
 * @example <caption> Generates a random IPv6 address with a fixed first set: </caption>
 * // example return:   "AA:C4:C5:99:34:F8"
 * os.randomMAC("AA")
*/
namespace.randomMAC = (set0, set1, set2, set3, set4, set5) => {
    const r = () => Math.random().toString(16).substring(5,7);
    return `${set0||r()}:${set1||r()}:${set2||r()}:${set3||r()}:${set4||r()}:${set5||r()}`.toUpperCase();
}

/**
 * Mounts and returns the path containing a user-home tilde sign (~)
 * 
 * @since 1.2.8
 * 
 * @param  {String} path The tilde path to decode. Defaults to the home path.
 * 
 * @return {String}
 * 
 * @example <caption> </caption>
 * getTildePath('~/tom') // 'c:\users\tomas\tom'
 * getTildePath() // 'c:\users\tomas' (default user home path)
*/
namespace.getTildePath = (path = '~') => path.replace(/^~($|\/|\\)/, `${osys.homedir()}$1`);

module.exports = namespace;