export const monthsFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const timestampToReadableDate = (i: Date | string) => {
    const date = new Date(i);
    const day = date.getUTCDate();
    const month = monthsFull[date.getUTCMonth()];
    const year = date.getUTCFullYear();

    return `${day} ${month}, ${year}`;
}

export const timestampToReadableDateTime = (i: Date | string) => {
    const date = new Date(i);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');

    return `${day} ${month}, ${year} ${hours}:${minutes}:${seconds}`;
}
