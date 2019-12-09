const fs = require('fs');

var arrayComOsLinks = fs.readFileSync('links.txt').toString().split("\n");


module.exports = arrayComOsLinks
