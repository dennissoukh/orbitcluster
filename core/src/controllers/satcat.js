const descriptions = require('../../data/descriptions.json');
const ucs = require('../../data/ucs.json');

console.log(descriptions);
console.log(ucs);
/* const fs = require('fs');

fs.readFile('../../data/descriptions.json', 'utf-8', (err, jsonString) => {
    if(err) {
        console.log(err);
    } else {
        const data = JSON.parse(jsonString);
        console.log(data);
    }
}); */
