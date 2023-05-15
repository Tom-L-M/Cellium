/**
 * @namespace
 * @public
 */
const namespace = {}

/*  This implements the following methods and properties:
    > namespace.methods
    > namespace.basicMethods
    > namespace.commonMethods
    > parseCookie()
    > serializeCookie()
    > PUTRequest()
    > DELETERequest()
    > GETRequest()
    > POSTRequest()
    > redirectHTTPS()
    > getURLParameters()
    > asyncPOSTRequest()
*/

/**
 * @property
 * @since 1.2.5
 * The HTTP methods available in the latest node version. 
 * The same as http.METHODS, but in lowercase (from Node v18.0)
 * (in case the available version is outdated)
*/
namespace.methods = [
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
namespace.basicMethods = [
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
namespace.commonMethods = [
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
namespace.parseCookie = str => {
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
namespace.serializeCookie = (name, val) => `${encodeURIComponent(name)}=${encodeURIComponent(val)}`;

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
namespace.PUTRequest = (url, data, callback = () => {}, err = console.error) => {
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
namespace.DELETERequest = (url, callback, err = console.error) => {
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
namespace.GETRequest = (url, callback, err = console.error) => {
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
namespace.POSTRequest = (url, data, callback, err = console.error) => {
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
namespace.redirectHTTPS = () => { if (location.protocol !== 'https:') return location.replace('https://' + location.href.split('//')[1]); };

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
namespace.getURLParameters = url =>
    (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
        (a, v) => (
            (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a
        ),
    {}
);

/**
 * Sends an async POST request.
 * 
 * @since 1.2.17
 * @param {String} url The URL to send the request to.
 * @param {String} data The content to send in the request.
 * @return {Promise}
 * 
 * @example <caption> </caption>
 * const main = async () => {
 *  const a = await post(
 *      'https://www.4devs.com.br/ferramentas_online.php', 
 *      'acao=gerar_pessoa&sexo=H&pontuacao=S&idade=19&cep_estado=PB&txt_qtde=1&cep_cidade='
 *      );
 *  console.log(a);
 * }
 * main();
*/
/**
 * Promise resolve()
 * @return {String} The data returned from the server.
*/
/**
 * Promise reject()
 * @return {Error} An error describing the operation failure.
*/
namespace.asyncPOSTRequest = (url, data) => {
    const dataString = (typeof data === 'string') ? data : JSON.stringify(data);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': dataString.length,
        },
        timeout: 6000 // in ms
    }
    return new Promise((resolve, reject) => {
        const req = https.request(url, options, (res) => {
            if (res.statusCode < 200 || res.statusCode > 299) {
                return reject(new Error(`HTTP status code ${res.statusCode}`));
            }
            const body = [];
            res.on('data', (chunk) => body.push(chunk));
            res.on('end', () => { resolve(Buffer.concat(body).toString()); });
        });
        req.on('error', (err) => { reject(err); });
        req.on('timeout', () => { req.destroy(); reject(new Error('Request time out')); });
        req.write(dataString);
        req.end();
    });
}

/**
 * Sends an async GET request.
 * 
 * @since 1.2.17
 * @param {String} url The URL to send the request to.
 * @return {Promise}
 * 
 * @example <caption>  </caption>
 * const main = async () => {
 *  const a = await get('https://www.4devs.com.br/ferramentas_online.php');
 *  console.log(a);
 * }
 * main();
*/
/**
 * Promise resolve()
 * @return {String} The data returned from the server.
*/
/**
 * Promise reject()
 * @return {Error} An error describing the operation failure.
*/
namespace.asyncGETRequest = (url) => {
    return new Promise((resolve, reject) => {
        const request = https.get(url, (res) => {
            if (res.statusCode < 200 || res.statusCode > 299) {
                return reject(new Error(`HTTP status code ${res.statusCode}`));
            };
            const body = [];
            res.on('data', (chunk) => body.push(chunk));
            res.on('end', () => { 
                resolve(Buffer.concat(body).toString());
            });
        });
        request.on('error', (err) => { return reject(err); });
        request.on('timeout', () => { return reject(new Error('timed out')); });
        request.end()
    });
}

module.exports = namespace;