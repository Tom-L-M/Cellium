const osys = require('os');

/**
 * @namespace
 * @public
 */
const namespace = {}

/**
 * Wraps an async function with 'await' and try/catch to better handle errors.
 * @since 1.2.17
 * 
 * @param  {Function} asyncFunction The function to wrap
 * @param  {any} params The parameters to pass as args for the async function.
 * @return {any} Returns the function resolt, or an Error object.
 * 
 * @example <caption>  </caption>
 * const handleFetchAllClick = async () => {
 *  const [users, usersError] = await asyncWrapper(fetchUsersRequest)
 *  const [todos, todosError] = await asyncWrapper(fetchTodosRequest)
 *  const [user, userError] = await asyncWrapper(fetchUserByIdRequest, 1)
 *  const [newUser, newUserError] = await asyncWrapper(createUsersRequest, mockUser)
 * }
*/
namespace.asyncWrapper = async (asyncFunction, ...params) => {
    try {
        return (await asyncFunction(params));
    } catch (error) {
        return error;
    }
}

module.exports = namespace;