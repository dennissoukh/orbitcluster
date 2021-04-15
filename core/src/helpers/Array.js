/**
 * Group an array with a specified key
 */
const groupArrayByKey = (arr, key) => {
    const res = [];
    const map = {};

    arr.forEach((item) => {
        const temp = {};

        if (!map[item[key]]) {
            map[item[key]] = [];
            temp[item[key]] = map[item[key]];
            res.push(temp);
        }

        map[item[key]].push(item);
    });

    return res;
};

module.exports = {
    groupArrayByKey,
};
