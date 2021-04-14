/**
 * The shape of the 404 message response.
 */
const notFoundMessageContract = {
    error: {
        message: 'string',
        statusCode: 'int',
    },
};

/**
 * Respond with a 404 error message if the requested resource is not found.
 */
const constructNotFoundError = (reply, message = 'The requested resource doesn\'t exist.') => {
    reply.statusCode = 404;
    reply.send({
        error: {
            message,
            statusCode: 404,
        },
    });
};

/**
 * Generate an Idempotency key for requests. This allows safe API retry requests.
 */
const generateIdempotencyKey = (prefix = null, len = 16) => {
    let res = '';
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = length; i > 0; --i) res += chars[Math.floor(Math.random() * chars.length)];
    res = `${prefix}${res}`;

    return res;
};

module.exports = {
    constructNotFoundError,
    notFoundMessageContract,
    generateIdempotencyKey,
};
