/**
 * 
 * 
 * @since 1.2.5
 * 
 * @param {} 
 * @return {} 
 * 
 * @example <caption>  </caption>
 * 
 * // => 
 */

module.exports = (() => {
    const CORE_MODULES = [
        'any',      'array', 
        'buffer',   'color', 
        'context',  'crypto', 
        'fs',       'functions', 
        'http',     'math', 
        'number',   'object', 
        'os',       'string',
        'html'
    ]
    let imports = {}
    for (let mod of CORE_MODULES) { 
        imports[mod] = require(`./libs/${mod}`) 
    }
    return imports;
})()