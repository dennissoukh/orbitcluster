/**
 * Return null if a string is empty
 */
const handleEmpty = (value) => {
    return (value.length === 0 || !value.trim()) ? null : value;
};

module.exports = {
    handleEmpty,
};
