export const processLineBreaks = (string: string) => {
    string = string.replace(/(?:\r\n|\r|\n)/g, '<br style="content: \'\'; margin: 2em; display: block; font-size: 24%;">');
    return string;
}
