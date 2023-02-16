/**
 * @namespace
 * @public
 */
const http = {}

/*  This implements the following methods and properties:
    > http.methods
    > http.basicMethods
    > http.commonMethods
    > parseCookie()
    > serializeCookie()
    > PUTRequest()
    > DELETERequest()
    > GETRequest()
    > POSTRequest()
    > redirectHTTPS()
    > getURLParameters()
*/

/**
 * @property
 * @since 1.2.5
 * The HTTP methods available in the latest node version. 
 * The same as http.METHODS, but in lowercase (from Node v18.0)
 * (in case the available version is outdated)
*/
http.methods = [
    'acl',         'bind',       'checkout',
    'connect',     'copy',       'delete',  
    'get',         'head',       'link',    
    'lock',        'm-search',   'merge',   
    'mkactivity',  'mkcalendar', 'mkcol',   
    'move',        'notify',     'options', 
    'patch',       'post',       'propfind',
    'proppatch',   'purge',      'put',     
    'rebind',      'report',     'search',  
    'source',      'subscribe',  'trace',   
    'unbind',      'unlink',     'unlock',  
    'unsubscribe'
];

/**
 * @property
 * @since 1.2.5
 * The basic HTTP methods available in node.
 * The same as http.METHODS, but in lowercase (from Node v0.10)
 * This is the old node.js version http.METHODS 
*/
http.basicMethods = [
    'get',       'post',        'put',
    'head',      'delete',      'options',
    'trace',     'copy',        'lock',
    'mkcol',     'move',        'purge',
    'propfind',  'proppatch',   'unlock',
    'report',    'mkactivity',  'checkout',
    'merge',     'm-search',    'notify',
    'subscribe', 'unsubscribe', 'patch',
    'search',    'connect'
];
 
/**
 * @property
 * @since 1.2.8
 * The most basic HTTP methods available in node possible.
 * Those are the 6 most used methods, and are the most common.
*/
http.commonMethods = [
    'get',       'post',        'put',
    'head',      'delete',      'options'
];

/**
 * Parses an HTTP Cookie header string, returning an object of all cookie name-value pairs.
 * 
 * @since 1.2.8 
 * 
 * @param {String} str The cookie string to parse.
 * @return {Object} The parsed cookie object.
 * 
 * @example <caption>  </caption>
 * parseCookie('foo=bar; equation=E%3Dmc%5E2');
 * // { foo: 'bar', equation: 'E=mc^2' }
 */
http.parseCookie = str => {
    return str
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, v) => {
        acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
        return acc;
    }, {});
}

/**
 * Parses an HTTP Cookie header string, returning an object of all cookie name-value pairs.
 * 
 * @since 1.2.8 
 * 
 * @param {String} name The cookie name.
 * @param {String} val The cookie value.
 * @return {String} The serialized cookie.
 * 
 * @example <caption>  </caption>
 * serializeCookie('foo', 'bar'); // 'foo=bar'
 */
http.serializeCookie = (name, val) => `${encodeURIComponent(name)}=${encodeURIComponent(val)}`;

/**
 * Makes a PUT request to the passed URL.
 * 
 * @since 1.2.8 
 * @WARNING Front-End only
 * 
 * @param {String} url
 * @param {String} data
 * @param {Function} callback
 * @param {Function} err
 * @return {String} 
 * 
 * @example <caption>  </caption>
 * const password = 'fooBaz';
 * const data = JSON.stringify({
 *   id: 1,
 *   title: 'foo',
 *   body: 'bar',
 *   userId: 1
 * });
 * httpPut('https://jsonplaceholder.typicode.com/posts/1', data, request => {
 *   console.log(request.responseText);
 * }); 
 * // => This logs:
 * Logs: {
 *   id: 1,
 *   title: 'foo',
 *   body: 'bar',
 *   userId: 1
 * }
*/
http.PUTRequest = (url, data, callback = () => {}, err = console.error) => {
    const request = new XMLHttpRequest();
    request.open('PUT', url, true);
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.onload = () => callback(request);
    request.onerror = () => err(request);
    request.send(data);
};

/**
 * Makes a delete request to the passed URL.
 * 
 * @since 1.2.8 
 * @WARNING Front-End only
 * 
 * @param {String} url
 * @param {Function} callback
 * @param {Function} err
 * @return {String}
 * 
 * @example <caption>  </caption>
 * httpDelete('https://jsonplaceholder.typicode.com/posts/1', request => {
 *   console.log(request.responseText);
 * }); // Logs: {}
*/
http.DELETERequest = (url, callback, err = console.error) => {
    const request = new XMLHttpRequest();
    request.open('DELETE', url, true);
    request.onload = () => callback(request);
    request.onerror = () => err(request);
    request.send();
};

/**
 * Makes a get request to the passed URL.
 * 
 * @since 1.2.8 
 * @WARNING Front-End only
 * 
 * @param {String} url
 * @param {Function} callback
 * @param {Function} err
 * @return {String}
 * 
 * @example <caption>  </caption>
 * httpGet(
 *   'https://jsonplaceholder.typicode.com/posts/1',
 *    console.log
 * );
 * // => Logs:
 * Logs: {
 *   "userId": 1,
 *   "id": 1,
 *   "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
 *   "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
 * }
*/
http.GETRequest = (url, callback, err = console.error) => {
    const request = new XMLHttpRequest();
    request.open('DELETE', url, true);
    request.onload = () => callback(request);
    request.onerror = () => err(request);
    request.send();
};

/**
 * Makes a post request to the passed URL.
 * 
 * @since 1.2.8 
 * @WARNING Front-End only
 * 
 * @param {String} url
 * @param {String} data
 * @param {Function} callback
 * @param {Function} err
 * @return {String}
 * 
 * @example <caption>  </caption>
 * const newPost = {
 *   userId: 1,
 *   id: 1337,
 *   title: 'Foo',
 *   body: 'bar bar bar'
 * };
 * const data = JSON.stringify(newPost);
 * httpPost(
 *   'https://jsonplaceholder.typicode.com/posts',
 *   data,
 *   console.log
 * ); /*
 * Logs: {
 *   "userId": 1,
 *   "id": 1337,
 *   "title": "Foo",
 *   "body": "bar bar bar"
 * }
 * httpPost(
 *   'https://jsonplaceholder.typicode.com/posts',
 *   null, // does not send a body
 *   console.log
 * );
 * // Logs :
 * Logs: {
 *   "id": 101
 * }
*/
http.POSTRequest = (url, data, callback, err = console.error) => {
    const request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.onload = () => callback(request.responseText);
    request.onerror = () => err(request);
    request.send(data);
};

/**
 * Redirects the page to HTTPS if it's currently in HTTP.
 * 
 * @since 1.2.8 
 * @WARNING Front-End only
 *
 * @return {String}
 * 
 * @example <caption>  </caption>
 * httpsRedirect();
 * // If you are on http://mydomain.com, you are redirected to https://mydomain.com
*/
http.redirectHTTPS = () => { if (location.protocol !== 'https:') return location.replace('https://' + location.href.split('//')[1]); };

/**
 * Creates an object containing the parameters of the current URL.
 * 
 * @since 1.2.8
 *
 * @return {String}
 * 
 * @example <caption>  </caption>
 * getURLParameters('google.com'); // {}
 * getURLParameters('http://url.com/page?name=Adam&surname=Smith');
 * // {name: 'Adam', surname: 'Smith'}
*/
http.getURLParameters = url =>
    (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
        (a, v) => (
            (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a
        ),
    {}
);

module.exports = http;