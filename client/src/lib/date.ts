export const monthsFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const dateToString = (i: Date | string) => {
    const date = new Date(i);
    const day = date.getUTCDate();
    const month = monthsFull[date.getUTCMonth()];
    const year = date.getUTCFullYear();

    return `${day} ${month}, ${year}`;
}
