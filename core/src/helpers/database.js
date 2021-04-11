/* eslint no-underscore-dangle: 0 */

function generatePaginationQuery(query, sort, nextKey) {
    const sortField = sort == null ? null : sort[0];

    function nextKeyFn(items) {
        if (items.length === 0) {
            return null;
        }

        const item = items[items.length - 1];

        if (sortField == null) {
            return { _id: item._id };
        }

        return { _id: item._id, [sortField]: item[sortField] };
    }

    if (nextKey == null) {
        return { query, nextKeyFn };
    }

    let paginatedQuery = query;

    if (sort == null) {
        paginatedQuery._id = { $gt: nextKey._id };
        return { paginatedQuery, nextKey };
    }

    const sortOperator = sort[1] === 1 ? '$gt' : '$lt';

    const paginationQuery = [
        { [sortField]: { [sortOperator]: nextKey[sortField] } },
        {
            $and: [
                { [sortField]: nextKey[sortField] },
                { _id: { [sortOperator]: nextKey._id } },
            ],
        },
    ];

    if (paginatedQuery.$or == null) {
        paginatedQuery.$or = paginationQuery;
    } else {
        paginatedQuery = { $and: [query, { $or: paginationQuery }] };
    }

    return { paginatedQuery, nextKeyFn };
}

module.exports = {
    generatePaginationQuery,
};
