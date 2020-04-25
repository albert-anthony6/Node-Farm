const fs = require('fs'); //File System - this module grants access to reading and writing data right to the file system

const textIn = fs.readFileSync('./starter/txt/input.txt', 'utf-8');
console.log(textIn);

const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./starter/txt/outPut.txt', textOut);
console.log('File Written');