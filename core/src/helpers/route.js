/**
 * The shape of the pagination key.
 */
const paginationKeyContract = {
    key: {
        page: 'int',
        per_page: 'int',
    },
};

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
    for (let i = len; i > 0; i -= 1) res += chars[Math.floor(Math.random() * chars.length)];
    res = `${prefix ? prefix : ''}${res}`;

    return res;
};

const parsePagination = (request, defaultLimit = 10) => {
    const page = Number.parseInt(request.query.page, 10);
    const limit = request.query.limit ? Number.parseInt(request.query.limit, 10) : defaultLimit;
    const skip = page * limit;

    return { page, limit, skip };
};

const generateBasePaginationMetadata = (page, limit, count, skip, pageCount) => {
    const pages = Math.floor(count / limit);

    return {
        page,
        limit,
        pages,
        count,
        skip,
        pageCount,
    };
};

module.exports = {
    constructNotFoundError,
    notFoundMessageContract,
    generateIdempotencyKey,
    paginationKeyContract,
    parsePagination,
    generateBasePaginationMetadata,
};
