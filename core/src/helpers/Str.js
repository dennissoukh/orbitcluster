/* eslint no-extend-native: ["error", { "exceptions": ["String"] }] */

String.prototype.explode = function explode(separator, limit) {
    const array = this.split(separator);

    if (limit !== undefined && array.length >= limit) {
        array.push(array.splice(limit - 1).join(separator));
    }

    return array;
};

String.prototype.handleEmpty = function handleEmpty() {
    return (this.length === 0 || !this.trim()) ? null : this;
};
