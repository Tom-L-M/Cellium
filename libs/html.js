/**
 * @namespace
 * @public
 */
const namespace = {}

/*  This implements the following methods and properties:
    > renderDynamicHTML()
*/

/**
 * It's a template engine, to render HTML containing template spaces.
 * The charset for replacement is <{content}>
 * @since 1.2.5
 * 
 * @param  {String} html The HTML code
 * @param  {Object} patterns The patterns to replace in the HTML code
 * @return {String} The HTML with the templates replaces
 * 
 * @example <caption> Rendering: </caption>
 * var template = 'Hello, my name is <{name}>. I\\'m <{age}> years old.';
 * console.log(TemplateEngine(template, {
 *   name: "Krasimir",
 *   age: 29
 * }));
*/
namespace.renderDynamicHTML = (html, patterns) => {
    let template = html;
    for (let item in patterns) {
        template = html.replace(
            new RegExp('<{'+item+'}>', 'gim'), 
            patterns[item]
        );
    }
    return template;
}

module.exports = namespace;