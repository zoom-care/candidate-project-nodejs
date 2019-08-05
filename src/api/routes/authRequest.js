/**
 * Throws if Authorization header is not valid
 * @param req
 */
const authRequest  = req => {
    const auth = req.header('Authorization');
    if(!auth) throw Error('User is not Authorized')
}

module.exports = {
    authRequest
}